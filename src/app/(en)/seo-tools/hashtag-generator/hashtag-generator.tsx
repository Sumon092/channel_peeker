"use client";

import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, Skeleton } from "@/components/ui/status";
import { TopicForm } from "@/components/ui/topic-form";
import { useToolRequest } from "@/components/ui/use-tool-request";

interface Result {
  hashtags: string[];
}

export function HashtagGenerator() {
  const { state, run } = useToolRequest<Result>("/api/tools/generate/hashtags");

  return (
    <div className="space-y-4">
      <TopicForm
        label="What is your video about?"
        placeholder="e.g. morning routine for productivity"
        submitLabel="Generate hashtags"
        loading={state.status === "loading"}
        onSubmit={(topic) => run({ topic })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-48 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && (
          <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium">{state.data.hashtags.length} hashtags</p>
              <CopyButton text={state.data.hashtags.join(" ")} label="Copy all" />
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {state.data.hashtags.map((h) => (
                <li key={h} className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm">
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Pick 3 — only the first three above the title are shown, and using more than 60 makes YouTube ignore all of them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
