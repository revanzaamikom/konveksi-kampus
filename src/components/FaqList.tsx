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
            <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="text-muted-foreground shrink-0 text-xl transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="text-muted-foreground pb-4 text-sm">{item.answer}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
