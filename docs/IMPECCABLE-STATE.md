# Impeccable redesign — state

Recorded so the redesign can resume without re-running discovery.

## Status

- `impeccable context` run ✅ (launcher works; DESIGN.md present, PRODUCT.md now written)
- `PRODUCT.md` written ✅ (product truth, no invented data)
- `concept-seed --scope surface --mode persuade` run ✅
  - seed key: `1f48462c`
  - dealt indices: 5, 6, 2 (index 5 leads)
  - lead direction: **Fabrication spec-sheet** (Massin-derived, "the roll")
- Build path: **code-led** (image generation not confirmed available on this machine)
- **BLOCKED ON USER:** choosing the visual direction, or supplying their own reference.

## The dealt directions (for reference)

| Card     | World                                      | Source id                                      | Quality-bar board                                                                       |
| -------- | ------------------------------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| A (lead) | Fabrication spec-sheet / typographic print | `massin-stage-page`                            | https://impeccable.style/worlds/cards/massin-stage-page.webp                            |
| B        | Interactive type specimen (Swiss)          | `variable-font-specimen`                       | https://impeccable.style/worlds/cards/variable-font-specimen.webp                       |
| C        | Desert neon sign shop                      | `vernacular-ephemera-desert-neon-sign-program` | https://impeccable.style/worlds/cards/vernacular-ephemera-desert-neon-sign-program.webp |
| D        | Nixie laboratory counter                   | `signals-instruments-nixie-laboratory-counter` | https://impeccable.style/worlds/cards/signals-instruments-nixie-laboratory-counter.webp |

## Locked constraints (independent of the chosen world)

- **Palette (from the client logo):** charcoal `#0E0E12`, red `#E02030`, yellow `#F2B90C`.
  MODE RULES (Persuade) forbid the direction from authorizing a new palette/type identity.
- **Product truth:** no invented prices, MOQ, lead times, testimonials, clients, specs.
- **Register:** industrial / technical + editorial (see DESIGN.md).

## Next steps when the user answers

1. If a dealt card: record the direction contract (six blocks + seed key) in the surface brief.
2. If the user supplies a reference: read it, derive the world, still keep the locked palette.
3. Build code-led: first viewport as a thesis, then sections, motion, responsive.
4. Guide text via `DESIGN.md` (IBM Plex), but re-decide type if the chosen world demands it.
