import { Reveal } from "@/components/Reveal";
import type { Material } from "@/lib/content/types";

/**
 * Materials (foundation §11). Only renders spec rows that carry real data — empty specs
 * are omitted rather than shown as blanks (foundation §22).
 */
export function MaterialsList({ materials }: { materials: Material[] }) {
  if (materials.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {materials.map((material, index) => {
        const hasSpecs =
          material.character ||
          material.thickness ||
          material.texture ||
          (material.benefits && material.benefits.length > 0) ||
          material.recommendedFor;

        return (
          <Reveal
            as="li"
            key={material.id}
            once
            delay={(index % 4) * 90}
            className="border-border border-t pt-4"
          >
            <div className="flex items-baseline gap-3">
              <span className="type-overline text-accent">{`0${index + 1}`}</span>
              <h3 className="type-h3 text-foreground">{material.name}</h3>
            </div>
            {hasSpecs ? (
              <dl className="type-body-sm text-muted-foreground mt-3 space-y-2">
                {material.character ? <dd>{material.character}</dd> : null}
                {material.thickness ? (
                  <div className="flex gap-2">
                    <dt className="text-foreground/70">Ketebalan</dt>
                    <dd>{material.thickness}</dd>
                  </div>
                ) : null}
                {material.texture ? (
                  <div className="flex gap-2">
                    <dt className="text-foreground/70">Tekstur</dt>
                    <dd>{material.texture}</dd>
                  </div>
                ) : null}
                {material.recommendedFor ? (
                  <div className="flex gap-2">
                    <dt className="text-foreground/70">Cocok untuk</dt>
                    <dd>{material.recommendedFor}</dd>
                  </div>
                ) : null}
                {material.benefits && material.benefits.length > 0 ? (
                  <ul className="list-inside list-disc">
                    {material.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                ) : null}
              </dl>
            ) : null}
          </Reveal>
        );
      })}
    </ul>
  );
}
