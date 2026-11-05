"use client";

import { CircleCheck, CircleHelp, CircleX, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatNumber, formatSubscribers } from "@/lib/format";
import type { Signal, SignalStatus, Verdict } from "@/lib/monetization";
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
  verdict: Verdict;
  signals: Signal[];
  fetchedAt: string;
}

export function MonetizationChecker() {
  const { state, run } = useToolRequest<Result>("/api/tools/monetization");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Channel link, @handle or video link"
        placeholder="@handle or https://www.youtube.com/@name"
        submitLabel="Check"
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

const verdictCopy: Record<Verdict, { tone: string; title: string; body: string }> = {
  strong: {
    tone: "border-good/30 bg-good-soft",
    title: "Meets every public requirement we can check",
    body: "Subscribers, country and activity all clear the Partner Program bar. Watch hours, Shorts views and policy standing are private, so only YouTube and the owner know if the channel is actually monetized.",
  },
  partial: {
    tone: "border-warn/30 bg-warn-soft",
    title: "Meets some public requirements",
    body: "The channel clears part of the Partner Program bar. See which checks below hold it back, and remember the private requirements can't be verified by any outside tool.",
  },
  not_yet: {
    tone: "border-bad/30 bg-bad-soft",
    title: "Doesn't yet meet the public requirements",
    body: "At least one public Partner Program requirement isn't met, so the channel can't currently join YPP. Existing members in changed circumstances are reviewed by YouTube.",
  },
  unclear: {
    tone: "border-border bg-surface-2",
    title: "Not enough public data to tell",
    body: "Key public signals are hidden for this channel, so we can't assess eligibility either way.",
  },
};

const statusIcon: Record<SignalStatus, { Icon: typeof CircleCheck; cls: string; sr: string }> = {
  pass: { Icon: CircleCheck, cls: "text-good", sr: "Met" },
  warn: { Icon: TriangleAlert, cls: "text-warn", sr: "Partly met" },
  fail: { Icon: CircleX, cls: "text-bad", sr: "Not met" },
  unknown: { Icon: CircleHelp, cls: "text-muted", sr: "Can't be checked" },
};

function ResultCard({ channel: c, verdict, signals, fetchedAt }: Result) {
  const v = verdictCopy[verdict];
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

      <div className={`mt-4 rounded-xl border px-4 py-3 ${v.tone}`}>
        <p className="font-semibold">{v.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{v.body}</p>
      </div>

      <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
        {signals.map((s) => {
          const { Icon, cls, sr } = statusIcon[s.status];
          return (
            <li key={s.id} className="flex gap-3 px-4 py-3">
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${cls}`} aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  <span className="sr-only">{sr}: </span>
                  {s.label} <span className="font-normal text-muted">— {s.value}</span>
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">Eligibility signals are channelpeek estimates, not a statement from YouTube.</p>
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
      <Skeleton className="mt-4 h-20 w-full" />
      <Skeleton className="mt-4 h-72 w-full" />
    </div>
  );
}
