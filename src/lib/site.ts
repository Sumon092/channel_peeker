export const site = {
  name: "channelpeek",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://channelpeek.com",
  tagline: "Free, fast YouTube analytics and SEO tools with honest numbers.",
  description:
    "Free YouTube analytics and SEO tools: channel analyzer, video stats, thumbnail downloader, tag extractor, revenue calculator and more. No signup, no extension.",
  disclaimer:
    "channelpeek is an independent tool for YouTube creators. It is not affiliated with, endorsed by or sponsored by YouTube or Google.",
  contactEmail: "hello@channelpeek.com",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
