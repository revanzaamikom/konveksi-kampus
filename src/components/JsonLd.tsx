/**
 * Minimal JSON-LD renderer.
 *
 * Mirrors the `seo-in-nextjs` skill's JsonLdScript pattern without adding a dependency
 * (AGENTS.md §15 — dependency rule).
 */
export function JsonLd({ data, scriptKey }: { data: unknown; scriptKey: string }) {
  return (
    <script
      key={scriptKey}
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
