import type { Locale } from "@/lib/i18n";
import type { LocalizedPageContent } from "@/lib/localized-page";
import { content as frMonetization } from "./fr/monetization-checker";
import { content as frWatchTime } from "./fr/watch-time-calculator";
import { content as frChannelAge } from "./fr/channel-age-checker";
import { content as deMonetization } from "./de/monetization-checker";
import { content as deWatchTime } from "./de/watch-time-calculator";
import { content as deChannelAge } from "./de/channel-age-checker";
import { content as ptMonetization } from "./pt/monetization-checker";
import { content as ptWatchTime } from "./pt/watch-time-calculator";
import { content as ptChannelAge } from "./pt/channel-age-checker";

/** Every translated page's content, for tests (pages import their own file directly). */
export const PAGES: Partial<Record<Locale, Record<string, LocalizedPageContent>>> = {
  fr: { "/monetization-checker": frMonetization, "/watch-time-calculator": frWatchTime, "/channel-age-checker": frChannelAge },
  de: { "/monetization-checker": deMonetization, "/watch-time-calculator": deWatchTime, "/channel-age-checker": deChannelAge },
  pt: { "/monetization-checker": ptMonetization, "/watch-time-calculator": ptWatchTime, "/channel-age-checker": ptChannelAge },
};
