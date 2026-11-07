import { ArrowRight, Check, ChevronDown, Minus } from "lucide-react";
import Link from "next/link";
import { FeatureBento } from "@/components/feature-bento";
import { JsonLd } from "@/components/json-ld";
import { ReportPreview } from "@/components/report-preview";
import { SectionHeading } from "@/components/section-heading";
import { SmartSearch, type SmartTool } from "@/components/smart-search";
import { getTool, toolsByInput, type InputKind } from "@/lib/tools";

const comparison: [string, boolean | "partial", boolean | "partial"][] = [
  ["Core tools free, with no signup", true, "partial"],
  ["No browser extension required", true, true],
  ["Paste any link: we detect what it is", true, false],
  ["Earnings shown as ranges, with the math", true, false],
  ["Public methodology for every estimate", true, false],
  ["1080p to 4K thumbnail sizes", true, false],
  ["No ads between the input and your results", true, false],
];

const faq = [
  {
    q: "Is channelpeeker really free?",
    a: "Yes. Every core tool is free and works without an account. We may add optional paid features later, such as tracking and exports, but the basics stay free.",
  },
  {
    q: "Where does the data come from?",
    a: "Public data comes from the official YouTube Data API. Anything we calculate, like medians, outlier multipliers and earnings ranges, is labeled as a channelpeeker estimate and explained on our methodology page.",
  },
  {
    q: "Is channelpeeker affiliated with YouTube?",
    a: "No. channelpeeker is an independent tool for creators and is not affiliated with, endorsed by or sponsored by YouTube or Google.",
  },
  {
    q: "How accurate are the earnings estimates?",
    a: "No outside tool can see a channel's real revenue. We show low, mid and high ranges based on a CPM table we publish and review every quarter, so you can see exactly how each number was calculated.",
  },
  {
    q: "Do I need to connect my YouTube account?",
    a: "No. Our tools work with public data only. Paste a link, @handle or ID and you get results immediately.",
  },
];

function byKindFor(kind: InputKind): SmartTool[] {
  // Live tools first, keeping the configured priority within each group.
  return toolsByInput[kind]
    .map((p) => {
      const t = getTool(p);
      return { path: t.path, name: t.name, live: t.status === "live" };
    })
    .sort((a, b) => Number(b.live) - Number(a.live));
}

function Mark({ value }: { value: boolean | "partial" }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-good" aria-label="Yes" strokeWidth={2.5} />;
  if (value === "partial") return <span className="text-sm text-muted">Often limited</span>;
  return <Minus className="mx-auto h-5 w-5 text-surface-3" aria-label="No" strokeWidth={2.5} />;
}

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const byKind = { video: byKindFor("video"), channel: byKindFor("channel"), playlist: byKindFor("playlist") };

  return (
    <>
      {/* Hero */}
      <section className="hero-surface overflow-x-clip border-b border-border">
        <div className="mx-auto max-w-4xl px-4 pt-14 text-center sm:px-6 sm:pt-20">
          <Link
            href="/thumbnail-tools/thumbnail-downloader"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-3 text-sm shadow-sm transition hover:border-text/25"
          >
            <span className="rounded-full bg-accent-fill px-2 py-0.5 text-xs font-bold text-white">New</span>
            Download thumbnails in 1080p and 4K
            <ArrowRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          </Link>

          <h1 className="mt-7 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-[4.25rem]">
            Know exactly what&apos;s working <span className="text-accent">on YouTube</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Paste any channel or video. Get the stats, outliers, thumbnails and tags behind it, with every number explained. Free, instant, no
            signup.
          </p>

          <div className="mx-auto mt-10 max-w-3xl">
            <SmartSearch byKind={byKind} />
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
            {["Free forever for core tools", "No account or extension", "Official YouTube Data API"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-good" aria-hidden="true" strokeWidth={2.5} /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 px-4 sm:px-6">
          <ReportPreview />
        </div>
      </section>

      {/* Toolkit bento */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The toolkit"
            title="One place for every YouTube question"
            intro="Analytics, thumbnails, SEO and earnings, built as focused tools that each do one job extremely well."
          />
          <Link href="/tools" className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-4 py-2 text-sm font-medium transition hover:bg-surface-3">
            All tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-12">
          <FeatureBento />
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y border-border bg-surface-2/50">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
          <SectionHeading eyebrow="Why channelpeeker" title="Built differently from typical tool sites" align="center" />
          <div className="reveal mt-12 overflow-x-auto rounded-3xl border border-border bg-surface">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-6 py-5 text-sm font-medium text-muted">
                    Feature
                  </th>
                  <th scope="col" className="w-40 bg-accent-soft/60 px-6 py-5 text-center text-sm font-bold">
                    channelpeeker
                  </th>
                  <th scope="col" className="w-44 px-6 py-5 text-center text-sm font-medium text-muted">
                    Typical free tool sites
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparison.map(([label, us, them]) => (
                  <tr key={label}>
                    <th scope="row" className="px-6 py-4 font-medium">
                      {label}
                    </th>
                    <td className="bg-accent-soft/60 px-6 py-4 text-center">
                      <Mark value={us} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Mark value={them} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" align="center" />
        <div className="reveal mt-12 divide-y divide-border rounded-3xl border border-border bg-surface">
          {faq.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-card-title font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="-mt-1 px-6 pb-6 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="reveal mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-8 py-16 text-center sm:px-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Your next video starts with better data</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-muted">Free tools, honest numbers and no paywall on the basics.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/tools" className="inline-flex items-center gap-2 rounded-full bg-accent-fill px-7 py-3.5 font-medium text-white transition hover:bg-accent-fill-strong active:scale-[0.97]">
              Explore all tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/methodology" className="rounded-full px-7 py-3.5 font-medium text-white ring-1 ring-white/20 transition hover:ring-white/50">
              How we calculate
            </Link>
          </div>
        </div>
      </section>

      {/* WebSite + Organization come from the root layout (single source, with @id and logo). */}
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
    </>
  );
}
