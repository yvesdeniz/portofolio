import { Image as ImageIcon } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassCard } from "@/components/GlassCard";
import { setup } from "@/data/setup";

export default function SetupPage() {
  return (
    <PageShell wide>
      <SectionHeader
        path="~/setup"
        title="setup"
        description="the desk and the machine. where the work actually happens."
      />

      {/* battlestation photo placeholder 
      <GlassCard className="relative mb-12 grid aspect-[16/7] place-items-center overflow-hidden p-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <div className="relative flex flex-col items-center gap-2 text-subtle">
          <ImageIcon className="h-7 w-7" strokeWidth={1.4} />
          <span className="font-mono text-xs">
            battlestation photo — drop yours in /public
          </span>
        </div>
      </GlassCard> */}

      <div className="space-y-10">
        {setup.map((group) => (
          <section key={group.category}>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-subtle">
              {group.category}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.items.map((gear) => {
                const Icon = gear.icon;
                return (
                   <GlassCard
                       key={gear.name}
                       className="flex items-center gap-4 overflow-hidden p-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.02] text-fg">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-fg">{gear.name}</div>
                      <div className="nums truncate font-mono text-sm text-muted">
                        {gear.spec}
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
