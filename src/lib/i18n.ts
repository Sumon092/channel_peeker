/**
 * Minimal i18n for localized tool pages. English stays at the root URLs;
 * localized versions live under /de /ja /fr /ko. Interactive widgets are
 * shared modules, so a fix to a tool automatically applies to every locale.
 */

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

/** hreflang map for a tool that exists in all locales (plus x-default → English). */
export function hreflangFor(enPath: string): Record<string, string> {
  const map: Record<string, string> = { en: enPath, "x-default": enPath };
  for (const l of LOCALES) map[l] = localePath(l, enPath);
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
}

export const LABELS: Record<Locale, ToolPageLabels> = {
  de: {
    freeBadge: "Kostenloses Tool · Ohne Anmeldung",
    stepWord: "Schritt",
    stepByStep: "Schritt für Schritt",
    howToHeading: (n) => `So nutzt du den ${n}`,
    meaningEyebrow: "Ergebnisse verstehen",
    meaningHeading: "Was die Ergebnisse bedeuten",
    faqEyebrow: "FAQ",
    faqHeading: "Häufige Fragen",
    lastUpdated: (d) => `Aktualisiert am ${d} · Vom channelpeek-Team geprüft`,
    methodologyLink: "Unsere Methodik",
    keepGoing: "Weiter geht's",
    relatedHeading: "Verwandte Tools",
    allTools: "Alle Tools",
    badges: ["100 % kostenlos", "Keine Anmeldung"],
    breadcrumbTools: "Tools",
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
    lastUpdated: (d) => `更新日: ${d} · channelpeekチームによる確認済み`,
    methodologyLink: "算出方法について",
    keepGoing: "次のステップ",
    relatedHeading: "関連ツール",
    allTools: "すべてのツール",
    badges: ["完全無料", "登録不要"],
    breadcrumbTools: "ツール",
  },
  fr: {
    freeBadge: "Outil gratuit · Sans inscription",
    stepWord: "Étape",
    stepByStep: "Étape par étape",
    howToHeading: (n) => `Comment utiliser ${n}`,
    meaningEyebrow: "Comprendre vos résultats",
    meaningHeading: "Ce que signifient les résultats",
    faqEyebrow: "FAQ",
    faqHeading: "Questions fréquentes",
    lastUpdated: (d) => `Mis à jour le ${d} · Vérifié par l'équipe channelpeek`,
    methodologyLink: "Notre méthodologie",
    keepGoing: "Pour aller plus loin",
    relatedHeading: "Outils associés",
    allTools: "Tous les outils",
    badges: ["100 % gratuit", "Sans inscription"],
    breadcrumbTools: "Outils",
  },
  es: {
    freeBadge: "Herramienta gratis · Sin registro",
    stepWord: "Paso",
    stepByStep: "Paso a paso",
    howToHeading: (n) => `Cómo usar ${n}`,
    meaningEyebrow: "Entiende tus resultados",
    meaningHeading: "Qué significan los resultados",
    faqEyebrow: "FAQ",
    faqHeading: "Preguntas frecuentes",
    lastUpdated: (d) => `Actualizado el ${d} · Revisado por el equipo de channelpeek`,
    methodologyLink: "Nuestra metodología",
    keepGoing: "Sigue explorando",
    relatedHeading: "Herramientas relacionadas",
    allTools: "Todas las herramientas",
    badges: ["100 % gratis", "Sin registro"],
    breadcrumbTools: "Herramientas",
  },
  pt: {
    freeBadge: "Ferramenta grátis · Sem cadastro",
    stepWord: "Passo",
    stepByStep: "Passo a passo",
    howToHeading: (n) => `Como usar ${n}`,
    meaningEyebrow: "Entenda seus resultados",
    meaningHeading: "O que os resultados significam",
    faqEyebrow: "FAQ",
    faqHeading: "Perguntas frequentes",
    lastUpdated: (d) => `Atualizado em ${d} · Revisado pela equipe do channelpeek`,
    methodologyLink: "Nossa metodologia",
    keepGoing: "Continue explorando",
    relatedHeading: "Ferramentas relacionadas",
    allTools: "Todas as ferramentas",
    badges: ["100% grátis", "Sem cadastro"],
    breadcrumbTools: "Ferramentas",
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
    lastUpdated: (d) => `업데이트: ${d} · channelpeek 팀 검수`,
    methodologyLink: "산출 방식 안내",
    keepGoing: "다음 단계",
    relatedHeading: "관련 도구",
    allTools: "모든 도구",
    badges: ["100% 무료", "가입 불필요"],
    breadcrumbTools: "도구",
  },
};

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
  faq: { q: string; a: string }[];
  /** Third trust badge, translated truthfully per tool type. */
  dataBadge: string;
  /** Human-formatted update date in the locale. */
  updated: string;
}
