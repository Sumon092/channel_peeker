"use client";

import Image from "next/image";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  video: { id: string; title: string; channelTitle: string; publishedAt: string; thumbnailUrl: string | null };
  tags: string[];
  hashtags: string[];
  fetchedAt: string;
}

export function TagExtractor() {
  const { state, run } = useToolRequest<Result>("/api/tools/tags");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Video link or ID"
        placeholder="https://www.youtube.com/watch?v=… or youtu.be/…"
        submitLabel="Extract tags"
        loading={state.status === "loading"}
        examples={[{ label: "A video link", value: "https://youtu.be/dQw4w9WgXcQ" }]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "video");
          return r.ok ? null : r.message;
        }}
        onSubmit={(input) => run({ input })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <ResultSkeleton />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ResultCard {...state.data} />}
      </div>
    </div>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ResultCard({ video: v, tags, hashtags, fetchedAt }: Result) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        <span className="relative h-14 w-[100px] shrink-0 overflow-hidden rounded-lg bg-surface-2">
          {v.thumbnailUrl && <Image src={v.thumbnailUrl} alt="" fill sizes="100px" className="object-cover" />}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{v.title}</p>
          <p className="text-sm text-muted">{v.channelTitle}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-medium">
            Tags <span className="text-sm text-muted">({tags.length})</span>
          </p>
          {tags.length > 0 && <CopyButton text={tags.join(", ")} label="Copy all tags" />}
        </div>
        <div className="mt-3">
          {tags.length > 0 ? (
            <ChipList items={tags} />
          ) : (
            <p className="rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">
              This video has no tags. That&apos;s common — tags carry little ranking weight today, so many channels skip them.
            </p>
          )}
        </div>
      </div>

      {hashtags.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium">
              Hashtags <span className="text-sm text-muted">({hashtags.length})</span>
            </p>
            <CopyButton text={hashtags.join(" ")} label="Copy hashtags" />
          </div>
          <div className="mt-3">
            <ChipList items={hashtags} />
          </div>
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-[100px] rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <Skeleton className="mt-5 h-32 w-full" />
    </div>
  );
}
