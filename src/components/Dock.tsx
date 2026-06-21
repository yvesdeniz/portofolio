"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { NAV, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/cn";

const BASE = 46; // resting icon box (>= 44px touch target)
const PEAK = 66; // size directly under the cursor
const REACH = 130; // how far the magnify effect spreads (px)

export function Dock() {
  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6">
      <motion.nav
        aria-label="Primary"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={reduce ? false : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="flex items-end gap-1.5 rounded-2xl border border-line bg-bg-2/70 px-2.5 pb-2 pt-2 shadow-[0_16px_50px_-18px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:gap-2 sm:px-3"
      >
        {NAV.map((item) => (
          <DockIcon
            key={item.href}
            item={item}
            mouseX={mouseX}
            reduce={!!reduce}
            active={
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/")
            }
          />
        ))}
      </motion.nav>
    </div>
  );
}

function DockIcon({
  item,
  mouseX,
  active,
  reduce,
}: {
  item: NavItem;
  mouseX: MotionValue<number>;
  active: boolean;
  reduce: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return REACH + 1;
    return val - (box.x + box.width / 2);
  });

  // when reduced motion is on, the box stays a constant size
  const sizeTarget = useTransform(
    distance,
    [-REACH, 0, REACH],
    reduce ? [BASE, BASE, BASE] : [BASE, PEAK, BASE],
  );
  const size = useSpring(sizeTarget, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });

  const Icon = item.icon;

  return (
    <Link
      ref={ref}
      href={item.href}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className="group relative flex flex-col items-center"
    >
      {/* filesystem-path tooltip */}
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-line bg-bg px-2 py-1 font-mono text-[11px] text-muted opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        {item.path}
      </span>

      <motion.span
        style={{ width: size, height: size }}
        className={cn(
          "flex aspect-square items-center justify-center rounded-xl border transition-colors duration-200",
          active
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-line bg-white/[0.02] text-muted group-hover:text-fg",
        )}
      >
        <Icon className="h-[44%] w-[44%]" strokeWidth={1.6} />
      </motion.span>

      {/* active indicator */}
      <span
        className={cn(
          "mt-1.5 h-1 w-1 rounded-full transition-colors duration-200",
          active ? "bg-accent" : "bg-transparent",
        )}
      />
    </Link>
  );
}
