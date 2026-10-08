# GLOSSARY.md — KonveksiKampus Domain Vocabulary

Use these terms consistently in code, docs, and conversation. (See the `ubiquitous-language`
and `domain-modeling` skills.)

## Business / Domain

| Term                    | Meaning                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **KonveksiKampus**      | The brand/product name (single word, as displayed). The business is a garment/convection vendor for students and the general public. |
| **Konveksi**            | Indonesian for a garment-manufacturing business (convection).                                                                        |
| **Katalog**             | The product catalog (public listing page).                                                                                           |
| **Produk**              | A garment item offered (e.g. Kaos, Jaket, Hoodie).                                                                                   |
| **Kategori**            | A grouping of products (e.g. Jaket, Workshirt, Jas).                                                                                 |
| **Inquiry / Pemesanan** | A customer's request to order or ask about a product, currently via WhatsApp.                                                        |

## Product categories (from client catalog)

| Term                | Meaning                                              |
| ------------------- | ---------------------------------------------------- |
| **Korsa**           | A field/formal shirt style (kemeja lapangan/korsa).  |
| **Jacket Lapangan** | Field jacket (often hooded, safety-striped).         |
| **Jacket Varsity**  | Classic varsity/bomber jacket.                       |
| **Workshirt**       | Work/utility shirt.                                  |
| **Kaos Kerah**      | Collared (polo) shirt.                               |
| **Rompi**           | Vest.                                                |
| **Jas Lab**         | Laboratory coat.                                     |
| **Jas Almamater**   | University blazer/almamater.                         |
| **Wearpack**        | Coverall/overall workwear.                           |
| **Bordir**          | Embroidery (common customization on these garments). |

## Technical vocabulary (from `codebase-design` skill)

Use these exact terms; do not substitute "component/service/API/boundary".

| Term               | Meaning                                                                |
| ------------------ | ---------------------------------------------------------------------- |
| **Module**         | Anything with an interface and an implementation.                      |
| **Interface**      | Everything a caller must know to use a module correctly.               |
| **Implementation** | The body of code inside a module.                                      |
| **Depth**          | Leverage at the interface: lots of behaviour behind a small interface. |
| **Seam**           | A place where behaviour can be altered without editing there.          |
| **Adapter**        | A concrete thing satisfying an interface at a seam.                    |

## Project-specific technical terms

| Term                      | Meaning                                                                                                         |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Content-layer**         | `src/lib/content/*` — the adapter between UI and raw data. The stable seam for the Standard→Business migration. |
| **Content files**         | `src/data/*.ts` — raw data records used by Standard.                                                            |
| **Standard/Business/Pro** | The package tiers (see `PRD.md` §4).                                                                            |
| **MVP**                   | The Standard Website deliverable (see `PRD.md` §9).                                                             |
