import type { ComponentType } from "react";
import {
  Boxes,
  Package,
  Terminal,
} from "lucide-react";
import { GoIcon, RustIcon, TypescriptIcon, PythonIcon, JSIcon, BunIcon, NextIcon, ReactIcon, NodeIcon, VSCodeIcon, TermiusIcon, LinuxIcon, DockerIcon, ClaudeIcon } from "@/components/BrandIcons";

export type Tool = {
  name: string;
  icon: ComponentType<{ className?: string }>;
};

export type ToolGroup = {
  category: string;
  items: Tool[];
};

export const tools: ToolGroup[] = [
  {
    category: "languages",
    items: [
      { name: "TypeScript", icon: TypescriptIcon },
      { name: "Rust", icon: RustIcon },
      { name: "Go", icon: GoIcon },
      { name: "Python", icon: PythonIcon },
      { name: "Javascript", icon: JSIcon } ,
      
    ],
  },
  {
    category: "frameworks",
    items: [
      { name: "Bun", icon: BunIcon },
      { name: "Next.js", icon: NextIcon },
      { name: "React", icon: ReactIcon },
      { name: "Node", icon: NodeIcon },
    ],
  },
  {
    category: "tools & apps",
    items: [
      { name: "VS Code", icon: VSCodeIcon },
      { name: "Termius", icon: TermiusIcon },
      { name: "Docker", icon: DockerIcon },
      { name: "Linux", icon: LinuxIcon },
      { name: "Claude", icon: ClaudeIcon },
    ],
  },
];
