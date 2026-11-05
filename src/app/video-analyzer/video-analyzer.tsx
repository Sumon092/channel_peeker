"use client";

import Image from "next/image";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatCompact, formatDuration, formatSubscribers } from "@/lib/format";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  video: {
    id: string;
    title: string;
    publishedAt: string;
    durationSeconds: number;
    views: number | null;
    likes: number | null;
    comments: number | null;
    tags: number;
    hasCaptions: boolean;
    thumbnailUrl: string | null;
  };
  channel: {
    id: string;
    title: string;
    handle: string | null;
    avatarUrl: string | null;
    subscribers: number | null;
    subscribersHidden: boolean;
  };
  derived: { likeRatePct: number | null; commentRatePct: number | null; vsMedian: number | null; sampleSize: number } | null;
  fetchedAt: string;
}

export function VideoAnalyzer() {
  const { state, run } = useToolRequest<Result>("/api/tools/video-analyzer");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Video link or ID"
        placeholder="https://www.youtube.com/watch?v=… or youtu.be/…"
        submitLabel="Analyze"
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

function ResultCard({ video: v, channel: c, derived, fetchedAt }: Result) {
  const stats: { label: string; value: string; estimate?: boolean }[] = [
    { label: "Views", value: v.views !== null ? formatCompact(v.views) : "Hidden" },
    { label: "Likes", value: v.likes !== null ? formatCompact(v.likes) : "Hidden" },
    { label: "Comments", value: v.comments !== null ? formatCompact(v.comments) : "Hidden" },
    { label: "Length", value: formatDuration(v.durationSeconds) },
    { label: "Tags", value: String(v.tags) },
    { label: "Captions", value: v.hasCaptions ? "Yes" : "No" },
  ];
  if (derived) {
    if (derived.likeRatePct !== null) stats.push({ label: "Like rate", value: `${derived.likeRatePct}%`, estimate: true });
    if (derived.commentRatePct !== null) stats.push({ label: "Comment rate", value: `${derived.commentRatePct}%`, estimate: true });
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={`https://www.youtube.com/watch?v=${v.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:w-56"
        >
          {v.thumbnailUrl && <Image src={v.thumbnailUrl} alt="" fill sizes="224px" className="object-cover" />}
          <span className="absolute bottom-1 right-1 rounded-sm bg-black/80 px-1 text-[10px] text-white">{formatDuration(v.durationSeconds)}</span>
        </a>
        <div className="min-w-0">
          <p className="font-semibold leading-snug">{v.title}</p>
          <p className="mt-1 text-sm text-muted">
            Published {new Date(v.publishedAt).toLocaleDateString("en", { dateStyle: "medium" })}
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted">
            {c.avatarUrl ? (
              <Image src={c.avatarUrl} alt="" width={24} height={24} className="h-6 w-6 rounded-full" />
            ) : (
              <span className="h-6 w-6 rounded-full bg-surface-2" />
            )}
            <span className="truncate">
              {c.title} · {formatSubscribers(c.subscribers, c.subscribersHidden)} subscribers
            </span>
          </div>
        </div>
      </div>

      {derived?.vsMedian !== null && derived !== null && (
        <div className="mt-4 rounded-xl bg-surface-2 px-4 py-3">
          <p className="font-semibold">
            {derived.vsMedian}× the channel&apos;s typical views <span className="font-normal text-muted">(channelpeek estimate)</span>
          </p>
          <p className="mt-0.5 text-sm text-muted">
            Compared with the median of the channel&apos;s {derived.sampleSize} most recent videos of the same format.
          </p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border px-4 py-3">
            <p className="text-xs text-muted">
              {s.label}
              {s.estimate && <span title="channelpeek estimate"> *</span>}
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          {derived ? "* channelpeek estimates, calculated from public YouTube data." : "YouTube's own figures. Dislikes, watch time and CTR are private."}
        </p>
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Skeleton className="aspect-video w-full sm:w-56" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-full max-w-md" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-56" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[72px]" />
        ))}
      </div>
    </div>
  );
}
