/**
 * Catalog domain types.
 *
 * Field names follow AGENTS.md §11 and PRD §4 (Business), so this model does not
 * need to change when the admin phase arrives. The Standard UI only uses a subset.
 */

export type ProductStatus = "draft" | "published";

export interface ProductImage {
  /** Path under /public, e.g. "/images/products/kaos-kerah-1.png". */
  src: string;
  /** Required — accessibility + SEO (AGENTS.md §12/§13). */
  alt: string;
  /** Optional human label, e.g. "Depan", "Belakang". */
  label?: string;
}

export interface ProductVariant {
  /** e.g. "Ukuran", "Warna". */
  name: string;
  /** e.g. ["S", "M", "L"]. */
  options: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** References Category.slug. */
  categorySlug: string;
  description: string;
  shortDescription?: string;
  /** First image is the cover. */
  images: ProductImage[];
  material?: string;
  variants?: ProductVariant[];
  status: ProductStatus;
  featured?: boolean;
  order?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  order: number;
}

/** Query options accepted by the content-layer product reads. */
export interface ProductQuery {
  category?: string;
  q?: string;
  featured?: boolean;
}
