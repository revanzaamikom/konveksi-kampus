# KonveksiKampus

Website katalog produk untuk KonveksiKampus — vendor konveksi untuk mahasiswa, organisasi
kampus, dan masyarakat umum.

Current phase: **Standard** (public catalog). See `PRD.md` for the package roadmap
(Standard → Business → Pro).

## Documents

| File             | Purpose                                                 |
| ---------------- | ------------------------------------------------------- |
| `PRD.md`         | Product source of truth (requirements, tiers, scope)    |
| `TECH_SPEC.md`   | Stack, architecture, data model, tooling                |
| `AGENTS.md`      | Rules for AI coding agents working on this repo         |
| `GLOSSARY.md`    | Domain + technical vocabulary                           |
| `docs/adr/`      | Architecture decision records                           |
| `docs/DEPLOY.md` | Preview (cloudflared) & production (Netlify) deployment |

## Stack

Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · npm

## Getting started

```powershell
npm install
npm run dev            # http://localhost:3000
```

## Scripts

| Script              | Description                            |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Dev server                             |
| `npm run build`     | Static export to `out/`                |
| `npm run preview`   | Serve the exported `out/` on port 3000 |
| `npm run typecheck` | `tsc --noEmit`                         |
| `npm run lint`      | ESLint                                 |
| `npm run format`    | Prettier write                         |
| `npm run depcruise` | Enforce module boundaries              |

## Architecture (key rule)

The public UI reads catalog data **only** through `src/lib/content/*` (the content-layer).
Raw data lives in `src/data/*`. This boundary is enforced by `dependency-cruiser`
(see `docs/adr/ADR-002-content-layer.md`) and is the single swap point for the future
Business phase (files → database) without touching the UI.

## Preview & deploy

- Preview to client: `cloudflared tunnel --url http://localhost:3000`
- Production: Netlify (static export from `out/`)

See `docs/DEPLOY.md`.

## Notes

- `src/lib/site.ts` contains **placeholders** for WhatsApp number, email, address, and domain.
  Replace them before a client-facing deploy. They are intentionally obvious and are not invented.
- Product photos in `public/images/products/` are the client's own product assets.
