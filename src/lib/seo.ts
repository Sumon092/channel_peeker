import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
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
