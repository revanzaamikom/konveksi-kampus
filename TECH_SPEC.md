# TECH_SPEC.md — KonveksiKampus Technical Specification

**Version:** 1.0
**Scope:** Standard MVP
**Status:** Locked for Standard; Business/Pro sections are forward-looking context only.

> This document records technical decisions. Per `AGENTS.md` §2, product requirements live in
> `PRD.md`; this file covers how those requirements are implemented.

---

# 1. STACK (STANDARD — current)

| Layer           | Choice                                                     | Rationale                                                                        |
| --------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Framework       | **Next.js 16 (App Router) + TypeScript**                   | SSG for speed + SEO, built-in image optimization, natural path to Business admin |
| Styling         | **Tailwind CSS v4**                                        | CSS-first tokens (`@theme`), consistent with design skills                       |
| Components      | **Hand-rolled components** (`src/components`)              | No component library dependency; small, readable, design-system consistent       |
| Data (Standard) | **TypeScript content files** + a **content-layer adapter** | Matches PRD §4 Standard ("content files"); no DB needed                          |
| Rendering       | **Static Generation (SSG)**                                | Catalog is fast and cheap to host                                                |
| Images          | **next/image**, files under `public/`                      | Automatic optimization, WebP                                                     |
| Contact CTA     | **WhatsApp deep-link**                                     | Per PRD; no backend needed                                                       |
| Language        | **Bahasa Indonesia**                                       | Target audience is local students & institutions                                 |
| Package mgr     | **npm** (available on this machine)                        | Keep it simple                                                                   |

**Version note:** `package.json` pins `next@16.4.0`, `react@19.3.0`, `react-dom@19.3.0`,
`eslint-config-next@16.4.0`, `tailwindcss@^4`. `shadcn/ui` is **not** used (an earlier draft
claimed it) — components are hand-written in `src/components/`.

**Package manager note:** only npm is installed on the build machine. Do not assume pnpm/bun.

---

# 2. ARCHITECTURE PRINCIPLE

The single most important structural rule:

> **The public UI never touches raw data directly. Everything goes through the content-layer.**

```
UI (app/, components/)
        │  imports only from
        ▼
lib/content/*        ← the adapter (deep module)
        │  reads
        ▼
src/data/*.ts        ← raw content files (Standard)
```

When the Business phase arrives, `lib/content/*` is re-implemented against a database
(e.g. Prisma/SQLite or Postgres). **The UI does not change.** This is the "deep module"
principle: a small, stable interface (`getProducts`, `getProductBySlug`, `getCategories`)
hiding the implementation detail of where data lives.

---

# 3. FOLDER STRUCTURE

```
KonveksiKampus/
├── AGENTS.md                      ← agent rules (governs behavior)
├── PRD.md                         ← product source of truth
├── TECH_SPEC.md                   ← this file
├── STANDARD.md                    ← master quality baseline (audit + QA checklist)
├── CLIENT_DATA.md                 ← verified client data + open items
├── GLOSSARY.md                    ← domain vocabulary
├── DESIGN.md                      ← design tokens / visual direction
├── docs/
│   └── adr/                       ← architecture decision records
├── public/
│   ├── brand/                     ← logo, favicon, OG image
│   └── images/products/           ← product photos (from client assets)
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx               ← Home
    │   ├── not-found.tsx          ← branded 404
    │   ├── katalog/
    │   │   ├── page.tsx           ← Catalog
    │   │   └── [slug]/page.tsx    ← Product detail
    │   ├── kategori/[slug]/page.tsx
    │   ├── tentang/page.tsx
    │   ├── kontak/page.tsx
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   └── llms.txt/route.ts
    ├── components/                 ← flat hand-rolled components (no ui/ or sections/ split)
    │   ├── Navbar.tsx, Footer.tsx, Section.tsx, Button/LinkButton
    │   ├── ProductCard.tsx, ProductImage.tsx, CategoryGrid.tsx, PortfolioGridRevealed.tsx
    │   ├── Reveal.tsx, MaskReveal.tsx, Parallax.tsx, Scrub.tsx, Marquee.tsx, Magnetic.tsx
    │   ├── MaterialsList.tsx, ProcessList.tsx, FaqList.tsx, StickyWhatsApp.tsx, JsonLd.tsx
    ├── lib/
    │   ├── content/                ← CONTENT-LAYER (the adapter)
    │   │   ├── types.ts            ← Product, Category types
    │   │   ├── products.ts         ← getProducts, getProductBySlug…
    │   │   └── categories.ts       ← getCategories, getCategoryBySlug…
    │   ├── site.ts                 ← site config (name, contact, WhatsApp)
    │   └── seo.ts                  ← metadata helpers
    └── data/
        ├── products.ts             ← raw product records (Standard)
        ├── categories.ts           ← raw category records (Standard)
        ├── site-content.ts         ← materials, process, faq, portfolio, clients, testimonials
        └── testimonials.ts, clients.ts  ← empty until real client data exists
```

---

# 4. DATA MODEL (Standard)

Field names follow `AGENTS.md` §11 and PRD §4 Business, so the model does not need to change
when the admin phase arrives. Standard only _uses_ a subset; the type may define more.

```ts
// src/lib/content/types.ts
export type ContentStatus = "draft" | "published";

export interface ImageAsset {
  src: string; // path under /public
  alt: string; // required — accessibility + SEO
  label?: string; // e.g. "Depan", "Belakang"
}

export interface ProductVariant {
  name: string; // e.g. "Ukuran", "Warna"
  options: string[]; // e.g. ["S", "M", "L"] or ["Merah", "Biru"]
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string; // FK → Category.slug
  description: string; // full description
  shortDescription?: string; // for cards
  images: ImageAsset[]; // first image = cover
  character?: string; // what it is suited for
  materials?: string[]; // material names (plural array)
  colors?: string[];
  customization?: string[];
  variants?: ProductVariant[];
  productionEstimate?: string; // only if confirmed
  minimumOrder?: string; // only if confirmed
  priceHint?: string; // only if confirmed — never invent prices
  status: ContentStatus;
  featured?: boolean; // for homepage "produk unggulan"
  order?: number; // manual sort
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  forWhom?: string; // who the product is for
  order: number;
}
```

Other Standard types (same file): `PortfolioItem`, `Testimonial`, `Client`, `Material`,
`FaqItem`, `ProcessStep`, and `ProductQuery` (the `getProducts` options).

**Content-layer interface (stable across Standard → Business):**

```ts
getCategories(): Promise<Category[]>
getCategoryBySlug(slug: string): Promise<Category | null>
getProducts(opts?: { category?: string; q?: string; featured?: boolean }): Promise<Product[]>
getProductBySlug(slug: string): Promise<Product | null>
```

> These functions return only `status: "published"` items on the public site.

---

# 5. SEO STRATEGY (Standard)

- Per-page `metadata` (title, description) via Next.js Metadata API.
- Semantic HTML + correct heading hierarchy (one `<h1>` per page).
- Descriptive URLs (`/katalog`, `/katalog/[slug]`, `/kategori/[slug]`).
- Image `alt` text on every product image.
- `sitemap.ts` and `robots.ts` — **both gated**: with no `NEXT_PUBLIC_SITE_URL` the sitemap is
  empty and robots disallows indexing, so the preview never emits an invented canonical.
- OpenGraph + Twitter metadata (root-relative until a domain is set).
- Structured data (JSON-LD): `BreadcrumbList` on every page, `FAQPage` on the home FAQ,
  `Product` on detail pages. Kept minimal (per `AGENTS.md` §13).
- Canonical/OG URLs are emitted **only** when `siteConfig.url` (from `NEXT_PUBLIC_SITE_URL`)
  is non-empty. No domain is invented.

---

# 6. PERFORMANCE STRATEGY (Standard)

- Static generation for all public pages.
- `next/image` for product photos (responsive `sizes`, lazy loading below the fold).
- Minimal client-side JS; prefer server components.
- No heavy animation libraries. Any motion must be subtle and justified.
- Follow `vercel-react-best-practices` when writing React.

---

# 7. QUALITY TOOLING

| Tool                | Purpose                                                            |
| ------------------- | ------------------------------------------------------------------ |
| TypeScript (strict) | Type safety                                                        |
| ESLint              | Lint correctness (Next.js defaults)                                |
| Prettier            | Formatting consistency                                             |
| Husky + lint-staged | Run checks before commit                                           |
| dependency-cruiser  | Enforce module boundaries (no deep imports past the content-layer) |

---

# 8. FORWARD-LOOKING (Business / Pro — NOT implemented now)

Recorded only so Standard does not block them. See `AGENTS.md` §5 (do not overbuild).

| Concern      | Likely choice (Business)                              |
| ------------ | ----------------------------------------------------- |
| Database     | Prisma + SQLite (local) → Postgres/Supabase (host)    |
| Auth         | Better-Auth                                           |
| Admin UI     | Route group `(admin)` + server actions                |
| Image upload | Local `/public/uploads` (dev) → object storage (prod) |
| Deploy       | Vercel (Standard can deploy here already)             |

The migration path: replace the implementation behind `lib/content/*` with DB queries.
UI and routes stay the same.

---

# 9. ENVIRONMENT

- OS: Windows (win32), shell: PowerShell 5.1.
- Node.js v24.16.0, npm 11.13.0.
- Git available; no Docker.
- Skills installed to `.agents/skills` (project) and `~/.config/opencode/skills` (global).

---

# 10. OPEN DECISIONS

- **Production domain / canonical URL** — `NEXT_PUBLIC_SITE_URL` left empty until the client
  confirms the real domain; SEO (canonical, sitemap, indexing) stays gated until then.
- **Contact completeness** — email (none confirmed → hidden) and full address (only partial
  "Yogyakarta" / "Jl. Betoro Raya No.1" found) still need client confirmation.
  See `CLIENT_DATA.md` for the full open-items list.
- **Trust data** — testimonials and client logos are empty arrays by design; they render only
  when real, permissioned data exists (STANDARD.md §18–§20).
- **Category assets** — PDH & PDL and Kaos still have no dedicated photo; the UI shows a neutral
  category tile rather than an unrelated product photo (STANDARD.md §12).
- **"Sejak 2012" claim** — sourced from the client's public Instagram bio, not client-confirmed;
  treat as RISK until verified (STANDARD.md §50).
