/**
 * dependency-cruiser — enforce module boundaries (see docs/adr/ADR-002-content-layer.md).
 *
 * Rule of the project: the public UI must reach catalog data ONLY through the
 * content-layer (src/lib/content). It must never import raw data files directly.
 */
module.exports = {
  forbidden: [
    {
      name: "no-ui-to-raw-data",
      comment:
        "UI (app/components) must not import raw data files. Go through src/lib/content instead.",
      severity: "error",
      from: { path: "^(src/app|src/components)" },
      to: { path: "^src/data" },
    },
    {
      name: "no-circular",
      comment: "Circular dependencies make the codebase hard to reason about.",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "no-orphans",
      comment: "Orphan modules are dead code.",
      severity: "warn",
      from: {
        orphan: true,
        pathNot: [
          "\\.d\\.ts$",
          "(^|/)tsconfig\\.json$",
          "\\.config\\.(js|mjs|ts|cjs)$",
          "(^|/)types\\.ts$",
        ],
      },
      to: {},
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsConfig: { fileName: "tsconfig.json" },
    exclude: { path: "(\\.next|node_modules|\\.agents)" },
  },
};
