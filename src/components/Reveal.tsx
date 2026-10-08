"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Reveal — bidirectional scroll animation (fade+slide, or clip wipe for images).
 * A rAF-throttled scroll listener drives a geometric viewport test, so the element
 * animates IN when it enters the viewport and back OUT when it leaves — scrolling
 * up re-triggers it. Reliable under fast/large scroll jumps where an
 * IntersectionObserver can coalesce the transition into a single missed callback.
 *
 * Progressive enhancement: the hidden state (`data-reveal` / `data-clip`) is only
 * applied by JS after mount, so without JS the content renders fully visible.
 */
export function Reveal({
  children,
  as: As = "div",
  className,
  delay = 0,
  clip = false,
  variant = "up",
  trigger = "lazy",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger in ms. */
  delay?: number;
  /** Use a clip-path wipe (for image plates) instead of fade+slide. */
  clip?: boolean;
  /** Entrance direction: up (default), left, right, scale. */
  variant?: "up" | "left" | "right" | "scale";
  /** eager: hero/strip (no top inset). lazy: below fold (small inset). */
  trigger?: "eager" | "lazy";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Arm in JS only: apply the hidden-state marker so SSR output stays visible
    // until this runs (progressive enhancement), then animate from hidden → shown.
    if (clip) el.setAttribute("data-clip", "");
    else {
      el.setAttribute("data-reveal", "");
      if (variant !== "up") el.setAttribute(`data-reveal-${variant}`, "");
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-revealed", "true");
      return;
    }

    if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);

    const eager = trigger === "eager";
    let outTimer: ReturnType<typeof setTimeout> | null = null;

    // Keep `will-change` only while the element is on screen (GPU hint lifecycle).
    const arm = () => el.classList.add("animating");
    const disarm = () => el.classList.remove("animating");

    const revealNow = () => {
      arm();
      el.setAttribute("data-revealed", "true");
    };

    // Geometric viewport test, driven by scroll/rAF. More reliable than IO for
    // fast programmatic jumps (IO can coalesce a big jump into one "not
    // intersecting" callback) and it gives a clean in/out two-way toggle.
    const inset = eager ? 0 : window.innerHeight * 0.06;
    const isIn = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight - inset && r.bottom > 0;
    };

    let last = false;
    const sync = () => {
      const now = isIn();
      if (now === last) return;
      last = now;
      if (now) {
        if (outTimer) {
          clearTimeout(outTimer);
          outTimer = null;
        }
        revealNow();
      } else {
        // Animate back out shortly after leaving, so re-entry replays cleanly.
        arm();
        outTimer = setTimeout(() => {
          el.removeAttribute("data-revealed");
          outTimer = setTimeout(disarm, 900);
        }, 120);
      }
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        sync();
      });
    };

    // Initial state: reveal immediately if already in view (hero/eager), otherwise
    // stay hidden until the user scrolls it in. A double rAF lets the browser paint
    // the hidden state first so the entrance transition actually plays.
    if (isIn()) {
      last = true;
      requestAnimationFrame(() => revealNow());
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (outTimer) clearTimeout(outTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [delay, clip, variant, trigger]);

  return (
    <As ref={ref} className={className}>
      {children}
    </As>
  );
}
