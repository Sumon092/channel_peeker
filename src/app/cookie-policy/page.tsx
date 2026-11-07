import { CookieSettingsButton } from "@/components/analytics-consent";
import { ProsePage } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { gaMeasurementId, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cookie policy",
  description: "What cookies channelpeeker sets (almost none), what each one does, and how to clear or block them in your browser.",
  path: "/cookie-policy",
});

export default function Page() {
  return (
    <ProsePage title="Cookie policy" path="/cookie-policy" updated={gaMeasurementId ? "November 7, 2026" : "September 29, 2026"}>
      <p>{site.name} tries to use as few cookies as possible.</p>

      <h2>Strictly necessary</h2>
      <p>
        Our bot protection may set a short-lived cookie when you run a heavy tool, so we can tell people from automated scripts. The site
        can&apos;t protect itself from abuse without it.
      </p>

      <h2>Analytics</h2>
      {gaMeasurementId ? (
        <>
          <p>
            If you accept analytics cookies, we use Google Analytics to learn which tools are useful. It sets cookies named <code>_ga</code> and{" "}
            <code>_ga_*</code>, which last up to two years. If you decline, Google Analytics does not load and these cookies are not set. We save your
            choice in your browser&apos;s local storage.
          </p>
          <p>
            <CookieSettingsButton />
          </p>
        </>
      ) : (
        <p>We use privacy-friendly analytics that do not use cookies to track you across websites.</p>
      )}

      <h2>Advertising</h2>
      <p>
        We don&apos;t show ads today. If we add them, we will update this page and ask for consent where the law requires it before any
        advertising cookies are set.
      </p>

      <h2>Managing cookies</h2>
      <p>You can block or delete cookies in your browser settings. Some tools may stop working if necessary cookies are blocked.</p>
    </ProsePage>
  );
}
