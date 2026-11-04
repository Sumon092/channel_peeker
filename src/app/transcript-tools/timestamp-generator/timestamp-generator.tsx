"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, Skeleton } from "@/components/ui/status";
import { useToolRequest } from "@/components/ui/use-tool-request";

interface Result {
  chapters: { time: string; title: string }[];
  text: string;
}

export function TimestampGenerator() {
  const id = useId();
  const { state, run } = useToolRequest<Result>("/api/tools/generate/chapters");
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const t = raw.trim();
    if (t.length < 100) {
      setError("Paste a transcript of at least 100 characters.");
      return;
    }
    if (!/\d{1,2}:\d{2}/.test(t)) {
      setError("That transcript has no timestamps. Copy it from YouTube's transcript panel, which includes the times.");
      return;
    }
    setError(null);
    run({ transcript: t.slice(0, 120_000) });
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-surface p-5 text-left shadow-[0_8px_30px_rgb(0_0_0/0.08)] sm:p-6">
        <label htmlFor={id} className="text-sm font-medium">
          Paste the timestamped transcript (YouTube: description → “Show transcript” → copy)
        </label>
        <textarea
          id={id}
          rows={7}
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            if (error) setError(null);
          }}
          placeholder={"0:00\nhey everyone welcome back\n0:04\ntoday we're looking at…"}
          className="mt-2.5 w-full rounded-2xl border border-border bg-bg px-4 py-3 font-mono text-sm outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/12"
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
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Generating…
              </>
            ) : (
              <>
                Generate chapters <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
          <p className="text-xs text-muted">10 free AI generations a day. The transcript is sent to Google&apos;s Gemini API; we don&apos;t store it.</p>
        </div>
      </form>

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-56 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && (
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-lg shadow-slate-900/5 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">
                Chapters <span className="text-sm font-normal text-muted">({state.data.chapters.length})</span>
              </p>
              <CopyButton text={state.data.text} label="Copy for description" />
            </div>
            <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-surface-2 p-4 font-mono text-sm leading-relaxed">{state.data.text}</pre>
            <p className="mt-3 text-xs text-muted">
              Paste this block into your video description. YouTube needs the first chapter at 0:00 and at least 3 chapters of 10+ seconds
              for the chapter bar to appear.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
