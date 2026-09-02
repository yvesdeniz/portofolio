import type { ComponentType } from "react";
import {
  GithubIcon,
  TelegramIcon,
  DiscordIcon,
} from "@/components/BrandIcons";

export type ContactChannel = {
  key: string;
  label: string;
  handle: string;
  note: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  primary?: boolean;
  avatar?: string;
};
export const ownerTimeZone = "Asia/Baku";

export const contacts: ContactChannel[] = [
  {
    key: "discord",
    label: "Discord",
    handle: "@soakedpanties06",
    note: "fastest way to reach me :)",
    href: "https://discord.com/users/1306505500699000856",
    icon: DiscordIcon,
    primary: true,
    avatar: "/avatar_new.jpg",
  },
  {
    key: "github",
    label: "GitHub",
    handle: "@yvesdeniz",
    note: "repos & builds",
    href: "https://github.com/yvesdeniz",
    icon: GithubIcon,
  },
  {
    key: "telegram",
    label: "Telegram",
    handle: "@sa1ntdeniz",
    note: "for serious talks or deals",
    href: "https://t.me/sa1ntdeniz",
    icon: TelegramIcon,
  },
];
