import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassCard } from "@/components/GlassCard";
import { tools } from "@/data/tools";

export default function ToolsPage() {
  return (
    <PageShell wide>
      <SectionHeader
        path="~/tools"
        title="tools"
        description="the software i reach for. opinions held loosely, defaults chosen carefully."
      />

      <div className="space-y-10">
        {tools.map((group) => (
          <section key={group.category}>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-subtle">
              {group.category}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((tool) => {
                const Icon = tool.icon;
                return (
                  <GlassCard
                    key={tool.name}
                    interactive
                    className="flex items-center gap-4 p-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.02] text-fg">
                      <Icon className="h-5 w-5"/>
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium text-fg">{tool.name}</div>
                      {/* <div className="truncate text-sm text-muted">
                        {tool.note}
                      </div> */}
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
