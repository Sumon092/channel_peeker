import { ArrowRight, Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale, ToolPageLabels } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";
import { getHub, getTool, type Tool } from "@/lib/tools";
import { WIDGET_STRINGS } from "@/locales/widgets";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { I18nProvider } from "./i18n-provider";
import { JsonLd } from "./json-ld";
import { SectionHeading } from "./section-heading";
import { ToolGrid } from "./tool-card";

export interface Faq {
  q: string;
  a: string;
}

interface ToolPageProps {
  tool: Tool;
  /** H1 text; should contain the page's primary keyword. */
  heading: string;
  /** Part of the heading to show in the accent color. Defaults to the tool name. */
  highlight?: string;
  intro: string;
  /** The interactive widget. Keep it a small client component. */
  children: ReactNode;
  howTo: string[];
  meaning: ReactNode;
  faq: Faq[];
  related: string[];
  updated: string;
  /** Third trust badge. Override for tools that don't read the YouTube Data API. */
  dataBadge?: string;
  /** Localized chrome: language code, translated labels and the page's own path. */
  i18n?: { lang: Locale; labels: ToolPageLabels; path: string };
}

function Highlighted({ text, part }: { text: string; part: string }) {
  const i = text.indexOf(part);
  if (!part || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-accent">{part}</span>
      {text.slice(i + part.length)}
    </>
  );
}

/**
 * Shared layout for every tool page (plan section 9.2): H1 and the tool above the fold,
 * then how-to, what the results mean, FAQ, related tools and schema.
 */
export function ToolPage({ tool, heading, highlight, intro, children, howTo, meaning, faq, related, updated, dataBadge = "Official YouTube data", i18n }: ToolPageProps) {
  const hub = getHub(tool.hub);
  const L = i18n?.labels;
  const pagePath = i18n?.path ?? tool.path;
  const crumbs: Crumb[] = [{ name: L?.breadcrumbTools ?? "Tools", path: "/tools" }];
  if (hub.path && hub.path !== tool.path) crumbs.push({ name: hub.name, path: hub.path });
  crumbs.push({ name: tool.name, path: pagePath });

  const relatedTools = related.map(getTool);

  return (
    <div lang={i18n?.lang}>
      <section className="hero-surface border-b border-border">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="mt-10 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-accent" /> {L?.freeBadge ?? "Free tool · No signup"}
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-[-0.03em] sm:text-[3.4rem]">
              <Highlighted text={heading} part={highlight ?? tool.name} />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
          </div>

          <div className="mt-10">
            {i18n ? (
              <I18nProvider lang={i18n.lang} strings={WIDGET_STRINGS[i18n.lang]}>
                {children}
              </I18nProvider>
            ) : (
              children
            )}
          </div>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {[...(L?.badges ?? ["100% free", "No signup"]), dataBadge].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-good" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow={L?.stepByStep ?? "Step by step"} title={L?.howToHeading(tool.name) ?? `How to use the ${tool.name}`} align="center" />
        <ol className={`mt-12 grid gap-5 ${howTo.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {howTo.map((step, i) => (
            <li key={step} className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-strong">{`${L?.stepWord ?? "Step"} 0${i + 1}`}</p>
              <p className="mt-3 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-surface-2/50">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow={L?.meaningEyebrow ?? "Understand your results"} title={L?.meaningHeading ?? "What the results mean"} />
          <div className="prose-cp mt-6">{meaning}</div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow={L?.faqEyebrow ?? "FAQ"} title={L?.faqHeading ?? "Frequently asked questions"} align="center" />
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-surface">
          {faq.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="-mt-1 px-6 pb-5 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted">
          {L ? L.lastUpdated(updated) : `Last updated ${updated} · Reviewed by the channelpeeker team`} ·{" "}
          <Link href="/methodology" className="underline">
            {L?.methodologyLink ?? "How we calculate"}
          </Link>
        </p>
      </section>

      {relatedTools.length > 0 && (
        <section className="border-t border-border bg-surface-2/50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow={L?.keepGoing ?? "Keep going"} title={L?.relatedHeading ?? "Related tools"} />
              <Link href={hub.path ?? "/tools"} className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline">
                {L ? L.allTools : `All ${hub.path ? hub.name.toLowerCase() : "tools"}`} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-10">
              <ToolGrid tools={relatedTools} />
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `${tool.name} for YouTube`,
            url: absoluteUrl(pagePath),
            description: i18n ? intro : tool.summary,
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            publisher: { "@type": "Organization", name: site.name, url: site.url },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
    </div>
  );
}
