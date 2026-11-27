import { describe, expect, it } from "vitest";
import type { LocalizedToolContent } from "@/lib/i18n";
import { content as de } from "./de";
import { content as es } from "./es";
import { content as fr } from "./fr";
import { content as ja } from "./ja";
import { content as ko } from "./ko";
import { content as pt } from "./pt";

const LOCALES: Record<string, Record<string, LocalizedToolContent>> = { de, es, fr, ja, ko, pt };

describe("localized page sections", () => {
  for (const [locale, pages] of Object.entries(LOCALES)) {
    for (const [path, page] of Object.entries(pages)) {
      for (const s of page.sections ?? []) {
        it(`${locale} ${path} "${s.heading}" is well-formed`, () => {
          if (s.link) expect(s.paragraphs?.[0]).toContain(s.link.text);
          for (const row of s.table?.rows ?? []) expect(row).toHaveLength(s.table!.columns.length);
        });
      }
    }
  }

  it("watch-time 8,000-hour column matches ceil(hours × 3600 ÷ seconds) in every locale", () => {
    const expected = [120, 210, 300, 480, 600].map((sec) => Math.ceil((8000 * 3600) / sec));
    for (const pages of Object.values(LOCALES)) {
      // Locales whose watch time page moved to src/locales/pages/ are checked in pages.test.ts instead.
      const table = pages["/watch-time-calculator"]?.sections?.find((s) => s.table)?.table;
      if (table) expect(table.rows.map((r) => Number(r[3].replace(/\D/g, "")))).toEqual(expected);
    }
  });
});
