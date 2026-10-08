"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrubMode = "rise" | "parallax" | "scale" | "wipe" | "slide";

/**
 * Scrub — scroll-linked motion (Modevo-style). Unlike Reveal (an IO class toggle),
 * Scrub continuously maps the element's viewport progress (0 = just entered from
 * below, 1 = about to leave above) to a transform/opacity. This is what makes the
 * motion feel tied to the scroll rather than to a fixed timeline.
 *
 * One shared rAF loop drives every instance on the page; only on-screen elements
 * are rendered. Transform/opacity only — never layout properties.
 */
export function Scrub({
  children,
  as: As = "div",
  className,
  mode = "rise",
  amount = 0.12,
  from = 0,
  to = 0,
}: {
  children: ReactNode;
  as?: React.ElementType;
  className?: string;
  /** rise: fade+slide up on entry. parallax: continuous translateY. scale: gentle zoom. wipe: clip reveal. slide: horizontal follow. */
  mode?: ScrubMode;
  /** Strength of the follow (parallax/slide) or the initial offset (rise/wipe). */
  amount?: number;
  /** Horizontal range for `slide` (from x → to x). */
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let pending = false;

    const paint = (p: number) => {
      // p: 0 → element enters from bottom, 1 → element exits through top.
      if (mode === "parallax") {
        el.style.transform = `translate3d(0, ${((p - 0.5) * amount * 100).toFixed(2)}px, 0)`;
        return;
      }
      if (mode === "scale") {
        const s = 1 - amount * (1 - Math.abs(p - 0.5) * 2);
        el.style.transform = `scale(${s.toFixed(4)})`;
        return;
      }
      if (mode === "slide") {
        const x = from + (to - from) * p;
        el.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
        return;
      }
      // rise + wipe share an in/out progress: fully revealed by p≈0.5.
      const q = Math.min(1, p / 0.5);
      const eased = 1 - Math.pow(1 - q, 3);
      if (mode === "wipe") {
        el.style.clipPath = `inset(0 0 ${(100 - eased * 100).toFixed(2)}% 0)`;
        el.style.opacity = "1";
      } else {
        el.style.opacity = (0.15 + eased * 0.85).toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - eased) * amount * 100).toFixed(2)}px, 0)`;
      }
    };

    const compute = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 when top hits the bottom edge, 1 when bottom hits the top edge.
      const total = r.height + vh;
      const p = (vh - r.top) / total;
      paint(Math.max(0, Math.min(1, p)));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !pending) {
          pending = true;
          requestAnimationFrame(() => {
            pending = false;
            compute();
          });
        }
      },
      { rootMargin: "20% 0px 20% 0px", threshold: 0 },
    );
    io.observe(el);

    const onScroll = () => {
      if (!visible || pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        if (visible) compute();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode, amount, from, to]);

  return (
    <As ref={ref} className={className}>
      {children}
    </As>
  );
}
