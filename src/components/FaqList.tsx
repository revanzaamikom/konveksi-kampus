import { Reveal } from "@/components/Reveal";
import type { FaqItem } from "@/lib/content/types";

/**
 * FAQ (foundation §14). Uses native <details>/<summary> — accessible, no client JS,
 * zero runtime cost (matches the performance + a11y priorities).
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="divide-border border-border divide-y border-y">
      {items.map((item, index) => (
        <Reveal key={item.id} once delay={Math.min(index, 5) * 60}>
          <details className="group">
            <summary className="type-body text-foreground flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="text-accent shrink-0 text-2xl leading-none transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="type-body-sm text-muted-foreground max-w-prose pb-5">{item.answer}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
