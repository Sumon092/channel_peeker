/**
 * Serves /ads.txt once an AdSense publisher ID is configured.
 * Until ADSENSE_PUBLISHER_ID is set (format: pub-XXXXXXXXXXXXXXXX),
 * this returns 404 so an empty ads.txt never shadows a future real one.
 */
export function GET() {
  const pub = process.env.ADSENSE_PUBLISHER_ID;
  if (!pub) return new Response("Not configured", { status: 404 });
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=86400" },
  });
}
