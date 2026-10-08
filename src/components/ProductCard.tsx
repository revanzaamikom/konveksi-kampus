import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import type { Product } from "@/lib/content/types";

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];

  return (
    <Link
      href={`/katalog/${product.slug}`}
      className="border-border bg-card group hover:border-accent/60 flex flex-col overflow-hidden rounded-[var(--radius-surface)] border transition-colors duration-200"
    >
      <div className="bg-muted relative aspect-[4/3] overflow-hidden">
        {cover ? (
          <ProductImage
            src={cover.src}
            alt={cover.alt}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-foreground font-medium">{product.name}</h3>
        {product.shortDescription ? (
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {product.shortDescription}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
