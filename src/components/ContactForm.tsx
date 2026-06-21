"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const fieldClass =
  "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-fg placeholder:text-subtle outline-none transition focus:border-accent/40 focus:bg-white/[0.03]";

const labelClass =
  "mb-1.5 block font-mono text-xs uppercase tracking-wider text-subtle";

/**
 * Backend-free contact form. Validates inline, then opens a prefilled email
 * to `to` (mailto) and shows a confirmation. Swap the submit handler for a
 * real endpoint/action later without touching the markup.
 */
export function ContactForm({ to }: { to: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "your name helps.";
    if (!email) next.email = "where can i reach you?";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "that email looks off.";
    if (!message) next.message = "say a little about the project.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-accent/30 bg-accent/[0.07] p-6 text-center"
      >
        <p className="font-display text-lg font-semibold text-fg">
          your email client is opening.
        </p>
        <p className="mt-1 text-sm text-muted">
          if it didn&apos;t, reach me directly at{" "}
          <span className="text-accent-soft">{to}</span>.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClass}>
          name <span className="text-accent">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="jane doe"
          className={cn(fieldClass, errors.name && "border-red-400/50")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-err" : undefined}
        />
        {errors.name && (
          <p id="name-err" role="alert" className="mt-1.5 text-xs text-red-300/90">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          email <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="jane@company.com"
          className={cn(fieldClass, errors.email && "border-red-400/50")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
        />
        {errors.email && (
          <p id="email-err" role="alert" className="mt-1.5 text-xs text-red-300/90">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="what are you building, and how can i help?"
          className={cn(fieldClass, "resize-y", errors.message && "border-red-400/50")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {errors.message && (
          <p id="message-err" role="alert" className="mt-1.5 text-xs text-red-300/90">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-medium text-accent-soft transition hover:bg-accent/15"
      >
        send message
        <Send
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.7}
        />
      </button>
    </form>
  );
}
