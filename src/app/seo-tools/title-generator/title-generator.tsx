"use client";

import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, Skeleton } from "@/components/ui/status";
import { TopicForm } from "@/components/ui/topic-form";
import { useToolRequest } from "@/components/ui/use-tool-request";

interface Result {
  titles: string[];
}

export function TitleGenerator() {
  const { state, run } = useToolRequest<Result>("/api/tools/generate/titles");

  return (
    <div className="space-y-4">
      <TopicForm
        label="What is your video about?"
        placeholder="e.g. budget home studio setup for beginners"
        submitLabel="Generate titles"
        loading={state.status === "loading"}
        onSubmit={(topic) => run({ topic })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-72 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && (
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-lg shadow-slate-900/5 sm:p-7">
            <ul className="divide-y divide-border">
              {state.data.titles.map((t) => (
                <li key={t} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="font-medium leading-snug">{t}</p>
                    <p className={`mt-0.5 text-xs ${t.length > 70 ? "text-warn" : "text-muted"}`}>
                      {t.length} characters{t.length > 70 ? " — will truncate in search" : ""}
                    </p>
                  </div>
                  <CopyButton text={t} label="Copy" className="shrink-0" />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              AI suggestions — starting points, not finished titles. Only use a claim your video actually delivers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
