import { products as rawProducts } from "@/data/products";
import type { Product, ProductQuery } from "@/lib/content/types";

/**
 * Content-layer: products.
 *
 * This is the ONLY module the UI may use to read product data (ADR-002).
 * In the Business phase, the body of these functions is replaced with DB queries;
 * the signatures stay identical.
 */

/** Only published products are ever exposed on the public site. */
function published(): Product[] {
  return rawProducts.filter((product) => product.status === "published");
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  let result = published();

  if (query.category) {
    result = result.filter((product) => product.categorySlug === query.category);
  }

  if (query.featured) {
    result = result.filter((product) => product.featured === true);
  }

  if (query.q) {
    const needle = query.q.trim().toLowerCase();
    if (needle) {
      result = result.filter((product) =>
        [product.name, product.shortDescription ?? "", product.description]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      );
    }
  }

  return [...result].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return published().find((product) => product.slug === slug) ?? null;
}
