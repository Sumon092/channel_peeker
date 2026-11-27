import type { Locale } from "@/lib/i18n";
import type { LocalizedPageContent } from "@/lib/localized-page";
import { content as ptMonetization } from "./pt/monetization-checker";
import { content as ptWatchTime } from "./pt/watch-time-calculator";
import { content as ptChannelAge } from "./pt/channel-age-checker";

/** Every translated page's content, for tests (pages import their own file directly). */
export const PAGES: Partial<Record<Locale, Record<string, LocalizedPageContent>>> = {
  pt: { "/monetization-checker": ptMonetization, "/watch-time-calculator": ptWatchTime, "/channel-age-checker": ptChannelAge },
};
