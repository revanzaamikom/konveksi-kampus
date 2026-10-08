# Git Story — KonveksiKampus

## Branch state
- Branch: `main`, HEAD `4ffab14` `redesign(impeccable): hero editorial + specimen plates + tipografi Anton/Instrument Sans`
- History: 9 commits, `079c557` → `4ffab14`
- Workdir kotor: 13 modified, 16 untracked, 0 staged. `git diff HEAD --stat`: 520+/206-.

## Intent aktif per commit
- `079c557 feat: fondasi Standard MVP`: Next.js 16 static export + TS + Tailwind v4; Home/Katalog/Detail/Kategori/Tentang/Kontak; content-layer `src/lib/content` atas raw `src/data` (11 produk, 7 kategori); 21 foto asli; SEO dasar; Prettier/ESLint/Husky/lint-staged/dependency-cruiser; PRD/TECH_SPEC/AGENTS/GLOSSARY/adr; funnel cloudflared+Netlify; 64 skill.
- `a25fe69 feat(deploy)`: preview permanen GitHub Pages + Netlify produksi; Actions build static; basePath/assetPrefix kondisional `GITHUB_PAGES=true`; `assetPath()` helper; `ProductImage` fill + prefix; `docs/DEPLOY.md`, `scripts/preview.ps1`, `scripts/deploy.ps1`.
- `6aba3e9 feat(brand)`: palet + kontak asli dari sumber publik; collector `tools/collect-client-info.mjs` (Firecrawl) + ekstraksi warna logo (Pillow); `CLIENT_DATA.md`; palet charcoal `#0e0e12` + merah `#e02030` + kuning `#f2b90c`; `lib/site.ts` WA/IG/alamat asli; `DESIGN.md` ganti tebakan dark industrial; lint-staged kecualikan `.agents`; 11 skill fashion.
- `68f504c feat(brand)`: logo client dari avatar publik via Linktree, arsip `assets/brand/source/`; `tools/prepare-brand-assets.py` crop/autocontrast/favicon+OG+lockup; `public/brand/` favicon set + `logo-256` + lockup + `og-image.jpg` 1200x630; `layout.tsx` icons + OG/Twitter; Navbar/Footer logo; `assetPath()` untuk Pages basePath.
- `583ccaf fix(seo)`: OG/icon root-relative bukan basePath; `metadataBase` handle domain; `assetPath()` hanya `<img src>`; fix double-path `/konveksi-kampus/brand/...`.
- `cb33eeb fix(data)`: `konveksikampus.com` HTTP 403 → tidak dipakai; `siteConfig.url` kosong sampai konfirmasi, `NEXT_PUBLIC_SITE_URL` env; robots Disallow saat tanpa domain; sitemap kosong; email kosong → baris tak render; alamat defensible saja; kontak utama WA+IG verified; `metadataBase` kondisional; `.env.example`.
- `ec88022 feat(home)`: foundation 12 section journey (hero, kategori, why-us, featured, portfolio, customization, material, proses, social proof, testimoni, FAQ, CTA); content model luas + adapter `lib/content/site-content.ts`; Sticky WA mobile + lead-qualification message; testimonial/client kosong → auto-hide; tipografi IBM Plex superfamily ganti Lexend/Source Sans, fluid clamp + mono spec; hero flat-lay asli 2.3MB→123KB webp + double-bezel + eyebrow mono; cek overflow 360/414/768.
- `663a0b3 fix(a11y/antislop)`: via `impeccable detect`; hapus eyebrow chip; merah teks dark `#e02030` 4.05:1 → token `--color-primary-text` `#ff6b75` 6.98:1; CTA hover putih-di-kuning 1.79:1 → `bg-primary-hover`; baris produk Title Case; tambah `PRODUCT.md` + `docs/IMPECCABLE-STATE.md`.
- `4ffab14 redesign(impeccable)`: arah `premium industrial specimen catalogue` (referensi Modevo komposisi, bukan aset); Anton display + Instrument Sans; hero headline editorial + 3 plate sejajar frame specimen; section dipadatkan whitespace luas; hapus card berbingkai → plate tipis + type besar; value kolom bersih; customization grid type besar; editorial statement; CTA akhir blok merah penuh; body padding-bottom anti-tutup footer; scroll reveal IO + reduced-motion; validasi `impeccable detect` + screenshot vision 3/10→8/10; `docs/DIRECTION-CONTRACT.md`.

## Decisions
- Static export; content-layer adapter, UI tak sentuh raw data langsung.
- Testimonial/client kosong, section auto-hide; tak karang data.
- Domain/robots/sitemap/metadataBase gated env; preview Disallow + sitemap kosong.
- basePath kondisional + `assetPath()`; `next/image` fill + prefix.
- Palet tetap milik client (logo); Modevo hanya komposisi.
- Tipografi: Lexend/Source Sans → IBM Plex → Anton + Instrument Sans.
- Hero: double-bezel flat-lay → 3 plate specimen → (uncommitted) 2-kolom collection overlap.
- Motion: IO, no scroll listener; progressive enhancement; reduced-motion final state.

## Rejected
- `konveksikampus.com` sebagai canonical (403, no live content).
- Tebakan awal dark industrial; tebakan domain/kontak/email belum verifikasi.
- `og:image` double-path via basePath.
- Eyebrow chip SaaS-default; merah `#e02030` sebagai teks dark; hover putih-di-kuning.
- Card berbingkai monoton; all-caps body.
- Harga/offers inventaris untuk rich snippet (`src/lib/seo.ts`, audit-seo).
- Dependensi SEO ekstra; pakai Metadata API native (`src/lib/seo.ts:1-9`).

## Constraints
- Palet client tetap: hitam `#000`, merah `#E02030`, kuning `#F2B90C`.
- Jangan indeks preview; jangan invent URL/harga/testimoni/klien.
- Kontras aksesibel; `:focus-visible`; reduced-motion wajib.
- No horizontal overflow 360/414/768; mobile padding-bottom untuk sticky WA.
- Transform/opacity + clip-path saja (GPU-safe); easing expo-out.

## Learned
- `impeccable detect` temukan chip/kontras/all-caps, bukan asumsi.
- Screenshot vision loop angkat skor 3/10→8/10.
- Flat-lay 2.3MB→123KB webp layak hero.
- `.agents` dikecualikan lint-staged.

## In-progress (uncommitted, belum sesi baru)
- Modified 13: `page.tsx` 192+/122- (hero 2-kolom collection, `Marquee`+`MaskReveal`+`Reveal`+`PortfolioGridRevealed`, `genPageMetadata`+`JsonLd` breadcrumb/FAQ); `globals.css` 130+/19- (skala Modevo H1 142/120% H2 96 H3 64 H4 48, body 24/18/16; motion mask/clip/marquee 38s + pause-hover + underline sweep; ease expo); `Reveal.tsx` 40+/18- (armed pattern, delay var, failsafe 2500ms, in-view langsung, reduced-motion); katalog/kategori/kontak/tentang + `CategoryGrid`/`LinkButton`/`ProductCard` + `layout.tsx` + `skills-lock.json`.
- Untracked 16: `.agents/audit-seo.md`, `.agents/audit-hero-motion.md`; skills `animation-forge`, `claude-landing-composer`, `conductor-motion`, `hero-generator`, `phase`, `premium-web-design`, `web-design-mastery`; `assets/brand/contoh.jpg`; `src/app/llms.txt/`; `JsonLd.tsx`, `Marquee.tsx`, `MaskReveal.tsx`, `PortfolioGridRevealed.tsx`; `src/lib/seo.ts` (gated canonical/OG, JSON-LD FAQ/breadcrumb/Product).
- Audit pending catat: import `PortfolioGrid` tak terpakai, `React.ReactNode` tanpa import, kartu abs `w-72+left-10` risiko 320px, token radius/duplikat CTA, dead CSS `text-body-*`/`link-underline`/`--ease-out-quint`, blok reduce tumpang tindih, marquee pause hover-only, `MaskReveal` rAF tanpa failsafe.
- SEO pending: nonaktif preview by-design (isi `NEXT_PUBLIC_SITE_URL` sebelum launch); JSON-LD breadcrumb `item` hilang + image relatif + tanpa `offers` → tak eligible rich snippet.
