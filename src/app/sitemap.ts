import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { hreflangFor, isLocalizedTool, LOCALES, LOCALIZED_TOOLS, localePath, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import { hubs, liveTools, toolsInHub } from "@/lib/tools";

const staticPages = [
  "/",
  "/tools",
  "/methodology",
  "/data-policy",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
  "/changelog",
  "/compare/vidiq-alternative",
  "/compare/social-blade-alternative",
];

/**
 * lastmod = date of the last commit that changed the page's own content, not the build date
 * (Google ignores lastmod values it finds unreliable). Runs at build time; deploys build from
 * a git checkout (DEPLOYMENT.md). Pure renames are ignored so moving files (e.g. into the
 * (en) route group) doesn't reset dates; shared layout/component changes don't count either.
 */
function lastCommitDate(pathspecs: string[]): Date | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "-M", "--diff-filter=AM", "--", ...pathspecs], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out ? new Date(out) : undefined;
  } catch {
    return undefined;
  }
}

/** English page: files directly in its route folder (current (en) location and pre-move location). */
function englishLastMod(path: string): Date | undefined {
  if (path === "/") return lastCommitDate(["src/app/(en)/page.tsx", "src/app/page.tsx"]);
  return lastCommitDate([`:(glob)src/app/(en)${path}/*`, `:(glob)src/app${path}/*`]);
}

/** Localized page: its copy lives in locales/{locale}.ts and locales/pages/{locale}/; the page.tsx files are wiring only. */
function localizedLastMod(locale: Locale): Date | undefined {
  return lastCommitDate([`src/locales/${locale}.ts`, `:(glob)src/locales/pages/${locale}/*`]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Only hubs with at least one live tool are indexable (see hubMetadata).
  const hubPaths = hubs
    .filter((h) => h.path && toolsInHub(h.id).some((t) => t.status === "live" && t.path !== h.path))
    .map((h) => h.path as string);
  const englishPaths = [...new Set([...staticPages, ...hubPaths, ...liveTools().map((t) => t.path)])];

  const entries: MetadataRoute.Sitemap = englishPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: englishLastMod(path),
    // Same alternates as the page's hreflang tags; untranslated pages declare none.
    alternates: isLocalizedTool(path) ? { languages: hreflangFor(path) } : undefined,
  }));

  const localeDates = Object.fromEntries(LOCALES.map((l) => [l, localizedLastMod(l)])) as Record<Locale, Date | undefined>;
  for (const l of LOCALES)
    for (const p of LOCALIZED_TOOLS)
      entries.push({ url: absoluteUrl(localePath(l, p)), lastModified: localeDates[l], alternates: { languages: hreflangFor(p) } });

  const missing = entries.filter((e) => !e.lastModified).map((e) => e.url);
  if (missing.length) console.warn(`sitemap: no git date for ${missing.length} URL(s), lastmod omitted (shallow clone or no git?):`, missing.slice(0, 5));
  return entries;
}
