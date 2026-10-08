# PRD — KonveksiKampus Website

**Status:** MVP Development (Standard)
**Version:** 1.0
**Product Type:** Website & Digital Catalog Platform
**Source of Truth:** This file. See `AGENTS.md` §2 for document hierarchy.

> This PRD reconciles two client-provided PRDs. The package-tiered PRD is treated as
> the authoritative structure; the earlier catalog PRD contributes data-model detail.
> The MVP target is **Standard Website** with an architecture that can evolve into Business.

---

# 1. PRODUCT OVERVIEW

KonveksiKampus is a website platform for a garment/convection business ("Konveksi Kampus")
that functions as:

- Company profile
- Product catalog
- Digital marketing platform
- Product information center
- Customer inquiry channel

The product is designed around **package tiers**, so the website can grow with the business:

1. **Standard**
2. **Business**
3. **Pro**

Each tier has different capabilities, but shares one design and architecture foundation that
can be developed progressively.

---

# 2. PRODUCT GOAL

Build a convection website that looks professional, is easy to manage, easy to expand, and
turns visitors into prospective customers.

The website is not just an information page — it is the business's **digital storefront**.

Priority:

1. Products are easy to find.
2. Product information is easy to understand.
3. The brand looks professional.
4. Customers can easily submit an inquiry.
5. Admin can easily manage content (future phase).
6. The system can be expanded without rebuilding from scratch.

---

# 3. TARGET USERS

## Customer

Visitors who want to:

- View products
- Search products by category
- View product detail
- Compare options
- Get service information
- Contact the convection business
- Request custom work

## Business Owner

- Have a professional website
- Showcase a catalog
- Increase customer trust
- Receive inquiries
- Update business information

## Admin (future phase)

- Manage products
- Manage categories
- Manage content
- Manage images
- Manage website information

---

# 4. PACKAGE STRUCTURE

## LEVEL 1 — STANDARD

### Positioning

A simple website for a convection business that needs an **online presence and a basic catalog**.

### Target

- MSMEs
- New convection businesses
- Businesses with a relatively small catalog

### Features

#### Public Website

- Homepage
- About
- Contact
- Static product catalog
- Product category
- Product detail
- Responsive design
- Basic SEO
- WhatsApp / contact CTA

#### Catalog

Products are displayed statically. Catalog data may be managed via content files in the source.

### Admin

No full admin dashboard required.

### Goal

Deliver a professional website at low cost and complexity.

---

## LEVEL 2 — BUSINESS (future phase)

### Positioning

A website for an active convection business that needs **content management**.

### All Standard features, plus:

- Admin login + dashboard
- Product CRUD (Create / Read / Update / Delete)
- Category CRUD + ordering
- Media management (upload / replace / delete images)
- Basic CMS (homepage content, about, contact, CTA, featured products)

### Product data fields

- Name, Slug, Category, Description, Images, Variants, Status, Featured status

### Goal

Turn a static catalog into a **website the business can manage itself**.

---

## LEVEL 3 — PRO (future phase)

### Positioning

Website as a **digital commerce / inquiry platform**.

### All Business features, plus:

- Advanced product system (multiple variants, size, color, material, custom options, gallery, related products)
- Product inquiry (select variant → quantity → notes → submit)
- Quote / request system
- Advanced CMS (hero, featured, testimonials, portfolio, FAQ, promotions)
- Analytics foundation

### Goal

Turn the website into a **sales tool**.

---

# 5. FUTURE FEATURE — PRODUCT CONFIGURATOR

Out of scope for Standard and Business. A potential upsell for Pro or custom projects.
Must be treated as a **separate module** so it does not complicate the core catalog.

---

# 6. PACKAGE COMPARISON

| Feature              | Standard | Business | Pro      |
| -------------------- | -------- | -------- | -------- |
| Homepage             | ✓        | ✓        | ✓        |
| About                | ✓        | ✓        | ✓        |
| Contact              | ✓        | ✓        | ✓        |
| Product Catalog      | ✓        | ✓        | ✓        |
| Product Detail       | ✓        | ✓        | ✓        |
| Category             | ✓        | ✓        | ✓        |
| Search               | Basic    | ✓        | Advanced |
| Responsive           | ✓        | ✓        | ✓        |
| SEO                  | Basic    | ✓        | Advanced |
| Static Catalog       | ✓        | -        | -        |
| Admin Login          | -        | ✓        | ✓        |
| Product CRUD         | -        | ✓        | ✓        |
| Category CRUD        | -        | ✓        | ✓        |
| Image Upload         | -        | ✓        | ✓        |
| CMS                  | -        | Basic    | Advanced |
| Product Variants     | Basic    | ✓        | Advanced |
| Inquiry System       | WhatsApp | Basic    | ✓        |
| Quote System         | -        | -        | ✓        |
| Analytics            | -        | Basic    | Advanced |
| Product Configurator | -        | -        | Future   |
| Custom Features      | Optional | Optional | ✓        |

---

# 7. DEVELOPMENT PRIORITY

## Phase 1 — Foundation

Project architecture, design system, layout, navigation, responsive system, basic components.

## Phase 2 — Standard ← CURRENT MVP

Homepage, Catalog, Category, Product detail, About, Contact, SEO, WhatsApp CTA.

## Phase 3 — Business (future)

Authentication, admin dashboard, product CRUD, category CRUD, image upload, CMS basics.

## Phase 4 — Pro (future)

Advanced product data, variants, inquiry system, quote system, advanced CMS, analytics foundation.

## Phase 5 — Future (future)

Product configurator, customer account, order management, payment, production tracking, advanced analytics.

---

# 8. CORE ARCHITECTURE PRINCIPLE

The application must be designed so that:

> Standard → Business → Pro

can be developed progressively **without rewriting the entire application**.

However, **do not over-engineer the Standard version** just because future features may exist.

Build a clean foundation, but only implement functionality required by the current package.

---

# 9. MVP DEFINITION

> **Standard Website + architecture prepared for Business expansion.**

MVP must provide:

- Professional homepage
- Product catalog
- Category browsing
- Product detail
- Contact / inquiry CTA
- Responsive mobile experience
- Basic SEO
- Fast loading
- Clean UI
- Maintainable codebase

Admin dashboard is **not required for the first Standard MVP**, but the data structure must not
make future Business development unnecessarily difficult.

---

# 10. NON-GOALS

Do not implement unless explicitly requested:

- Payment gateway
- Full e-commerce checkout
- Customer account system
- Complex ERP
- Production management
- Inventory management
- Product configurator
- AI recommendation system
- Complex analytics
- Unnecessary animations
- Features that do not support the core business goal

---

# 11. PRODUCT PRINCIPLE

> **Simple for the customer. Simple for the admin. Scalable for the business.**

Every feature must answer at least one of:

1. Does it help customers find products?
2. Does it help customers understand products?
3. Does it help customers contact the business?
4. Does it help the business manage content?
5. Does it help the business generate leads?

If not, it should not be prioritized.

---

# 12. SUCCESS CRITERIA

### Customer

- Understands what KonveksiKampus offers within seconds.
- Finds products easily.
- Browses categories easily.
- Understands product information.
- Contacts the business without friction.

### Business

- Has a professional online presence.
- Can showcase its products.
- Can generate customer inquiries.
- Can expand its catalog over time.

### Development

- Codebase is maintainable.
- Components are reusable.
- Data structure can support future Business/Pro features.
- New features can be added without rewriting the entire application.

---

# 13. CLIENT GROUND TRUTH (from provided catalog assets)

These facts come from the client's real material (`CATALOG PRODUCT.pdf` and product photos).
They must not be altered or invented around.

**Business name (display):** KonveksiKampus
**Catalog title:** "CATALOG PRODUCT Vol.1 — Konveksi Kampus 2025"

**About (from PDF, page 2):**

> Kami adalah vendor Konveksi yang menyediakan jasa pembuatan sandang untuk mahasiswa maupun
> masyarakat umum yang menggunakan kualitas yang terbaik dan harga yang sangat terjangkau bagi
> pelanggan kami.

**Visi:**

> Menjadi konveksi terpercaya dan ternjangkau yang mampu memenuhi kebutuhan fashion dengan
> kualitas terbaik dan harga bersahabat.

**Misi:**

- Menyediakan produk konveksi berkualitas tinggi dengan harga kompetitif.
- Melayani kebutuhan clothing mahasiswa, organisasi kampus, dan komunitas lokal.
- Menjaga komitmen terhadap ketetapan waktu, mutu dan kepuasan pelanggan.
- Terus berinovasi dalam desain dan produksi untuk mengikuti tren pasar.

**Real product assets:** 42 files = 21 photos (`.png` + `.webp`) covering:
korsa, jacket lapangan, jacket varsity, workshirt, kaos kerah bordir, rompi bordir,
jas lab, jas almamater, wearpack.

---

# 14. IMPORTANT INSTRUCTION FOR DEVELOPMENT AI

This PRD is the **business/product source of truth**.

The development AI must:

- Understand the product goal before implementing features.
- Follow the package boundaries.
- Avoid implementing future features prematurely.
- Avoid unnecessary complexity.
- Prioritize MVP functionality.
- Preserve scalability where reasonably practical.
- Ask for clarification when a requirement conflicts with this PRD.
- Never invent major business requirements without confirmation.

Technical decisions (framework, database, authentication, deployment, folder structure, libraries)
are documented in `TECH_SPEC.md`.

---

# FINAL PRODUCT DIRECTION

KonveksiKampus is not just a portfolio website. It evolves as:

**Standard** → Professional online catalog
**Business** → Managed digital catalog
**Pro** → Digital sales & inquiry platform
**Future** → Custom product configuration & commerce platform
