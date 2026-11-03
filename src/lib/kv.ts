import "server-only";

/**
 * Minimal key-value store. Uses Upstash Redis over its REST API when configured
 * (UPSTASH_REDIS_REST_URL / _TOKEN), otherwise an in-process Map for local development.
 * Every write carries a TTL: nothing we cache lives forever (see /data-policy).
 */
export interface Kv {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, ttlSeconds: number): Promise<void>;
  /** Increment a counter, setting its TTL when first created. Returns the new value. */
  incrBy(key: string, by: number, ttlSeconds: number): Promise<number>;
}

class UpstashKv implements Kv {
  constructor(
    private url: string,
    private token: string,
  ) {}

  private async pipeline(commands: (string | number)[][]): Promise<unknown[]> {
    const res = await fetch(`${this.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Upstash error ${res.status}`);
    const data = (await res.json()) as { result?: unknown; error?: string }[];
    return data.map((d) => {
      if (d.error) throw new Error(`Upstash: ${d.error}`);
      return d.result;
    });
  }

  async get<T>(key: string) {
    const [raw] = await this.pipeline([["GET", key]]);
    return typeof raw === "string" ? (JSON.parse(raw) as T) : null;
  }

  async set(key: string, value: unknown, ttlSeconds: number) {
    await this.pipeline([["SET", key, JSON.stringify(value), "EX", Math.max(1, Math.round(ttlSeconds))]]);
  }

  async incrBy(key: string, by: number, ttlSeconds: number) {
    // NX: only set the expiry when the key is new, so the window doesn't slide.
    const [value] = await this.pipeline([
      ["INCRBY", key, by],
      ["EXPIRE", key, Math.max(1, Math.round(ttlSeconds)), "NX"],
    ]);
    return Number(value);
  }
}

class MemoryKv implements Kv {
  private store = new Map<string, { value: unknown; expires: number }>();

  private live(key: string) {
    const hit = this.store.get(key);
    if (hit && hit.expires <= Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    return hit;
  }

  async get<T>(key: string) {
    return (this.live(key)?.value as T | undefined) ?? null;
  }

  async set(key: string, value: unknown, ttlSeconds: number) {
    this.store.set(key, { value, expires: Date.now() + ttlSeconds * 1000 });
    if (this.store.size > 5000) this.store.delete(this.store.keys().next().value!);
  }

  async incrBy(key: string, by: number, ttlSeconds: number) {
    const hit = this.live(key);
    const value = Number(hit?.value ?? 0) + by;
    this.store.set(key, { value, expires: hit?.expires ?? Date.now() + ttlSeconds * 1000 });
    return value;
  }
}

const globalForKv = globalThis as unknown as { __kv?: Kv };

export const kv: Kv = (globalForKv.__kv ??=
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new UpstashKv(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN)
    : new MemoryKv());

export const TTL = {
  minute: 60,
  hour: 3600,
  day: 86400,
} as const;

/** Read-through cache. The value is stored with the time it was fetched so the UI can label freshness. */
export async function cached<T>(key: string, ttlSeconds: number, load: () => Promise<T>): Promise<{ data: T; fetchedAt: string; cacheHit: boolean }> {
  const hit = await kv.get<{ data: T; fetchedAt: string }>(key).catch(() => null);
  if (hit) return { ...hit, cacheHit: true };
  const data = await load();
  const entry = { data, fetchedAt: new Date().toISOString() };
  await kv.set(key, entry, ttlSeconds).catch((err) => console.error("[kv] set failed", key, err));
  return { ...entry, cacheHit: false };
}
