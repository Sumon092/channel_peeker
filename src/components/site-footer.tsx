import { hubName } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { hubs } from "@/lib/tools";
import { chromeFor } from "@/locales/widgets";
import { FooterClient } from "./footer-client";

/** Server shell: hub links and labels in the page's language; markup in FooterClient. */
export function SiteFooter({ locale }: { locale: Locale | "en" }) {
  const l = locale === "en" ? null : locale;
  const hubLinks = hubs.filter((h) => h.path).map((h) => ({ href: h.path as string, label: hubName(h.id, l) }));
  // Year computed server-side so prerendered HTML and hydration can't disagree around New Year.
  return <FooterClient hubLinks={hubLinks} year={new Date().getFullYear()} c={chromeFor(locale)} />;
}
