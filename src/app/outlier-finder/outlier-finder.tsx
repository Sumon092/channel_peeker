"use client";

import Image from "next/image";
import { useState } from "react";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatCompact, formatDuration, formatSubscribers } from "@/lib/format";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface OutlierVideo {
  id: string;
  title: string;
  publishedAt: string;
  durationSeconds: number;
  isShort: boolean;
  views: number;
  thumbnailUrl: string | null;
  multiplier: number | null;
}

interface Result {
  channel: { id: string; title: string; handle: string | null; avatarUrl: string | null; subscribers: number | null; subscribersHidden: boolean };
  videos: OutlierVideo[];
  medians: { long: number | null; shorts: number | null } | null;
  fetchedAt: string;
}

const THRESHOLDS = [2, 5, 10] as const;

export function OutlierFinder() {
  const { state, run } = useToolRequest<Result>("/api/tools/outliers");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Channel link, @handle or video link"
        placeholder="@handle or https://www.youtube.com/@name"
        submitLabel="Find outliers"
        loading={state.status === "loading"}
        examples={[
          { label: "@mkbhd", value: "@mkbhd" },
          { label: "@veritasium", value: "@veritasium" },
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

function ResultCard({ channel: c, videos, medians, fetchedAt }: Result) {
  const [threshold, setThreshold] = useState<number>(2);
  const derived = medians !== null;
  const shown = derived ? videos.filter((v) => (v.multiplier ?? 0) >= threshold) : videos.slice(0, 10);

  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {c.avatarUrl ? (
            <Image src={c.avatarUrl} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full" />
          ) : (
            <span className="h-12 w-12 shrink-0 rounded-full bg-surface-2" />
          )}
          <div className="min-w-0">
            <p className="truncate font-semibold">{c.title}</p>
            <p className="text-sm text-muted">
              {c.handle ?? ""} · {formatSubscribers(c.subscribers, c.subscribersHidden)} subscribers
            </p>
          </div>
        </div>
        {derived && (
          <div className="flex gap-2" role="group" aria-label="Outlier threshold">
            {THRESHOLDS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setThreshold(t)}
                aria-pressed={threshold === t}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${threshold === t ? "bg-accent text-white" : "bg-surface-2 hover:bg-surface-3"}`}
              >
                {t}×+
              </button>
            ))}
          </div>
        )}
      </div>

      {!derived && (
        <p className="mt-4 rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">
          Outlier multipliers (views vs the channel&apos;s median) are channelpeek estimates and aren&apos;t enabled yet. Until then,
          here are the channel&apos;s top recent videos by views — YouTube&apos;s own figures.
        </p>
      )}

      {shown.length === 0 ? (
        <p className="mt-4 rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">
          No recent video beats the channel&apos;s median by {threshold}× — performance is steady. Try a lower threshold.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {shown.map((v) => (
            <li key={v.id} className="flex items-center gap-3">
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-12 w-[86px] shrink-0 overflow-hidden rounded-md bg-surface-2"
              >
                {v.thumbnailUrl && <Image src={v.thumbnailUrl} alt="" fill sizes="86px" className="object-cover" />}
                <span className="absolute bottom-0.5 right-0.5 rounded-sm bg-black/80 px-1 text-[9px] text-white">
                  {formatDuration(v.durationSeconds)}
                </span>
              </a>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{v.title}</p>
                <p className="text-xs text-muted">
                  {formatCompact(v.views)} views · {new Date(v.publishedAt).toLocaleDateString("en", { dateStyle: "medium" })}
                  {v.isShort && " · Short"}
                </p>
              </div>
              {v.multiplier !== null && <span className="shrink-0 text-base font-bold text-accent">{v.multiplier}×</span>}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          {derived
            ? "Multipliers are channelpeek estimates: views ÷ the median of the newest 50 uploads of the same format."
            : "Based on the channel's newest 50 public uploads."}
        </p>
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}
