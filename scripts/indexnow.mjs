/**
 * Submits every sitemap URL to IndexNow (Bing, Yandex, Naver, Seznam — and the
 * AI answer engines Bing feeds). Google doesn't use IndexNow; it relies on the
 * sitemap. Run after a deploy that adds or changes pages:
 *
 *   SITE_URL=https://channelpeeker.com node scripts/indexnow.mjs
 */
const KEY = "c02c29dbf4683247d2e58d35ffa8043f";
const siteUrl = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl || siteUrl.includes("localhost")) {
  console.error("Set SITE_URL to the deployed origin, e.g. SITE_URL=https://channelpeeker.com");
  process.exit(1);
}

const sitemap = await fetch(new URL("/sitemap.xml", siteUrl)).then((r) => r.text());
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
  console.error("No URLs found in sitemap.xml");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(siteUrl).hostname, key: KEY, urlList }),
});

console.log(`Submitted ${urlList.length} URLs to IndexNow → HTTP ${res.status} ${res.status === 200 || res.status === 202 ? "(accepted)" : "(check key file is live at /" + KEY + ".txt)"}`);
