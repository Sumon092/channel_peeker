# The ECC Project Playbook

A repeatable checklist for taking any web project from idea to deploy-ready,
using Claude Code with the ECC plugin. Distilled from the channelpeeker build
(2 tools → 46 tools, 110 pages across 7 languages, deploy-ready, in three days).
Run the phases in order; each lists the command to type and what you get back.

---

## Phase 1 — Research & strategy

**1.1 Competitor analysis** — know who you're against before writing code.

```
analysis top competitors for my site and list what they provide and what we lack
```

**1.2 Deep research** (multi-agent, cited report) — acquisition channels,
positioning, what actually works in your market:

```
/ecc:deep-research <your question: how can my site attract its first users against competitors X, Y, Z?>
```

**1.3 Keyword mining** (free, no tools needed) — real long-tail queries from
Google's own autocomplete. Every returned phrase is something people truly type:

```bash
curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=YOUR+SEED+KEYWORD" | python3 -c "import sys,json; print('\n'.join(json.load(sys.stdin)[1]))"
```

Checklist:
- [ ] Competitor table: what they provide / what we lack / where we can win
- [ ] One differentiator you can defend (channelpeeker's: honest numbers, no signup)
- [ ] 50+ long-tail keywords mapped to planned pages
- [ ] Exact volumes verified later in Google Keyword Planner (free with an Ads account)
- [ ] **Brand name = available domain.** `curl -sI https://yourname.com` BEFORE you commit
      to a name. channelpeek.com turned out to be someone else's live site mid-project;
      the rename to channelpeeker touched 51 files and re-broke 11 SEO titles (see Phase 4).

---

## Phase 2 — Build

Plan first for anything non-trivial:

```
/ecc:plan <feature description>        # single-model plan, waits for your CONFIRM
/ecc:feature-dev <feature>             # guided feature development
```

Build rules that paid off:
- [ ] One registry file drives everything (tools list → pages, sitemap, menus, search)
- [ ] Shared UI primitives from day one (input, button, status, copy components)
- [ ] Every async widget ships all four states: skeleton, error, empty, data-freshness line
- [ ] Rate limits and quota budgets in code before launch, not after abuse
- [ ] Label every calculated number as your estimate; never present it as source data
- [ ] Unit tests for pure logic (`npm test`); keep lint and build green at every step

Verify after every batch:

```bash
npm test && npm run lint && npm run build
```

Fix loops when something breaks:

```
/ecc:build-fix          # detect build system, fix errors incrementally
/ecc:react-build        # React/Next-specific build failures
```

---

## Phase 3 — Code review

```
/ecc:code-review                 # local uncommitted changes
/ecc:code-review <PR number>     # GitHub PR mode
/ecc:security-scan               # security-focused audit
```

Gate: zero CRITICAL/HIGH before merge. MEDIUMs become a fix list.
Validation table to fill every time: typecheck / lint / tests / build.

Scanner triage (don't chase ghosts): AgentShield flags npm `sha512-…==` integrity
hashes in package-lock.json as "Azure storage keys" (hundreds of CRITICALs), and
applies agent-prompt heuristics to any CLAUDE.md. Verify one sample, log the
false-positive class once, and judge the scan on what remains.

---

## Phase 4 — SEO (pre-deploy, all code-level)

On-page (per page):
- [ ] Unique title + meta description, canonical, OG/Twitter tags
- [ ] One H1 with the primary keyword; FAQ section answering long-tail queries verbatim
- [ ] JSON-LD: WebApplication/Article + FAQPage + BreadcrumbList

Site-wide:
- [ ] `sitemap.xml` (only indexable URLs; omit lastmod unless it's real)
- [ ] `robots.txt` allowing all crawlers incl. AI bots (GPTBot, ClaudeBot…)
- [ ] WebSite + Organization JSON-LD in the root layout
- [ ] `llms.txt` generated from your content registry (cheap GEO; crawl adoption is low, cost is zero)
- [ ] `opengraph-image` (1200×630), favicon ≥48px square, apple-touch-icon, web manifest
- [ ] Security headers: HSTS, nosniff, referrer-policy (trust, not ranking)
- [ ] Verification slots: `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` env → meta tags
- [ ] IndexNow: key file in `public/<key>.txt` + post-deploy ping script:

```bash
# generate a key once
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
# after each deploy
SITE_URL=https://yourdomain.com node scripts/indexnow.mjs
```

- [ ] Real 404 status on junk paths: `curl -s -o /dev/null -w "%{http_code}" https://site/junk` → must be 404
      (SPA fallthrough serving the app shell with a 200 is a soft-404 — and it silently
      breaks `/ads.txt` later: Google treats 200+HTML as a *present but invalid* ads.txt)

Length audits — two hard-won rules:
- [ ] Measure title/description lengths on **entity-decoded** text. Raw HTML counts
      `&amp;` as 5 chars and `&#x27;` as 6; half the "violations" vanish after decoding.
- [ ] **Re-run the length audit after ANY brand or name change.** A 2-character-longer
      name in the `| brand` title suffix pushed 11 previously-passing pages over 60ch.
- [ ] CJK pages: a 55-char Japanese description is not "too short" — Latin floors
      (70ch) don't apply; use ~45 for ja/ko/zh.

Known truths (2026): FAQ rich results are gov/health-only (markup still helps
AEO/AI answers); Google ignores IndexNow (Bing/Yandex use it, and Bing feeds
ChatGPT retrieval); blocking Google-Extended does NOT affect AI Overviews.

Audit command when unsure what's missing:

```
/ecc:deep-research pre-deploy technical SEO checklist for <stack>: what code-level items are missing given we have <list what you have>?
```

Also available: `/ecc:seo` and the `ecc:seo-specialist` agent for full site audits.

---

## Phase 5 — Design system

```
/ecc:design-system        # audit: 10 dimensions scored 0-10, AI-slop check, fix list
```

Produces `DESIGN.md` + `design-tokens.json` + `design-preview.html`.
Then apply its fix list. The usual suspects:
- [ ] One shadow idiom, tokenized (`--shadow-panel`)
- [ ] Shared field/button styles — no copy-pasted class strings
- [ ] All colors via tokens; full dark-mode remap; `color-scheme: dark`
- [ ] Named type steps instead of arbitrary `text-[1.05rem]` values

Then the feel pass:

```
/ecc:make-interfaces-feel-better
```

- [ ] Font smoothing at root; neutral inset outlines on images
- [ ] Short enter animation on results, gated by `prefers-reduced-motion`
- [ ] `active:scale` press states; scoped transitions (never `transition: all`)
- [ ] `tabular-nums` on any number that updates
- [ ] 40px+ hit areas

---

## Phase 6 — UX & accessibility

Run both audits in parallel (agents):
- `ecc:a11y-architect` agent → WCAG 2.2 AA, code-level, with contrast math
- `/ecc:click-path-audit` → journeys, orphan pages, dead ends, footer/404 recovery

High-value fixes that recur in every project:
- [ ] Global `:focus-visible` outline + global reduced-motion kill switch
- [ ] Input borders ≥3:1 contrast; white-on-accent buttons AA-safe in dark mode
- [ ] Accessible names on icon-only buttons and image links
- [ ] Errors wired with `aria-invalid` + `aria-describedby`
- [ ] Persistent `aria-live` containers (never conditionally mounted)
- [ ] Charts get a text alternative describing the data
- [ ] Every page reachable from somewhere else (no orphans); cross-link money pages from long-tail pages
- [ ] 404 page offers search/popular links, not a dead end

---

## Phase 7 — Performance

Measure before optimizing — the build usually says no work is needed:

```bash
npm run build                               # per-route output
du -sh .next/static/chunks/                 # total JS
# gzipped first-load for one page:
curl -s http://localhost:3000/PAGE | grep -o 'src="/_next/static/chunks/[^"]*"' | sed 's|src="||;s|"||' | sort -u | while read s; do f=".next${s#/_next}"; gzip -c "$f" | wc -c; done | awk '{t+=$1} END{print t/1024 " kB gzipped"}'
```

Healthy static Next.js site: ~180 kB gzipped first-load. If it's lean, stop.
Post-deploy: PageSpeed Insights once (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1).
If something is actually slow: `ecc:performance-optimizer` agent.

---

## Phase 8 — Screenshots & evidence

Headless Chrome, no tooling needed (use `?q=`-style prefill params to capture live results):

```bash
google-chrome --headless=new --disable-gpu --user-data-dir=/tmp/shots \
  --hide-scrollbars --window-size=1440,2400 --virtual-time-budget=15000 \
  --screenshot=page.png "http://localhost:3000/your-page?q=example"
```

---

## Phase 9 — Ship

```bash
git add <scoped paths> && git commit -m "..."   # logical chunks, each buildable
git push origin main
```

- [ ] Secrets only in `.env` (confirm it's gitignored BEFORE first commit)
- [ ] `.env.example` documents every variable
- [ ] API keys restricted to their exact APIs in the provider console
- [ ] E2E smoke test against the built app (`npm start` + curl every route)
- [ ] A `DEPLOYMENT.md` in the repo: env table, §1 validation block, post-deploy
      smoke curls, the deferred switches that must NOT be flipped early

E2E mechanics that bit us twice:
- Browser assertions must wait for **hydration**, not `domcontentloaded` —
  `page.waitForFunction()` on the expected state; `document.body.innerText`
  does NOT include `<input>` values, read them explicitly.
- Kill the test server with `fuser -k 3177/tcp`, never `pkill -f "next start"`
  (that pattern matches your own shell and exits it mid-script).
- Keep audit scripts **sitemap-driven** so they automatically cover new pages.

Deploy-day (not code): domain redirect www→apex in host dashboard, set
`NEXT_PUBLIC_SITE_URL`, Search Console via DNS TXT → import into Bing,
run the IndexNow script, add lightweight analytics (e.g. Plausible ~1 kB).
If rate limiting is per-IP, the reverse proxy MUST forward the client IP
(`X-Forwarded-For`/`X-Real-IP`) or every visitor shares one bucket.

---

## Phase 10 — Localization (when you go multilingual)

Pilot first, never all-at-once: ship your full i18n **infrastructure** with only
the highest-value tools × the highest-RPM languages, then extend demand-driven
from Search Console data. Machine-translating everything in bulk produces the
thin pages Google's "scaled content abuse" policy demotes.

Architecture that keeps one-fix-fixes-all-languages true:
- [ ] English stays at root URLs; locales are thin wrapper pages (`/de/...`) that
      render the SAME shared widget components with translated content files
- [ ] hreflang both directions + `x-default` → English; locale URLs in sitemap;
      per-locale canonical; `lang` attribute on the content (and set `<html lang>`
      client-side after hydration)
- [ ] One typed **string catalog** per locale for widget UI (buttons, errors,
      sr-only statuses), with English as the context default so EN pages need no
      provider and there is a single code path
- [ ] Client-side error localization: map parse errors by **code**, server errors
      by **exact-string lookup** with raw fallback; if server-composed result text
      must localize, have the API return the raw data (ids, statuses, counts) and
      rebuild sentences client-side per locale
- [ ] Numbers/dates/regions via `Intl` with real tags (`pt-BR`, `es-419`), never
      hardcoded `"en"`
- [ ] A **catalog integrity test**: every locale mirrors the English keys and
      `{placeholder}` sets (one vitest file catches every future missing string)
- [ ] An **English-leak audit**: crawl every locale page for ~30 English UI
      markers (strip JSON-LD first; exempt words that are identical in that
      language — "Contact" is French, "Legal" is Spanish)
- [ ] Content that QUOTES a UI label ("click 'Pick winner'") must be updated when
      that label localizes — grep content files for old button names
- [ ] Native-speaker spot check (~$20 on Fiverr, 2 pages/language) for languages
      you can't read, before driving traffic to them

---

## Phase 11 — Monetization readiness (AdSense)

Apply AFTER you have steady traffic (a few hundred visits/day) — approval is
smoother and day-one RPM higher. Until then nothing below blocks you, but get
the order right when the day comes:

1. Approval granted → 2. enable Google's certified CMP (AdSense → Privacy &
   messaging; mandatory before EEA/UK traffic sees ads) → 3. update the privacy
   policy to disclose ad cookies (delete any "we use no advertising cookies"
   sentence the old policy had) → 4. set the publisher-ID env and deploy →
   5. verify `https://site/ads.txt` returns the one-liner as **plain text 200**.

- [ ] One AdSense account for ALL your sites (each domain = a "site" in the
      console, each with its own ads.txt carrying the same pub ID)
- [ ] Ads only on content pages; never on logged-in app screens or
      processing/wait screens ("screens without publisher content" is the classic
      tool-site suspension)
- [ ] Keep the loader + ads.txt route env-gated and inert in the codebase from
      day one, so go-live is a config change, not a deploy risk

---

## The one-page order of operations

1. `/ecc:deep-research` the market → differentiator + keyword list
2. `/ecc:plan` → build with registry-driven pages, shared primitives, tests green
3. `/ecc:code-review` → fix MEDIUMs that matter
4. SEO checklist (Phase 4) → every box before deploy
5. `/ecc:design-system` → apply fix list → `/ecc:make-interfaces-feel-better`
6. a11y + click-path audits → fix AA failures and orphan pages
7. Measure performance → usually stop
8. Screenshot evidence → commit in logical chunks → push → deploy-day list
9. Traffic first; localize pilot-first from Search Console data (Phase 10)
10. AdSense only after steady traffic, in the Phase 11 order
11. **Re-run phases 3–8 after any large change** (rename, i18n, refactor) — the
    re-audit of this project caught 11 SEO regressions a green build never would

*Compiled November 5, 2026 from the channelpeeker build log; updated November 7,
2026 after the rename, 6-language localization, and full re-audit.*
