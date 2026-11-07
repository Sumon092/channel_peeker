"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatDuration } from "@/lib/format";
import { fmt, type WidgetStrings } from "@/lib/widget-i18n";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  video: { id: string; title: string; publishedAt: string; durationSeconds: number; thumbnailUrl: string | null };
  channel: { title: string };
  fetchedAt: string;
}

function ageText(iso: string, u: WidgetStrings["uploadDate"]): string {
  const diff = Date.now() - Date.parse(iso);
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) return fmt(u.hoursAge, { n: Math.max(1, Math.floor(diff / 3_600_000)) });
  if (days < 60) return days === 1 ? u.dayOne : fmt(u.daysMany, { n: days });
  const months = Math.floor(days / 30.44);
  if (months < 24) return fmt(u.monthsAge, { n: months });
  const years = Math.floor(days / 365.25);
  const rem = Math.floor((days - years * 365.25) / 30.44);
  return rem > 0 ? fmt(u.yearsMonthsAge, { y: years, m: rem }) : fmt(u.yearsAge, { n: years });
}

export function VideoUploadDateChecker() {
  const { w } = useI18n();
  const { state, run } = useToolRequest<Result>("/api/tools/video-analyzer");

  return (
    <div className="space-y-4">
      <ToolInput
        label={w.videoInputLabel}
        placeholder={w.videoPlaceholder}
        submitLabel={w.uploadDate.submit}
        loading={state.status === "loading"}
        examples={[{ label: w.exampleVideoLink, value: "https://youtu.be/dQw4w9WgXcQ" }]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "video");
          return r.ok ? null : w.parseErrors[r.code];
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
  const { intl, w } = useI18n();
  const u = w.uploadDate;
  const published = new Date(v.publishedAt);
  const local = published.toLocaleString(intl, { dateStyle: "full", timeStyle: "short" });
  const utc = published.toLocaleString(intl, { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });
  const age = ageText(v.publishedAt, u);

  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
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
        <p className="text-sm text-muted">{u.published}</p>
        <p className="mt-1 text-xl font-black tracking-tight">{local}</p>
        <p className="mt-1 text-sm text-muted">
          {utc} UTC · {fmt(u.ago, { age })}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <CopyButton text={fmt(u.copyText, { title: v.title, date: local, age })} label={u.copyResult} />
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}
