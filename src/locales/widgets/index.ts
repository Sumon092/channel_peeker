import type { Locale } from "@/lib/i18n";
import type { ChromeStrings, WidgetStrings } from "@/lib/widget-i18n";
import * as de from "./de";
import * as es from "./es";
import * as fr from "./fr";
import * as ja from "./ja";
import * as ko from "./ko";
import * as pt from "./pt";

export const WIDGET_STRINGS: Record<Locale, WidgetStrings> = {
  de: de.widgets,
  ja: ja.widgets,
  fr: fr.widgets,
  ko: ko.widgets,
  es: es.widgets,
  pt: pt.widgets,
};

export const CHROME_STRINGS: Record<Locale, ChromeStrings> = {
  de: de.chrome,
  ja: ja.chrome,
  fr: fr.chrome,
  ko: ko.chrome,
  es: es.chrome,
  pt: pt.chrome,
};
