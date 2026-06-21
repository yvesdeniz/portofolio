import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassCard } from "@/components/GlassCard";
import { Chip } from "@/components/Pill";
import { ProjectStatusBadge } from "@/components/ProjectStatusBadge";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <PageShell wide>
      <SectionHeader
        path="~/projects"
        title="projects"
        description="selected work. open one for the full story — problem, approach, outcome."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="group">
            <GlassCard interactive className="flex h-full flex-col overflow-hidden">
              {/* thumbnail — real image when set, else a gradient placeholder */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-gradient-to-br from-accent/12 via-bg-2 to-bg">
                {p.thumbnail ? (
                  // plain img: local /public asset, no next/image config needed
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.thumbnail}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center">
                    <FolderGit2
                      className="h-8 w-8 text-subtle transition-colors group-hover:text-accent-soft"
                      strokeWidth={1.3}
                    />
                  </div>
                )}
                <span className="absolute right-3 top-3">
                  <ProjectStatusBadge status={p.status} />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-fg">
                    {p.title}
                  </h3>
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    strokeWidth={1.8}
                  />
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {p.tagline}
                </p>

                <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-subtle">
                  <span>{p.year}</span>
                  <span>·</span>
                  <span>{p.role}</span>
                </div>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {p.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
