import { ArrowUpRight, BadgeCheck, ChartColumnBig, Clock, Search, Tags, TrendingUp } from "lucide-react";

/**
 * Static product preview for the home hero: a wide, dashboard-style channel report.
 * All figures are illustrative sample data for a fictional channel and are labeled as such.
 */

// Views per upload for the last 20 videos (sample data).
const series = [22, 31, 27, 35, 29, 41, 38, 33, 52, 44, 39, 61, 48, 57, 49, 63, 112, 66, 71, 64];

function chartPath(values: number[], w: number, h: number) {
  const max = Math.max(...values) * 1.1;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - (v / max) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${w} ${h} L0 ${h} Z`, peak: pts[values.indexOf(Math.max(...values))] };
}

const stats = [
  { label: "Subscribers", value: "≈ 412K", delta: null },
  { label: "Median views (30d)", value: "48.2K", delta: "+18%" },
  { label: "Uploads / week", value: "2.1", delta: null },
  { label: "Engagement rate", value: "4.8%", delta: "+0.6" },
];

const outliers = [
  { title: "I rebuilt my studio for $500", views: "1.2M views", mult: "11.4×", time: "14:08", tone: "from-[#3f3f46] to-[#18181b]" },
  { title: "The camera settings nobody uses", views: "486K views", mult: "4.6×", time: "9:41", tone: "from-[#57534e] to-[#1c1917]" },
  { title: "Why my Shorts stopped growing", views: "311K views", mult: "3.0×", time: "0:58", tone: "from-[#334155] to-[#0f172a]" },
];

const nav = [
  { icon: ChartColumnBig, label: "Overview", active: true },
  { icon: TrendingUp, label: "Outliers" },
  { icon: Tags, label: "Tags & SEO" },
  { icon: Clock, label: "Best time" },
];

export function ReportPreview() {
  const { line, area, peak } = chartPath(series, 600, 160);

  return (
    <figure className="mx-auto w-full max-w-6xl">
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-t-2xl border border-b-0 border-border bg-surface shadow-[0_-8px_60px_rgb(0_0_0/0.08)]"
      >
        {/* Browser bar */}
        <div className="flex items-center gap-3 border-b border-border bg-surface-2/70 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-surface-3" />
            <span className="h-3 w-3 rounded-full bg-surface-3" />
            <span className="h-3 w-3 rounded-full bg-surface-3" />
          </div>
          <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-md bg-surface px-3 py-1 text-xs text-muted">
            <Search className="h-3 w-3" /> channelpeeker.com/channel/@northlightstudio
          </div>
        </div>

        <div className="grid md:grid-cols-[200px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="hidden border-r border-border p-3 md:block">
            {nav.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${active ? "bg-surface-2 font-medium" : "text-muted"}`}
              >
                <Icon className="h-4 w-4" /> {label}
              </div>
            ))}
          </aside>

          <div className="min-w-0 p-5 sm:p-6">
            {/* Channel header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b45309] font-bold text-white">N</span>
                <div>
                  <p className="flex items-center gap-1 font-bold">
                    Northlight Studio <BadgeCheck className="h-4 w-4 text-muted" />
                  </p>
                  <p className="text-xs text-muted">@northlightstudio · 238 videos · Joined 2019</p>
                </div>
              </div>
              <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted">Sample data</span>
            </div>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border px-4 py-3">
                  <p className="text-xs text-muted">{s.label}</p>
                  <p className="mt-1 flex items-baseline gap-2 text-xl font-bold tabular-nums tracking-tight">
                    {s.value}
                    {s.delta && (
                      <span className="flex items-center text-xs font-medium text-good">
                        <ArrowUpRight className="h-3 w-3" />
                        {s.delta}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              {/* Chart */}
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Views per upload</span>
                  <span className="text-muted">Last 20 videos</span>
                </div>
                <svg viewBox="0 0 600 160" className="mt-3 h-36 w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="rp-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--accent)" stopOpacity="0.16" />
                      <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[40, 80, 120].map((y) => (
                    <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="var(--border)" />
                  ))}
                  <path d={area} fill="url(#rp-fill)" />
                  <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  <circle cx={peak[0]} cy={peak[1]} r="4" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>

              {/* Outliers */}
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Top outliers</span>
                  <span className="text-muted">vs channel median</span>
                </div>
                <ul className="mt-3 space-y-3">
                  {outliers.map((o) => (
                    <li key={o.title} className="flex items-center gap-3">
                      <span className={`relative h-10 w-[72px] shrink-0 overflow-hidden rounded-md bg-linear-to-br ${o.tone}`}>
                        <span className="absolute bottom-0.5 right-0.5 rounded-sm bg-black/80 px-1 text-[9px] text-white">{o.time}</span>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{o.title}</p>
                        <p className="text-xs text-muted">{o.views}</p>
                      </div>
                      <span className="text-sm font-bold text-accent">{o.mult}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">Sample channel report with illustrative data</figcaption>
    </figure>
  );
}
