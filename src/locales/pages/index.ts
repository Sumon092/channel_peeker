import type { Locale } from "@/lib/i18n";
import type { LocalizedPageContent } from "@/lib/localized-page";
import { content as koMonetization } from "./ko/monetization-checker";
import { content as koWatchTime } from "./ko/watch-time-calculator";
import { content as koChannelAge } from "./ko/channel-age-checker";
import { content as jaMonetization } from "./ja/monetization-checker";
import { content as jaWatchTime } from "./ja/watch-time-calculator";
import { content as jaChannelAge } from "./ja/channel-age-checker";
import { content as esMonetization } from "./es/monetization-checker";
import { content as esWatchTime } from "./es/watch-time-calculator";
import { content as esChannelAge } from "./es/channel-age-checker";
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
  ko: { "/monetization-checker": koMonetization, "/watch-time-calculator": koWatchTime, "/channel-age-checker": koChannelAge },
  ja: { "/monetization-checker": jaMonetization, "/watch-time-calculator": jaWatchTime, "/channel-age-checker": jaChannelAge },
  es: { "/monetization-checker": esMonetization, "/watch-time-calculator": esWatchTime, "/channel-age-checker": esChannelAge },
  fr: { "/monetization-checker": frMonetization, "/watch-time-calculator": frWatchTime, "/channel-age-checker": frChannelAge },
  de: { "/monetization-checker": deMonetization, "/watch-time-calculator": deWatchTime, "/channel-age-checker": deChannelAge },
  pt: { "/monetization-checker": ptMonetization, "/watch-time-calculator": ptWatchTime, "/channel-age-checker": ptChannelAge },
};
