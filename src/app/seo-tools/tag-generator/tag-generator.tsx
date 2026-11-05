"use client";

import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, Skeleton } from "@/components/ui/status";
import { TopicForm } from "@/components/ui/topic-form";
import { useToolRequest } from "@/components/ui/use-tool-request";

interface Result {
  tags: string[];
  characters: number;
  limit: number;
}

export function TagGenerator() {
  const { state, run } = useToolRequest<Result>("/api/tools/generate/tags");

  return (
    <div className="space-y-4">
      <TopicForm
        label="What is your video about?"
        placeholder="e.g. sourdough bread for beginners"
        submitLabel="Generate tags"
        loading={state.status === "loading"}
        onSubmit={(topic) => run({ topic })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-56 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && (
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium">
                {state.data.tags.length} tags{" "}
                <span className="text-sm font-normal text-muted">
                  ({state.data.characters} of {state.data.limit} characters)
                </span>
              </p>
              <CopyButton text={state.data.tags.join(", ")} label="Copy all tags" />
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {state.data.tags.map((t) => (
                <li key={t} className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              AI suggestions, kept under YouTube&apos;s 500-character tag limit. Honest reminder: tags carry little ranking weight — spend
              your energy on the title and thumbnail first.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
