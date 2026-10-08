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
see `CLIENT_DATA.md`). It is an embroidery-style emblem: **dark charcoal base + red + yellow**
accents (scissors, ruler, "AH" monogram). The brand is dark and industrial, matching the real
product range (safety-striped jackets, wearpack, lab coats). Structural guidance (Flat Design +
Swiss, Filter-Heavy Grid, Corporate Trust typography) came from `ui-ux-pro-max`; the palette
comes from the brand (antislop R-01).

| Token                        | Value     | Use                                                              |
| ---------------------------- | --------- | ---------------------------------------------------------------- |
| `--color-background`         | `#0E0E12` | Page background (charcoal, from the logo base)                   |
| `--color-foreground`         | `#F5F5F7` | Primary text on dark                                             |
| `--color-card`               | `#16161C` | Cards / raised surfaces                                          |
| `--color-primary`            | `#E02030` | Brand red — primary CTA (from the logo monogram)                 |
| `--color-primary-foreground` | `#FFFFFF` | Text on primary                                                  |
| `--color-accent`             | `#F2B90C` | Yellow/amber — active filter, focus, links (from the logo ruler) |
| `--color-accent-foreground`  | `#1A1A1A` | Text on accent                                                   |
| `--color-muted`              | `#1E1E26` | Muted surface                                                    |
| `--color-muted-foreground`   | `#A1A1B5` | Secondary text                                                   |
| `--color-border`             | `#2A2A34` | Borders                                                          |
| `--color-destructive`        | `#EF4444` | Errors                                                           |

**Active color count:** charcoal + red + yellow + neutrals. Red is the primary action colour,
yellow the single accent (used at the key moment only — antislop R-29). No gradient, no glow.

> Dark mode is the **brand default here with a real reason** (the logo and products are dark/
> industrial) — not a "tech default" (antislop R-21).

## Typography

Register: **Industrial / technical** (PDH, PDL, wearpack, lab coats, safety-striped jackets)
presented with an **editorial** finish (flat-lay product photography, big headlines).

Chosen with the `typography-expert` register framework — the **IBM Plex superfamily** (called out
as "the most credible libre technical superfamily"). One superfamily on a shared skeleton
guarantees pairing harmony (pairing rule #4); the mono gives a spec-sheet feel that fits an
industrial garment maker.

| Role                     | Family                      | Weight  | Notes                          |
| ------------------------ | --------------------------- | ------- | ------------------------------ |
| Display / h1–h2          | **IBM Plex Sans Condensed** | 600     | Editorial, compact headlines   |
| Headings h3+ / UI        | **IBM Plex Sans**           | 500–600 | Technical, credible            |
| Body                     | **IBM Plex Sans**           | 400     | 16px base, line-height 1.5     |
| Labels / specs / numbers | **IBM Plex Mono**           | 400–500 | Sizes, quantities, spec values |

- Replaces the earlier Lexend/Source Sans pick (an overused register); IBM Plex matches the
  actual industrial-product reality.
- Load only the weights used (perf).
- Fluid headlines via `clamp()`; body stays a fixed 16px floor.
- Line-height tightens as size grows; negative tracking at display sizes.

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
