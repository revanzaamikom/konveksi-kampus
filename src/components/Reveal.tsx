"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveal (matches the reference's fade/slide-up-on-scroll).
 *
 * Uses IntersectionObserver — never a scroll listener (impeccable/emil performance rules:
 * scroll listeners cause continuous reflows and kill mobile). The CSS that hides the element
 * only applies when `[data-reveal]` is present, which this component adds on mount, so the
 * page remains fully readable without JS.
 */
export function Reveal({
  children,
  as: As = "div",
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger in ms. */
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: reveal immediately, no observer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-revealed", "true");
      return;
    }

    el.setAttribute("data-reveal", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (delay) target.style.transitionDelay = `${delay}ms`;
            target.setAttribute("data-revealed", "true");
            io.unobserve(target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <As ref={ref} className={className}>
      {children}
    </As>
  );
}
