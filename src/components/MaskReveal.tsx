"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * MaskReveal — the reference's signature entrance: text slides up from behind a
 * clipped edge, staggered per line. With `scroll` it is bidirectional: slides in
 * when the line enters the viewport and back out when it leaves, so scrolling up
 * replays it. Without `scroll` it runs once on mount (hero headings).
 */
export function MaskReveal({
  children,
  delay = 0,
  scroll = false,
}: {
  children: ReactNode;
  delay?: number;
  scroll?: boolean;
}) {
  const [phase, setPhase] = useState<"idle" | "armed" | "ready">("idle");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf1 = 0;
    let raf2 = 0;
    let outTimer = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf1 = requestAnimationFrame(() => setPhase("ready"));
      return () => cancelAnimationFrame(raf1);
    }

    const run = () => {
      if (outTimer) {
        clearTimeout(outTimer);
        outTimer = 0;
      }
      setPhase("armed");
      // Force a reflow so the transition replays reliably across re-entries.
      void el.offsetHeight;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setPhase("ready"));
      });
    };

    const out = () => {
      setPhase("armed");
      outTimer = window.setTimeout(() => {
        if (!el.isConnected) return;
        setPhase("armed");
      }, 120);
    };

    if (!scroll) {
      raf1 = requestAnimationFrame(run);
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        clearTimeout(outTimer);
      };
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
        else out();
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(outTimer);
      io.disconnect();
    };
  }, [scroll]);

  return (
    <span
      ref={ref}
      className="mask"
      {...(phase !== "idle" ? { "data-loaded": phase === "ready" ? "true" : "false" } : {})}
    >
      <span style={{ "--mask-delay": `${delay}ms` } as React.CSSProperties}>{children}</span>
    </span>
  );
}
