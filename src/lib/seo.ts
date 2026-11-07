import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  languages,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** hreflang map (locale → path) for pages that exist in several languages. */
  languages?: Record<string, string>;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, languages },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
