# channelpeek design system

Source of truth: the CSS custom properties in `src/app/globals.css` (mirrored in
`design-tokens.json`). Audited November 5, 2026 — overall score **86/100**.

## Rationale

The visual language deliberately echoes YouTube's own UI (white/#0f0f0f
surfaces, #f2f2f2 chips, #606060 secondary text, sparing red accent) so the
tools feel native to the audience's daily environment. The red accent is
reserved for actions and highlights; status communication uses semantic
good/warn/bad tokens, each with a soft background variant and a dark-mode
remap. One typeface (Roboto, variable) at three weights keeps the YouTube echo
and loads as a single file.

Shape language: pill inputs/buttons, `rounded-2xl` cards, `rounded-3xl` result
panels, `rounded-xl` inner tiles — one consistent family. Motion is minimal and
gated: the only scroll animation sits behind both `@supports
(animation-timeline)` and `prefers-reduced-motion: no-preference`.

## Audit scores (0–10)

| Dimension | Score | Notes |
|---|---|---|
| Color consistency | 9 | Everything uses tokens; two competing shadow idioms (see fixes) |
| Typography hierarchy | 8 | Clear scale; a few arbitrary sizes (`text-[1.05rem]`, `text-[0.95rem]`) instead of named steps |
| Spacing rhythm | 8 | Tailwind scale throughout; a few magic skeleton heights (`h-[68px]`) |
| Component consistency | 9 | Result panels and inputs visually identical, but the input class string is copy-pasted across ~10 components |
| Responsive | 8 | Grids collapse cleanly; comparison table scrolls; mega-menu is fixed `w-170` and tight on 768px viewports |
| Dark mode | 9 | Complete remap incl. accent and status colors, `color-scheme: dark` |
| Animation | 9 | Purposeful only; reduced-motion respected |
| Accessibility | 8 | Skip link, aria-live results, labels, focus-visible; gaps: menu lacks `aria-expanded`, accent-on-white is borderline AA for small text |
| Information density | 9 | Generous whitespace, honest microcopy, FAQs collapsed |
| Polish | 9 | Hover states, per-tool skeletons, empty states, copy feedback, data freshness lines |

## AI-slop check: clean

No purple-blue gradients, no glassmorphism, no scroll-jacking. The single hero
wash is a 5% accent radial. The restraint is the personality — keep it. The one
slop-adjacent habit to watch: every new tool copying the "Free tool · No
signup" pill means the claim must stay true everywhere.

## Fix list (by value)

1. **Unify shadows** — result panels use `shadow-lg shadow-slate-900/5` (an
   off-palette Tailwind slate) while cards use
   `shadow-[0_8px_30px_rgb(0_0_0/0.08)]`. Pick one, define `--shadow-panel` in
   `globals.css`, use everywhere.
2. **Extract the input class** — the pill-input class string is duplicated in
   ~10 client components (e.g. `src/app/url-cleaner/url-cleaner.tsx`,
   `src/app/revenue-calculator/revenue-calculator.tsx`). Export a shared
   constant or `<PillInput>` from `src/components/ui/`.
3. **Menu semantics** — `src/components/site-header.tsx:30-53`: the CSS-only
   dropdown works with hover/focus-within but announces nothing; add
   `aria-expanded` via a small client component, or accept the tradeoff
   knowingly (it is keyboard-reachable today).
4. **Accent contrast** — #e8002d on white is ≈4.5:1, borderline AA for the
   small "Use tool" links; `--accent-strong` (#c20026, ≈5.9:1) passes
   comfortably — consider it for small accent text.
5. **Name the odd sizes** — promote `text-[1.05rem]` (card titles) and
   `text-[0.95rem]` (nav) into the `@theme` block so they're deliberate steps.

## Rules for new components

- Colors only via token classes (`bg-surface-2`, `text-muted`…); never raw hex.
- Interactive elements: pill shape, visible focus state, hover feedback.
- Result panels: `rounded-3xl border border-border bg-surface p-5 sm:p-7`.
- Every async state needs all four: skeleton, error (`ErrorBox`), empty-state
  message, and a `FetchedAt` freshness line for API data.
- Estimates are always labeled ("channelpeek estimate"); never present a
  calculated number as YouTube data — the design system includes the honesty.
