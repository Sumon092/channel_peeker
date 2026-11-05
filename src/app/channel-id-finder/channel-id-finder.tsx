"use client";

import Image from "next/image";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatNumber, formatSubscribers } from "@/lib/format";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  channel: {
    id: string;
    title: string;
    handle: string | null;
    avatarUrl: string | null;
    subscribers: number | null;
    subscribersHidden: boolean;
    videoCount: number;
  };
  fetchedAt: string;
}

export function ChannelIdFinder() {
  const { state, run } = useToolRequest<Result>("/api/tools/channel-id");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Channel link, @handle or video link"
        placeholder="@handle or https://www.youtube.com/watch?v=…"
        submitLabel="Find ID"
        loading={state.status === "loading"}
        examples={[
          { label: "@mkbhd", value: "@mkbhd" },
          { label: "@veritasium", value: "@veritasium" },
          { label: "A video link", value: "https://youtu.be/dQw4w9WgXcQ" },
        ]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "channel");
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

function ResultCard({ channel: c, fetchedAt }: Result) {
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        {c.avatarUrl ? (
          <Image src={c.avatarUrl} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-full" />
        ) : (
          <div className="h-16 w-16 shrink-0 rounded-full bg-surface-2" />
        )}
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{c.title}</p>
          <p className="text-sm text-muted">
            {c.handle ?? "No handle"} · {formatSubscribers(c.subscribers, c.subscribersHidden)} subscribers · {formatNumber(c.videoCount)} videos
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 rounded-xl bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs text-muted">Channel ID</p>
          <code className="block break-all font-mono text-base">{c.id}</code>
        </div>
        <CopyButton text={c.id} label="Copy ID" className="shrink-0 bg-surface" />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex flex-wrap gap-3">
          <CopyButton text={`https://www.youtube.com/channel/${c.id}`} label="Copy channel URL" />
          {c.handle && <CopyButton text={c.handle} label="Copy handle" />}
        </div>
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="mt-4 h-[68px] w-full" />
      <Skeleton className="mt-4 h-8 w-40" />
    </div>
  );
}
