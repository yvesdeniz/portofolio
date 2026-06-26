import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard } from "@/components/GlassCard";
import { Eyebrow } from "@/components/SectionHeader";
import { StatusPill, SocialPill } from "@/components/Pill";
import { NowPlayingIsland } from "@/components/NowPlayingIsland";
import { profile } from "@/data/profile";

function Bio({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <p className="text-pretty text-[17px] leading-relaxed text-muted">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-medium text-fg">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

const Dot = () => <span className="text-subtle">·</span>;

export default function Home() {
  return (
    <PageShell center>
      <div className="max-w-2xl">
        <Eyebrow>~</Eyebrow>

        <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-fg sm:text-7xl">
          {profile.name}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-muted">
          <span className="flex items-center gap-2">
            {profile.handle}
          </span>
          <Dot />
          <span>{profile.role}</span>
          <Dot />
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.7} />
            {profile.location}
          </span>
        </div>

        <GlassCard className="mt-8 p-6 sm:p-7">
          <Bio text={profile.bio} />
        </GlassCard>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {profile.available && <StatusPill label="available for work" />}
          <div className="flex items-center gap-2">
            {profile.socials.map((s) => (
              <SocialPill key={s.label} href={s.href} icon={s.icon} label={s.label} />
            ))}
          </div>
        </div>

        <Link
          href="/projects"
          className="group mt-9 inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-fg transition duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent-soft"
        >
          view work
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.8}
          />
        </Link>
      </div>

      <NowPlayingIsland />
    </PageShell>
  );
}
