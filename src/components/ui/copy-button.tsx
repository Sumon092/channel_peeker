"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
  className = "",
  ariaLabel,
}: {
  text: string;
  label?: string;
  className?: string;
  /** Contextual accessible name (must contain the visible label, per WCAG 2.5.3). */
  ariaLabel?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  return (
    <button
      type="button"
      aria-label={state === "idle" ? ariaLabel : undefined}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setState("copied");
        } catch {
          // Clipboard can be blocked; the text is still selectable on the page.
          setState("failed");
        }
        setTimeout(() => setState("idle"), 1500);
      }}
      className={`rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition hover:border-accent active:scale-[0.97] ${state === "copied" ? "text-good" : state === "failed" ? "text-bad" : ""} ${className}`}
    >
      <span aria-live="polite">{state === "copied" ? "✓ Copied" : state === "failed" ? "Copy failed" : label}</span>
    </button>
  );
}
