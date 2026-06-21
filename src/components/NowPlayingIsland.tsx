"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Equalizer } from "@/components/Equalizer";
import { cn } from "@/lib/cn";
import { fetchMusic, type MusicData } from "@/data/music";

const POLL_MS = 30_000;

export function NowPlayingIsland() {
  const [data, setData] = useState<MusicData | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const load = async () => {
      try {
        const fresh = await fetchMusic(controller.signal);
        if (active) setData(fresh);
      } catch {
      }
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      active = false;
      controller.abort();
      clearInterval(id);
    };
  }, []);

  const np = data?.nowPlaying;
  const live = np?.isPlaying === true;

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <AnimatePresence>
        {live && np && (
          <motion.div
            role="status"
            aria-label={`Now playing: ${np.track.title} by ${np.track.artist}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
            className={cn(
              "flex max-w-[90vw] items-center gap-3 rounded-full border border-line bg-bg-2/80 py-2 pl-2 pr-5 sm:max-w-md",
              "shadow-[0_16px_50px_-18px_rgba(0,0,0,0.85)] backdrop-blur-xl",
            )}
          >
            {np.image ? (
              <img
                src={np.image}
                alt=""
                className="h-9 w-9 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <span className="grid h-9 w-9 shrink-0 place-items-center">
                <Equalizer />
              </span>
            )}

            <div className="flex min-w-0 items-center gap-2 text-sm">
              <span className="truncate font-medium text-fg">{np.track.title}</span>
              <span className="shrink-0 text-subtle">·</span>
              <span className="truncate text-muted">{np.track.artist}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
