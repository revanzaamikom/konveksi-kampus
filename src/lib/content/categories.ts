import { categories as rawCategories } from "@/data/categories";
import type { Category } from "@/lib/content/types";

/**
 * Content-layer: categories.
 *
 * This is the ONLY module the UI may use to read category data (ADR-002).
 * In the Business phase, the body of these functions is replaced with DB queries;
 * the signatures stay identical.
 */

export async function getCategories(): Promise<Category[]> {
  return [...rawCategories].sort((a, b) => a.order - b.order);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return rawCategories.find((category) => category.slug === slug) ?? null;
}
