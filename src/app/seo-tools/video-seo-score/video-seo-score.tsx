"use client";

import { CircleCheck, CircleX, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Check {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  points: number;
  max: number;
  detail: string;
}

interface Result {
  video: { id: string; title: string; channelTitle: string; thumbnailUrl: string | null };
  score: number;
  checks: Check[];
  fetchedAt: string;
}

const icon = {
  pass: { Icon: CircleCheck, cls: "text-good" },
  warn: { Icon: TriangleAlert, cls: "text-warn" },
  fail: { Icon: CircleX, cls: "text-bad" },
} as const;

export function VideoSeoScore() {
  const { state, run } = useToolRequest<Result>("/api/tools/video-seo");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Video link or ID"
        placeholder="https://www.youtube.com/watch?v=… or youtu.be/…"
        submitLabel="Score it"
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

function ResultCard({ video: v, score, checks, fetchedAt }: Result) {
  const tone = score >= 80 ? "text-good" : score >= 55 ? "text-warn" : "text-bad";
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span className="relative h-14 w-[100px] shrink-0 overflow-hidden rounded-lg bg-surface-2">
            {v.thumbnailUrl && <Image src={v.thumbnailUrl} alt="" fill sizes="100px" className="object-cover" />}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold">{v.title}</p>
            <p className="text-sm text-muted">{v.channelTitle}</p>
          </div>
        </div>
        <div className="text-center">
          <p className={`text-4xl font-black tabular-nums tracking-tight ${tone}`}>{score}</p>
          <p className="text-xs text-muted">/ 100</p>
        </div>
      </div>

      <ul className="mt-5 divide-y divide-border rounded-xl border border-border">
        {checks.map((c) => {
          const { Icon, cls } = icon[c.status];
          return (
            <li key={c.id} className="flex gap-3 px-4 py-3">
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${cls}`} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium">{c.label}</p>
                  <span className="shrink-0 text-xs tabular-nums text-muted">
                    {c.points}/{c.max}
                  </span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{c.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          A channelpeeker assessment of the video&apos;s metadata — not a prediction of performance. Content and thumbnails matter more than
          any checklist.
        </p>
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-[100px] rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-12 w-16" />
      </div>
      <Skeleton className="mt-5 h-80 w-full" />
    </div>
  );
}
