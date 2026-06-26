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
        "relative isolate rounded-2xl border border-white/[0.08]",
        // frosted, vivid glass: blur + saturation bloom of whatever sits behind
        "backdrop-blur-xl backdrop-saturate-150",
        // luminous fill, brighter at the top like light pooling on the surface
        "bg-gradient-to-b from-[rgba(236,230,220,0.10)] to-[rgba(236,230,220,0.02)]",
        // specular top rim + dark refraction edge at the base + soft floating shadow
        "shadow-[inset_0_1px_0_0_rgba(236,230,220,0.22),inset_0_-1px_1px_0_rgba(0,0,0,0.35),0_10px_34px_-14px_rgba(0,0,0,0.7)]",
        interactive &&
          "transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/[0.14] hover:shadow-[inset_0_1px_0_0_rgba(236,230,220,0.3),inset_0_-1px_1px_0_rgba(0,0,0,0.35),0_22px_46px_-22px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
