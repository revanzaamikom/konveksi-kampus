import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import type { Category } from "@/lib/content/types";

/**
 * Product categories, presented as a responsive grid of photo tiles (image-first, which the
 * foundation §18 asks for). Each tile links to its category page.
 */
export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/kategori/${category.slug}`}
            className="border-border bg-card hover:border-accent/60 group block overflow-hidden rounded-[var(--radius-surface)] border transition-colors duration-200"
          >
            <div className="bg-muted relative aspect-[4/3]">
              <ProductImage
                src={category.image ?? "/images/products/jacket-varsity.webp"}
                alt={`Produk ${category.name}`}
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <h3 className="text-foreground group-hover:text-accent font-medium transition-colors">
                {category.name}
              </h3>
              {category.forWhom ? (
                <p className="text-muted-foreground mt-1 text-sm">{category.forWhom}</p>
              ) : null}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
