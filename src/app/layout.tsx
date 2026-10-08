import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { assetPath, siteConfig } from "@/lib/site";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const ogImage = assetPath("/brand/og-image.jpg");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.displayName} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.displayName}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: assetPath("/brand/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { url: assetPath("/brand/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
      { url: assetPath("/brand/favicon.ico"), sizes: "any" },
    ],
    apple: [{ url: assetPath("/brand/apple-touch-icon.png"), sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.displayName,
    title: `${siteConfig.displayName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.displayName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.displayName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${lexend.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
