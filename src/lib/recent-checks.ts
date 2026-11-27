/**
 * "Recently checked" channels for a tool, kept only in the visitor's browser (localStorage).
 * Every access is wrapped in try/catch: storage can be disabled, full or blocked (private mode).
 * Exposed as a tiny external store for useSyncExternalStore, so server render and hydration agree.
 */

export interface RecentCheck {
  /** What to paste back into the tool: the @handle, or the channel ID. */
  input: string;
  title: string;
  avatarUrl: string | null;
}

export const RECENT_LIMIT = 5;
const EVENT = "cp-recent-checks";
const EMPTY: RecentCheck[] = [];
const cache = new Map<string, { raw: string | null; list: RecentCheck[] }>();

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parse(raw: string | null): RecentCheck[] {
  if (!raw) return EMPTY;
  try {
    const v: unknown = JSON.parse(raw);
    if (!Array.isArray(v)) return EMPTY;
    return v
      .filter((x): x is RecentCheck => typeof x?.input === "string" && typeof x?.title === "string")
      .map((x) => ({ input: x.input, title: x.title, avatarUrl: typeof x.avatarUrl === "string" ? x.avatarUrl : null }))
      .slice(0, RECENT_LIMIT);
  } catch {
    return EMPTY;
  }
}

/** Snapshot for useSyncExternalStore: the same array until the stored value changes. */
export function getRecent(key: string): RecentCheck[] {
  const raw = read(key);
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.list;
  const list = parse(raw);
  cache.set(key, { raw, list });
  return list;
}

export const getServerRecent = (): RecentCheck[] => EMPTY;

export function subscribeRecent(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function write(key: string, list: RecentCheck[]) {
  try {
    if (list.length) localStorage.setItem(key, JSON.stringify(list));
    else localStorage.removeItem(key);
  } catch {
    // Storage unavailable: the list simply isn't kept.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Newest first, no duplicates (same input, case-insensitive), at most RECENT_LIMIT. */
export function withRecent(list: RecentCheck[], item: RecentCheck): RecentCheck[] {
  return [item, ...list.filter((x) => x.input.toLowerCase() !== item.input.toLowerCase())].slice(0, RECENT_LIMIT);
}

export function addRecent(key: string, item: RecentCheck) {
  write(key, withRecent(getRecent(key), item));
}

export function clearRecent(key: string) {
  write(key, []);
}
