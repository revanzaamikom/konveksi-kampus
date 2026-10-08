# Audit Konteks Docs — KonveksiKampus

Tanggal: 2026-10-08. Scope: docs saja, `src/` tidak diubah.

## 1. Tujuan produk
- Digital storefront + katalog + kanal inquiry, bukan info statis saja — `PRD.md:16-24`, `PRD.md:38-41`, `PRODUCT.md:20-25`
- Prioritas: produk mudah ditemukan, mudah dipahami, brand profesional, inquiry mudah, codebase maintainable — `PRD.md:43-50`
- Prinsip: `Simple for customer. Simple for admin. Scalable for business.` — `PRD.md:285-297`
- Evolusi: Standard katalog profesional → Business katalog terkelola → Pro sales/inquiry platform → Future configurator/commerce — `PRD.md:379-386`, `AGENTS.md:30-41`
- Job utama: bangun trust, jelaskan produk/proses cepat, tunjukkan bukti produksi nyata, arahkan ke konsultasi WhatsApp qualified — `PRODUCT.md:20-25`, `PRODUCT.md:67-73`
- Bahasa: Indonesia — `TECH_SPEC.md:12-24`
- Konsumen: jurusan/himpunan, ormawa, komunitas, perusahaan; order custom made-to-order, bukan checkout — `PRODUCT.md:9-18`, `PRODUCT.md:33-39`

## 2. Scope MVP Standard
- Target: MSME / konveksi baru / katalog kecil; murah, simpel — `PRD.md:88-99`
- Rute: Home, About (`tentang`), Contact (`kontak`), Katalog, Kategori, Detail produk — `PRD.md:102-112`, `PRD.md:213-215`, `TECH_SPEC.md:53-92`
- Fitur: katalog statis via content files, kategori, basic search/filter, responsive, basic SEO, CTA WhatsApp — `PRD.md:114-116`, `PRD.md:189-203`, `TECH_SPEC.md:12-24`
- MVP wajib: homepage profesional, katalog, browsing kategori, detail, CTA kontak, mobile, SEO dasar, loading cepat, UI bersih — `PRD.md:245-260`
- Arsitektur: UI (`app/`, `components/`) hanya import dari `lib/content/*`, tidak sentuh `src/data/*` langsung — `TECH_SPEC.md:30-49`, `README.md:43-48`, `docs/adr/ADR-002-content-layer.md:13-26`
- Interface stabil: `getCategories`, `getCategoryBySlug`, `getProducts({category,q,featured})`, `getProductBySlug`; hanya `status:"published"` ke publik — `TECH_SPEC.md:141-150`
- Model: `Product{id,slug,name,categorySlug,description,images,status,featured,order,...}`, `Category{id,slug,name,order,...}` — `TECH_SPEC.md:96-139`, `AGENTS.md:106-117`
- No admin dashboard di Standard; struktur data jangan persulit migrasi Business — `PRD.md:118-124`, `PRD.md:262-263`
- Stack locked: Next.js 15 App Router + TS strict, Tailwind v4, shadcn/ui, SSG, `next/image` di `public/`, npm — `TECH_SPEC.md:12-26`, `docs/adr/ADR-001-stack.md:14-21` (catatan: `README.md:22` tulis Next.js 16 — divergen dari TECH_SPEC/ADR, perlu klarifikasi)
- Kualitas: ESLint, Prettier, Husky+lint-staged, dependency-cruiser enforce boundary — `TECH_SPEC.md:177-186`

## 3. Non-goals (jangan implementasi tanpa permintaan eksplisit)
- Payment, checkout e-commerce, akun customer, ERP, inventory, production management — `PRD.md:267-282`, `AGENTS.md:60-73`
- Auth, admin dashboard, DB, CMS kompleks, analytics kompleks, AI rekomendasi, integrasi third-party tak perlu — `AGENTS.md:60-73`, `TECH_SPEC.md:189-202`
- Product configurator = modul terpisah, future Pro/custom saja — `PRD.md:172-175`, `PRD.md:201-203`
- Animasi tak perlu, dekorasi tak dukung goal bisnis — `PRD.md:267-282`
- Jangan over-engineer Standard demi future; fondasi bersih saja — `PRD.md:231-242`, `AGENTS.md:124-133`

## 4. Arah desain
- Direction: Flat + Minimalism & Swiss Style, catalog/listing, product-first — `DESIGN.md:19-20`
- Dials: Variance 4/10, Motion 3/10 (hover/opacity 150-200ms saja), Density 5/10 — `DESIGN.md:22-28`, `DESIGN.md:82-89`
- Palet dari logo client (bukan default): charcoal `#0E0E12`, red `#E02030` (satu-satunya CTA), yellow `#F2B90C` (aksen tunggal: filter aktif/focus/link), card `#16161C`, border `#2A2A34` — `DESIGN.md:30-57`, `CLIENT_DATA.md:38-54`, `PRODUCT.md:55-57`
- Larangan: no gradient/glow/glass/shadow dekoratif, radius kecil tetap (button/input 6px, card 10px), no pill sembarangan, no emoji dekoratif, no data palsu — `DESIGN.md:82-89`, `DESIGN.md:91-100`
- Tipografi: IBM Plex superfamily — Condensed 600 display h1-h2, Sans 500-600 h3+/UI, Sans 400 body 16px/1.5, Mono 400-500 spek/angka; fluid `clamp()` headline — `DESIGN.md:59-80` (konflik: `DIRECTION-CONTRACT.md:22-26` pakai Anton + Instrument Sans untuk home redesign Modevo — pending keputusan final)
- Home redesign pinned ke Modevo (`modevo-fashion.webflow.io`), thesis `Premium industrial specimen catalogue`, specimen di atas ground charcoal, tanpa card-grid marketplace — `docs/DIRECTION-CONTRACT.md:1-18`, `docs/DIRECTION-CONTRACT.md:28-43`
- Layout katalog = Filter-Heavy Grid, chip wrap tidak terpotong, breakpoint 375/768/1024/1440, no horizontal scroll — `DESIGN.md:91-100`
- Aksesibilitas floor: kontras ≥4.5:1, focus ring aksen visible, touch ≥44px, tiap image `alt` bermakna, semantic + satu `<h1>`/page, hormati `prefers-reduced-motion` — `DESIGN.md:102-108`, `PRODUCT.md:75-78`
- Checklist: no hex ad-hoc, no dead link, keyboard-only jalan — `DESIGN.md:111-117`

## 5. Data client: terverifikasi vs belum
- Terverifikasi (jangan ubah/karang sekitarnya):
  - Nama display `KonveksiKampus` / `Konveksi Kampus`, handle `konveksikampus.yk`, tagline `Vendor Konveksi Yogyakarta`, est. 2012 — `CLIENT_DATA.md:16-24`, `PRD.md:332-334`, `PRODUCT.md:53-57`
  - About PDF p.2 + Visi/Misi — verbatim di `PRD.md:335-351`
  - Aset nyata: 42 file = 21 foto (`.png`+`.webp`): korsa, jacket lapangan, varsity, workshirt, kaos kerah bordir, rompi bordir, jas lab, almamater, wearpack + hero flatlay + logo — `PRD.md:353-355`, `PRODUCT.md:59-65`
  - Kanal: IG `instagram.com/konveksikampus.yk`, Linktree `linktr.ee/konveksikampus.yk` — `CLIENT_DATA.md:6-14`
  - WhatsApp paling reliabel `+62 882-2172-9053` (`wa.me/6288221729053`) dari Linktree — `CLIENT_DATA.md:26-33`
- Belum terverifikasi (jangan fabricate, pakai empty-state/degradasi):
  - WA alt `0813-6702-9003` (FB lama), alamat parsial `Jl. Betoro Raya No.1` (FB lama) — `CLIENT_DATA.md:26-33`
  - Email resmi: tidak ada — jangan render baris email — `CLIENT_DATA.md:64-82`, `PRODUCT.md:45-49`
  - Harga, MOQ, lead time, testimoni, logo klien, spek material — kosongkan sampai client supply — `PRODUCT.md:45-49`, `PRODUCT.md:59-65`, `TECH_SPEC.md:216-220`
  - Domain `konveksikampus.com` klaim FB lama tapi HTTP 403, bukan canonical — `CLIENT_DATA.md:26-33`, `CLIENT_DATA.md:69-71`, `PRODUCT.md:45-49`
  - Logo `AH` = personal owner (Alex Hutagaor); cek hak pakai — `CLIENT_DATA.md:38-42`, `CLIENT_DATA.md:64-72`
  - Alamat tampil `Yogyakarta` saja sampai alamat penuh konfirmasi — `CLIENT_DATA.md:74-82`
  - Nomor WA primer masih pilih satu dari dua kandidat — `CLIENT_DATA.md:35-36`, `CLIENT_DATA.md:64-66`

## 6. Constraint deploy / SEO / domain
- Dua funnel: preview permanen GitHub Pages `revanzaamikom.github.io/konveksi-kampus/` (auto push `main`), produksi Netlify static `out/` ke domain client — `docs/DEPLOY.md:1-11`, `README.md:50-57`
- Pages subpath: `GITHUB_PAGES=true` → `basePath/assetPrefix=/konveksi-kampus`, image via `assetPath()` karena `next/image unoptimized` abaikan basePath — `docs/DEPLOY.md:26-38`
- Netlify: `command=npm run build`, `publish=out`, Node 24, header cache `images/*` immutable + `nosniff/SAMEORIGIN/referrer` — `netlify.toml:6-24`, `docs/DEPLOY.md:50-69`
- SEO Standard: per-page metadata, semantic + satu h1, URL deskriptif (`/katalog`, `/katalog/[slug]`, `/kategori/[slug]`), alt, `sitemap.ts`+`robots.ts`, OG dasar, JSON-LD minimal `Organization/LocalBusiness` + `Product` — `TECH_SPEC.md:154-163`
- Domain gate: `NEXT_PUBLIC_SITE_URL` kosong → tanpa canonical, `robots.txt` disallow indexing, sitemap kosong, `og:image` ke build host; isi hanya setelah domain konfirmasi — `.env.example:1-13`, `CLIENT_DATA.md:69-71`, `CLIENT_DATA.md:74-82`
- Checklist deploy: ganti placeholder `src/lib/site.ts` (WA/email/alamat/domain), `build`+`typecheck` hijau, cek `out/index.html` + satu product page — `docs/DEPLOY.md:91-96`, `README.md:59-62`
- Env: Windows win32 PS5.1, Node 24.16.0 npm 11.13.0, no Docker, hanya npm terinstal — `TECH_SPEC.md:206-211`
- Divergensi catat: `README` Next.js 16 vs `TECH_SPEC`/ADR Next 15; `DESIGN` IBM Plex vs `DIRECTION-CONTRACT` Anton/Instrument; `PRODUCT` static export vs `TECH_SPEC` SSG + Business server actions — putuskan sebelum build besar.
