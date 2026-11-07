import { hubs, toolsInHub } from "@/lib/tools";
import { HeaderClient } from "./header-client";

/**
 * Server shell: computes the tools-menu data at build time; the markup lives in
 * HeaderClient so labels can follow the page's locale via the pathname.
 */
export function SiteHeader() {
  const groups = hubs.map((hub) => {
    const all = toolsInHub(hub.id);
    const live = all.filter((t) => t.status === "live");
    return {
      name: hub.name,
      items: live.map((t) => ({ name: t.name, path: t.path })),
      soon: all.length - live.length,
    };
  });

  return <HeaderClient groups={groups} />;
}
