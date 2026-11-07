# Deployment checklist

How to take channelpeek from a green local build to production, and what to verify after each deploy. Values and names mirror [.env.example](.env.example).

## 1. Pre-deploy validation (every release)

Run from the repo root; all four must pass before deploying:

```bash
npx tsc --noEmit   # type check
npm run lint       # eslint
npm test           # vitest (unit tests)
npm run build      # production build (also prerenders all pages)
```

## 2. Environment variables

Copy `.env.example` and fill it in on the host. Summary of what matters in production:

| Variable | Required | Production value / notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | `https://channelpeek.com` — drives canonicals, sitemap, hreflang, JSON-LD. Wrong value here poisons every page's SEO tags. |
| `YOUTUBE_API_KEY` | yes | Key from the Google Cloud project that has YouTube Data API v3 enabled. A key from a different project fails with 403. |
| `GEMINI_API_KEY` | yes | For the AI generator tools (default model `gemini-3.5-flash-lite`; override with `GEMINI_MODEL`). |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | strongly recommended | Without them the app falls back to in-memory KV: the API cache and all rate-limit/quota counters reset on every restart and are not shared between instances. Fine in dev, not in production. |
| `YT_QUOTA_MAIN` / `YT_QUOTA_SEARCH` / `YT_QUOTA_BATCH_STATS` | yes | Current split: `9000` / `1000` / leave default. `search.list` costs 100 units per call, so `YT_QUOTA_SEARCH=1000` allows ~10 searches/day of headroom accounting. |
| `DERIVED_METRICS_APPROVED` | yes | Keep `false` until YouTube approves the derived-metrics amendment from the API compliance audit. Flipping it early is a compliance risk; the UIs degrade honestly while it is off. |
| `ADSENSE_PUBLISHER_ID` | no (for now) | Leave unset. Setting it enables the AdSense loader script and `/ads.txt`. Only set after AdSense approval **and** the CMP is configured (see §7). |
| `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` | recommended | Meta-tag verification for Search Console and Bing Webmaster Tools. |

## 3. Infrastructure requirements

- **Reverse proxy must forward the real client IP.** Rate limiting (30 tool calls/hour, 10 AI generations/day, per IP) reads `x-forwarded-for` / `x-real-ip`. If the proxy doesn't set these, every visitor shares one bucket named "unknown" and the site rate-limits itself. nginx example:

  ```nginx
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Real-IP $remote_addr;
  ```

- **Process manager** (systemd / pm2) running `npm run start` (defaults to port 3000; pass `-p` to change), restart-on-crash enabled.
- HTTPS terminated at the proxy; HTTP → HTTPS redirect.
- No database and no file storage — the app is stateless apart from the KV cache, so there is nothing to back up.

## 4. Deploy steps

1. `git pull` the release commit.
2. `npm ci`
3. Run the §1 validation block.
4. `npm run build`
5. Restart the service (`systemctl restart …` / `pm2 reload …`).

Zero-downtime isn't critical at current traffic; a restart drops in-flight requests for a second or two.

## 5. Post-deploy smoke checks

```bash
BASE=https://channelpeek.com
curl -s -o /dev/null -w "%{http_code}\n" $BASE/                        # 200
curl -s -o /dev/null -w "%{http_code}\n" $BASE/comment-picker          # 200
curl -s -o /dev/null -w "%{http_code}\n" $BASE/de/comment-picker       # 200 (localized page)
curl -s $BASE/sitemap.xml | grep -c "<loc>"                            # 110+
curl -s $BASE/robots.txt | head -3
curl -s $BASE/comment-picker | grep -c 'hreflang'                      # ≥ 8 (6 locales + en + x-default)
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
- **Key rotation:** both API keys are plain env vars — rotate by updating the env and restarting.

## 7. Deferred switches (do not flip early)

- **AdSense** — in order: (1) approval granted → (2) enable Google's certified CMP in AdSense → Privacy & messaging → (3) set `ADSENSE_PUBLISHER_ID` and redeploy (this activates the loader script and `/ads.txt` automatically) → (4) verify `https://channelpeek.com/ads.txt` returns the one-line file with HTTP 200, and plain text, not HTML.
- **Derived metrics** — only after YouTube approves the compliance amendment: set `DERIVED_METRICS_APPROVED=true` and redeploy. Medians, engagement rates, and difficulty scores appear automatically.
