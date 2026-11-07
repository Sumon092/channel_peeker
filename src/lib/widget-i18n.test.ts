import { describe, expect, it } from "vitest";
import { EN_CHROME, EN_WIDGETS, fmt } from "./widget-i18n";
import { CHROME_STRINGS, WIDGET_STRINGS } from "../locales/widgets";

const LOCALES = Object.keys(WIDGET_STRINGS) as (keyof typeof WIDGET_STRINGS)[];

/** serverErrors is an open map (EN is empty by design); everything else must mirror EN's shape. */
const OPEN_MAPS = new Set(["serverErrors"]);

type Tree = Record<string, unknown>;

function compareShape(en: Tree, loc: Tree, path: string, errors: string[]) {
  const enKeys = Object.keys(en).sort();
  const locKeys = Object.keys(loc).sort();
  if (enKeys.join() !== locKeys.join()) {
    errors.push(`${path}: keys differ (en: ${enKeys.join(",")} vs ${locKeys.join(",")})`);
    return;
  }
  for (const k of enKeys) {
    const e = en[k];
    const l = loc[k];
    const p = `${path}.${k}`;
    if (OPEN_MAPS.has(k)) continue;
    if (typeof e === "string") {
      if (typeof l !== "string" || l.length === 0) {
        errors.push(`${p}: missing or empty translation`);
        continue;
      }
      // Every {token} in the English template must survive translation (and no new ones appear).
      const tokens = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
      if (tokens(e) !== tokens(l)) errors.push(`${p}: placeholder mismatch (en {${tokens(e)}} vs {${tokens(l)}})`);
    } else if (e && typeof e === "object") {
      compareShape(e as Tree, l as Tree, p, errors);
    }
  }
}

describe("widget string catalogs", () => {
  for (const locale of LOCALES) {
    it(`${locale} mirrors the English catalog (keys + placeholders)`, () => {
      const errors: string[] = [];
      compareShape(EN_WIDGETS as unknown as Tree, WIDGET_STRINGS[locale] as unknown as Tree, locale, errors);
      compareShape(EN_CHROME as unknown as Tree, CHROME_STRINGS[locale] as unknown as Tree, `${locale}.chrome`, errors);
      expect(errors).toEqual([]);
    });

    it(`${locale} needLine splits cleanly on a single {views}`, () => {
      // watch-time-calculator renders this by splitting on {views} to emphasize the number.
      expect(WIDGET_STRINGS[locale].watchTime.needLine.split("{views}")).toHaveLength(2);
    });
  }

  it("English needLine splits cleanly on a single {views}", () => {
    expect(EN_WIDGETS.watchTime.needLine.split("{views}")).toHaveLength(2);
  });
});

describe("fmt", () => {
  it("substitutes tokens and leaves unknown ones intact", () => {
    expect(fmt("Found {n} of {total}", { n: 3 })).toBe("Found 3 of {total}");
  });

  it("ignores prototype properties", () => {
    expect(fmt("{constructor}{toString}", {})).toBe("{constructor}{toString}");
  });
});
