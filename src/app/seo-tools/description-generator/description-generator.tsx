"use client";

import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, Skeleton } from "@/components/ui/status";
import { TopicForm } from "@/components/ui/topic-form";
import { useToolRequest } from "@/components/ui/use-tool-request";

interface Result {
  description: string;
}

export function DescriptionGenerator() {
  const { state, run } = useToolRequest<Result>("/api/tools/generate/description");

  return (
    <div className="space-y-4">
      <TopicForm
        label="What is your video about?"
        placeholder="e.g. 10 beginner mistakes in landscape photography"
        submitLabel="Generate description"
        loading={state.status === "loading"}
        onSubmit={(topic) => run({ topic })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-72 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && (
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium">
                Draft description <span className="text-sm font-normal text-muted">({state.data.description.length} characters)</span>
              </p>
              <CopyButton text={state.data.description} label="Copy description" />
            </div>
            <pre className="mt-4 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-xl bg-surface-2 p-4 font-sans text-sm leading-relaxed">
              {state.data.description}
            </pre>
            <p className="mt-4 text-xs text-muted">
              AI draft — replace the placeholder timestamps with your real chapter times and the [LINK] markers with your links before
              publishing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
