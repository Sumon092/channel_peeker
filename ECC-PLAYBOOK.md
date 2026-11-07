# The ECC Project Playbook

A repeatable checklist for taking any web project from idea to deploy-ready,
using Claude Code with the ECC plugin. Distilled from the channelpeeker build
(2 tools → 38 tools, deploy-ready, in two days). Run the phases in order;
each lists the command to type and what you get back.

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

Deploy-day (not code): domain redirect www→apex in host dashboard, set
`NEXT_PUBLIC_SITE_URL`, Search Console via DNS TXT → import into Bing,
run the IndexNow script, add lightweight analytics (e.g. Plausible ~1 kB).

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

*Compiled November 5, 2026 from the channelpeeker build log.*
