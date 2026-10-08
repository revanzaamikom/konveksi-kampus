import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import type { Product } from "@/lib/content/types";

/**
 * Product card — clean editorial treatment (no bordered box), matching the reference's
 * image-first product listing. The image is the card; the label sits in plain space below.
 */
export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];

  return (
    <Link href={`/katalog/${product.slug}`} className="group block">
      <div className="bg-specimen border-plate-border relative aspect-[4/5] overflow-hidden rounded-[2px] border">
        {cover ? (
          <ProductImage
            src={cover.src}
            alt={cover.alt}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        ) : null}
      </div>
      <div className="mt-3">
        <h3 className="text-foreground group-hover:text-primary-text font-heading text-lg tracking-wide uppercase transition-colors">
          {product.name}
        </h3>
        {product.shortDescription ? (
          <p className="text-muted-foreground mt-0.5 line-clamp-2 text-sm">
            {product.shortDescription}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
