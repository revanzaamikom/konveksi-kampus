import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import type { Product } from "@/lib/content/types";

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];

  return (
    <Link href={`/katalog/${product.slug}`} className="group block">
      <div className="border-border bg-surface relative aspect-[4/3] overflow-hidden rounded-lg border">
        {cover ? (
          <ProductImage
            src={cover.src}
            alt={cover.alt}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : null}
      </div>
      <h3 className="mt-3 font-medium">{product.name}</h3>
      {product.shortDescription ? (
        <p className="text-muted mt-1 text-sm">{product.shortDescription}</p>
      ) : null}
    </Link>
  );
}
