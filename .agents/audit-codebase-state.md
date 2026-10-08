# Audit codebase state — KonveksiKampus (2026-10-08, src tak diubah)

## Struktur src
- `src/app`: `layout.tsx`, `page.tsx`, `globals.css`, `sitemap.ts`, `robots.ts`, `katalog/page.tsx`, `katalog/[slug]/page.tsx`, `kategori/[slug]/page.tsx`, `kontak/page.tsx`, `tentang/page.tsx`, `llms.txt/route.ts`
- `src/components` (17): `CategoryGrid`, `FaqList`, `Footer`, `JsonLd`, `LinkButton`, `Marquee`, `MaskReveal`, `MaterialsList`, `Navbar`, `PortfolioGrid`, `PortfolioGridRevealed`, `ProcessList`, `ProductCard`, `ProductImage`, `Reveal`, `Section`, `StickyWhatsApp`
- `src/lib`: `site.ts`, `seo.ts`, `content/{types,categories,products,site-content}.ts`
- `src/data` (8): `products.ts`, `categories.ts`, `portfolio.ts`, `faq.ts`, `materials.ts`, `process.ts`, `clients.ts`, `testimonials.ts`

## File baru pending (untracked, belum commit)
- `src/app/llms.txt/route.ts`, `src/components/JsonLd.tsx`, `src/components/Marquee.tsx`, `src/components/MaskReveal.tsx`, `src/components/PortfolioGridRevealed.tsx`, `src/lib/seo.ts`
- Modified (13): `skills-lock.json`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/{katalog,katalog/[slug],kategori/[slug],kontak,tentang}/page.tsx`, `src/components/{CategoryGrid,LinkButton,ProductCard,Reveal}.tsx`
- Non-src untracked: `.agents/audit-hero-motion.md`, `.agents/audit-seo.md`, `.agents/skills/{animation-forge,claude-landing-composer,conductor-motion,hero-generator,phase,premium-web-design,web-design-mastery}/`, `assets/brand/contoh.jpg`

## Lint / typecheck (status kini)
- `npm run typecheck` (`tsc --noEmit`): bersih, 0 error
- `npx eslint src`: 1 error, 0 warning — `src/components/MaskReveal.tsx:15` `react-hooks/set-state-in-effect` (`setPhase("armed")` sinkron di effect)
- Fixed vs audit-hero-motion: `src/app/page.tsx:11` kini hanya import `PortfolioGridRevealed` (warning unused `PortfolioGrid` hilang); `src/app/layout.tsx:2,69` sudah `import type { ReactNode }` (isu `React.ReactNode` hilang)
- Sisa audit-hero-motion masih pending: overflow kartu `page.tsx:115`, radius duplikat `page.tsx:148` vs `LinkButton.tsx:7`, dead CSS `globals.css:125-138,171`, reduce dobel `globals.css:148-161+262-283`, focus radius `globals.css:141-145`, marquee pause `Marquee.tsx:10-16`
- Sisa audit-seo masih pending: canonical/robots/sitemap gated preview (`src/lib/site.ts:52-53`, `src/app/layout.tsx:33`, `src/lib/seo.ts:57-59`); JSON-LD degradasi preview (`src/lib/seo.ts:117`, `src/app/katalog/[slug]/page.tsx:43`)

## Duplikasi PortfolioGrid vs Revealed
- `src/components/PortfolioGrid.tsx:8-46` tak terpakai (grep: hanya definisi; `src/app/page.tsx:11,252` pakai `PortfolioGridRevealed`)
- Meta/teks identik: `PortfolioGrid.tsx:23-40` ≈ `PortfolioGridRevealed.tsx:30-47` (productType/title/clientCategory/customization)
- Beda: wrapper `Reveal clip delay` (`Revealed:20`), offset kolom `Revealed:14,19`, grid `gap-y-10` vs `gap-y-12`, thumb `aspect-[4/5] rounded-[2px]` (`PortfolioGrid.tsx:15`) vs `aspect-[3/4] rounded-[20px]` + hover scale (`Revealed:21-27`)
- Aksi: hapus `PortfolioGrid.tsx` atau jadikan varian non-client; satukan radius/aspect ke token

## Aset
- `public/brand` (13): favicon set (`favicon*.png`, `favicon.ico`, `apple-touch-icon.png`, `icon-192/512.png`), `logo-256.png`, `logo-lockup.png`, `og-image.jpg`, `hero-flatlay.{jpg,webp}`, `hero-flatlay-880.webp`
- `public/images/products` (42): tiap produk `.png` + `.webp` (front/back/variant); `jas-almamater`, `jacket-*`, `korsa-*`, `kaos-*`, `polo-*`, `hoodie-*`, `crewneck-*`, `jersey-*`
- `assets/brand/contoh.jpg` untracked (contoh di luar `public/`)

## Scripts package.json
- `dev/next dev`, `build/next build`, `start/next start`, `preview/serve out`, `lint/eslint`, `typecheck/tsc --noEmit`, `format/format:check/prettier`, `depcruise`, `prepare/husky`
