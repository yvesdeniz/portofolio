import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FolderGit2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard } from "@/components/GlassCard";
import { Chip } from "@/components/Pill";
import { Eyebrow } from "@/components/SectionHeader";
import { ProjectStatusBadge } from "@/components/ProjectStatusBadge";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <PageShell>
      <Link
        href="/projects"
        className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          strokeWidth={1.7}
        />
        projects
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3">
          <Eyebrow>{`~/projects/${project.slug}`}</Eyebrow>
          <ProjectStatusBadge status={project.status} />
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted">
          {project.tagline}
        </p>
        <div className="mt-4 flex items-center gap-2 font-mono text-xs text-subtle">
          <span>{project.year}</span>
          <span>·</span>
          <span>{project.role}</span>
        </div>
      </header>

      {/* hero placeholder */}
      <GlassCard className="relative mt-8 grid aspect-[16/9] place-items-center overflow-hidden p-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/12 via-transparent to-transparent" />
        <FolderGit2 className="relative h-9 w-9 text-subtle" strokeWidth={1.3} />
      </GlassCard>

      {/* overview */}
      <section className="mt-10">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-subtle">
          overview
        </h2>
        <p className="text-pretty text-[17px] leading-relaxed text-muted">
          {project.overview}
        </p>
      </section>

      {/* highlights */}
      <section className="mt-10">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-subtle">
          highlights
        </h2>
        <ul className="space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* stack */}
      <section className="mt-10">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-subtle">
          stack
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </section>

      {/* links */}
      {project.links.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-3">
          {project.links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={
                i === 0
                  ? "inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent-soft transition hover:bg-accent/15"
                  : "inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-fg transition hover:border-line-strong hover:bg-white/[0.04]"
              }
            >
              {link.label}
              <ExternalLink className="h-4 w-4" strokeWidth={1.7} />
            </a>
          ))}
        </div>
      )}
    </PageShell>
  );
}
