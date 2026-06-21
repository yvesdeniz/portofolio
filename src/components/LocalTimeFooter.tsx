"use client";

import { useEffect, useState } from "react";
import { ownerTimeZone } from "@/data/contact";

function timeIn(timeZone?: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    ...(timeZone ? { timeZone } : {}),
  }).format(new Date());
}

function Clock({ value }: { value: string }) {
  return (
    <span className="nums rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-fg">
      {value || "--:--"}
    </span>
  );
}

/** "i'll get back to you. your 21:05 is my 20:05" — visitor's local time vs the
 *  owner's. Times render after mount to stay hydration-safe. */
export function LocalTimeFooter() {
  const [times, setTimes] = useState<{ you: string; me: string } | null>(null);

  useEffect(() => {
    const tick = () => setTimes({ you: timeIn(), me: timeIn(ownerTimeZone) });
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="mt-8 text-sm text-muted">
      i&apos;ll get back to you. your <Clock value={times?.you ?? ""} /> is my{" "}
      <Clock value={times?.me ?? ""} />
    </p>
  );
}
