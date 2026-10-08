import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import type { Category } from "@/lib/content/types";

/**
 * Product categories, presented as a responsive grid of photo tiles (image-first, which the
 * foundation §18 asks for). Each tile links to its category page.
 */
export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
      {categories.map((category, index) => (
        <Reveal
          as="li"
          key={category.id}
          clip
          once
          delay={(index % 5) * 80}
          className={
            index % 5 === 2 ? "lg:translate-y-10" : index % 5 === 4 ? "lg:translate-y-20" : ""
          }
        >
          <Link href={`/kategori/${category.slug}`} className="group block">
            <div className="bg-specimen border-plate-border relative aspect-[3/4] overflow-hidden rounded-[var(--radius-media)] border">
              {category.image ? (
                <ProductImage
                  src={category.image}
                  alt={`Produk ${category.name}`}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              ) : (
                /* Neutral category tile — no matching photo yet, so never fake it
                 * with an unrelated product shot (STANDARD §12). Name sits top-left
                 * so it never collides with the bottom hover overlay. */
                <div className="flex h-full items-start p-4">
                  <span className="font-heading text-foreground/80 text-2xl tracking-wide uppercase">
                    {category.name}
                  </span>
                </div>
              )}
              {category.forWhom ? (
                <div className="card-overlay bg-background/85 absolute inset-x-0 bottom-0 p-4 backdrop-blur-sm">
                  <p className="text-foreground text-sm font-medium">Lihat Koleksi →</p>
                </div>
              ) : null}
            </div>
            <div className="mt-3">
              <h3 className="text-foreground group-hover:text-primary-text font-heading text-lg tracking-wide uppercase transition-colors">
                {category.name}
              </h3>
              {category.forWhom ? (
                <p className="text-muted-foreground mt-0.5 text-sm">{category.forWhom}</p>
              ) : null}
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
