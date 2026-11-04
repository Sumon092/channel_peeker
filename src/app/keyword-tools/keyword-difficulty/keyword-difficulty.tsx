"use client";

import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { TopicForm } from "@/components/ui/topic-form";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatSubscribers } from "@/lib/format";

interface Result {
  q: string;
  results: { videoId: string; videoTitle: string; channelTitle: string; subscribers: number | null; subscribersHidden: boolean }[];
  difficulty: { score: number; label: string } | null;
  fetchedAt: string;
}

export function KeywordDifficulty() {
  const { state, run } = useToolRequest<Result>("/api/tools/keyword-difficulty");

  return (
    <div className="space-y-4">
      <TopicForm
        label="Keyword to check"
        placeholder="e.g. home espresso setup"
        submitLabel="Check difficulty"
        loading={state.status === "loading"}
        onSubmit={(topic) => run({ q: topic })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-72 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ResultCard {...state.data} />}
      </div>
    </div>
  );
}

function ResultCard({ q, results, difficulty, fetchedAt }: Result) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-lg shadow-slate-900/5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-medium">
          Who ranks for <span className="text-accent">“{q}”</span>
        </p>
        {difficulty && (
          <div className="text-right">
            <p className="text-3xl font-black tabular-nums tracking-tight">{difficulty.score}</p>
            <p className="text-xs text-muted">{difficulty.label} · channelpeek estimate</p>
          </div>
        )}
      </div>

      {!difficulty && (
        <p className="mt-3 rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">
          The difficulty score is a channelpeek estimate and isn&apos;t enabled yet. The honest signal is below: the size of the channels
          currently ranking. If they&apos;re mostly millions of subscribers, the keyword is hard.
        </p>
      )}

      <ol className="mt-4 divide-y divide-border rounded-xl border border-border">
        {results.map((r, i) => (
          <li key={r.videoId} className="flex items-center gap-3 px-4 py-3">
            <span className="w-5 shrink-0 text-sm font-bold text-muted">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <a
                href={`https://www.youtube.com/watch?v=${r.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate text-sm font-medium hover:underline"
              >
                {r.videoTitle}
              </a>
              <p className="text-xs text-muted">{r.channelTitle}</p>
            </div>
            <span className="shrink-0 text-sm text-muted">{formatSubscribers(r.subscribers, r.subscribersHidden)}</span>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          Search results refresh weekly to respect YouTube&apos;s API limits — rankings shown may be up to 7 days old.
        </p>
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}
