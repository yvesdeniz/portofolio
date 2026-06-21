import { cn } from "@/lib/cn";

/**
 * Three bars bouncing out of phase — the "now playing" indicator.
 * The `eq` keyframe lives in globals.css (and is paused by reduced-motion).
 * Bars use `bg-current`, so color follows the parent's text color.
 */
export function Equalizer({ className }: { className?: string }) {
  return (
    <span
      className={cn("flex h-3 items-end gap-[2px] text-accent", className)}
      aria-hidden
    >
      {[0, 0.18, 0.36].map((delay) => (
        <span
          key={delay}
          className="eq-bar h-full w-[2px] rounded-full bg-current"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}
