"use client";

import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import type { PortfolioItem } from "@/lib/content/types";

/**
 * Portfolio grid with staggered vertical offsets and per-item reveal.
 * Offset pattern varies by column so the editorial rhythm is not uniform.
 */
export function PortfolioGridRevealed({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) return null;

  const offsets = ["", "lg:mt-12", "lg:mt-24"];

  return (
    <ul className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.id} className={`group ${offsets[index % 3]}`}>
          <Reveal clip once delay={(index % 3) * 140}>
            <div className="bg-specimen border-plate-border relative aspect-[3/4] overflow-hidden rounded-[20px] border">
              <ProductImage
                src={item.images[0]?.src ?? ""}
                alt={item.images[0]?.alt ?? item.title}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="mt-3">
              <p className="text-accent font-heading text-xs tracking-[0.15em] uppercase">
                {item.productType}
              </p>
              <h3 className="text-foreground mt-1 font-medium">{item.title}</h3>
              <dl className="text-muted-foreground mt-2 space-y-1 text-sm">
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
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
