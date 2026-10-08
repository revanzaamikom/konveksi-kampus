import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/content/categories";
import { getProducts } from "@/lib/content/products";
import { hasCanonicalUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Sitemap with absolute URLs. Only meaningful once a canonical domain is configured
 * (NEXT_PUBLIC_SITE_URL). With no domain, we return an empty sitemap rather than
 * inventing URLs — robots.ts also disallows indexing in that state.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!hasCanonicalUrl) return [];

  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/katalog/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tentang/`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/kontak/`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}/kategori/${category.slug}/`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/katalog/${product.slug}/`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
