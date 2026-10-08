import type { MetadataRoute } from "next";
import { hasCanonicalUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const rules: MetadataRoute.Robots["rules"] = {
    userAgent: "*",
    // Keep the preview out of search indexes until a real domain is configured.
    allow: hasCanonicalUrl ? "/" : undefined,
    disallow: hasCanonicalUrl ? undefined : "/",
  };

  return {
    rules,
    // Only advertise a sitemap when a canonical URL exists.
    ...(hasCanonicalUrl ? { sitemap: `${siteConfig.url}/sitemap.xml` } : {}),
  };
}
