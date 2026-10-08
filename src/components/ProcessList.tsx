import type { ProcessStep } from "@/lib/content/types";

/**
 * Production process (foundation §13). Numbered steps reduce customer anxiety by showing
 * exactly what happens after they make contact.
 */
export function ProcessList({ steps }: { steps: ProcessStep[] }) {
  if (steps.length === 0) return null;

  return (
    <ol className="border-border grid gap-8 border-t pt-10 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step) => (
        <li key={step.id}>
          <span className="text-primary-text/70 font-heading text-3xl leading-none">
            {step.step}
          </span>
          <h3 className="text-foreground font-heading mt-3 text-lg tracking-wide uppercase">
            {step.title}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
