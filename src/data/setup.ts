import type { ComponentType } from "react";
import {
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  Cpu,
  HardDrive,
  Mic,
  Armchair,
  Gpu,
  Settings
} from "lucide-react";


export type Gear = {
  name: string;
  spec: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

export type GearGroup = {
  category: string;
  items: Gear[];
};

export const setup: GearGroup[] = [
  {
    category: "the machine",
    items: [
      { name: "CPU", spec: "AMD Ryzen 7800X3D 8-Core 4.2GHz", icon: Cpu },
      { name: "GPU", spec: "AMD Radeon 9070XT ASRock Steel Legend 16GB", icon: Gpu },
      { name: "Motherboard", spec: "ASRock B850 Steel Legend", icon: Gpu },
      { name: "Memory", spec: "Klevv Cras V RGB 32GB DDR5 5600MHz", icon: HardDrive },
      { name: "Display", spec: "1080p 165hz Rampage Monitor", icon: Monitor },
      { name: "Other", spec: "Lian Li Fans & Case, Thermalright AIO", icon: Settings },
    ],
  },
  {
    category: "peripherals",
    items: [
      { name: "Keyboard", spec: "Madlions Mad He60", icon: Keyboard },
      { name: "Mouse", spec: "Hyperx Pulsefire Haste", icon: Mouse },
      { name: "Headphones", spec: "Truthear Gates", icon: Headphones },
      { name: "Microphone", spec: "Yeti X", icon: Mic },
    ],
  }
];
