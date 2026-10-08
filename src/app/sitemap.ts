import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/content/categories";
import { getProducts } from "@/lib/content/products";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/katalog/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/tentang/`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteConfig.url}/kontak/`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/kategori/${category.slug}/`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/katalog/${product.slug}/`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
