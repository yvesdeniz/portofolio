import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconType = ComponentType<{ className?: string }>;

/** Status chip with a live dot, e.g. "available for work". */
export function StatusPill({
  label,
  tone = "live",
  className,
}: {
  label: string;
  tone?: "live" | "idle";
  className?: string;
}) {
  const live = tone === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-muted",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        {live && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            live ? "bg-accent" : "bg-subtle",
          )}
        />
      </span>
      {label}
    </span>
  );
}

/** Icon (or icon+label) pill that links out. Used for socials & quick links. */
export function SocialPill({
  href,
  icon: Icon,
  label,
  showLabel = false,
}: {
  href: string;
  icon: IconType;
  label: string;
  showLabel?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] text-fg",
        "transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:text-accent",
        showLabel ? "px-3.5 py-2" : "h-10 w-10 justify-center",
      )}
    >
      <Icon className="h-[18px] w-[18px]" />
      {showLabel && <span className="text-sm">{label}</span>}
    </a>
  );
}

/** Plain content chip used for tags (tech stack, categories…). */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}
