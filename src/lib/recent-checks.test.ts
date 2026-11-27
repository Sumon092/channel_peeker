import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { addRecent, clearRecent, getRecent, RECENT_LIMIT, withRecent, type RecentCheck } from "./recent-checks";

const item = (input: string): RecentCheck => ({ input, title: input.replace("@", ""), avatarUrl: null });
const KEY = "test:recent";

describe("withRecent", () => {
  it("puts the newest first, drops duplicates (case-insensitive) and keeps 5", () => {
    let list: RecentCheck[] = [];
    for (const h of ["@a", "@b", "@c", "@d", "@e", "@f"]) list = withRecent(list, item(h));
    expect(list.map((x) => x.input)).toEqual(["@f", "@e", "@d", "@c", "@b"]);
    expect(withRecent(list, item("@C")).map((x) => x.input)).toEqual(["@C", "@f", "@e", "@d", "@b"]);
    expect(list).toHaveLength(RECENT_LIMIT);
  });
});

describe("browser storage", () => {
  let store: Record<string, string>;
  beforeEach(() => {
    store = {};
    vi.stubGlobal("window", { dispatchEvent: () => true, addEventListener() {}, removeEventListener() {} });
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => void (store[k] = v),
      removeItem: (k: string) => void delete store[k],
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  it("adds, reads back and clears", () => {
    addRecent(KEY, item("@veritasium"));
    addRecent(KEY, item("@mkbhd"));
    expect(getRecent(KEY).map((x) => x.input)).toEqual(["@mkbhd", "@veritasium"]);
    clearRecent(KEY);
    expect(getRecent(KEY)).toEqual([]);
    expect(store[KEY]).toBeUndefined();
  });

  it("returns the same array until the stored value changes (stable snapshot)", () => {
    addRecent(KEY, item("@a"));
    expect(getRecent(KEY)).toBe(getRecent(KEY));
  });

  it("ignores corrupt or foreign data", () => {
    store[KEY] = "{not json";
    expect(getRecent(KEY)).toEqual([]);
    store[KEY] = JSON.stringify([{ input: 1 }, { input: "@ok", title: "OK", avatarUrl: 5 }]);
    expect(getRecent(KEY)).toEqual([{ input: "@ok", title: "OK", avatarUrl: null }]);
  });

  it("never throws when storage is blocked", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {
        throw new Error("blocked");
      },
    });
    expect(() => addRecent(KEY, item("@a"))).not.toThrow();
    expect(getRecent(KEY)).toEqual([]);
    expect(() => clearRecent(KEY)).not.toThrow();
  });
});
