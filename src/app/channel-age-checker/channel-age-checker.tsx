"use client";

import Image from "next/image";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatCompact, formatNumber, formatSubscribers } from "@/lib/format";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  channel: {
    id: string;
    title: string;
    handle: string | null;
    avatarUrl: string | null;
    publishedAt: string;
    subscribers: number | null;
    subscribersHidden: boolean;
    videoCount: number;
    views: number;
  };
  fetchedAt: string;
}

/** "3 years, 2 months" (or days for young channels), from the creation date to now. */
function ageText(iso: string): string {
  const created = new Date(iso);
  const now = new Date();
  let years = now.getFullYear() - created.getFullYear();
  let months = now.getMonth() - created.getMonth();
  if (now.getDate() < created.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (years <= 0 && months <= 0) {
    const days = Math.max(0, Math.floor((now.getTime() - created.getTime()) / 86_400_000));
    return `${days} day${days === 1 ? "" : "s"}`;
  }
  const y = years > 0 ? `${years} year${years === 1 ? "" : "s"}` : "";
  const m = months > 0 ? `${months} month${months === 1 ? "" : "s"}` : "";
  return [y, m].filter(Boolean).join(", ");
}

export function ChannelAgeChecker() {
  const { state, run } = useToolRequest<Result>("/api/tools/channel-age");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Channel link, @handle or video link"
        placeholder="@handle or https://www.youtube.com/@name"
        submitLabel="Check age"
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

function ResultCard({ channel: c, fetchedAt }: Result) {
  const created = new Date(c.publishedAt);
  const createdText = created.toLocaleDateString("en", { dateStyle: "long" });
  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        {c.avatarUrl ? (
          <Image src={c.avatarUrl} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-full" />
        ) : (
          <div className="h-16 w-16 shrink-0 rounded-full bg-surface-2" />
        )}
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{c.title}</p>
          <p className="text-sm text-muted">
            {c.handle ?? "No handle"} · {formatSubscribers(c.subscribers, c.subscribersHidden)} subscribers
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-surface-2 p-5 text-center">
        <p className="text-sm text-muted">This channel is</p>
        <p className="mt-1 text-3xl font-black tracking-tight">{ageText(c.publishedAt)} old</p>
        <p className="mt-1 text-sm text-muted">Created on {createdText}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border px-4 py-3">
          <p className="text-xs text-muted">Total views since creation</p>
          <p className="mt-1 text-xl font-bold tracking-tight">{formatCompact(c.views)}</p>
        </div>
        <div className="rounded-xl border border-border px-4 py-3">
          <p className="text-xs text-muted">Public videos</p>
          <p className="mt-1 text-xl font-bold tracking-tight">{formatNumber(c.videoCount)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <CopyButton text={`${c.title} was created on ${createdText} (${ageText(c.publishedAt)} ago).`} label="Copy result" />
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="mt-4 h-28 w-full" />
      <Skeleton className="mt-4 h-[72px] w-full" />
    </div>
  );
}
