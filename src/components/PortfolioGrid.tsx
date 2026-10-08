import { ProductImage } from "@/components/ProductImage";
import type { PortfolioItem } from "@/lib/content/types";

/**
 * Portfolio grid (foundation §9): each item is a sales asset — product type + client
 * category + customization, not just a picture.
 */
export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="border-border bg-card overflow-hidden rounded-[var(--radius-surface)] border"
        >
          <div className="bg-muted relative aspect-[4/3]">
            <ProductImage
              src={item.images[0]?.src ?? ""}
              alt={item.images[0]?.alt ?? item.title}
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
          <div className="p-5">
            <p className="text-accent text-xs font-semibold tracking-wide uppercase">
              {item.productType}
            </p>
            <h3 className="text-foreground mt-1 font-medium">{item.title}</h3>
            <dl className="text-muted-foreground mt-3 space-y-1 text-sm">
              {item.clientCategory ? (
                <div className="flex gap-2">
                  <dt className="text-foreground/60">Untuk</dt>
                  <dd>{item.clientCategory}</dd>
                </div>
              ) : null}
              {item.customization && item.customization.length > 0 ? (
                <div className="flex gap-2">
                  <dt className="text-foreground/60 shrink-0">Detail</dt>
                  <dd>{item.customization.join(", ")}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
}
