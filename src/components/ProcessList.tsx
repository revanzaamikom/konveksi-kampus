import { Reveal } from "@/components/Reveal";
import type { ProcessStep } from "@/lib/content/types";

/**
 * Production process (foundation §13). Numbered steps reduce customer anxiety by showing
 * exactly what happens after they make contact.
 */
export function ProcessList({ steps }: { steps: ProcessStep[] }) {
  if (steps.length === 0) return null;

  return (
    <ol className="border-border grid gap-8 border-t pt-10 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <Reveal
          as="li"
          key={step.id}
          once
          delay={(index % 3) * 110}
          variant={index === 0 ? "left" : index === 2 ? "right" : "up"}
          className="process-step border-border border-t pt-6"
        >
          <span className="text-accent font-heading text-2xl leading-none tracking-wide">
            {step.step}
          </span>
          <h3 className="type-h3 text-foreground mt-3">{step.title}</h3>
          <p className="type-body-sm text-muted-foreground mt-1">{step.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
