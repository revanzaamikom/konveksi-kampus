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
| Framework       | **Next.js 15 (App Router) + TypeScript**                   | SSG for speed + SEO, built-in image optimization, natural path to Business admin |
| Styling         | **Tailwind CSS v4**                                        | CSS-first tokens (`@theme`), consistent with design skills                       |
| Components      | **shadcn/ui**                                              | Accessible, copy-in components (not a black-box dependency)                      |
| Data (Standard) | **TypeScript content files** + a **content-layer adapter** | Matches PRD §4 Standard ("content files"); no DB needed                          |
| Rendering       | **Static Generation (SSG)**                                | Catalog is fast and cheap to host                                                |
| Images          | **next/image**, files under `public/`                      | Automatic optimization, WebP                                                     |
| Contact CTA     | **WhatsApp deep-link**                                     | Per PRD; no backend needed                                                       |
| Language        | **Bahasa Indonesia**                                       | Target audience is local students & institutions                                 |
| Package mgr     | **npm** (available on this machine)                        | Keep it simple                                                                   |

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
├── GLOSSARY.md                    ← domain vocabulary
├── skills-lock.json               ← installed skills lockfile
├── .agents/skills/                ← installed agent skills
├── docs/
│   └── adr/                       ← architecture decision records
├── public/
│   └── images/products/           ← product photos (from client assets)
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx               ← Home
    │   ├── katalog/               ← Catalog (+ filter/search)
    │   │   ├── page.tsx
    │   │   └── [slug]/page.tsx     ← Product detail
    │   ├── kategori/[slug]/page.tsx
    │   ├── tentang/page.tsx
    │   ├── kontak/page.tsx
    │   ├── sitemap.ts
    │   └── robots.ts
    ├── components/
    │   ├── ui/                     ← shadcn/ui primitives + design-system base
    │   └── sections/               ← composed page sections (Hero, ProductGrid, CTA…)
    ├── lib/
    │   ├── content/                ← CONTENT-LAYER (the adapter)
    │   │   ├── types.ts            ← Product, Category types
    │   │   ├── products.ts         ← getProducts, getProductBySlug…
    │   │   └── categories.ts       ← getCategories, getCategoryBySlug…
    │   ├── site.ts                 ← site config (name, contact, WhatsApp)
    │   └── seo.ts                  ← metadata helpers
    └── data/
        ├── products.ts             ← raw product records (Standard)
        └── categories.ts           ← raw category records (Standard)
```

---

# 4. DATA MODEL (Standard)

Field names follow `AGENTS.md` §11 and PRD §4 Business, so the model does not need to change
when the admin phase arrives. Standard only _uses_ a subset; the type may define more.

```ts
// src/lib/content/types.ts
export type ProductStatus = "draft" | "published";

export interface ProductImage {
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
  images: ProductImage[]; // first image = cover
  material?: string; // optional, only if known
  variants?: ProductVariant[]; // optional, only if known
  status: ProductStatus;
  featured?: boolean; // for homepage "produk unggulan"
  order?: number; // manual sort
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  order: number;
}
```

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
- `sitemap.ts` and `robots.ts`.
- OpenGraph basics.
- Structured data (JSON-LD): `Organization`/`LocalBusiness` site-wide; `Product` on detail pages.
  Kept minimal — no complex SEO infrastructure (per `AGENTS.md` §13).

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

- **Visual direction / brand colors / typography** — pending client reference material.
- **WhatsApp number & contact details** — pending client input (`lib/site.ts` placeholder).
- **Real product data mapping** — pending approval of the ~12-product grouping derived from the
  21 client photos.
