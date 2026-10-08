/**
 * lint-staged config.
 *
 * Scoped to project source only. The `.agents/skills` tree (installed agent skills)
 * is intentionally excluded: it is vendored content, not our code, and linting it
 * both wastes time and overflows the Windows command line.
 */
const config = {
  "src/**/*.{ts,tsx,js,jsx,mjs,cjs}": ["prettier --write", "eslint --fix"],
  "src/**/*.{json,css}": ["prettier --write"],
  "./*.{json,md,cjs,mjs,ts}": ["prettier --write"],
  "docs/**/*.md": ["prettier --write"],
  "tools/**/*.{mjs,js}": ["prettier --write"],
};

export default config;
