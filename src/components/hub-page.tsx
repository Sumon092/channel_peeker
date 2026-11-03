import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";
import { getHub, toolsInHub, type HubId } from "@/lib/tools";
import { PageHero } from "./page-hero";
import { ToolGrid } from "./tool-card";

/** Hubs stay out of the index until at least one of their tools is live. */
export function hubMetadata(id: HubId, title: string, description: string): Metadata {
  const hub = getHub(id);
  const hasLive = toolsInHub(id).some((t) => t.status === "live" && t.path !== hub.path);
  return pageMetadata({ title, description, path: hub.path ?? "/tools", noindex: !hasLive });
}

export function HubPage({ id, heading, intro, children }: { id: HubId; heading: string; intro: string; children?: ReactNode }) {
  const hub = getHub(id);
  return (
    <>
      <PageHero crumbs={[{ name: "Tools", path: "/tools" }, { name: hub.name, path: hub.path ?? "/tools" }]} title={heading} intro={intro} />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <ToolGrid tools={toolsInHub(id).filter((t) => t.path !== hub.path)} />
        {children && <div className="prose-cp mt-16 max-w-3xl">{children}</div>}
      </div>
    </>
  );
}
