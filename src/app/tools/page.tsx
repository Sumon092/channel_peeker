import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ToolGrid } from "@/components/tool-card";
import { pageMetadata } from "@/lib/seo";
import { hubs, toolsInHub } from "@/lib/tools";

export const metadata = pageMetadata({
  title: "All free YouTube tools",
  description: "Every channelpeek tool for YouTube creators: analytics, thumbnails, SEO, revenue, transcripts and keywords. Free, no signup.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Tools", path: "/tools" }]}
        title="Free tools for YouTube creators"
        intro="Analytics, thumbnails, SEO, revenue estimates, transcripts and keywords. Every tool is free and works without an account."
      >
        <nav aria-label="Tool categories" className="mt-8 flex flex-wrap gap-2">
          {hubs.map((hub) => (
            <a key={hub.id} href={`#${hub.id}`} className="rounded-lg bg-surface-2 px-3.5 py-2 text-sm font-medium transition hover:bg-surface-3">
              {hub.name}
            </a>
          ))}
        </nav>
      </PageHero>
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14">
        {hubs.map((hub) => (
          <section key={hub.id} id={hub.id} className="scroll-mt-24 [content-visibility:auto] [contain-intrinsic-size:auto_600px]">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">{hub.name}</h2>
                <p className="mt-1.5 text-muted">{hub.summary}</p>
              </div>
              {hub.path && toolsInHub(hub.id).some((t) => t.status === "live") && (
                <Link href={hub.path} className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                  View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
            <ToolGrid tools={toolsInHub(hub.id)} />
          </section>
        ))}
      </div>
    </>
  );
}
