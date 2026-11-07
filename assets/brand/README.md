# Brand assets

Two approved logo candidates, each as a master SVG (24×24 viewBox, scales to any
size) plus pre-rendered transparent PNGs at 16 / 32 / 48 / 64 / 128 / 180 / 256 / 512.

- **trend-dot/** — rising bars + insight dot. **Currently live site-wide.**
- **corner-peek/** — negative-space circle peeking into the frame. Alternate.

## How to switch the live logo

The site never reads these files at runtime; they are the design source of truth.
To switch marks, update the four places the mark is drawn:

1. `src/components/logo.tsx` — `LogoMark` (header + footer). Copy the shapes from
   the chosen `logo.svg`; keep the per-instance gradient `gid` prop.
2. `src/app/icon.svg` — favicon. Paste the chosen `logo.svg` content (32×32 size attrs).
3. `src/app/apple-icon.tsx` — home-screen PNG. Replace the inner `<svg>` shapes.
4. `src/app/opengraph-image.tsx` — social share card. Replace the inner `<svg>` shapes.

Then: `npm run build`, verify `/icon.svg`, `/apple-icon`, `/opengraph-image`
render, and commit. Note: social platforms cache share cards for days, and the
corner-peek pupil uses solid `#d4002b` (no gradient ref) inside clipped groups.

PNG sizes map to uses: 16/32/48 favicon contexts · 64/128 app grids · 180 apple
touch icon · 256/512 stores, directories, Product Hunt, press.
