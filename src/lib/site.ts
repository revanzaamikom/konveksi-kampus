/**
 * Site-wide configuration — the single place for brand + contact facts.
 *
 * Values marked TODO are placeholders: the client has not yet provided them.
 * Do not invent contact details (see AGENTS.md §7).
 */

export const siteConfig = {
  name: "KonveksiKampus",
  shortName: "KonveksiKampus",
  tagline: "Konveksi Kampus",
  description:
    "Vendor konveksi untuk mahasiswa dan masyarakat umum. Melayani pembuatan kaos, jaket, workshirt, rompi, jas, dan wearpack dengan kualitas terbaik dan harga terjangkau.",
  url: "https://konveksikampus.example", // TODO: real domain
  locale: "id_ID",
  /**
   * WhatsApp number in international format without "+" or spaces.
   * TODO: confirm with client. Placeholder left intentionally obvious.
   */
  whatsappNumber: "6280000000000", // TODO: real WhatsApp number
  email: "halo@konveksikampus.example", // TODO: real email
  address: "Yogyakarta, Indonesia", // TODO: confirm with client
  socials: {
    instagram: "", // TODO: confirm with client
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
