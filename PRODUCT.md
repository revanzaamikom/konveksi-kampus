# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** decision-makers for custom apparel at organisations — campus departments
  (jurusan/himpunan), student organisations, communities, and companies. They order uniforms,
  jackets, korsa, almamater, wearpack, and event apparel in quantity.
- **Situation:** they arrive with varying readiness — some have final artwork, some only a
  reference, some just know the garment type, some don't understand fabrics yet. They are often
  on a phone, comparing several local convection vendors, and are wary of being scammed.
- **Job:** get a trustworthy local vendor to produce custom garments to spec, on time, at a fair
  price — and reach them easily to discuss details.

## Product Purpose

A digital storefront and sales tool for KonveksiKampus, a Yogyakarta convection (garment
manufacturing) business. It must build trust, explain products and process quickly, show proof
of real production, and route qualified leads to WhatsApp consultation. Success = a visitor
understands the business and contacts it with useful order details.

## Positioning

A campus-rooted Yogyakarta convection vendor that handles the full range — PDH/PDL, korsa,
jaket, polo, kaos, almamater, rompi, wearpack, jas lab — and works with customers at any stage
of design readiness, from "only an idea" to "final artwork".

## Operating Context

- Orders are **custom, made-to-order** (not off-the-shelf e-commerce).
- Customers consult via **WhatsApp**; the site is the entry point, not the checkout.
- Real product photography and real produced garments exist and are the primary proof.
- The business has an existing Instagram (`konveksikampus.yk`), a Linktree, and an old Facebook
  presence.

## Capabilities and Constraints

- Catalogs products by category with detail pages and a WhatsApp consultation CTA.
- Content is organized to be CMS-manageable later (Business phase).
- **Undecided / not provided by the client (must not be fabricated):** prices, minimum order,
  production lead times, testimonials, named clients/logos, material specifications, official
  email, full address, confirmed primary WhatsApp (two public numbers exist), and whether
  `konveksikampus.com` is theirs (it currently returns HTTP 403 / no live content).
- Technology: Next.js static export; content files behind a content-layer adapter.

## Brand Commitments

- Name: **Konveksi Kampus** (business); site brand styled as "KonveksiKampus".
- Established 2012; "Vendor Konveksi Yogyakarta".
- Logo: an embroidery-style emblem (scissors + ruler + "AH" monogram), charcoal base with red
  and yellow accents. Palette derives from it: charcoal `#0E0E12`, red `#E02030`, yellow `#F2B90C`.
- Real assets on hand: 21 product photos, a flat-lay hero banner, the logo.

## Evidence on Hand

- `public/images/products/*` — 21 real product photos (front/back, colour variants).
- `public/brand/hero-flatlay.webp` — real flat-lay of produced garments.
- `CATALOG PRODUCT.pdf` — client catalog (about, visi, misi).
- `CLIENT_DATA.md` — sourced public facts with verification status.
- **Absent (do not fabricate):** testimonials, client logos, statistics, awards.

## Product Principles

1. Business value over decoration — every section must help a customer trust, understand, or act.
2. Real production photos outrank mockups and stock imagery.
3. Never invent business data; use content schemas and empty states until the client provides it.
4. One clear path to action: a qualified WhatsApp consultation.
5. Local craftsmanship positioned as professional service — not a small/amateur site.

## Accessibility & Inclusion

Dark theme must keep body text ≥ 4.5:1 contrast; touch targets ≥ 44px; visible keyboard focus;
motion respects `prefers-reduced-motion`.
