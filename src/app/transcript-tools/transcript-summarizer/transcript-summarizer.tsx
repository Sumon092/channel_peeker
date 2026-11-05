"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, Skeleton } from "@/components/ui/status";
import { useToolRequest } from "@/components/ui/use-tool-request";

interface Result {
  summary: string;
  keyPoints: string[];
}

export function TranscriptSummarizer() {
  const id = useId();
  const { state, run } = useToolRequest<Result>("/api/tools/generate/summary");
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (raw.trim().length < 100) {
      setError("Paste a transcript of at least 100 characters.");
      return;
    }
    setError(null);
    run({ transcript: raw.trim().slice(0, 120_000) });
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
        <label htmlFor={id} className="text-sm font-medium">
          Paste the transcript (on YouTube: description → “Show transcript” → copy)
        </label>
        <textarea
          id={id}
          rows={7}
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Paste the full transcript here…"
          className="mt-2.5 w-full field-area px-4 py-3 text-sm"
        />
        {error && (
          <p role="alert" className="mt-2 text-sm font-medium text-bad">
            {error}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            disabled={state.status === "loading"}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-medium text-white transition hover:bg-accent-strong disabled:opacity-70"
          >
            {state.status === "loading" ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Summarizing…
              </>
            ) : (
              <>
                Summarize <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
          <p className="text-xs text-muted">10 free AI generations a day. The transcript is sent to Google&apos;s Gemini API; we don&apos;t store it.</p>
        </div>
      </form>

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-64 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && (
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">Summary</p>
              <CopyButton text={`${state.data.summary}\n\n${state.data.keyPoints.map((p) => `• ${p}`).join("\n")}`} label="Copy all" />
            </div>
            <p className="mt-3 leading-relaxed">{state.data.summary}</p>
            {state.data.keyPoints.length > 0 && (
              <>
                <p className="mt-5 font-medium">Key points</p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                  {state.data.keyPoints.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-4 text-xs text-muted">AI summary — spot-check anything you&apos;ll quote against the actual video.</p>
          </div>
        )}
      </div>
    </div>
  );
}
