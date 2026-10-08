"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const reset = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = "";
      });
    };
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = Math.max(-6, Math.min(6, e.clientX - (r.left + r.width / 2))) / 6;
      const y = Math.max(-6, Math.min(6, e.clientY - (r.top + r.height / 2))) / 6;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${(x * 6).toFixed(1)}px,${(y * 6).toFixed(1)}px,0)`;
      });
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
      el.style.transform = "";
    };
  }, []);

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}
