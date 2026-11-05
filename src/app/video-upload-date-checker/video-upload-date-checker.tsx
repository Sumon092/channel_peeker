"use client";

import Image from "next/image";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatDuration } from "@/lib/format";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  video: { id: string; title: string; publishedAt: string; durationSeconds: number; thumbnailUrl: string | null };
  channel: { title: string };
  fetchedAt: string;
}

function ageText(iso: string): string {
  const diff = Date.now() - Date.parse(iso);
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) return `${Math.max(1, Math.floor(diff / 3_600_000))} hours`;
  if (days < 60) return `${days} day${days === 1 ? "" : "s"}`;
  const months = Math.floor(days / 30.44);
  if (months < 24) return `${months} months`;
  const years = Math.floor(days / 365.25);
  const rem = Math.floor((days - years * 365.25) / 30.44);
  return rem > 0 ? `${years} years, ${rem} months` : `${years} years`;
}

export function VideoUploadDateChecker() {
  const { state, run } = useToolRequest<Result>("/api/tools/video-analyzer");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Video link or ID"
        placeholder="https://www.youtube.com/watch?v=… or youtu.be/…"
        submitLabel="Check date"
        loading={state.status === "loading"}
        examples={[{ label: "A video link", value: "https://youtu.be/dQw4w9WgXcQ" }]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "video");
          return r.ok ? null : r.message;
        }}
        onSubmit={(input) => run({ input })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-56 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ResultCard {...state.data} />}
      </div>
    </div>
  );
}

function ResultCard({ video: v, channel: c, fetchedAt }: Result) {
  const published = new Date(v.publishedAt);
  const local = published.toLocaleString("en", { dateStyle: "full", timeStyle: "short" });
  const utc = published.toLocaleString("en", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        <span className="relative h-14 w-[100px] shrink-0 overflow-hidden rounded-lg bg-surface-2">
          {v.thumbnailUrl && <Image src={v.thumbnailUrl} alt="" fill sizes="100px" className="object-cover" />}
          <span className="absolute bottom-0.5 right-0.5 rounded-sm bg-black/80 px-1 text-[9px] text-white">{formatDuration(v.durationSeconds)}</span>
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{v.title}</p>
          <p className="text-sm text-muted">{c.title}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-surface-2 p-5 text-center">
        <p className="text-sm text-muted">Published</p>
        <p className="mt-1 text-xl font-black tracking-tight">{local}</p>
        <p className="mt-1 text-sm text-muted">
          {utc} UTC · {ageText(v.publishedAt)} ago
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <CopyButton text={`"${v.title}" was published on ${local} (${ageText(v.publishedAt)} ago).`} label="Copy result" />
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}
