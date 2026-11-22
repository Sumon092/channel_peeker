import { hubName, toolHref, toolName } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { hubs, toolsInHub } from "@/lib/tools";
import { chromeFor } from "@/locales/widgets";
import { HeaderClient } from "./header-client";

/**
 * Server shell: builds the tools menu in the page's language (category and tool names,
 * links to the localized version where one exists); markup lives in HeaderClient.
 */
export function SiteHeader({ locale }: { locale: Locale | "en" }) {
  const l = locale === "en" ? null : locale;
  const groups = hubs.map((hub) => {
    const all = toolsInHub(hub.id);
    const live = all.filter((t) => t.status === "live");
    return {
      name: hubName(hub.id, l),
      items: live.map((t) => ({ name: toolName(t, l), path: t.path, href: toolHref(t.path, l) })),
      soon: all.length - live.length,
    };
  });

  return <HeaderClient groups={groups} c={chromeFor(locale)} />;
}
