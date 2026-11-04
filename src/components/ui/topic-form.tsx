"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

interface TopicFormProps {
  label: string;
  placeholder: string;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (topic: string) => void;
}

/** Shared input for the AI generators: a short topic, not a YouTube link. */
export function TopicForm({ label, placeholder, submitLabel, loading, onSubmit }: TopicFormProps) {
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const topic = value.trim();
    if (topic.length < 3) {
      setError("Describe your video topic in a few words first.");
      return;
    }
    setError(null);
    onSubmit(topic);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-surface p-5 text-left shadow-[0_8px_30px_rgb(0_0_0/0.08)] sm:p-6">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
        <input
          id={id}
          type="text"
          autoComplete="off"
          maxLength={200}
          value={value}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          className="min-w-0 flex-1 rounded-full border border-border bg-bg px-5 py-3.5 text-base outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/12"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-white transition hover:bg-accent-strong disabled:opacity-70"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Generating…
            </>
          ) : (
            <>
              {submitLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-bad">
          {error}
        </p>
      )}
      <p className="mt-3 text-xs text-muted">Free AI generations are limited to 10 per day. Your topic is sent to Google&apos;s Gemini API to generate suggestions and isn&apos;t stored by us.</p>
    </form>
  );
}
