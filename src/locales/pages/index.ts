import type { Locale } from "@/lib/i18n";
import type { LocalizedPageContent } from "@/lib/localized-page";

/** Every translated page's content, for tests (pages import their own file directly). */
export const PAGES: Partial<Record<Locale, Record<string, LocalizedPageContent>>> = {};
