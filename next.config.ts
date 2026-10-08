import type { NextConfig } from "next";

/**
 * GitHub Pages serves the project site from a subpath: /<repo>/
 * Set GITHUB_PAGES=true during that build so assets resolve under the subpath.
 * Local dev and Netlify keep basePath = "" (served from the domain root).
 */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "konveksi-kampus";

const nextConfig: NextConfig = {
  /**
   * Static export: the Standard site is fully static (TECH_SPEC §1, §6).
   * `out/` is published by Netlify (netlify.toml) and GitHub Pages (Actions).
   */
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGitHubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
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
