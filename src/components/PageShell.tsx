import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Consistent page container: centered column, comfortable reading width,
 * and bottom padding that clears the floating dock on every screen.
 * `wide` opens the column up for grids (projects, tools, setup).
 * `center` vertically centers content (used by the home hero).
 */
export function PageShell({
  children,
  wide = false,
  center = false,
  className,
}: {
  children: ReactNode;
  wide?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "mx-auto flex min-h-dvh w-full flex-col px-5 pb-36 sm:px-6",
        wide ? "max-w-5xl" : "max-w-3xl",
        center ? "justify-center pt-28" : "pt-20 sm:pt-28",
        className,
      )}
    >
      {children}
    </main>
  );
}
