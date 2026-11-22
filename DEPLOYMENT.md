# Deployment checklist

How to take channelpeeker from a green local build to production, and what to verify after each deploy. Values and names mirror [.env.example](.env.example).

## 1. Pre-deploy validation (every release)

All four must pass before a release goes live:

```bash
npx tsc --noEmit   # type check
npm run lint       # eslint
npm test           # vitest (unit tests)
npm run build      # production build (also prerenders all pages)
```

`deploy.sh` runs them automatically inside each new release folder and refuses to switch if any fails. During development run them in a separate git worktree or on another machine — **never in `/var/www/html/channel_peeker` on the server** (see §4 and CLAUDE.md).

## 2. Environment variables

Copy `.env.example` and fill it in on the host. Summary of what matters in production:

| Variable | Required | Production value / notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | `https://channelpeeker.com` — drives canonicals, sitemap, hreflang, JSON-LD. Wrong value here poisons every page's SEO tags. |
| `YOUTUBE_API_KEY` | yes | Key from the Google Cloud project that has YouTube Data API v3 enabled. A key from a different project fails with 403. |
| `GEMINI_API_KEY` | yes | For the AI generator tools (default model `gemini-3.5-flash-lite`; override with `GEMINI_MODEL`). |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | strongly recommended | Without them the app falls back to in-memory KV: the API cache and all rate-limit/quota counters reset on every restart and are not shared between instances. Fine in dev, not in production. |
| `YT_QUOTA_MAIN` / `YT_QUOTA_SEARCH` / `YT_QUOTA_BATCH_STATS` | yes | Current split: `9000` / `1000` / leave default. `search.list` costs 100 units per call, so `YT_QUOTA_SEARCH=1000` allows ~10 searches/day of headroom accounting. |
| `DERIVED_METRICS_APPROVED` | yes | Keep `false` until YouTube approves the derived-metrics amendment from the API compliance audit. Flipping it early is a compliance risk; the UIs degrade honestly while it is off. |
| `ADSENSE_PUBLISHER_ID` | no (for now) | Leave unset. Setting it enables the AdSense loader script and `/ads.txt`. Only set after AdSense approval **and** the CMP is configured (see §7). |
| `GA_MEASUREMENT_ID` | no | Google Analytics 4 ID (`G-XXXXXXXXXX`). Read at build time, so rebuild after changing it. Setting it enables the consent banner and the Google Analytics wording in the privacy and cookie policies; Google's script loads only after a visitor accepts. |
| `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` | recommended | Meta-tag verification for Search Console and Bing Webmaster Tools. |

## 3. Infrastructure requirements

- **Reverse proxy must forward the real client IP.** Rate limiting (30 tool calls/hour, 10 AI generations/day, per IP) reads `x-forwarded-for` / `x-real-ip`. If the proxy doesn't set these, every visitor shares one bucket named "unknown" and the site rate-limits itself. nginx example:

  ```nginx
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Real-IP $remote_addr;
  ```

- **Process manager:** pm2 app `channelpeeker`, cluster mode with 1 instance, running `next start -p 4010 -H 127.0.0.1` from `/var/www/html/channel_peeker-releases/current`. `deploy.sh` creates and reloads it; don't start it by hand. Cluster mode is what makes `pm2 reload` graceful (the new process is up before the old one stops).
- **Cache icon routes at the proxy.** Next serves `/icon.svg`, `/favicon.ico`, `/apple-icon` and `/opengraph-image` with `max-age=0`; they only change on redeploy, so add e.g. nginx:

  ```nginx
  location ~ ^/(icon\.svg|favicon\.ico|apple-icon|opengraph-image)$ {
      proxy_pass http://app;
      proxy_hide_header Cache-Control;
      add_header Cache-Control "public, max-age=86400";
  }
  ```
- HTTPS terminated at the proxy; HTTP → HTTPS redirect.
- No database and no file storage — the app is stateless apart from the KV cache, so there is nothing to back up.

## 4. Deploy and rollback

Deploys go through **`deploy.sh` only**. Never run `npm ci`, `npm run build` or tests in the git checkout on the server: the old in-place deploy rebuilt `.next` under the running server and broke live JS for visitors until restart.

### How it works

```
/var/www/html/channel_peeker                    git checkout: source of deploys, nothing runs from here
/var/www/html/channel_peeker-releases/
  releases/20261122-181912-9c567db/             one full app per release (clone + .env + node_modules + .next)
  current  -> releases/<id>                     what pm2 serves
  previous -> releases/<id>                     rollback target
```

`./deploy.sh [ref]` (default `main`):

1. Clones `<ref>` from the checkout into a new release folder (full git history, which the sitemap's lastmod needs) and copies `.env` from the checkout.
2. `npm ci`, type check, lint, tests, build — in the release folder. Any failure deletes the release and stops; the live site is untouched.
3. Smoke-tests the new build on port 4011 (`/`, two localized pages, sitemap, robots, a 404).
4. Swaps the `current` symlink atomically (old `current` becomes `previous`) and runs `pm2 reload channelpeeker`.
5. Health-checks port 4010 and confirms the server is serving the new release. If not, it rolls back automatically.
6. Deletes old releases, keeping the newest 3 (plus `current` and `previous`).

### Deploy

```bash
cd /var/www/html/channel_peeker
git pull                 # if deploying what's on GitHub; deploy.sh deploys the checkout's local ref
./deploy.sh              # deploys main; or ./deploy.sh <branch|tag|sha>
```

Takes 2–4 minutes, almost all of it before the switch.

### Rollback (instant, no build)

```bash
/var/www/html/channel_peeker/deploy.sh rollback
```

Switches `current` back to `previous` and reloads (about 2 seconds). Running it again rolls forward. To go to any older release still on disk: `./deploy.sh status`, then `./deploy.sh switch <release>`.

### Other commands

- `./deploy.sh status` — current/previous release, all releases, pm2 state.
- `./deploy.sh --build-only [ref]` — build and verify a release without going live; later `./deploy.sh switch <release>`.

### First run on a server

The very first `./deploy.sh` replaces the old fork-mode `npm start` process with the cluster-mode one, which means **a few seconds of downtime once**; it then runs `pm2 save` so the setup survives reboots. Every later deploy and rollback is a graceful reload. To have an instant rollback target from the first deploy on, build the currently live commit first with `./deploy.sh --build-only <sha>`: the first real deploy then uses it as `previous`.

The old `.next` and `node_modules` in the checkout are unused after the first run and can be deleted.

## 5. Post-deploy smoke checks

```bash
BASE=https://channelpeeker.com
curl -s -o /dev/null -w "%{http_code}\n" $BASE/                        # 200
curl -s -o /dev/null -w "%{http_code}\n" $BASE/comment-picker          # 200
curl -s -o /dev/null -w "%{http_code}\n" $BASE/de/comment-picker       # 200 (localized page)
curl -s $BASE/sitemap.xml | grep -c "<loc>"                            # 110+
curl -s $BASE/robots.txt | head -3
curl -s $BASE/comment-picker | grep -o 'hrefLang=' | wc -l           # 8 (en, de, ja, fr, ko, es, pt-BR, x-default)
curl -s $BASE/pt/comment-picker | grep -o '<html lang="[^"]*"'         # <html lang="pt-BR"
```

Then in a browser:
- [ ] Run one live-API tool end to end (e.g. paste a video URL into Comment Picker and draw).
- [ ] Run one AI tool once (confirms `GEMINI_API_KEY` works).
- [ ] Check the favicon and tab icon render, and paste a URL into a Slack/Discord message to confirm the OG share card.
- [ ] Open DevTools console on the home page: no errors.

## 6. Operations

- **Quota ceiling is the first thing that breaks under success.** 9,000 YouTube units/day. A viral Comment Picker moment can exhaust it by midday; after that, API tools show their honest error state until the quota resets (midnight Pacific). If usage grows, request a quota increase in Google Cloud Console with real usage data.
- **Monitoring:** add an uptime ping (e.g. UptimeRobot, free) against `/` and one tool page. Check host logs after each deploy.
- **Cache behavior:** YouTube responses are cached in KV (15 min – 12 h depending on endpoint). A stale result self-heals; no manual cache flushing is needed or supported.
- **Key rotation / env changes:** edit `/var/www/html/channel_peeker/.env`, then run `./deploy.sh`. Each release gets its own copy of `.env` at build time, so a restart alone does not pick up changes (and a rollback restores that release's env).

## 7. Deferred switches (do not flip early)

- **AdSense** — in order: (1) approval granted → (2) enable Google's certified CMP in AdSense → Privacy & messaging → (3) set `ADSENSE_PUBLISHER_ID` and redeploy (this activates the loader script and `/ads.txt` automatically) → (4) verify `https://channelpeeker.com/ads.txt` returns the one-line file with HTTP 200, and plain text, not HTML.
- **Derived metrics** — only after YouTube approves the compliance amendment: set `DERIVED_METRICS_APPROVED=true` and redeploy. Medians, engagement rates, and difficulty scores appear automatically.
