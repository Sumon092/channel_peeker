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

## Fix list — all applied November 5, 2026

1. ✅ **Shadows unified** — `--shadow-panel` and `--shadow-menu` tokens in
   `globals.css`; `shadow-panel`/`shadow-menu` used everywhere (the hero
   smart-search keeps its bespoke layered shadow deliberately).
2. ✅ **Shared field style** — `.field-pill` / `.field-area` utilities in
   `globals.css`; every tool input/select/textarea composes them with only
   spacing classes at the call site.
3. ✅ **Menu semantics** — `src/components/tools-menu.tsx`: state-driven
   dropdown with `aria-expanded`, `aria-haspopup` and Escape-to-close;
   hover/focus behavior unchanged.
4. ✅ **Accent contrast** — small accent text (card "Use tool" links, step
   eyebrows, related-tools link) uses `text-accent-strong` (≈5.9:1); `--accent`
   remains for buttons and large text.
5. ✅ **Named sizes** — `text-card-title` (1.05rem) and `text-nav` (0.95rem)
   are theme steps.

## Rules for new components

- Colors only via token classes (`bg-surface-2`, `text-muted`…); never raw hex.
- Interactive elements: pill shape, visible focus state, hover feedback.
- Result panels: `rounded-3xl border border-border bg-surface p-5 sm:p-7`.
- Every async state needs all four: skeleton, error (`ErrorBox`), empty-state
  message, and a `FetchedAt` freshness line for API data.
- Estimates are always labeled ("channelpeek estimate"); never present a
  calculated number as YouTube data — the design system includes the honesty.
