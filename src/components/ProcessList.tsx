import type { ProcessStep } from "@/lib/content/types";

/**
 * Production process (foundation §13). Numbered steps reduce customer anxiety by showing
 * exactly what happens after they make contact.
 */
export function ProcessList({ steps }: { steps: ProcessStep[] }) {
  if (steps.length === 0) return null;

  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step) => (
        <li
          key={step.id}
          className="border-border bg-card rounded-[var(--radius-surface)] border p-5"
        >
          <span className="text-accent font-heading text-2xl font-semibold">{step.step}</span>
          <h3 className="text-foreground mt-2 font-medium">{step.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
