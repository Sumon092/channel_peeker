import { describe, expect, it } from "vitest";
import { isLocalizedTool, LOCALES } from "@/lib/i18n";
import type { Block, LocalizedPageContent } from "@/lib/localized-page";
import { PAGES } from "./index";

/** The English pages' shape: FAQ count and number of sections before/after the meaning section. */
const SHAPE: Record<string, { faq: number; before: number; after: number; tables: number }> = {
  "/monetization-checker": { faq: 18, before: 1, after: 11, tables: 2 },
  "/watch-time-calculator": { faq: 18, before: 4, after: 2, tables: 2 },
  "/channel-age-checker": { faq: 12, before: 1, after: 2, tables: 0 },
};
/** Pages that exist only in English: translated pages may link to them. */
const ENGLISH_ONLY = ["/revenue-calculator/channel-earnings-estimator", "/video-upload-date-checker"];
const ENGLISH_MONTHS = /\b(January|February|March|April|June|July|August|September|October|November|December)\b/;

function allBlocks(c: LocalizedPageContent): Block[] {
  return [...(c.afterTool ?? []), ...(c.before ?? []).flatMap((s) => s.blocks), ...c.meaning.blocks, ...(c.after ?? []).flatMap((s) => s.blocks)];
}
function allText(c: LocalizedPageContent): string[] {
  const fromBlock = (b: Block): string[] =>
    "p" in b ? [b.p] : "ul" in b ? b.ul : "ol" in b ? b.ol : "h3" in b ? [b.h3] : "formula" in b ? [b.formula] : [...b.table.head, ...b.table.rows.flat(), b.table.caption ?? ""];
  return [
    c.title,
    c.description,
    c.heading,
    c.intro,
    c.updated,
    c.howToTip ?? "",
    ...c.howTo,
    c.meaning.heading,
    ...[...(c.before ?? []), ...(c.after ?? [])].flatMap((s) => [s.eyebrow, s.title]),
    ...allBlocks(c).flatMap(fromBlock),
    ...c.faq.flatMap((f) => [f.q, f.a]),
  ];
}

describe("translated pages", () => {
  it("only lists tools with a known English shape", () => {
    for (const pages of Object.values(PAGES)) for (const path of Object.keys(pages ?? {})) expect(SHAPE[path], path).toBeDefined();
  });

  for (const locale of LOCALES) {
    for (const [path, c] of Object.entries(PAGES[locale] ?? {})) {
      const name = `${locale}${path}`;
      const shape = SHAPE[path];

      it(`${name} has the English page's sections, tables and FAQ count`, () => {
        expect(c.faq).toHaveLength(shape.faq);
        expect(c.before ?? []).toHaveLength(shape.before);
        expect(c.after ?? []).toHaveLength(shape.after);
        expect(allBlocks(c).filter((b) => "table" in b)).toHaveLength(shape.tables);
        expect(c.heading).toContain(c.highlight);
      });

      it(`${name} has well-formed text, links and dates`, () => {
        for (const t of allText(c)) {
          expect(t.split("**").length % 2, `unbalanced ** in: ${t}`).toBe(1);
          // Some month names are spelled the same in German (April, August, September, November).
          const months = locale === "de" ? t.replace(/\b(April|August|September|November)\b/g, "") : t;
          expect(months, "leftover English month").not.toMatch(ENGLISH_MONTHS);
          for (const [, href] of t.matchAll(/\]\((.+?)\)/g)) {
            if (href.startsWith("http") || href.startsWith("#")) continue;
            const en = href.replace(new RegExp(`^/${locale}(?=/)`), "");
            const ok = href.startsWith(`/${locale}/`) ? isLocalizedTool(en) : ENGLISH_ONLY.includes(href);
            expect(ok, `${name} links to ${href}`).toBe(true);
          }
        }
        for (const f of c.faq) {
          if (f.link) expect(f.a, `FAQ link text missing: ${f.q}`).toContain(f.link.text);
          expect(f.a).not.toContain("**");
        }
        for (const b of allBlocks(c)) if ("table" in b) for (const row of b.table.rows) expect(row).toHaveLength(b.table.head.length);
      });

      if (path === "/watch-time-calculator") {
        it(`${name} tables match the formula`, () => {
          const tables = allBlocks(c).flatMap((b) => ("table" in b ? [b.table] : []));
          const digits = (s: string) => Number(s.replace(/\D/g, ""));
          const viewsTable = tables.find((t) => t.head.length === 4)!;
          const secs = [120, 210, 300, 480, 600];
          for (const [i, hours] of [3000, 4000, 8000].entries())
            expect(viewsTable.rows.map((r) => digits(r[i + 1]))).toEqual(secs.map((s) => Math.ceil((hours * 3600) / s)));
          const hoursTable = tables.find((t) => t.head.length === 2)!;
          expect(hoursTable.rows.map((r) => digits(r[1]))).toEqual([100, 1000, 10_000, 100_000, 1_000_000].map((v) => Math.round((v * 4) / 60)));
        });
      }
    }
  }
});
