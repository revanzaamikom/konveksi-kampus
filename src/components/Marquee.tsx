import type { ReactNode } from "react";

/**
 * Marquee — a continuous horizontal strip (reference: Modevo's scrolling band).
 * Pure CSS animation; pauses on hover; disabled under prefers-reduced-motion.
 * Content is duplicated so the loop is seamless.
 */
export function Marquee({
  children,
  className,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`marquee-wrapper border-border overflow-hidden border-y py-6 ${className ?? ""}`}
    >
      <div className={`marquee-track${reverse ? "marquee-reverse" : ""}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
