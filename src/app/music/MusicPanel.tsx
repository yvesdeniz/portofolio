"use client";

import { useEffect, useState } from "react";
import { Disc3, Volume2 } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Equalizer } from "@/components/Equalizer";
import { fetchMusic, type MusicData, type NowPlaying } from "@/data/music";

const POLL_MS = 30_000;

/** unix seconds -> "just now" / "5m ago" / "3h ago" / "2d ago". */
function relativeTime(unixSec: number): string {
  if (!unixSec) return "";
  const diff = Math.max(0, Date.now() / 1000 - unixSec);
  if (diff < 60) return "just now";
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function statusLabel(np: NowPlaying): string {
  if (np.isPlaying) return "now playing";
  const rel = relativeTime(np.playedAt);
  return rel ? `played ${rel}` : "last played";
}

export function MusicPanel({ initial }: { initial: MusicData }) {
  const [data, setData] = useState<MusicData>(initial);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const load = async () => {
      try {
        const fresh = await fetchMusic(controller.signal);
        if (active) setData(fresh);
      } catch {
        // keep the last good state; try again next interval
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

  const { nowPlaying: np, recent } = data;

  return (
    <>
      {/* now playing / last played */}
      <GlassCard className="flex items-center gap-4 p-4 sm:gap-5 sm:p-5">
        <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-gradient-to-br from-accent/25 via-bg-2 to-bg sm:h-24 sm:w-24">
          {np.image ? (
            // last.fm art host isn't worth an next/image remote-domain config
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={np.image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <Disc3
              className={`h-9 w-9 text-accent-soft ${np.isPlaying ? "animate-spin [animation-duration:6s]" : ""}`}
              strokeWidth={1.4}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 font-mono text-xs text-accent">
            {np.isPlaying ? (
              <Equalizer />
            ) : (
              <Volume2 className="h-3.5 w-3.5" strokeWidth={1.8} />
            )}
            {statusLabel(np)}
          </div>

          <div className="mt-1.5 truncate text-lg font-medium text-fg">
            {np.track.url ? (
              <a
                href={np.track.url}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent-soft"
              >
                {np.track.title}
              </a>
            ) : (
              np.track.title
            )}
          </div>
          <div className="truncate text-sm text-muted">
            {np.track.artist}
            {np.track.album ? ` — ${np.track.album}` : ""}
          </div>
        </div>
      </GlassCard>

      {/* recent scrobbles */}
      <h2 className="mb-3 mt-12 font-mono text-xs uppercase tracking-widest text-subtle">
        Last Listens
      </h2>
      <GlassCard className="divide-y divide-line/70 overflow-hidden">
        {recent.map((t, i) => (
          <div
            key={`${t.title}-${i}`}
            className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-white/[0.02]"
          >
            <span className="nums w-5 shrink-0 text-right font-mono text-xs text-subtle">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-fg">
                {t.url ? (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent-soft"
                  >
                    {t.title}
                  </a>
                ) : (
                  t.title
                )}
              </div>
              <div className="truncate text-xs text-muted">{t.artist}</div>
            </div>
            {t.album && (
              <span className="hidden truncate text-xs text-subtle sm:block">
                {t.album}
              </span>
            )}
          </div>
        ))}
      </GlassCard>
    </>
  );
}
