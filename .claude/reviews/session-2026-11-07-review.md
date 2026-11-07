# Code Review: session commits d79ce44..6831410 (Nov 7, 2026)

**Reviewed**: November 7, 2026
**Scope**: 5 commits, 75 files, +1,949/−60 — 8 new tools (Comment Finder/Picker, Watch Time, Live Stream Earnings, Banner Downloader, Channel Tag Extractor, Region Restriction Checker), UX fixes, SEO pass
**Decision**: APPROVE (after fixing 1 security finding in this review)

## Summary

New code follows the established patterns (zod-validated routes, `enforceRateLimit` on every API route, KV caching with TTLs, official-API-only data). One real security issue found and fixed: CSV formula injection in the Comment Finder export. No hardcoded secrets, no injection vectors in routes, no missing rate limits.

## Findings

### CRITICAL
None.

### HIGH
- **CSV formula injection (CWE-1236)** — `src/app/comment-finder/comment-finder.tsx` `csvEscape()`.
  Commenter-controlled author/text starting with `=`, `+`, `-`, `@` executed as formulas when the
  exported CSV is opened in Excel/Sheets. **FIXED in this review**: leading formula characters are
  now prefixed with `'` before quoting.

### MEDIUM
- **Untrusted hrefs** — `authorChannelUrl` from the YouTube API was rendered directly as a link
  target in Comment Finder and Comment Picker. Risk is low (Google-sourced), but **hardened in
  this review**: links render only when the URL starts with `http`.
- **No unit tests for new pure logic** (`parseChannelKeywords`, `csvEscape`, `secureRandomIndex`).
  `channels.ts` imports `server-only`, which the vitest setup can't import without an alias, so
  testing the parser means either adding a `server-only` stub alias to `vitest.config.ts` or moving
  pure helpers out. Left as follow-up.

### LOW
- `Picker` component (~120 lines) and `CommentFinder` results exceed the 50-line guideline —
  consistent with existing components (e.g. thumbnail tester); not changed.
- Banner `<img>` has no error fallback if the CDN rejects a crop suffix; cosmetic.
- Tailwind canonical-class warnings (`w-[100px]` → `w-25`) match pre-existing codebase style.

## Security checklist
- Hardcoded credentials: none (keys via env only)
- Injection: none in routes (zod + `parseYouTubeInput` on every input; YouTube API params URL-encoded by `URL`)
- XSS: JSON-LD escaping intact; no `dangerouslySetInnerHTML` added; CSV injection fixed
- Rate limiting: present on all 5 new routes (`tool` bucket)
- Quota safety: comment picker capped at 5 pages; keyword-difficulty deliberately not auto-run (search.list = 100 units)

## Validation Results

| Check | Result |
|---|---|
| Type check (`tsc --noEmit`) | Pass |
| Lint (`eslint`) | Pass |
| Tests (`vitest`, 79 tests) | Pass |
| Build (`next build`, 62 pages) | Pass |

## Files Reviewed
All 75 changed files in the range; focus on the 18 added source files (5 API routes, 7 client
components, 6 pages), `src/lib/youtube/{comments,channels,videos}.ts`, `revenue-data.ts`,
`tools.ts`, `topic-form.tsx`, `smart-search.tsx`, `globals.css`.
