import { siteConfig, whatsappLink } from "@/lib/site";

const message = `Halo ${siteConfig.displayName}, saya ingin konsultasi pembuatan apparel custom.`;

/**
 * Sticky WhatsApp CTA for mobile (foundation §19: mobile conversion is a priority).
 * Hidden on >=sm to avoid covering content on larger screens, where CTAs are already visible.
 * The body gets matching bottom padding (see globals.css) so this never covers the footer.
 */
export function StickyWhatsApp() {
  return (
    <div className="border-border bg-card/95 fixed inset-x-0 bottom-0 z-40 border-t p-3 backdrop-blur-sm sm:hidden">
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-primary-foreground flex min-h-12 w-full items-center justify-center rounded-[var(--radius-control)] text-sm font-semibold"
      >
        Konsultasi via WhatsApp
      </a>
    </div>
  );
}
