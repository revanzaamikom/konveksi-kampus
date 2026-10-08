import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export: the Standard site is fully static (TECH_SPEC §1, §6).
   * Output goes to `out/`, which is what Netlify publishes (netlify.toml).
   *
   * Because the site is exported to static HTML, next/image cannot use the
   * on-demand optimizer, so it is marked `unoptimized`. Images are already
   * provided as .webp by the client assets.
   */
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
