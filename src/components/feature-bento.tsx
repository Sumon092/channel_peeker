import { ArrowUpRight, Copy } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { getTool } from "@/lib/tools";

/**
 * "Show, don't list": each cell previews what the tool produces. Pure HTML/CSS/SVG (no JS).
 * Figures are illustrative.
 */

function Cell({ path, title, body, visual, className = "" }: { path: string; title: string; body: string; visual: ReactNode; className?: string }) {
  const tool = getTool(path);
  const live = tool.status === "live";
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3 p-6 pb-0 sm:p-7 sm:pb-0">
        <div>
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          <p className="mt-1.5 max-w-sm text-[0.95rem] leading-relaxed text-muted">{body}</p>
        </div>
        {live ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-text px-3 py-1 text-xs font-medium text-bg transition group-hover:bg-accent group-hover:text-white">
            Open <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted">Coming soon</span>
        )}
      </div>
      <div aria-hidden="true" className="mt-6 flex-1 overflow-hidden px-6 pb-6 sm:px-7 sm:pb-7">
        {visual}
      </div>
    </>
  );
  const base = `reveal group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface ${className}`;
  return live ? (
    <Link href={path} className={`${base} transition hover:border-text/20 hover:shadow-[0_20px_50px_rgb(0_0_0/0.08)]`}>
      {inner}
    </Link>
  ) : (
    <div className={base}>{inner}</div>
  );
}

const bars = [38, 52, 44, 61, 49, 70, 58, 92, 66, 74, 63, 81];

export function FeatureBento() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Cell
        path="/channel-analyzer"
        className="lg:col-span-2"
        title="Channel analytics"
        body="Medians, upload cadence, Shorts vs long-form and top videos for any public channel."
        visual={
          <div className="rounded-2xl border border-border bg-bg p-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                ["Median views", "48.2K"],
                ["Uploads / week", "2.1"],
                ["Shorts share", "34%"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-muted">{k}</p>
                  <p className="text-lg font-bold">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex h-28 items-end gap-1.5">
              {bars.map((h, i) => (
                <div key={i} className={`flex-1 rounded-t-md ${i === 7 ? "bg-accent" : "bg-surface-3"}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        }
      />

      <Cell
        path="/thumbnail-tools/thumbnail-downloader"
        title="Thumbnail downloader"
        body="Every size, including new 1080p to 4K versions. Bulk mode for 20 videos."
        visual={
          <div className="relative h-44">
            {[
              ["4K", "3840×2160", "w-[92%]", "top-0", "bg-surface-3"],
              ["1080p", "1920×1080", "w-[78%]", "top-9", "bg-surface-2"],
              ["HD", "1280×720", "w-[64%]", "top-18", "bg-bg"],
            ].map(([label, dims, w, top, bg]) => (
              <div key={label} className={`absolute left-0 ${top} ${w} aspect-video rounded-xl border border-border ${bg} p-3 shadow-sm`}>
                <span className="rounded bg-text px-1.5 py-0.5 text-[10px] font-bold text-bg">{label}</span>
                <span className="ml-2 text-[11px] text-muted">{dims}</span>
              </div>
            ))}
          </div>
        }
      />

      <Cell
        path="/channel-id-finder"
        title="Channel ID finder"
        body="Turn any @handle or video link into the permanent UC… channel ID."
        visual={
          <div className="space-y-2.5">
            <div className="rounded-xl border border-border bg-bg px-4 py-3 text-sm text-muted">@northlightstudio</div>
            <div className="flex items-center justify-between gap-2 rounded-xl bg-text px-4 py-3 text-bg">
              <code className="truncate font-mono text-sm">UC4Qf2b8Rz1kLm7vXa9TnP3w</code>
              <Copy className="h-4 w-4 shrink-0 opacity-70" />
            </div>
          </div>
        }
      />

      <Cell
        path="/outlier-finder"
        title="Outlier finder"
        body="Spot videos that beat a channel's median by 2×, 5× or 10×."
        visual={
          <ul className="space-y-2.5">
            {[
              ["I rebuilt my studio for $500", "11.4×"],
              ["The settings nobody uses", "4.6×"],
              ["Why my Shorts stalled", "3.0×"],
            ].map(([t, m]) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-9 w-16 shrink-0 rounded-md bg-linear-to-br from-[#3f3f46] to-[#18181b]" />
                <span className="min-w-0 flex-1 truncate text-sm">{t}</span>
                <span className="text-sm font-bold text-accent">{m}</span>
              </li>
            ))}
          </ul>
        }
      />

      <Cell
        path="/revenue-calculator"
        title="Revenue calculator"
        body="Earnings as honest ranges by niche and country, with the math shown."
        visual={
          <div className="rounded-2xl border border-border bg-bg p-4">
            <p className="text-xs text-muted">Estimated monthly earnings</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              $1.2K <span className="text-muted">–</span> $3.4K
            </p>
            <div className="relative mt-4 h-2 rounded-full bg-surface-3">
              <div className="absolute inset-y-0 left-[18%] right-[30%] rounded-full bg-accent" />
              <div className="absolute -top-1 left-[44%] h-4 w-1 rounded-full bg-text" />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-muted">
              <span>Low</span>
              <span>Mid</span>
              <span>High</span>
            </div>
          </div>
        }
      />

      <Cell
        path="/seo-tools/title-checker"
        className="lg:col-span-2"
        title="Title checker"
        body="See exactly where your title gets cut off in search, on desktop and on mobile."
        visual={
          <div className="space-y-3">
            {[
              ["Desktop search", "I Tested Every Budget Camera Under $500 So You Don't Have To (Surpris", "ing Winner)"],
              ["Mobile", "I Tested Every Budget Camera Under $500 So You Do", "n't Have To (Surprising Winner)"],
            ].map(([label, shown, cut]) => (
              <div key={label} className="rounded-xl border border-border bg-bg px-4 py-3">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted">{label}</p>
                <p className="mt-1 truncate text-[0.95rem] font-medium">
                  {shown}
                  <span className="text-muted line-through decoration-accent decoration-2">{cut}</span>
                </p>
              </div>
            ))}
          </div>
        }
      />

      <Cell
        path="/seo-tools/tag-extractor"
        title="Tag extractor"
        body="See the tags, title keywords and hashtags behind any video."
        visual={
          <div className="flex flex-wrap gap-2">
            {["budget camera", "camera review", "best camera 2026", "vlogging", "sony zv-e10", "#filmmaking", "canon r50", "beginner setup"].map((t) => (
              <span key={t} className="rounded-lg bg-surface-2 px-2.5 py-1 text-sm">
                {t}
              </span>
            ))}
          </div>
        }
      />
    </div>
  );
}
