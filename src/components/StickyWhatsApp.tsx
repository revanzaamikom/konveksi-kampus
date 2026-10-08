"use client";

import { useEffect, useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site";

const message = `Halo ${siteConfig.displayName}, saya ingin konsultasi pembuatan apparel custom.`;

/**
 * Sticky WhatsApp CTA for mobile (foundation §19: mobile conversion is a priority).
 *
 * Appears only after the hero has scrolled away and hides again whenever another
 * WhatsApp CTA (inline hero CTA, final CTA, contact cards) is on screen, so the
 * page never shows two identical CTAs at once (design-taste: no duplicate CTA
 * intent). Hidden on >=sm where inline CTAs are already visible.
 */
export function StickyWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A WhatsApp CTA is "prominent" when it sits well inside the viewport.
    const ctaProminent = () => {
      const zones = document.querySelectorAll<HTMLElement>("[data-wa-cta]");
      for (const el of zones) {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85 && r.bottom > window.innerHeight * 0.15) return true;
      }
      return false;
    };

    // The bar shows only past the hero and only when no in-page CTA is visible.
    const compute = () => window.scrollY > 120 && !ctaProminent();

    let raf = 0;
    const update = () => {
      setShow(compute());
      raf = 0;
    };
    const request = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    // Initial state + subscribe to scroll/resize (rAF-throttled).
    if (reduce) {
      // Still functional without motion: compute once and on scroll, no transition.
      update();
    } else {
      request();
    }
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <div
      data-sticky-wa
      className={`border-border bg-card/95 fixed inset-x-0 bottom-0 z-40 border-t p-3 backdrop-blur-sm transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className="btn-wipe bg-primary text-primary-foreground flex min-h-12 w-full items-center justify-center rounded-[var(--radius-control)] text-sm font-semibold"
      >
        Konsultasi via WhatsApp
      </a>
    </div>
  );
}
