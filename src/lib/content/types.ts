/**
 * Content domain types.
 *
 * Field names follow AGENTS.md §11 and the project foundation (PRD §4, §21). The model is
 * shaped so the Business CMS can manage every entity without touching source (foundation §21).
 *
 * IMPORTANT (foundation §22): no invented business data. Optional fields stay undefined until
 * the client provides a value; the UI must render gracefully when they are absent.
 */

export type ContentStatus = "draft" | "published";

export interface ImageAsset {
  /** Path under /public, e.g. "/images/products/kaos-kerah-1.webp". */
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
  images: ImageAsset[];
  /** Product character / what it is suited for (foundation §8). */
  character?: string;
  /** Material names available for this product (references Material.name). */
  materials?: string[];
  /** Colour options offered. */
  colors?: string[];
  /** Customization options (bordir, sablon, nama, dll). */
  customization?: string[];
  variants?: ProductVariant[];
  /** Estimated production time, only if confirmed by the client. */
  productionEstimate?: string;
  /** Minimum order, only if confirmed. */
  minimumOrder?: string;
  /** Price hint: "mulai dari ..." or left undefined (foundation §8: never invent prices). */
  priceHint?: string;
  status: ContentStatus;
  featured?: boolean;
  order?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  /** Short line explaining who the product is for (foundation §8). */
  forWhom?: string;
  order: number;
}

/** A portfolio entry is a sales asset, not just an image (foundation §9). */
export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  /** Product type, e.g. "Jaket Lapangan". */
  productType: string;
  /** Client / institution — only when it is allowed to be shown. */
  client?: string;
  /** Category of client, e.g. "Organisasi Kampus". */
  clientCategory?: string;
  quantity?: string;
  material?: string;
  customization?: string[];
  result?: string;
  images: ImageAsset[];
  status: ContentStatus;
  order?: number;
}

export interface Testimonial {
  id: string;
  /** Verbatim quote. Never fabricate (foundation §10/§22). */
  quote: string;
  /** Person name — only with real consent. */
  author?: string;
  role?: string;
  organization?: string;
  /** Optional photo. */
  image?: ImageAsset;
  status: ContentStatus;
  order?: number;
}

export interface Client {
  id: string;
  name: string;
  /** Logo path if provided. */
  logo?: string;
  order?: number;
}

export interface Material {
  id: string;
  slug: string;
  name: string;
  /** Character of the fabric. Only fill from confirmed info. */
  character?: string;
  /** Rough thickness if confirmed. */
  thickness?: string;
  texture?: string;
  benefits?: string[];
  /** Recommended use. */
  recommendedFor?: string;
  image?: ImageAsset;
  status: ContentStatus;
  order?: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export interface ProcessStep {
  id: string;
  /** "01".."06". */
  step: string;
  title: string;
  description: string;
  order: number;
}

/** Query options accepted by the content-layer product reads. */
export interface ProductQuery {
  category?: string;
  q?: string;
  featured?: boolean;
}
