"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Parallax({
  children,
  speed = 0.1,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Parallax is a desktop depth cue; on phones the plates nearly fill the
    // viewport, so the drift just looks like misalignment. Skip it under 768px.
    if (window.matchMedia("(max-width: 767px)").matches) return;
    let raf = 0;
    let cur = 0;
    let visible = false;
    const render = () => {
      raf = 0;
      if (!visible) return;
      const r = el.getBoundingClientRect();
      const raw = (r.top + r.height / 2 - window.innerHeight / 2) * speed * -1;
      const tgt = Math.max(-120, Math.min(120, raw));
      cur += (tgt - cur) * 0.15;
      if (Math.abs(cur) > 0.5) el.style.transform = `translate3d(0,${cur.toFixed(1)}px,0)`;
      else if (el.style.transform) el.style.transform = "";
      if (Math.abs(tgt - cur) > 0.5) raf = requestAnimationFrame(render);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(el);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      el.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
