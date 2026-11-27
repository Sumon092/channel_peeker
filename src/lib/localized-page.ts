import type { Faq } from "@/components/tool-page";

/**
 * Translated tool pages are plain data, rendered by <LocalizedToolPage>, so every language keeps the same sections,
 * tables and FAQs as the English page. Inline text supports **bold** and [link text](href): "/…" is an internal link,
 * "#…" an anchor on the page, and "http…" opens in a new tab.
 */
export type Block =
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { h3: string }
  /** A highlighted one-line formula. */
  | { formula: string }
  | {
      table: {
        head: string[];
        rows: string[][];
        /** First header cell is an empty corner (row labels have no column title). */
        corner?: boolean;
        caption?: string;
      };
    };

export interface PageSection {
  eyebrow: string;
  title: string;
  id?: string;
  blocks: Block[];
}

export interface LocalizedPageContent {
  /** <title> without " | channelpeeker" (the layout adds it). */
  title: string;
  description: string;
  heading: string;
  /** Part of the heading shown in the accent colour. */
  highlight: string;
  intro: string;
  /** In the language's own full date format. */
  updated: string;
  dataBadge?: string;
  afterTool?: Block[];
  /** Rich text: start with **Step name.** like the English page. */
  howTo: string[];
  howToTip?: string;
  /** Sections between the how-to and the meaning section. */
  before?: PageSection[];
  meaning: { heading: string; id?: string; blocks: Block[] };
  /** Sections between the meaning section and the FAQ. */
  after?: PageSection[];
  faq: Faq[];
}
