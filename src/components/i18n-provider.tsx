"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { EN_WIDGETS, INTL_LOCALE, type WidgetStrings } from "@/lib/widget-i18n";

interface I18nValue {
  /** Site locale code ("en", "de", …). */
  lang: string;
  /** BCP 47 tag for Intl formatting ("pt-BR", "es-419", …). */
  intl: string;
  w: WidgetStrings;
}

/** Default = English, so widgets on English pages need no provider. */
const I18nContext = createContext<I18nValue>({ lang: "en", intl: "en", w: EN_WIDGETS });

export function useI18n(): I18nValue {
  return useContext(I18nContext);
}

/** Wraps a localized page's widget tree; also keeps <html lang> in sync for AT. */
export function I18nProvider({ lang, strings, children }: { lang: string; strings: WidgetStrings; children: ReactNode }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev || "en";
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, intl: INTL_LOCALE[lang] ?? lang, w: strings }), [lang, strings]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
