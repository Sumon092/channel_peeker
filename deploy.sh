#!/usr/bin/env bash
# Zero-downtime deploys for channelpeeker. See DEPLOYMENT.md §4.
#
#   ./deploy.sh [ref]               build <ref> (default: main) in a new release folder, verify, switch, reload
#   ./deploy.sh --build-only [ref]  build and verify a release without switching to it
#   ./deploy.sh rollback            switch back to the previous release (instant, no build)
#   ./deploy.sh switch <release>    switch to any existing release folder name
#   ./deploy.sh status              show releases, current/previous and the pm2 process
#
# Layout (nothing is ever built inside the git checkout):
#   $BASE/releases/<YYYYmmdd-HHMMSS>-<sha>/   full app: clone + .env + node_modules + .next
#   $BASE/current  -> releases/<id>           what pm2 serves
#   $BASE/previous -> releases/<id>           rollback target
#
# The running site only ever sees a finished release: a new build is type-checked, linted,
# tested, built and smoke-tested on a spare port in its own folder, then `current` is swapped
# atomically and pm2 (cluster mode) reloads gracefully, starting the new process before
# stopping the old one. If the health check fails afterwards, it rolls back automatically.
#
# Overrides (for testing the script on a sandbox app; production uses the defaults):
#   REPO BASE ENV_FILE APP PORT SMOKE_PORT KEEP PM2_SAVE
set -euo pipefail
shopt -s inherit_errexit  # make set -e apply inside $(...) too

REPO="${REPO:-/var/www/html/channel_peeker}"
BASE="${BASE:-/var/www/html/channel_peeker-releases}"
ENV_FILE="${ENV_FILE:-$REPO/.env}"
APP="${APP:-channelpeeker}"
PORT="${PORT:-4010}"
SMOKE_PORT="${SMOKE_PORT:-4011}"
KEEP="${KEEP:-3}"          # releases kept on disk (current and previous are always kept)
PM2_SAVE="${PM2_SAVE:-1}"  # persist the pm2 process list after first-time setup

RELEASES="$BASE/releases"
log() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
die() { printf '\n\033[31mERROR: %s\033[0m\n' "$*" >&2; exit 1; }

mkdir -p "$RELEASES"
exec 9>"$BASE/.deploy.lock"
flock -n 9 || die "another deploy is running"

link_target() { [ -L "$BASE/$1" ] && basename "$(readlink "$BASE/$1")" || true; }

# Atomic symlink swap: create a temp link, then rename over the old one.
set_link() {
  ln -sfn "releases/$2" "$BASE/.$1.tmp"
  mv -Tf "$BASE/.$1.tmp" "$BASE/$1"
}

pm2_field() {  # pm2_field <python expr on the app's pm2_env as `e`>
  pm2 jlist 2>/dev/null | python3 -c "
import json, sys
apps = [p for p in json.load(sys.stdin) if p['name'] == '$APP']
e = apps[0]['pm2_env'] if apps else None
print('' if e is None else ($1))"
}

# Wait until the server on $1 answers / with 200 (max ~40 s).
wait_http() {
  for _ in $(seq 1 40); do
    [ "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$1/")" = 200 ] && return 0
    sleep 1
  done
  return 1
}

# Expected status codes for a running build.
check_urls() {
  local port=$1 fail=0 code path want
  for pair in "/:200" "/pt/monetization-checker:200" "/ja/comment-finder:200" "/sitemap.xml:200" "/robots.txt:200" "/this-page-does-not-exist:404"; do
    path=${pair%:*}; want=${pair##*:}
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$port$path")
    printf '   %-32s %s\n' "$path" "$code"
    [ "$code" = "$want" ] || fail=1
  done
  return $fail
}

# Confirm the server on $PORT serves release $1: every JS/CSS file the home page references exists in it.
serves_release() {
  local dir="$RELEASES/$1" assets a
  assets=$(curl -s "http://127.0.0.1:$PORT/" | grep -o '/_next/static/[^"]*\.\(js\|css\)' | sort -u)
  [ -n "$assets" ] || return 1
  for a in $assets; do [ -f "$dir/.next/static/${a#/_next/static/}" ] || return 1; done
}

build_release() {
  local ref=$1 sha id dir
  sha=$(git -C "$REPO" rev-parse --verify "$ref^{commit}") || die "unknown ref: $ref"
  id="$(date +%Y%m%d-%H%M%S)-${sha:0:7}"
  dir="$RELEASES/$id"
  [ -f "$ENV_FILE" ] || die "env file not found: $ENV_FILE"

  log "Building release $id ($ref = $sha)" >&2
  # Full-history local clone: sitemap lastmod is computed from git history at build time.
  git clone --quiet --local --no-checkout "$REPO" "$dir" >&2
  git -C "$dir" checkout --quiet --detach "$sha" >&2
  cp "$ENV_FILE" "$dir/.env"

  # Explicit && chain: `set -e` does not apply inside a subshell that is part of an || list.
  (
    cd "$dir" &&
      log "npm ci" && npm ci --no-audit --no-fund --prefer-offline &&
      log "Type check" && npx tsc --noEmit &&
      log "Lint" && npm run lint &&
      log "Tests" && npm test &&
      log "Build" && npm run build
  ) >&2 || { rm -rf "$dir"; die "release $id failed its checks; removed it, nothing was switched"; }

  log "Smoke test on port $SMOKE_PORT" >&2
  (cd "$dir" && exec node node_modules/next/dist/bin/next start -p "$SMOKE_PORT" -H 127.0.0.1) >"$dir/.smoke.log" 2>&1 9>&- &
  local smoke=$! ok=1
  if wait_http "$SMOKE_PORT" && check_urls "$SMOKE_PORT" >&2; then ok=0; fi
  kill "$smoke" 2>/dev/null || true; wait "$smoke" 2>/dev/null || true
  [ $ok = 0 ] || die "smoke test failed for $id (see $dir/.smoke.log); nothing was switched"

  echo "$id"
}

switch_to() {
  local id=$1 old migrate
  [ -d "$RELEASES/$id/.next" ] || die "no such built release: $id"
  old=$(link_target current)
  [ "$old" != "$id" ] || die "$id is already current"

  # pm2 must serve $BASE/current in cluster mode for graceful reloads. Anything else
  # (first run: the old fork-mode `npm start` from the git checkout) needs a one-time restart.
  migrate=0
  if [ "$(pm2_field "e['exec_mode'] + '|' + e['pm_cwd']")" != "cluster_mode|$BASE/current" ]; then migrate=1; fi

  log "Switching current: ${old:-none} -> $id"
  set_link current "$id"
  if [ -n "$old" ]; then
    set_link previous "$old"
  else
    local prev
    prev=$(ls -1 "$RELEASES" | grep -vx "$id" | tail -1 || true)
    [ -z "$prev" ] || set_link previous "$prev"
  fi

  if [ $migrate = 1 ]; then
    log "One-time pm2 setup: replacing '$APP' with a cluster-mode process on $BASE/current (a few seconds of downtime, this time only)"
    pm2 delete "$APP" >/dev/null 2>&1 || true
    pm2 start "$BASE/current/node_modules/next/dist/bin/next" --name "$APP" --cwd "$BASE/current" \
      -i 1 --listen-timeout 20000 --kill-timeout 8000 -- start -p "$PORT" -H 127.0.0.1 >/dev/null 9>&-
    [ "$PM2_SAVE" = 1 ] && pm2 save >/dev/null
  else
    log "pm2 reload $APP (graceful)"
    pm2 reload "$APP" >/dev/null 9>&-
  fi

  log "Health check on port $PORT"
  if wait_http "$PORT" && check_urls "$PORT" && serves_release "$id"; then
    log "Live: $id"
    return 0
  fi
  if [ -n "$old" ] && [ $migrate = 0 ]; then
    log "Health check FAILED, rolling back to $old"
    set_link current "$old"; set_link previous "$id"
    pm2 reload "$APP" >/dev/null 9>&-
    wait_http "$PORT" && serves_release "$old" && die "rolled back to $old; $id is kept for inspection"
  fi
  die "health check failed and automatic rollback was not possible; check: pm2 logs $APP"
}

prune() {
  local keep_cur keep_prev
  keep_cur=$(link_target current); keep_prev=$(link_target previous)
  ls -1 "$RELEASES" | head -n -"$KEEP" | while read -r r; do
    [ "$r" = "$keep_cur" ] || [ "$r" = "$keep_prev" ] || { log "Removing old release $r"; rm -rf "${RELEASES:?}/$r"; }
  done
}

case "${1:-}" in
  rollback)
    prev=$(link_target previous)
    [ -n "$prev" ] || die "no previous release to roll back to"
    switch_to "$prev" ;;
  switch)
    [ -n "${2:-}" ] || die "usage: $0 switch <release>"
    switch_to "$2" ;;
  status)
    echo "current:  $(link_target current)"
    echo "previous: $(link_target previous)"
    echo "releases:"; ls -1 "$RELEASES" | sed 's/^/  /'
    pm2 describe "$APP" 2>/dev/null | grep -E "status|exec mode|exec cwd|uptime" || echo "pm2: '$APP' not running" ;;
  --build-only)
    id=$(build_release "${2:-main}")
    log "Built $id (not switched). Go live with: $0 switch $id" ;;
  -h|--help)
    sed -n '2,9p' "$0" ;;
  *)
    id=$(build_release "${1:-main}")
    switch_to "$id"
    prune ;;
esac
