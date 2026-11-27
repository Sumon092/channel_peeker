import type { Metadata } from "next";
import { alt as ogAlt, contentType as ogType, size as ogSize } from "@/app/opengraph-image";
import { absoluteUrl, site } from "./site";

/**
 * The site's social share card. Set explicitly: a page's own openGraph/twitter blocks replace the parent's
 * instead of merging, and the root opengraph-image.tsx sits above the per-language root layouts, so without
 * this every page that defines openGraph would ship no og:image.
 */
export const DEFAULT_OG_IMAGE = { url: absoluteUrl("/opengraph-image"), ...ogSize, type: ogType, alt: ogAlt };

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
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}
