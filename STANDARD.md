# KonveksiKampus — Standard Website Audit & Quality Baseline

> **Document Type:** Master Website Quality Baseline
> **Project:** KonveksiKampus
> **Primary Use:** Development standard, QA standard, content standard, conversion standard, and AI/OpenCode implementation reference.
> **Status:** Active
> **Scope:** Standard Website
> **Last Updated:** 2026-10-08

---

# 1. PURPOSE

Dokumen ini adalah **standar utama** untuk pengembangan website KonveksiKampus.

Dokumen ini digunakan sebagai acuan oleh:

- Developer
- Designer
- Content creator
- AI coding agent / OpenCode
- Project owner

Tujuan utamanya bukan membuat website dengan sebanyak mungkin fitur.

Tujuan utamanya adalah membuat website yang:

1. terlihat profesional,
2. mudah digunakan,
3. mampu menampilkan produk dengan jelas,
4. membangun kepercayaan,
5. menjelaskan layanan custom,
6. menjawab keraguan calon customer,
7. dan memberikan jalur paling mudah menuju konsultasi WhatsApp.

---

# 2. CORE POSITIONING

KonveksiKampus **bukan e-commerce penuh**.

Konsep utamanya:

> **Digital storefront + product catalog + trust builder + lead generator**

Website harus membantu user melalui alur:

```text
Masuk website
↓
Memahami bisnis
↓
Melihat produk
↓
Memahami kemampuan custom
↓
Melihat bukti produksi
↓
Mendapatkan kepercayaan
↓
Memahami proses order
↓
Menghubungi WhatsApp
```

Primary business goal:

> Visitor menemukan produk yang relevan, percaya bahwa KonveksiKampus mampu mengerjakannya, memahami proses custom, kemudian melakukan konsultasi.

---

# 3. CORE PRINCIPLES

Semua keputusan development harus mengikuti prioritas:

```text
Business Value
>
UX
>
Conversion
>
Content Clarity
>
Performance
>
Visual Polish
```

Visual yang bagus tetapi menghambat conversion bukan prioritas.

Feature yang terlihat keren tetapi tidak membantu customer bukan prioritas.

More sections ≠ better website.

More animations ≠ better website.

More features ≠ better product.

---

# 4. NON-NEGOTIABLE RULES

## 4.1 Never Fabricate Data

Jangan pernah membuat atau mengasumsikan:

- harga,
- MOQ,
- estimasi produksi,
- alamat,
- email,
- jumlah client,
- jumlah pesanan,
- jumlah tahun pengalaman,
- rating,
- testimonial,
- client logo,
- sertifikasi,
- penghargaan,
- material,
- technical specification,
- guarantee,
- shipping claim,
- quality claim,
- production claim,
- atau business claim lainnya

jika belum diberikan atau diverifikasi.

Jika data belum tersedia:

```text
Do not invent it.
Do not guess it.
Do not present assumptions as facts.
```

Gunakan:

- conditional rendering,
- empty state,
- "hubungi kami untuk informasi",
- atau tandai sebagai content dependency.

---

# 5. STANDARD SCOPE

## 5.1 Standard Website Includes

Standard website dapat mencakup:

- Homepage
- Catalog
- Category pages
- Product detail
- About
- Contact
- FAQ
- Production/process information
- Customization information
- Basic SEO
- WhatsApp conversion
- Responsive design
- Product gallery
- Portfolio
- Trust/social proof apabila data tersedia

---

# 6. STANDARD WEBSITE MUST NOT BECOME BUSINESS/PRO WITHOUT REQUEST

Jangan melakukan scope creep ke:

- Authentication
- Login
- Admin dashboard
- Database
- CRUD CMS
- Inventory management
- Order management
- Customer account
- Payment gateway
- Cart
- Checkout
- ERP
- Complex CMS
- AI recommendation system
- Product configurator
- Complex analytics
- Complex backend
- Complex customer management

kecuali secara eksplisit diminta.

Business dan Pro merupakan upgrade/upsell terpisah.

---

# 7. HOMEPAGE STANDARD

Recommended homepage structure:

```text
01 Hero
02 Product / Category Visual Strip
03 Product Categories
04 Why KonveksiKampus
05 Featured Products
06 Production Portfolio
07 Cocok Untuk
08 Customization
09 Materials
10 Ordering Process
11 Clients
12 Testimonials
13 FAQ
14 Final WhatsApp CTA
```

Tidak semua section wajib dipaksakan jika datanya belum tersedia.

---

# 8. HERO STANDARD

Hero harus menjawab:

1. Apa yang dilakukan bisnis?
2. Siapa target customer?
3. Apa tindakan berikutnya?

Minimum:

- Clear headline
- Supporting copy
- Primary CTA
- Secondary CTA

Primary CTA:

> Konsultasi via WhatsApp

Secondary CTA:

> Lihat Katalog

Hero harus langsung menjelaskan value bisnis.

Hindari headline generik seperti:

> "Solusi Terbaik untuk Kebutuhan Anda"

jika tidak menjelaskan bisnis.

---

# 9. PRODUCT CATALOG

Catalog adalah salah satu bagian paling penting dari website.

Recommended categories:

- Semua
- PDH & PDL
- Jaket
- Korsa
- Workshirt
- Wearpack
- Polo
- Kaos
- Almamater
- Rompi
- Jas Lab

Category dapat berkembang berdasarkan produk nyata client.

---

# 10. PRODUCT CARD

Minimum product card:

- Product image
- Product name
- Short description
- View detail CTA

Optional:

- Category
- Material
- Variant
- Custom indicator

Jangan menampilkan:

- harga palsu,
- MOQ palsu,
- rating palsu,
- stock,
- fake badge,
- fake popularity,
- fake sales count.

---

# 11. CATEGORY PAGE

Category page minimum:

- Breadcrumb
- H1
- Category description
- Audience/use case
- Category navigation
- Product grid
- Empty state jika belum ada produk

Category page tidak boleh hanya berupa grid kosong.

Example empty state:

> Belum ada produk yang ditampilkan dalam kategori ini.
> Punya kebutuhan custom? Konsultasikan model yang Anda inginkan melalui WhatsApp.

CTA:

> Konsultasi via WhatsApp

---

# 12. CATEGORY IMAGE RULE

Jangan menggunakan gambar produk yang tidak sesuai sebagai fallback permanen.

Contoh:

PDH category harus menggunakan:

- foto PDH,
- visual PDH,
- atau neutral category visual.

Jangan menggunakan foto jaket untuk merepresentasikan PDH hanya karena asset tersedia.

Jika tidak ada asset:

> gunakan neutral category tile.

Jangan fabricate product imagery.

---

# 13. PRODUCT DETAIL

Product detail minimum:

- Breadcrumb
- Product gallery
- Product name
- Category
- Description
- Customization
- Materials jika tersedia
- Colors jika tersedia
- Sizes jika tersedia
- Variants jika tersedia
- MOQ jika tersedia
- Lead time jika tersedia
- Price jika tersedia
- Quotation note
- WhatsApp CTA

Optional fields harus conditional.

Jangan menampilkan:

```text
Bahan: -
MOQ: -
Produksi: -
Harga: -
```

jika data belum tersedia.

---

# 14. PRODUCT-SPECIFIC WHATSAPP

CTA product harus dapat membawa context.

Recommended message:

```text
Halo Konveksi Kampus, saya tertarik dengan [NAMA PRODUK].

Jenis produk:
Jumlah:
Deadline:
Desain/referensi:
```

Generic CTA:

```text
Halo Konveksi Kampus, saya ingin konsultasi pembuatan apparel custom.
```

WhatsApp number harus berasal dari centralized configuration.

---

# 15. MATERIALS

Jangan mengarang:

- GSM
- thickness
- heat resistance
- waterproof
- durability
- softness
- technical characteristics

kecuali benar-benar diberikan atau diverifikasi.

Jika material tersedia, struktur ideal:

```text
Material
↓
Character
↓
Suitable For
↓
Typical Use
```

Dedicated materials page tidak wajib pada Standard.

---

# 16. CUSTOMIZATION

Website harus menjelaskan kemampuan custom yang benar-benar tersedia.

Potential options:

- Custom design
- Custom color
- Custom material
- Custom size
- Embroidery
- Screen printing
- Printing
- Label
- Packaging

Hanya tampilkan yang sudah dikonfirmasi.

---

# 17. ORDERING PROCESS

Recommended structure:

```text
01 Konsultasi
↓
02 Tentukan Spesifikasi
↓
03 Finalisasi Desain
↓
04 Produksi
↓
05 Quality Control
↓
06 Pengiriman
```

Tujuan section ini adalah:

> mengurangi ketidakpastian customer.

Jangan menjadikan section ini sebagai SOP teknis yang terlalu panjang.

Proses harus disesuaikan dengan proses bisnis sebenarnya.

---

# 18. TRUST / SOCIAL PROOF

Trust adalah salah satu area paling penting.

Ideal trust chain:

```text
Hasil Produksi
↓
Dipercaya Oleh
↓
Testimoni
↓
CTA
```

Potential trust assets:

- Real client
- Real institution
- Real logo
- Real portfolio
- Real testimonial
- Real production photo
- Real workshop photo
- Real team photo
- Verified certification

Semua harus benar-benar berasal dari client/business.

Never fabricate.

---

# 19. CLIENT LOGO RULE

Client logo hanya boleh ditampilkan jika:

1. benar-benar pernah menjadi client,
2. asset tersedia,
3. dan penggunaannya diperbolehkan.

Jangan membuat section:

> "Dipercaya oleh 100+ kampus"

tanpa data yang terverifikasi.

---

# 20. TESTIMONIAL RULE

Testimonial harus berasal dari:

- customer nyata,
- dengan quote nyata,
- dan identitas yang dapat dipublikasikan.

Ideal format:

```text
Quote
↓
Nama
↓
Jabatan / Organisasi
```

Jangan membuat testimonial generik dengan nama fiktif.

---

# 21. ABOUT PAGE

About harus menjelaskan:

- Who we are
- What we do
- Who we serve
- What needs we handle
- Business values
- Relevant experience

Optional:

- Verified location
- Year founded
- Workshop
- Team
- Production photos

Jangan mengarang company history.

---

# 22. CONTACT PAGE

Recommended information:

- WhatsApp
- Instagram
- Address
- Email
- Operating hours
- CTA

Data harus diverifikasi sebelum production.

---

# 23. NAVBAR

Current simple navigation is sufficient:

```text
Logo | Katalog | Tentang | Kontak
```

Optional desktop:

> WhatsApp CTA

Jangan menambahkan terlalu banyak menu hanya karena tersedia.

---

# 24. STICKY WHATSAPP

Sticky WhatsApp merupakan fitur conversion penting.

Requirement:

- Fixed position
- Easy to tap
- Mobile-friendly
- Tidak menutupi content penting
- Clear CTA
- Contextual message jika memungkinkan

---

# 25. FOOTER

Recommended:

- Brand
- Short description
- Navigation
- Instagram
- WhatsApp
- Location
- Email
- Operating hours

Tidak perlu:

- Newsletter
- Login
- Social wall
- Huge sitemap
- Excessive links

---

# 26. MOBILE STANDARD

Minimum test widths:

```text
360
375
390
414
768
1024
1280+
```

Check:

- Horizontal overflow
- Hero wrapping
- Image cropping
- Product cards
- Category chips
- Sticky CTA
- Navbar
- Footer
- Breadcrumb
- Product detail
- Touch targets
- Typography
- Section spacing

Jangan menyelesaikan layout bug hanya dengan:

```css
overflow: hidden;
```

jika sebenarnya ada element yang overflow.

---

# 27. ACCESSIBILITY

Minimum:

- Semantic HTML
- One H1 per page
- Correct heading hierarchy
- Alt text
- Keyboard navigation
- Visible focus state
- Good contrast
- Touch target sekitar 44px
- aria-label jika diperlukan
- Reduced motion support

Animation tidak boleh menjadi satu-satunya cara memahami informasi.

---

# 28. ANIMATION STANDARD

Animation boleh digunakan untuk:

- Reveal
- Mask reveal
- Parallax
- Scrub
- Marquee
- Magnetic interaction

Tetapi animation harus membantu:

- hierarchy,
- storytelling,
- product presentation,
- visual rhythm.

Hindari:

- Cursor effects berlebihan
- 3D background
- Particles
- Excessive page transitions
- Scroll hijacking
- Animation yang mengganggu CTA

Jika mobile performance turun:

> Reduce animation.

---

# 29. PERFORMANCE

Priority:

```text
Real images
↓
Compress
↓
Correct dimensions
↓
Lazy load
↓
Minimal JS
```

Hero/LCP image dapat diprioritaskan.

Jangan memprioritaskan seluruh gambar below-the-fold.

Jangan menambahkan library hanya untuk animation kecil.

---

# 30. SEO STANDARD

Production website harus memiliki:

- Page title
- Meta description
- Canonical
- Open Graph
- Twitter metadata
- Sitemap
- Robots
- Breadcrumb JSON-LD
- FAQ JSON-LD
- Product JSON-LD

Potential:

- Organization schema
- LocalBusiness schema

Tetapi hanya jika business information sudah diverifikasi.

---

# 31. PRODUCTION URL

Production harus menggunakan real domain.

Example:

```text
NEXT_PUBLIC_SITE_URL=https://example.com
```

Jangan menggunakan preview/staging URL sebagai canonical production.

Preview/staging dapat menggunakan noindex jika diperlukan.

---

# 32. DATA / CONTENT ARCHITECTURE

Recommended architecture:

```text
UI
↓
lib/content/*
↓
src/data/*
```

UI tidak seharusnya langsung bergantung pada raw data jika content abstraction sudah tersedia.

Tujuan:

> memudahkan Standard → Business CMS migration.

---

# 33. DESIGN SYSTEM

Reusable components:

- Navbar
- Footer
- Button
- ProductCard
- ProductImage
- Section
- Reveal
- CTA
- Breadcrumb
- Category navigation

Jangan membuat component baru hanya untuk perubahan kecil.

Jangan mengubah visual language secara radikal antar halaman.

---

# 34. DESIGN DIRECTION

Target visual:

> Modern + Clean + Editorial + Professional + Product-focused + Premium + Trustworthy

Avoid:

- Generic template appearance
- Excessive gradients
- Too many cards
- Excessive shadows
- Excessive glassmorphism
- Excessive animation
- Huge decorative illustration
- Fake statistics
- Stock photography sebagai primary proof
- Fake client logos

Product photography adalah visual priority.

---

# 35. CONVERSION STANDARD

Setiap important page harus memiliki path menuju WhatsApp.

```text
Homepage
Hero → WhatsApp
Product → Detail → WhatsApp
Final CTA → WhatsApp

Catalog
Product → Detail → WhatsApp

Category
Product → Detail → WhatsApp

Product Detail
Information → WhatsApp

About
Trust → WhatsApp

Contact
Contact → WhatsApp
```

Tidak boleh ada dead-end page.

---

# 36. WHATSAPP STANDARD

WhatsApp harus:

- menggunakan central number,
- membuka WhatsApp,
- memiliki prefilled message,
- contextual jika memungkinkan.

Generic:

```text
Halo Konveksi Kampus, saya ingin konsultasi pembuatan apparel custom.
```

Product-specific:

```text
Halo Konveksi Kampus, saya tertarik dengan [NAMA PRODUK].

Jenis produk:
Jumlah:
Deadline:
Desain/referensi:
```

---

# 37. CLIENT DATA INTAKE STANDARD

Client data harus dikumpulkan secara terstruktur sebelum final production.

Recommended intake:

```text
A — Identitas Usaha
B — Produk & Layanan
C — Customisasi
D — Portfolio & Dokumentasi
E — Trust / Kredibilitas
F — FAQ & Proses Order
G — Brand & Asset
H — Persetujuan Publikasi
```

Workflow yang direkomendasikan:

```text
Negotiation
↓
Deal
↓
Client Data Intake
↓
Data Review
↓
Content Confirmation
↓
Development
↓
QA
↓
Production
```

Google Forms + Google Sheets dapat digunakan sebagai workflow internal/client onboarding.

Client intake **bukan bagian wajib dari website Standard** dan tidak mengubah Standard menjadi Business/Pro.

---

# 38. CLIENT DATA INTAKE — A

## Identitas Usaha

Collect:

- Nama usaha
- Nama brand
- Nama yang ditampilkan
- Tagline
- Deskripsi bisnis
- Tahun berdiri jika ingin ditampilkan
- Alamat
- WhatsApp
- Instagram
- Email
- Jam operasional

---

# 39. CLIENT DATA INTAKE — B

## Produk & Layanan

Collect:

- Produk yang tersedia
- Produk unggulan
- Material
- Warna
- Ukuran
- MOQ
- Estimasi produksi
- Harga jika ingin ditampilkan

Potential products:

- PDH
- PDL
- Jaket
- Korsa
- Kaos
- Polo
- Wearpack
- Rompi
- Almamater
- Jas Lab
- Kemeja
- Hoodie
- Other

Produk harus sesuai kemampuan bisnis sebenarnya.

---

# 40. CLIENT DATA INTAKE — C

## Customisasi

Collect:

- Custom design
- Custom color
- Custom material
- Custom size
- Embroidery
- Screen printing
- Printing
- Label
- Packaging
- Other customization

Juga tanyakan:

- Apakah customer dapat mengirim desain?
- Apakah tersedia sample?
- Apakah ada ketentuan file desain?

---

# 41. CLIENT DATA INTAKE — D

## Portfolio & Dokumentasi

Collect:

- Foto produk
- Foto hasil produksi
- Foto produksi
- Foto workshop
- Foto team
- Foto customer
- Foto event
- Video
- Portfolio link

Idealnya client memberikan folder asset.

Contoh:

```text
Google Drive
↓
Brand Assets
├── Logo
├── Product
├── Portfolio
├── Production
├── Client
├── Testimonial
└── Video
```

---

# 42. CLIENT DATA INTAKE — E

## Trust / Kredibilitas

Collect:

- Client
- Institution
- Organization
- Client logos
- Testimonials
- Certifications
- Awards
- Business achievements
- Differentiators

Semua harus dapat diverifikasi.

---

# 43. CLIENT DATA INTAKE — F

## FAQ & Order Process

Collect:

- Current ordering process
- Common customer questions
- Payment terms
- Design revision terms
- Shipping terms
- Outside-city orders
- Sample policy
- Production policy
- Other customer requirements

FAQ sebaiknya berasal dari pertanyaan customer nyata.

---

# 44. CLIENT DATA INTAKE — G

## Brand & Asset

Collect:

- Logo
- Brand guideline
- Brand colors
- Fonts
- Graphic assets
- Product photos
- Video
- Existing marketing assets
- Website references
- Visual references

---

# 45. CLIENT DATA INTAKE — H

## Publication Permission

Client harus memberikan confirmation mengenai penggunaan:

- Business information
- Product photos
- Portfolio
- Client photos
- Client logos
- Testimonials
- Production photos
- Other provided assets

Client juga harus dapat memberikan catatan jika ada asset yang:

> tidak boleh dipublikasikan.

---

# 46. CLIENT DATA STATUS

Setiap data client harus memiliki salah satu status:

## READY

Data:

- sudah diberikan,
- sudah jelas,
- dan boleh digunakan.

## NEED CONFIRMATION

Data:

- sudah diberikan,
- tetapi masih membutuhkan konfirmasi.

## NOT PROVIDED

Data:

- belum diberikan,
- belum tersedia,
- atau belum diketahui.

---

# 47. SOURCE OF TRUTH RULE

Data yang sudah dikonfirmasi oleh client menjadi:

> **Source of Truth**

Developer maupun AI tidak boleh mengganti data tersebut berdasarkan asumsi.

Jika terdapat konflik antara:

- design,
- old documentation,
- existing code,
- AI assumption,
- dan confirmed client data,

maka:

> **Confirmed client data wins.**

Jika data belum dikonfirmasi:

> jangan treat sebagai fact.

---

# 48. CONTENT DEPENDENCY RULE

Missing data bukan alasan untuk mengarang.

Example:

Jika MOQ belum tersedia:

```text
Do not write:
MOQ: 50 pcs
```

Gunakan:

```text
Informasi minimum order tersedia melalui konsultasi.
```

atau hide field tersebut sampai data tersedia.

Jika testimonial belum tersedia:

> Jangan membuat testimonial dummy untuk production.

Jika client logos belum tersedia:

> Jangan membuat fake logo wall.

---

# 49. ASSET DISCIPLINE

Real asset lebih diutamakan daripada placeholder.

Priority:

```text
Real Client Asset
>
Real Product Asset
>
Neutral Placeholder
>
Decorative Asset
```

Jangan menggunakan unrelated image sebagai product representation.

---

# 50. TRUST CONTENT DISCIPLINE

Forbidden without verification:

```text
100+ Kampus
5000+ Pesanan
10 Tahun Pengalaman
98% Customer Puas
Best Quality
No. 1 Konveksi
Trusted by 100+ Institutions
```

Semua angka dan claim harus berasal dari data nyata.

---

# 51. DOCUMENTATION DRIFT

Documentation harus sesuai dengan actual implementation.

Audit dan sinkronisasi:

- Next.js version
- Dependencies
- Component architecture
- Data architecture
- Routes
- Environment variables
- Deployment configuration

Jika technical documentation bertentangan dengan actual repo:

> Inspect actual implementation first, then sync documentation.

---

# 52. PRODUCTION CHECKLIST

## Content

- [ ] Business name verified
- [ ] Tagline verified
- [ ] Business description verified
- [ ] WhatsApp verified
- [ ] Instagram verified
- [ ] Address verified
- [ ] Email verified
- [ ] Operating hours verified
- [ ] Product names verified
- [ ] Product descriptions verified
- [ ] Category mapping verified
- [ ] Materials verified
- [ ] Process verified
- [ ] FAQ verified

## Production Data

- [ ] MOQ verified
- [ ] Production estimate verified
- [ ] Sample policy verified
- [ ] Embroidery verified
- [ ] Screen printing verified
- [ ] Payment policy verified
- [ ] Shipping policy verified
- [ ] Design revision policy verified
- [ ] Material information verified

## Trust

- [ ] Real portfolio
- [ ] Real client list
- [ ] Client logo permission
- [ ] Real testimonials
- [ ] Testimonial permission
- [ ] Workshop/team photos
- [ ] No fake claims

## UX

- [ ] Mobile tested
- [ ] Tablet tested
- [ ] Desktop tested
- [ ] No horizontal overflow
- [ ] CTA works
- [ ] WhatsApp works
- [ ] Breadcrumb works
- [ ] Empty states exist
- [ ] 404 exists
- [ ] No dead-end page

## SEO

- [ ] Production domain configured
- [ ] Canonical configured
- [ ] Sitemap configured
- [ ] Robots configured
- [ ] OG configured
- [ ] Page titles
- [ ] Meta descriptions
- [ ] JSON-LD
- [ ] Production URL verified

## Technical

- [ ] Typecheck
- [ ] Lint
- [ ] Build
- [ ] No broken routes
- [ ] No console errors
- [ ] No placeholders
- [ ] No fake data
- [ ] Documentation matches implementation

---

# 53. PRIORITY ROADMAP

## P0 — Must Fix

1. Verify business contact data
2. Verify production domain
3. Fix category image fallback
4. QA all routes
5. QA mobile
6. Verify WhatsApp CTA
7. Verify production SEO/canonical
8. Sync technical documentation
9. Add conversion-friendly empty states
10. Remove placeholders
11. Verify client-provided data
12. Verify asset publication permissions

---

## P1 — High Value

1. Real client logos
2. Real testimonials
3. Why KonveksiKampus
4. Cocok Untuk
5. Improve About credibility
6. Product-specific WhatsApp
7. Real MOQ
8. Real lead time
9. Real material data
10. Real PDH/PDL assets
11. Real Kaos assets
12. Better portfolio presentation

---

## P2 — Optional

1. Catalog search
2. Related products
3. Dedicated portfolio page
4. Detailed materials page
5. Operating hours
6. Map integration

Do not implement P2 merely because it looks cool.

---

# 54. STANDARD VS BUSINESS/PRO

## Standard

Focus:

```text
Marketing Website
+
Catalog
+
Trust
+
WhatsApp Conversion
```

## Business

Potential upgrade:

```text
Admin
+
CRUD
+
Catalog Management
+
Category Management
+
Image Upload
+
Dynamic Content
```

## Pro

Potential upgrade:

```text
Business
+
Content Management
+
Advanced CMS
+
Advanced Business Features
```

## Future Upsell

Product configurator may become a separate future feature/upsell.

Do not implement it inside Standard unless explicitly requested.

---

# 55. OPEN CODE / AI AGENT INSTRUCTIONS

When working on KonveksiKampus, follow this document as the **QUALITY BASELINE**.

Rules:

1. Do not introduce scope creep into Business/Pro.
2. Never fabricate business data.
3. Never fabricate testimonials.
4. Never fabricate client logos.
5. Never fabricate statistics.
6. Never fabricate product specifications.
7. Prioritize conversion and UX.
8. Product catalog is visual priority.
9. WhatsApp is primary conversion.
10. Use real product assets.
11. Respect content-layer architecture.
12. Maintain responsive behavior.
13. Reuse design system components.
14. Do not break existing functionality.
15. Review desktop and mobile after UI changes.
16. Run typecheck/lint/build where relevant.
17. Missing business data is a content dependency.
18. Do not invent missing content.
19. Out-of-scope feature requires explicit request.
20. Conversion beats aesthetics when they conflict.
21. If docs conflict with implementation, inspect actual repo and sync documentation.
22. Do not delete existing useful content just because additional data is unavailable.
23. Use conditional rendering or empty state where appropriate.
24. Do not use unrelated images as permanent category/product fallback.
25. More sections do not automatically mean better website.
26. More animation does not automatically mean better website.
27. Do not replace working functionality just to make the code look cleaner.
28. Before large changes, read this baseline first.
29. Inspect actual implementation before making assumptions.
30. Prefer the smallest change that solves the requirement.
31. Verify mobile after significant UI changes.
32. Validate build after structural changes.
33. Do not fabricate client-side information from patterns or assumptions.
34. Confirm publication-sensitive assets before displaying them.
35. Treat confirmed client data as Source of Truth.

---

# 56. BEFORE LARGE CHANGES

Before implementing a major change:

```text
1. Read this baseline.
2. Identify the actual requirement.
3. Inspect current implementation.
4. Identify affected routes/components/data.
5. Check whether the required data actually exists.
6. Do not assume missing data.
7. Make the smallest appropriate change.
8. Verify desktop.
9. Verify mobile.
10. Run relevant validation.
11. Check for scope creep.
```

---

# 57. DEFINITION OF DONE

A page/project is considered ready when:

```text
Visitor understands the business
↓
Visitor finds relevant product
↓
Visitor understands the product
↓
Visitor sees production proof
↓
Visitor understands customization
↓
Visitor understands ordering process
↓
Visitor gets answers to major objections
↓
Visitor can easily contact WhatsApp
```

Technical requirements:

- No fake business data
- No broken route
- No production placeholder
- No misleading category
- No horizontal overflow
- No dead-end CTA
- No fabricated trust content
- No misleading product specification
- Production SEO configured
- WhatsApp CTA works
- Mobile QA passes
- Desktop QA passes

---

# 58. FINAL PRODUCT PRINCIPLE

KonveksiKampus Standard is **not**:

> "A convection website with as many sections and features as possible."

KonveksiKampus Standard is:

> **A professional product catalog website that makes prospective customers confident that KonveksiKampus can fulfill their needs and gives them the easiest path to consultation.**

Every design, content, UX, and engineering decision must support this principle.

---

# 59. CLIENT INTAKE PRINCIPLE

The quality of the final website depends heavily on the quality of the information provided by the client.

Therefore:

```text
Good Website
=
Good UX
+
Good Design
+
Good Engineering
+
Accurate Client Data
+
Real Assets
```

Not:

```text
Good Website
=
Developer/AI guessing missing information
```

The system should make it easy for the client to provide information through a structured intake process.

Recommended workflow:

```text
NEGOTIATION
↓
DEAL
↓
CLIENT DATA INTAKE
↓
DATA REVIEW
↓
READY / NEED CONFIRMATION / NOT PROVIDED
↓
CONTENT CONFIRMATION
↓
IMPLEMENTATION
↓
QA
↓
PRODUCTION
```

This process becomes the standard operating workflow for future KonveksiKampus client websites.

---

# 60. MASTER RULE

When in doubt, prioritize:

```text
Truth
>
Business Value
>
User Clarity
>
Conversion
>
Performance
>
Visual Polish
>
Extra Features
```

**Never sacrifice truth and clarity for visual appearance or feature quantity.**
