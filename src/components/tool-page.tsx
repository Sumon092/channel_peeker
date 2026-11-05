import { ArrowRight, Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { absoluteUrl, site } from "@/lib/site";
import { getHub, getTool, type Tool } from "@/lib/tools";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
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
export function ToolPage({ tool, heading, highlight, intro, children, howTo, meaning, faq, related, updated }: ToolPageProps) {
  const hub = getHub(tool.hub);
  const crumbs: Crumb[] = [{ name: "Tools", path: "/tools" }];
  if (hub.path && hub.path !== tool.path) crumbs.push({ name: hub.name, path: hub.path });
  crumbs.push({ name: tool.name, path: tool.path });

  const relatedTools = related.map(getTool);

  return (
    <>
      <section className="hero-surface border-b border-border">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="mt-10 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-accent" /> Free tool · No signup
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-[-0.03em] sm:text-[3.4rem]">
              <Highlighted text={heading} part={highlight ?? tool.name} />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
          </div>

          <div className="mt-10">{children}</div>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {["100% free", "No signup", "Official YouTube data"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-good" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Step by step" title={`How to use the ${tool.name}`} align="center" />
        <ol className={`mt-12 grid gap-5 ${howTo.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {howTo.map((step, i) => (
            <li key={step} className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-strong">Step 0{i + 1}</p>
              <p className="mt-3 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-surface-2/50">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow="Understand your results" title="What the results mean" />
          <div className="prose-cp mt-6">{meaning}</div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" align="center" />
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
          Last updated {updated} · Reviewed by the channelpeek team ·{" "}
          <Link href="/methodology" className="underline">
            How we calculate
          </Link>
        </p>
      </section>

      {relatedTools.length > 0 && (
        <section className="border-t border-border bg-surface-2/50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Keep going" title="Related tools" />
              <Link href={hub.path ?? "/tools"} className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline">
                All {hub.path ? hub.name.toLowerCase() : "tools"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
            url: absoluteUrl(tool.path),
            description: tool.summary,
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
    </>
  );
}
