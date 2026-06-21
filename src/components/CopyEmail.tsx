"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

/** Click-to-copy email chip with a brief confirmation. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link below still works */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "email copied" : `copy ${email}`}
      className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-4 py-2 font-mono text-sm text-muted transition hover:border-line-strong hover:text-fg"
    >
      {email}
      <span aria-live="polite" className="inline-flex">
        {copied ? (
          <Check className="h-4 w-4 text-accent" strokeWidth={2} />
        ) : (
          <Copy className="h-4 w-4 transition-colors group-hover:text-fg" strokeWidth={1.7} />
        )}
      </span>
    </button>
  );
}
