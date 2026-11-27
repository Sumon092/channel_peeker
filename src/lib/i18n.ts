/**
 * Minimal i18n for localized tool pages. English stays at the root URLs;
 * localized versions live under /de /ja /fr /ko. Interactive widgets are
 * shared modules, so a fix to a tool automatically applies to every locale.
 */

import { absoluteUrl } from "./site";

export const LOCALES = ["de", "ja", "fr", "ko", "es", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

/** English tool paths that have localized versions (pilot set — extend over time). */
export const LOCALIZED_TOOLS = [
  "/comment-picker",
  "/comment-finder",
  "/thumbnail-tools/thumbnail-downloader",
  "/thumbnail-tools/banner-downloader",
  "/monetization-checker",
  "/channel-analyzer",
  "/watch-time-calculator",
  "/video-upload-date-checker",
] as const;

export const localePath = (locale: Locale, enPath: string) => `/${locale}${enPath}`;

/** Locale of a URL path ("/de/comment-picker" → "de"), or null for English pages. */
export function localeFromPathname(pathname: string): Locale | null {
  const first = pathname.split("/")[1];
  return (LOCALES as readonly string[]).includes(first) ? (first as Locale) : null;
}

/** BCP 47 language tag per site locale, used for hreflang and <html lang>. Portuguese copy is Brazilian. */
export const LANG_TAG: Record<Locale | "en", string> = {
  en: "en",
  de: "de",
  ja: "ja",
  fr: "fr",
  ko: "ko",
  es: "es",
  pt: "pt-BR",
};

export const isLocalizedTool = (enPath: string) => (LOCALIZED_TOOLS as readonly string[]).includes(enPath);

/**
 * Absolute hreflang map for a localized tool: every language version plus x-default → English.
 * Throws for untranslated paths so no page can ever point at alternates that don't exist.
 */
export function hreflangFor(enPath: string): Record<string, string> {
  if (!isLocalizedTool(enPath)) throw new Error(`hreflangFor: ${enPath} has no localized versions`);
  const map: Record<string, string> = { [LANG_TAG.en]: absoluteUrl(enPath) };
  for (const l of LOCALES) map[LANG_TAG[l]] = absoluteUrl(localePath(l, enPath));
  map["x-default"] = absoluteUrl(enPath);
  return map;
}

/** Every static string ToolPage renders, so localized pages have no English chrome. */
export interface ToolPageLabels {
  freeBadge: string;
  stepWord: string;
  stepByStep: string;
  howToHeading: (toolName: string) => string;
  meaningEyebrow: string;
  meaningHeading: string;
  faqEyebrow: string;
  faqHeading: string;
  lastUpdated: (date: string) => string;
  methodologyLink: string;
  keepGoing: string;
  relatedHeading: string;
  allTools: string;
  badges: [string, string];
  breadcrumbTools: string;
  /** Label before the how-to tip, e.g. "Tip:" */
  tipLabel: string;
}

export const LABELS: Record<Locale, ToolPageLabels> = {
  de: {
    freeBadge: "Kostenloses Tool · Ohne Anmeldung",
    stepWord: "Schritt",
    stepByStep: "Schritt für Schritt",
    howToHeading: (n) => `${n}: So funktioniert's`,
    meaningEyebrow: "Ergebnisse verstehen",
    meaningHeading: "Was die Ergebnisse bedeuten",
    faqEyebrow: "FAQ",
    faqHeading: "Häufige Fragen",
    lastUpdated: (d) => `Aktualisiert am ${d} · Vom channelpeeker-Team geprüft`,
    methodologyLink: "Unsere Methodik",
    keepGoing: "Weiter geht's",
    relatedHeading: "Verwandte Tools",
    allTools: "Alle Tools",
    badges: ["100 % kostenlos", "Keine Anmeldung"],
    breadcrumbTools: "Tools",
    tipLabel: "Tipp:",
  },
  ja: {
    freeBadge: "無料ツール · 登録不要",
    stepWord: "ステップ",
    stepByStep: "使い方ガイド",
    howToHeading: (n) => `${n}の使い方`,
    meaningEyebrow: "結果の見方",
    meaningHeading: "結果が意味すること",
    faqEyebrow: "FAQ",
    faqHeading: "よくある質問",
    lastUpdated: (d) => `更新日: ${d} · channelpeekerチームによる確認済み`,
    methodologyLink: "算出方法について",
    keepGoing: "次のステップ",
    relatedHeading: "関連ツール",
    allTools: "すべてのツール",
    badges: ["完全無料", "登録不要"],
    breadcrumbTools: "ツール",
    tipLabel: "ヒント:",
  },
  fr: {
    freeBadge: "Outil gratuit · Sans inscription",
    stepWord: "Étape",
    stepByStep: "Étape par étape",
    howToHeading: (n) => `${n} : mode d'emploi`,
    meaningEyebrow: "Comprendre vos résultats",
    meaningHeading: "Ce que signifient les résultats",
    faqEyebrow: "FAQ",
    faqHeading: "Questions fréquentes",
    lastUpdated: (d) => `Mis à jour le ${d} · Vérifié par l'équipe channelpeeker`,
    methodologyLink: "Notre méthodologie",
    keepGoing: "Pour aller plus loin",
    relatedHeading: "Outils associés",
    allTools: "Tous les outils",
    badges: ["100 % gratuit", "Sans inscription"],
    breadcrumbTools: "Outils",
    tipLabel: "Astuce :",
  },
  es: {
    freeBadge: "Herramienta gratis · Sin registro",
    stepWord: "Paso",
    stepByStep: "Paso a paso",
    howToHeading: (n) => `Guía rápida: ${n}`,
    meaningEyebrow: "Entiende tus resultados",
    meaningHeading: "Qué significan los resultados",
    faqEyebrow: "FAQ",
    faqHeading: "Preguntas frecuentes",
    lastUpdated: (d) => `Actualizado el ${d} · Revisado por el equipo de channelpeeker`,
    methodologyLink: "Nuestra metodología",
    keepGoing: "Sigue explorando",
    relatedHeading: "Herramientas relacionadas",
    allTools: "Todas las herramientas",
    badges: ["100 % gratis", "Sin registro"],
    breadcrumbTools: "Herramientas",
    tipLabel: "Consejo:",
  },
  pt: {
    freeBadge: "Ferramenta grátis · Sem cadastro",
    stepWord: "Passo",
    stepByStep: "Passo a passo",
    howToHeading: (n) => `Guia rápido: ${n}`,
    meaningEyebrow: "Entenda seus resultados",
    meaningHeading: "O que os resultados significam",
    faqEyebrow: "FAQ",
    faqHeading: "Perguntas frequentes",
    lastUpdated: (d) => `Atualizado em ${d} · Revisado pela equipe do channelpeeker`,
    methodologyLink: "Nossa metodologia",
    keepGoing: "Continue explorando",
    relatedHeading: "Ferramentas relacionadas",
    allTools: "Todas as ferramentas",
    badges: ["100% grátis", "Sem cadastro"],
    breadcrumbTools: "Ferramentas",
    tipLabel: "Dica:",
  },
  ko: {
    freeBadge: "무료 도구 · 가입 불필요",
    stepWord: "단계",
    stepByStep: "단계별 안내",
    howToHeading: (n) => `${n} 사용 방법`,
    meaningEyebrow: "결과 이해하기",
    meaningHeading: "결과가 의미하는 것",
    faqEyebrow: "FAQ",
    faqHeading: "자주 묻는 질문",
    lastUpdated: (d) => `업데이트: ${d} · channelpeeker 팀 검수`,
    methodologyLink: "산출 방식 안내",
    keepGoing: "다음 단계",
    relatedHeading: "관련 도구",
    allTools: "모든 도구",
    badges: ["100% 무료", "가입 불필요"],
    breadcrumbTools: "도구",
    tipLabel: "팁:",
  },
};

/** A subsection under a localized page's meaning paragraphs: an h3, paragraphs, and an optional table. */
export interface LocalizedSection {
  heading: string;
  paragraphs?: string[];
  /** External link (new tab) on the first occurrence of `text` in the first paragraph. */
  link?: { text: string; href: string };
  /** First column of each row is rendered as the row header. */
  table?: { columns: string[]; rows: string[][] };
}

/** Content for one localized tool page (meaning paragraphs are plain strings). */
export interface LocalizedToolContent {
  title: string;
  description: string;
  heading: string;
  /** Part of the heading to accent; must be a substring of heading. */
  highlight: string;
  intro: string;
  howTo: string[];
  meaning: string[];
  /** Optional subsections rendered after `meaning` (see LocalizedSections). */
  sections?: LocalizedSection[];
  faq: { q: string; a: string }[];
  /** Third trust badge, translated truthfully per tool type. */
  dataBadge: string;
  /** Human-formatted update date in the locale. */
  updated: string;
}
