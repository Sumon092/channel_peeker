"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

interface ToolInputProps {
  label: string;
  placeholder: string;
  examples?: { label: string; value: string }[];
  submitLabel?: string;
  loading?: boolean;
  /** Optional instant validation; return an error message or null. */
  validate?: (value: string) => string | null;
  onSubmit: (value: string) => void;
}

export function ToolInput({ label, placeholder, examples = [], submitLabel = "Go", loading, validate, onSubmit }: ToolInputProps) {
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(v: string) {
    const msg = validate?.(v) ?? (v.trim() ? null : "Paste a link, @handle or ID first.");
    setError(msg);
    if (!msg) onSubmit(v.trim());
  }

  // Arriving from the home-page search (?q=...): pre-fill and run once.
  const ranFromQuery = useRef(false);
  useEffect(() => {
    if (ranFromQuery.current) return;
    ranFromQuery.current = true;
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      // Syncing once from the URL (an external source) on mount; the page itself is static.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(q);
      submit(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit(value);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
        <input
          id={id}
          type="text"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          value={value}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          onPaste={(e) => {
            // Run immediately on paste into an empty box: the most common flow.
            const pasted = e.clipboardData.getData("text");
            if (!value && pasted.trim()) {
              e.preventDefault();
              setValue(pasted.trim());
              submit(pasted);
            }
          }}
          className="min-w-0 flex-1 field-pill px-5 py-3.5"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-white transition hover:bg-accent-strong disabled:opacity-70"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Working…
            </>
          ) : (
            <>
              {submitLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-2 text-sm font-medium text-bad">
          {error}
        </p>
      )}
      {examples.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Try:</span>
          {examples.map((ex) => (
            <button
              key={ex.value}
              type="button"
              onClick={() => {
                setValue(ex.value);
                submit(ex.value);
              }}
              className="rounded-lg bg-surface-2 px-3 py-1.5 font-medium transition hover:bg-surface-3"
            >
              {ex.label}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
