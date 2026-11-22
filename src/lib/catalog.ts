import { CATALOGS } from "@/locales/catalog";
import { isLocalizedTool, localePath, type Locale } from "./i18n";
import { getHub, type HubId, type Tool } from "./tools";

/**
 * Localized names for the tool catalog (menu, breadcrumbs, related cards).
 * English comes from lib/tools.ts; translations live in locales/catalog/{locale}.ts.
 */
export interface Catalog {
  hubs: Record<HubId, string>;
  /** Every live tool needs a name; summaries are required for tools shown as cards on localized pages (enforced by test). */
  tools: Record<string, { name: string; summary?: string }>;
}

type Lang = Locale | null | undefined;

export function toolName(tool: Tool, locale: Lang): string {
  return (locale && CATALOGS[locale].tools[tool.path]?.name) || tool.name;
}

export function toolSummary(tool: Tool, locale: Lang): string {
  return (locale && CATALOGS[locale].tools[tool.path]?.summary) || tool.summary;
}

export function hubName(id: HubId, locale: Lang): string {
  return locale ? CATALOGS[locale].hubs[id] : getHub(id).name;
}

/** Link target for a tool: the localized page when one exists, else the English page. */
export function toolHref(path: string, locale: Lang): string {
  return locale && isLocalizedTool(path) ? localePath(locale, path) : path;
}
