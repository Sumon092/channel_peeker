import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CATALOGS } from "../locales/catalog";
import { LOCALES, LOCALIZED_TOOLS } from "./i18n";
import { hubs, liveTools, tools } from "./tools";

/** Related tools rendered as cards on localized pages, read from the page files themselves. */
function relatedOnLocalizedPages(): string[] {
  const found = new Set<string>();
  for (const l of LOCALES)
    for (const p of LOCALIZED_TOOLS) {
      const src = fs.readFileSync(path.join(__dirname, "../app", l, p, "page.tsx"), "utf8");
      const m = src.match(/related=\{\[([^\]]*)\]\}/);
      for (const r of m?.[1].match(/"[^"]+"/g) ?? []) found.add(r.slice(1, -1));
    }
  return [...found];
}

describe("localized tool catalog", () => {
  const related = relatedOnLocalizedPages();
  const known = new Set(tools.map((t) => t.path));

  it("finds the related tools", () => expect(related.length).toBeGreaterThan(5));

  for (const l of LOCALES) {
    const c = CATALOGS[l];
    it(`${l}: names every hub and live tool`, () => {
      for (const h of hubs) expect(c.hubs[h.id], `${l} hub ${h.id}`).toBeTruthy();
      for (const t of liveTools()) expect(c.tools[t.path]?.name, `${l} ${t.path}`).toBeTruthy();
    });
    it(`${l}: has summaries for every related-tool card`, () => {
      for (const p of related) expect(c.tools[p]?.summary, `${l} ${p}`).toBeTruthy();
    });
    it(`${l}: has no entries for unknown tools`, () => {
      for (const p of Object.keys(c.tools)) expect(known.has(p), `${l} ${p}`).toBe(true);
    });
  }
});
