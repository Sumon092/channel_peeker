"use client";

import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, Skeleton } from "@/components/ui/status";
import { TopicForm } from "@/components/ui/topic-form";
import { useToolRequest } from "@/components/ui/use-tool-request";

interface Result {
  seed: string;
  keywords: string[];
  fetchedAt: string;
}

/** Shared widget for the three suggestion-based keyword tools. */
export function KeywordTool({ mode, placeholder, emptyNote }: { mode: "research" | "related" | "longtail"; placeholder: string; emptyNote: string }) {
  const { state, run } = useToolRequest<Result>("/api/tools/keywords");

  return (
    <div className="space-y-4">
      <TopicForm
        label="Seed keyword"
        placeholder={placeholder}
        submitLabel="Find keywords"
        loading={state.status === "loading"}
        onSubmit={(topic) => run({ q: topic, mode })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-56 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && (
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-lg shadow-slate-900/5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium">
                {state.data.keywords.length} phrases <span className="text-sm font-normal text-muted">for “{state.data.seed}”</span>
              </p>
              {state.data.keywords.length > 0 && <CopyButton text={state.data.keywords.join("\n")} label="Copy all" />}
            </div>
            {state.data.keywords.length === 0 ? (
              <p className="mt-4 rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">{emptyNote}</p>
            ) : (
              <ul className="mt-4 flex flex-wrap gap-2">
                {state.data.keywords.map((k) => (
                  <li key={k} className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm">
                    {k}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-xs text-muted">
              Real phrases from YouTube&apos;s search suggestions — what people actually type. Google doesn&apos;t publish exact search
              volumes for YouTube, and we won&apos;t invent them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
