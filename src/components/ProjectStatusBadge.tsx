import type { ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/cn";

const META: Record<ProjectStatus, { label: string; cls: string }> = {
  live: { label: "live", cls: "border-accent/30 bg-accent/10 text-accent" },
  wip: {
    label: "in progress",
    cls: "border-line-strong bg-white/[0.03] text-muted",
  },
  archived: {
    label: "archived",
    cls: "border-line bg-transparent text-subtle",
  },
  OSS: { label: "live", cls: "border-accent/30 bg-accent/10 text-accent" },
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const meta = META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        meta.cls,
      )}
    >
      {meta.label}
    </span>
  );
}
