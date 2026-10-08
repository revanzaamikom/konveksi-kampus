import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Anton, Instrument_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { hasCanonicalUrl, siteConfig } from "@/lib/site";
import "./globals.css";

/**
 * Typography — reference-pinned (Modevo uses Anton + Instrument Sans).
 * Display: Anton (condensed, uppercase, oversized). UI/body: Instrument Sans.
 * See docs/DIRECTION-CONTRACT.md.
 */
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ogImage = "/brand/og-image.jpg";

export const metadata: Metadata = {
  // Only set metadataBase when a real canonical domain is configured; otherwise leave it
  // unset so Next.js uses root-relative URLs (no invented domain).
  ...(hasCanonicalUrl ? { metadataBase: new URL(siteConfig.url) } : {}),
  title: {
    default: `${siteConfig.displayName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.displayName}`,
  },
  description: siteConfig.description,
  /*
   * Metadata URLs are resolved against metadataBase (the canonical production domain),
   * so they must be plain root-relative paths — NOT prefixed with the GitHub Pages
   * basePath. assetPath() is only for <img src> in the components.
   */
  icons: {
    icon: [
      { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.displayName,
    title: `${siteConfig.displayName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.displayName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.displayName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${anton.variable} ${instrumentSans.variable} h-full antialiased`}>
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <a
          href="#main"
          className="bg-accent text-accent-foreground sr-only z-[100] rounded-[var(--radius-panel)] px-4 py-2 font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
        >
          Lewati ke konten utama
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
        <StickyWhatsApp />
      </body>
    </html>
  );
}
