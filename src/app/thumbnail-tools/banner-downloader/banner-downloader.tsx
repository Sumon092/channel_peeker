"use client";

/* eslint-disable @next/next/no-img-element -- banner aspect ratios vary; plain img with the direct URL matches the download links */

import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  channel: { id: string; title: string; handle: string | null; avatarUrl: string | null };
  bannerUrl: string | null;
  fetchedAt: string;
}

/** Google's image CDN sizes banners via URL suffixes; fcrop64 selects the layout crop. */
const SIZES = [
  { suffix: "=w2120-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj", label: "Full banner (TV, 2120×1192)" },
  { suffix: "=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj", label: "Desktop 2× (2560×423)" },
  { suffix: "=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj", label: "Tablet (1707×283)" },
  { suffix: "=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj", label: "Desktop / mobile (1060×175)" },
  { suffix: "", label: "Source image (as uploaded)" },
] as const;

export function BannerDownloader() {
  const { state, run } = useToolRequest<Result>("/api/tools/banner-downloader");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Channel link, @handle or video link"
        placeholder="@handle or https://www.youtube.com/@name"
        submitLabel="Get banner"
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

      <p role="status" className="sr-only">
        {state.status === "loading" ? "Looking up banner…" : state.status === "done" && state.data.bannerUrl ? `Banner found for ${state.data.channel.title}.` : ""}
      </p>
      <div>
        {state.status === "loading" && <Skeleton className="h-64 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ResultCard {...state.data} />}
      </div>
    </div>
  );
}

function ResultCard({ channel: c, bannerUrl, fetchedAt }: Result) {
  if (!bannerUrl) {
    return <ErrorBox message={`${c.title} hasn't set a channel banner.`} />;
  }
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <p className="truncate text-lg font-semibold">{c.title}</p>
      <p className="text-sm text-muted">{c.handle ?? c.id}</p>

      <img
        src={`${bannerUrl}=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
        alt={`${c.title} channel banner`}
        className="mt-4 aspect-[1060/175] w-full rounded-xl bg-surface-2 object-cover"
        loading="lazy"
      />

      <ul role="list" className="mt-4 space-y-2">
        {SIZES.map((s) => (
          <li key={s.label} className="flex flex-col gap-2 rounded-xl bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between">
            <a href={`${bannerUrl}${s.suffix}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline">
              Open {s.label} <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <CopyButton text={`${bannerUrl}${s.suffix}`} label="Copy URL" ariaLabel={`Copy URL for ${s.label}`} className="shrink-0 bg-surface" />
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">Open a size, then right-click (or long-press) → “Save image as…”.</p>

      <div className="mt-4 flex justify-end">
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}
