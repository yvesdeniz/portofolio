import {
  House,
  Music,
  SquareCode,
  Monitor,
  FolderGit2,
  Mail,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  path: string;
  icon: LucideIcon;
};

export const NAV: NavItem[] = [
  { href: "/", label: "home", path: "~", icon: House },
  { href: "/music", label: "music", path: "~/music", icon: Music },
  { href: "/tools", label: "tools", path: "~/tools", icon: SquareCode },
  { href: "/setup", label: "setup", path: "~/setup", icon: Monitor },
  { href: "/projects", label: "projects", path: "~/projects", icon: FolderGit2 },
  { href: "/contact", label: "contact", path: "~/contact", icon: Mail },
];
