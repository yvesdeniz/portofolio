import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background";
import { Dock } from "@/components/Dock";
import { profile } from "@/data/profile";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.name}, ${profile.role}. ${profile.bio.replace(/\*\*/g, "")}`,
  icons: {
    icon: './icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${bricolage.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <Background />
        {children}
        <Dock />
      </body>
    </html>
  );
}
