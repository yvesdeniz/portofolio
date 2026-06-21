import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";


export function GlassCard({
  as: Tag = "div",
  interactive = false,
  className,
  children,
}: {
  as?: ElementType;
  interactive?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "relative rounded-2xl border border-line",
        "bg-gradient-to-b from-white/[0.045] to-white/[0.012]",
        "shadow-[inset_0_1px_0_rgba(236,230,220,0.06)] backdrop-blur-sm",
        interactive &&
          "transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[inset_0_1px_0_rgba(236,230,220,0.08),0_18px_40px_-24px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
