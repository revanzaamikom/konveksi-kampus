import type { Material } from "@/lib/content/types";

/**
 * Materials (foundation §11). Only renders spec rows that carry real data — empty specs
 * are omitted rather than shown as blanks (foundation §22).
 */
export function MaterialsList({ materials }: { materials: Material[] }) {
  if (materials.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {materials.map((material) => {
        const hasSpecs =
          material.character ||
          material.thickness ||
          material.texture ||
          (material.benefits && material.benefits.length > 0) ||
          material.recommendedFor;

        return (
          <li
            key={material.id}
            className="border-border bg-card rounded-[var(--radius-surface)] border p-5"
          >
            <h3 className="text-foreground font-medium">{material.name}</h3>
            {hasSpecs ? (
              <dl className="text-muted-foreground mt-3 space-y-2 text-sm">
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
            ) : (
              <p className="text-muted-foreground mt-2 text-sm">
                Tanyakan detail bahan ini saat konsultasi.
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
