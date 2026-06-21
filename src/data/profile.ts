import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import {
  GithubIcon,
  TelegramIcon,
  DiscordIcon,
} from "@/components/BrandIcons";

export type Social = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const profile = {
  name: "saint",
  handle: "@saint",
  role: "software engineer",
  location: "Azerbaijan, Baku",
  email: "saint@afra.id",

  available: true,

  bio: "im a 20 year old **software engineer**. i care about **clean architecture**, **clean code**, **fast interfaces**, and software that's not bloated. right now i'm **available** for select freelance work pull up a project or say hello.",

  socials: [
    { label: "GitHub", href: "https://github.com/", icon: GithubIcon },
    { label: "Discord", href: "https://discord.com/users/1306505500699000856", icon: DiscordIcon },
    { label: "Discord", href: "https://discord.com/users/1306505500699000856", icon: TelegramIcon },
    { label: "Email", href: "mailto:saint@afra.id", icon: Mail },
  ] satisfies Social[],
};
