"use client";

import Image from "next/image";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatSubscribers } from "@/lib/format";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  channel: { id: string; title: string; handle: string | null; avatarUrl: string | null; subscribers: number | null; subscribersHidden: boolean };
  fetchedAt: string;
}

const SIZES = [
  { px: 176, label: "Small (176px)" },
  { px: 400, label: "Medium (400px)" },
  { px: 800, label: "Large (800px)" },
] as const;

/** Google avatar URLs carry their size as "=sNNN-"; swapping it serves any resolution. */
const sized = (url: string, px: number) => url.replace(/=s\d+(-|$)/, `=s${px}$1`);

export function ProfilePictureDownloader() {
  const { state, run } = useToolRequest<Result>("/api/tools/channel-id");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Channel link, @handle or video link"
        placeholder="@handle or https://www.youtube.com/@name"
        submitLabel="Get avatar"
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
        {state.status === "loading" && <Skeleton className="h-64 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ResultCard {...state.data} />}
      </div>
    </div>
  );
}

function ResultCard({ channel: c, fetchedAt }: Result) {
  if (!c.avatarUrl) {
    return <ErrorBox message="This channel has no readable profile picture." />;
  }
  const large = sized(c.avatarUrl, 800);
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <Image src={large} alt={`${c.title} profile picture`} width={176} height={176} unoptimized className="h-44 w-44 shrink-0 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="truncate text-lg font-semibold">{c.title}</p>
          <p className="text-sm text-muted">
            {c.handle ?? "No handle"} · {formatSubscribers(c.subscribers, c.subscribersHidden)} subscribers
          </p>
          <ul className="mt-4 space-y-2">
            {SIZES.map((s) => (
              <li key={s.px} className="flex flex-col gap-2 rounded-xl bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between">
                <a href={sized(c.avatarUrl as string, s.px)} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline">
                  Open {s.label} ↗
                </a>
                <CopyButton text={sized(c.avatarUrl as string, s.px)} label="Copy URL" className="shrink-0 bg-surface" />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">Open a size, then right-click (or long-press) → “Save image as…”.</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}
