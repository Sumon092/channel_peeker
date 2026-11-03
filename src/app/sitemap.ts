import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { hubs, liveTools, toolsInHub } from "@/lib/tools";

const staticPages = ["/", "/tools", "/methodology", "/data-policy", "/about", "/contact", "/privacy-policy", "/terms", "/cookie-policy", "/changelog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Only hubs with at least one live tool are indexable (see hubMetadata).
  const hubPaths = hubs
    .filter((h) => h.path && toolsInHub(h.id).some((t) => t.status === "live" && t.path !== h.path))
    .map((h) => h.path as string);
  const paths = new Set([...staticPages, ...hubPaths, ...liveTools().map((t) => t.path)]);
  return [...paths].map((path) => ({ url: absoluteUrl(path), lastModified }));
}
