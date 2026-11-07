export const site = {
  name: "channelpeeker",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://channelpeeker.com",
  tagline: "Free, fast YouTube analytics and SEO tools with honest numbers.",
  description:
    "Free YouTube analytics and SEO tools: channel analyzer, video stats, thumbnail downloader, tag extractor, revenue calculator and more. No signup, no extension.",
  disclaimer:
    "channelpeeker is an independent tool for YouTube creators. It is not affiliated with, endorsed by or sponsored by YouTube or Google.",
  contactEmail: "hello@channelpeeker.com",
} as const;

/** GA4 Measurement ID. Unset or malformed means no banner and no Google Analytics. Build-time, server-only. */
export const gaMeasurementId = /^G-[A-Z0-9]+$/.test(process.env.GA_MEASUREMENT_ID ?? "") ? process.env.GA_MEASUREMENT_ID : undefined;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
