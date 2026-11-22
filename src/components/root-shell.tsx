import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LANG_TAG, type Locale } from "@/lib/i18n";
import { gaMeasurementId, site } from "@/lib/site";
import { chromeFor } from "@/locales/widgets";
import "@/app/globals.css";

/**
 * Everything the site's root layouts share. There is one root layout per language
 * (app/(en)/layout.tsx and app/{locale}/layout.tsx) so the server-rendered <html lang>
 * is correct; each of those is a thin wrapper around this shell, so fonts, CSS,
 * header/footer, analytics, verification and schema can never drift between locales.
 */

// One variable font file covers every weight; monospace uses the system font (zero bytes).
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: free YouTube analytics and SEO tools`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const rootViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export function RootShell({ locale, children }: { locale: Locale | "en"; children: ReactNode }) {
  // Off until ADSENSE_PUBLISHER_ID is set. This one tag also serves Google's
  // certified GDPR consent message once it's configured in AdSense → Privacy & messaging.
  const adsensePub = process.env.ADSENSE_PUBLISHER_ID;
  return (
    <html lang={LANG_TAG[locale]} className={`${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {adsensePub && (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePub}`}
            crossOrigin="anonymous"
          />
        )}
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2">
          {chromeFor(locale).skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} />
        {gaMeasurementId && <AnalyticsConsent id={gaMeasurementId} />}
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: site.name,
              url: site.url,
              description: site.description,
              publisher: { "@id": `${site.url}/#org` },
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${site.url}/#org`,
              name: site.name,
              url: site.url,
              logo: `${site.url}/apple-icon`,
              description: site.disclaimer,
              email: site.contactEmail,
            },
          ]}
        />
      </body>
    </html>
  );
}
