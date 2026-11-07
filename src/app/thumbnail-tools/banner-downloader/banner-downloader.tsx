"use client";

/* eslint-disable @next/next/no-img-element -- banner aspect ratios vary; plain img with the direct URL matches the download links */

import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { fmt, type WidgetStrings } from "@/lib/widget-i18n";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  channel: { id: string; title: string; handle: string | null; avatarUrl: string | null };
  bannerUrl: string | null;
  fetchedAt: string;
}

/** Google's image CDN sizes banners via URL suffixes; fcrop64 selects the layout crop. */
const SIZES = [
  { key: "tv", suffix: "=w2120-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj" },
  { key: "desktop2x", suffix: "=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" },
  { key: "tablet", suffix: "=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" },
  { key: "desktop", suffix: "=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" },
  { key: "source", suffix: "" },
] as const satisfies readonly { key: keyof WidgetStrings["banner"]["sizes"]; suffix: string }[];

export function BannerDownloader() {
  const { w } = useI18n();
  const { state, run } = useToolRequest<Result>("/api/tools/banner-downloader");

  return (
    <div className="space-y-4">
      <ToolInput
        label={w.channelInputLabel}
        placeholder={w.channelPlaceholder}
        submitLabel={w.banner.submit}
        loading={state.status === "loading"}
        examples={[
          { label: "@mkbhd", value: "@mkbhd" },
          { label: "@veritasium", value: "@veritasium" },
        ]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "channel");
          return r.ok ? null : w.parseErrors[r.code];
        }}
        onSubmit={(input) => run({ input })}
      />

      <p role="status" className="sr-only">
        {state.status === "loading" ? w.banner.looking : state.status === "done" && state.data.bannerUrl ? fmt(w.banner.found, { title: state.data.channel.title }) : ""}
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
  const { w } = useI18n();
  if (!bannerUrl) {
    return <ErrorBox message={fmt(w.banner.none, { title: c.title })} />;
  }
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <p className="truncate text-lg font-semibold">{c.title}</p>
      <p className="text-sm text-muted">{c.handle ?? c.id}</p>

      <img
        src={`${bannerUrl}=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
        alt={fmt(w.banner.bannerAlt, { title: c.title })}
        className="mt-4 aspect-[1060/175] w-full rounded-xl bg-surface-2 object-cover"
        loading="lazy"
      />

      <ul role="list" className="mt-4 space-y-2">
        {SIZES.map((s) => {
          const label = w.banner.sizes[s.key];
          return (
            <li key={s.key} className="flex flex-col gap-2 rounded-xl bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between">
              <a href={`${bannerUrl}${s.suffix}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline">
                {fmt(w.banner.open, { label })} <span aria-hidden="true">↗</span>
                <span className="sr-only">{w.opensInNewTab}</span>
              </a>
              <CopyButton text={`${bannerUrl}${s.suffix}`} label={w.banner.copyUrl} ariaLabel={fmt(w.banner.copyUrlFor, { label })} className="shrink-0 bg-surface" />
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-muted">{w.banner.saveHint}</p>

      <div className="mt-4 flex justify-end">
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}
