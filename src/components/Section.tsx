import type { ReactNode } from "react";

/**
 * Page section wrapper with consistent horizontal padding and max width.
 * Vertical rhythm is intentionally NOT fixed here — sections vary their own spacing
 * (antislop R-05: uniform spacing flattens the page).
 */
export function Section({
  children,
  className,
  as: As = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
}) {
  return (
    <As className={className}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </As>
  );
}
