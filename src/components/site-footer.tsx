import { hubs } from "@/lib/tools";
import { FooterClient } from "./footer-client";

/** Server shell: hub links computed at build time; markup in FooterClient for locale labels. */
export function SiteFooter() {
  const hubLinks = hubs.filter((h) => h.path).map((h) => ({ href: h.path as string, label: h.name }));
  // Year computed server-side so prerendered HTML and hydration can't disagree around New Year.
  return <FooterClient hubLinks={hubLinks} year={new Date().getFullYear()} />;
}
