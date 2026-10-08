# CLIENT DATA — KonveksiKampus

Compiled from **public sources** on 2026-10-08. Every fact below is sourced; nothing is invented.
Verify with the client before a production launch if a value looks stale.

## Sources

| Source                | URL                                                           |
| --------------------- | ------------------------------------------------------------- |
| Instagram             | https://www.instagram.com/konveksikampus.yk/                  |
| Linktree              | https://linktr.ee/konveksikampus.yk                           |
| Facebook (post)       | facebook.com (Konveksi Kampus post, reel DOXOpeuEi79 context) |
| Client catalog PDF    | `CATALOG PRODUCT.pdf` (2025)                                  |
| Client product photos | `KonveksiKampus_product_assets.zip`                           |

## Identity

| Field            | Value                                                                                                   | Source                        |
| ---------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Display name     | **Konveksi Kampus**                                                                                     | IG bio, Linktree, Facebook    |
| Handle           | `konveksikampus.yk`                                                                                     | Instagram, Linktree           |
| Tagline (public) | "Vendor Konveksi Yogyakarta"                                                                            | Linktree og:description       |
| Established      | **2012** ("est. 2012")                                                                                  | Instagram bio                 |
| Category         | Vendor konveksi — Jacket, Kaos, Korsa, Jas Almamater, Jas Lab, Seragam, Workshirt, Rompi, Wearpack, PDH | IG bio + PDF + product photos |

## Contact (CONFIRMED from public sources)

| Channel        | Value                                         | Source                                                                                              |
| -------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| WhatsApp       | **+62 882-2172-9053** (`wa.me/6288221729053`) | Linktree link — **most reliable**                                                                   |
| WhatsApp (alt) | 0813-6702-9003                                | Old Facebook post — UNVERIFIED                                                                      |
| Website        | `konveksikampus.com`                          | Old Facebook post — **URL resolves but returns HTTP 403 (no live content)**. Not used as canonical. |
| Address        | (partial) "Jl. Betoro Raya No.1"              | Old Facebook post — UNVERIFIED                                                                      |

> Two different WhatsApp numbers appear publicly. **Confirm with the client which is primary**
> before using one as the main CTA.

## Brand visual identity (from logo analysis)

The Instagram avatar is an **embroidered-style emblem logo** (personal mark "AH" = Alex Hutagaor,
the owner): scissors + ruler + monogram.

| Role              | Color                                                | Notes                        |
| ----------------- | ---------------------------------------------------- | ---------------------------- |
| Base / background | **`#1A1A1A` – `#22252A`** charcoal/near-black        | Avatar bg + Linktree banner  |
| Primary accent    | **`#E02030` red**                                    | Logo monogram, capsule lines |
| Secondary accent  | **Yellow/amber** (ruler, "KONVEKSI KAMPUS" subtitle) | Logo details                 |
| Text on dark      | White                                                | Logo name                    |

Color distribution measured from the actual logo image (`tools/output/profile-avatar.png`):
near-black ~70%, red ~1.2% (accent), yellow ~small accent. The brand is **dark + red + yellow**.

> This supersedes the earlier placeholder palette. The dark industrial look matches the actual
> product range (safety-striped jackets, wearpack, lab coats).

## Assets collected

| File                                | What                               |
| ----------------------------------- | ---------------------------------- |
| `tools/output/profile-avatar.png`   | Instagram avatar (logo) 400×400    |
| `tools/output/profile-og.jpg`       | Linktree OG banner 1200×630        |
| `tools/output/client-info-raw.json` | Raw Firecrawl search/scrape report |

## Still open (needs client confirmation)

- Primary WhatsApp number (two candidates above; Linktree one is most likely).
- Full address (only "Jl. Betoro Raya No.1" was found, from an old post).
- Official email (none confirmed — the site does not display one until it exists).
- Whether `konveksikampus.com` is theirs and should be the live domain. **Currently returns
  HTTP 403** — it is not used anywhere until confirmed. Set `NEXT_PUBLIC_SITE_URL` to enable
  indexing + sitemap once a real domain is live.
- Logo usage rights (the avatar is an "AH" mark that reads as the owner's personal logo).

## How the site handles unverified data

Rather than inventing values, the code degrades safely (`src/lib/site.ts`):

- `url` is empty → `robots.txt` disallows indexing and the sitemap is empty (keeps the
  preview out of search until a real domain exists).
- `email` is empty → the email row is simply not rendered in the contact page / footer.
- `address` shows only what is defensible ("Yogyakarta") until the full address is confirmed.
- Contact page leads with the **verified** channels (WhatsApp + Instagram).
