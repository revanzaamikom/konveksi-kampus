/**
 * Site-wide configuration — the single place for brand + contact facts.
 *
 * Contact values are taken from the client's PUBLIC sources (see CLIENT_DATA.md):
 * Instagram bio, Linktree, Facebook. Confirm with the client before a production launch.
 */

export const siteConfig = {
  name: "KonveksiKampus",
  shortName: "KonveksiKampus",
  displayName: "Konveksi Kampus",
  tagline: "Vendor Konveksi Yogyakarta",
  description:
    "Vendor konveksi Yogyakarta sejak 2012. Melayani pembuatan jaket, kaos, korsa, workshirt, wearpack, rompi, jas lab, dan jas almamater dengan kualitas terbaik dan harga terjangkau.",
  url: "https://www.konveksikampus.com", // from public Facebook post
  locale: "id_ID",
  established: 2012, // from Instagram bio ("est. 2012")
  /**
   * Primary WhatsApp in international format without "+" or spaces.
   * Source: Linktree (wa.me/6288221729053).
   * NOTE: a second public number (0813-6702-9003) exists — confirm the primary with the client.
   */
  whatsappNumber: "6288221729053",
  whatsappNumberAlt: "6281367029003",
  instagram: "konveksikampus.yk",
  email: "halo@konveksikampus.com", // TODO: confirm real email with client
  address: "Jl. Betoro Raya No.1, Yogyakarta", // partial — from public Facebook post
  socials: {
    instagram: "https://www.instagram.com/konveksikampus.yk/",
    linktree: "https://linktr.ee/konveksikampus.yk",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Base path the site is served from.
 *
 * Empty on Netlify / local dev (served from root). Set to "/konveksi-kampus" for the
 * GitHub Pages build, where the site lives under a repo subpath. Mirrors next.config.ts.
 */
export const basePath = process.env.GITHUB_PAGES === "true" ? "/konveksi-kampus" : "";

/**
 * Prefix a public asset path with the base path.
 *
 * Needed because next/image does NOT apply basePath when `unoptimized: true`
 * (static export), so `/images/...` must be resolved manually.
 */
export function assetPath(path: string): string {
  if (!path) return path;
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

/** Build a WhatsApp deep-link with a prefilled message. */
export function whatsappLink(message: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}
