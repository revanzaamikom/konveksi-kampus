# DESIGN.md — KonveksiKampus design system

Source of truth for visual decisions. Read before building or changing UI.
Generated with the `ui-ux-pro-max` skill, then reconciled with the brand per
`antislop` rule R-01 (palette comes from identity, with a written reason).

## Design Read (why this direction)

KonveksiKampus sells **institutional and industrial garments** — korsa jurusan, wearpack,
jacket lapangan with safety stripes, jas lab, almamater. The audience is engineering students,
campus organisations, and companies. Two brand truths drive the visuals:

1. **Technical / institutional** — the products are worn on site and on campus. The site must
   read as competent and dependable, not fashion-editorial.
2. **Safety-stripe language** — several real products carry high-visibility stripes. That
   industrial vocabulary is the brand's own, so the accent is drawn from it rather than from a
   default gradient set.

Direction: **Flat Design + Minimalism & Swiss Style** (verified: `ui-ux-pro-max` product search
→ "catalog/listing" recommends exactly this). Clean, grid-based, product-first, no decoration.

## Dials

| Dial     | Value | Meaning                                                 |
| -------- | ----- | ------------------------------------------------------- |
| Variance | 4/10  | Balanced / modern (not centered-minimal, not brutalist) |
| Motion   | 3/10  | Subtle — hover/opacity only, no scroll choreography     |
| Density  | 5/10  | Standard spacing scale                                  |

## Palette (brand-justified — from the client's own logo)

The client's Instagram avatar / logo was analysed (`tools/output/profile-avatar.png`,
see `CLIENT_DATA.md`). It is an embroidery-style emblem: **dark base + red + yellow**
accents (scissors, ruler, "AH" monogram). The brand is dark and industrial, matching the real
product range (safety-striped jackets, wearpack, lab coats). Structural guidance (Flat Design +
Swiss, Filter-Heavy Grid) came from `ui-ux-pro-max`; the palette comes from the brand (antislop
R-01). Values below mirror `src/app/globals.css` (the implemented source).

| Token                        | Value     | Use                                                            |
| ---------------------------- | --------- | -------------------------------------------------------------- |
| `--color-background`         | `#000000` | Page background (pure black — matches the product photos)      |
| `--color-foreground`         | `#f5f5f7` | Primary text on dark                                           |
| `--color-specimen`           | `#141418` | Image plate frame (a hair lighter than the page)               |
| `--color-plate-border`       | `#34343e` | Plate border                                                   |
| `--color-card`               | `#0c0c0f` | Cards / raised surfaces                                        |
| `--color-muted`              | `#1e1e26` | Muted surface                                                  |
| `--color-muted-foreground`   | `#b4b4c4` | Secondary text                                                 |
| `--color-border`             | `#2a2a34` | Borders                                                        |
| `--color-primary`            | `#e02030` | Brand red (from the logo monogram) — primary CTA               |
| `--color-primary-foreground` | `#ffffff` | Text on primary                                                |
| `--color-primary-hover`      | `#b8121f` | Primary hover (keeps white text ≥ 4.5:1)                       |
| `--color-primary-text`       | `#ff6b75` | Readable red for TEXT on black (red #e02030 only hits 4.05:1)  |
| `--color-accent`             | `#f2b90c` | Yellow/amber (from the logo ruler) — single accent, focus ring |
| `--color-accent-foreground`  | `#1a1a1a` | Text on accent                                                 |
| `--color-destructive`        | `#ef4444` | Errors                                                         |

**Active color count:** black ground + red + yellow + neutrals. Red is the primary action colour,
yellow the single accent (used at the key moment only — antislop R-29). No gradient, no glow.

> Dark mode is the **brand default here with a real reason** (the logo and products are dark/
> industrial) — not a "tech default" (antislop R-21).

## Typography

Register: **Industrial / technical** (PDH, PDL, wearpack, lab coats, safety-striped jackets)
presented with an **editorial** finish (flat-lay product photography, big headlines), pinned to
the **Modevo** reference (see `docs/DIRECTION-CONTRACT.md`).

| Role               | Family              | Weight  | Notes                                     |
| ------------------ | ------------------- | ------- | ----------------------------------------- |
| Display / h1–h3    | **Anton**           | 400     | Condensed, uppercase, oversized editorial |
| Body / UI / labels | **Instrument Sans** | 400–700 | 16px base, line-height 1.5                |

- Anton (condensed display) + Instrument Sans (UI/body) are the reference-pinned pair from the
  Modevo redesign (`4ffab14`). The earlier IBM Plex Superfamily pick in this file was superseded
  by that decision; this section now matches `src/app/layout.tsx` (`next/font/google`).
- Load only the weights used (perf).
- Fluid headlines via `clamp()` in `globals.css` (`.text-display`, `.text-display-sm`).
- Headings are `text-transform: uppercase` with tight tracking (see `globals.css` base layer).

## Effects & motion

- No gradients, no box-shadow as decoration, no glass, no glow (antislop R-10/12/13).
- Shadows only as a real elevation marker (e.g. dropdown), with the reason written.
- Radius: a small fixed set (inputs/buttons ~6px, cards ~10px). Not every element is a pill
  (antislop R-11).
- Motion at dial 3: color/opacity transitions 150–200ms `ease`. Nothing loops. Everything
  respects `prefers-reduced-motion` (antislop R-19).

## Layout rules

- **Catalog = Filter-Heavy Grid** (verified pattern): category chips (wrapping, never clipped —
  UX "Chip Collection Reflow") + responsive product grid.
- Mobile-first breakpoints: 375 / 768 / 1024 / 1440.
- No horizontal scroll. No fixed-px container widths.
- Section rhythm varies (antislop R-05): the home page does not repeat one identical
  "title + subtitle + card grid" template for every section.
- Show real content only. Real products, real visi/misi from the client. No invented stats,
  no fake testimonials, no logo bar, no emoji.

## Accessibility floor (non-negotiable)

- Text contrast ≥ 4.5:1.
- Visible keyboard focus (use `--color-accent` ring).
- Touch targets ≥ 44×44px.
- Every image has meaningful `alt`.
- Semantic HTML + one `<h1>` per page.

## Pre-delivery checklist

- [ ] Palette matches this file; no ad-hoc hex in components.
- [ ] No decorative emoji, no gradient, no glow, no fake data.
- [ ] Focus states visible; keyboard-only use works.
- [ ] `prefers-reduced-motion` respected.
- [ ] Holds at 375 / 768 / 1024 / 1440.
- [ ] Nav and every interactive element has a real destination (no dead links).
