import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A short amber rule + mono label. Pairs the accent with the path device. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-xs tracking-wide",
        className,
      )}
    >
      <span className="h-px w-6 bg-line-strong" />
      <span className="text-accent">{children}</span>
    </span>
  );
}

/** Standard top-of-page header used by every sub-page. */
export function SectionHeader({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-10 sm:mb-12">
      <Eyebrow>{path}</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted">
          {description}
        </p>
      )}
    </header>
  );
}
