export type ProjectStatus = "live" | "wip" | "archived";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  thumbnail?: string;
  year: string;
  role: string;
  status: ProjectStatus;
  tags: string[];
  overview: string;
  highlights: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "curse",
    title: "curse",
    tagline: "The last bot you'll ever n",
    year: "2026",
    thumbnail: '/projects/curse.png',
    role: "Lead Developer & Founder",
    status: "live",
    tags: ["Next.js", "TypeScript", "SapphireJS", "PostgreSQL"],
    overview:
      "Instead of juggling with 25 different discord bots, just get curse. Verification, moderation, economy, and fun. All under one prefix, start actually managing your community.",
    highlights: [
      "Fully strict typed codebase.",
      "Latest & Scalable Infrastructure",
      "Trusted by thousands.",
    ],
    links: [
      { label: "Live", href: "https://cvrse.lol" },
      { label: "Source", href: "https://github.com/yvesdeniz/cvrse" },
    ],
  },
  {
    slug: "subtext",
    title: "Subtext",
    tagline: "For women who deserve clarity.",
    year: "2026",
    thumbnail: '/projects/subtext.png',
    role: "Lead Developer & Founder",
    status: "live",
    tags: ["Stripe", "Bun", "Typescript", "NextJS", "Rust", "gpt-o4-mini"],
    overview:
      "A second placeholder case study. Swap in real copy: the brief, your approach, and the result. Mention the stack and your specific contribution if it was a team effort.",
    highlights: [
      "Real-time something, handled gracefully.",
      "Cut load time / cost / complexity by a meaningful amount.",
      "A detail a potential client would care about.",
    ],
    links: [{ label: "Live", href: "https://getsubtext.xyz" }],
  },
  {
    slug: "ripmcp",
    title: "Rip-MCP",
    tagline: "For ripping music at high quality.",
    year: "2026",
    role: "Lead Developer",
    status: "live",
    tags: ["Typescript", "Bun"],
    overview:
      "An mcp to rip, save, and search for music, DRM Sucks!",
    highlights: [
    ],
    links: [{ label: "Source", href: "https://github.com/yvesdeniz/rip-mcp" }],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
