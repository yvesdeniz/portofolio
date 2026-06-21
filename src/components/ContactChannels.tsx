"use client";

import { useState, type ComponentType } from "react";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { contacts, type ContactChannel } from "@/data/contact";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

function Avatar({ src, Icon }: { src?: string; Icon: IconType }) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;
  return (
    <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-white/[0.03] text-fg">
      {showImg ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <Icon className="h-6 w-6" />
      )}
    </span>
  );
}

export function ContactChannels() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function copy(channel: ContactChannel) {
    try {
      await navigator.clipboard.writeText(channel.handle);
      setCopiedKey(channel.key);
      setTimeout(() => setCopiedKey((k) => (k === channel.key ? null : k)), 1800);
    } catch {
    }
  }

  const primary = contacts.find((c) => c.primary);
  const rest = contacts.filter((c) => !c.primary);

  return (
    <div className="space-y-3">
      {primary && (
        <GlassCard className="p-5 sm:p-6">
          <div className="flex gap-4">
            <Avatar src={primary.avatar} Icon={primary.icon} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-lg font-semibold text-fg">
                {primary.handle}
              </div>
              <div className="mt-0.5 truncate text-sm text-muted">
                {primary.note}
              </div>

              <div className="mt-3.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copy(primary)}
                  aria-label={
                    copiedKey === primary.key
                      ? "handle copied"
                      : `copy ${primary.handle}`
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 text-sm text-muted transition hover:border-line-strong hover:text-fg"
                >
                  <span aria-live="polite" className="inline-flex">
                    {copiedKey === primary.key ? (
                      <Check className="h-4 w-4 text-accent" strokeWidth={2} />
                    ) : (
                      <Copy className="h-4 w-4" strokeWidth={1.7} />
                    )}
                  </span>
                  {copiedKey === primary.key ? "copied" : "copy handle"}
                </button>

                <a
                  href={primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 text-sm text-muted transition hover:border-line-strong hover:text-fg"
                >
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.7}
                  />
                  open
                </a>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {rest.map((c) => {
          const Icon = c.icon;
          const copied = copiedKey === c.key;
          return (
            <GlassCard key={c.key} className="flex items-center gap-3 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.02] text-fg">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-fg">{c.handle}</div>
                <div className="truncate text-sm text-muted">{c.note}</div>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => copy(c)}
                  aria-label={copied ? "handle copied" : `copy ${c.handle}`}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.02] text-muted transition hover:border-line-strong hover:text-fg"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-accent" strokeWidth={2} />
                  ) : (
                    <Copy className="h-4 w-4" strokeWidth={1.7} />
                  )}
                </button>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`open ${c.label}`}
                  className="group grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.02] text-muted transition hover:border-line-strong hover:text-fg"
                >
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.7}
                  />
                </a>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
