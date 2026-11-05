"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy", className = "" }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // Clipboard can be blocked; the text is still selectable on the page.
        }
      }}
      className={`rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition hover:border-accent active:scale-[0.97] ${copied ? "text-good" : ""} ${className}`}
    >
      <span aria-live="polite">{copied ? "✓ Copied" : label}</span>
    </button>
  );
}
