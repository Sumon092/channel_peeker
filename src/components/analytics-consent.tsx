"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { localeFromPathname, type Locale } from "@/lib/i18n";

const KEY = "cp-analytics-consent";
const EVENT = "cp-consent-change";

type Choice = "granted" | "denied" | "unset" | "server";

const COPY: Record<Locale | "en", { text: string; accept: string; decline: string; more: string }> = {
  en: { text: "We'd like to use Google Analytics cookies to learn which tools are useful. They stay off unless you accept.", accept: "Accept", decline: "Decline", more: "Cookie policy" },
  de: { text: "Wir möchten Google-Analytics-Cookies nutzen, um zu erfahren, welche Tools hilfreich sind. Sie bleiben deaktiviert, solange du nicht zustimmst.", accept: "Akzeptieren", decline: "Ablehnen", more: "Cookie-Richtlinie" },
  ja: { text: "どのツールが役立っているかを把握するため、Google アナリティクスの Cookie を使用したいと考えています。同意いただかない限り使用しません。", accept: "同意する", decline: "拒否する", more: "Cookie ポリシー" },
  fr: { text: "Nous souhaitons utiliser les cookies de Google Analytics pour savoir quels outils sont utiles. Ils restent désactivés tant que vous n'acceptez pas.", accept: "Accepter", decline: "Refuser", more: "Politique relative aux cookies" },
  ko: { text: "어떤 도구가 유용한지 파악하기 위해 Google 애널리틱스 쿠키를 사용하고자 합니다. 동의하지 않으면 사용되지 않습니다.", accept: "동의", decline: "거부", more: "쿠키 정책" },
  es: { text: "Queremos usar cookies de Google Analytics para saber qué herramientas son útiles. Permanecen desactivadas a menos que las aceptes.", accept: "Aceptar", decline: "Rechazar", more: "Política de cookies" },
  pt: { text: "Queremos usar cookies do Google Analytics para saber quais ferramentas são úteis. Elas ficam desativadas, a menos que você aceite.", accept: "Aceitar", decline: "Recusar", more: "Política de cookies" },
};

function readChoice(): Choice {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

function writeChoice(choice: "granted" | "denied" | null) {
  try {
    if (choice) localStorage.setItem(KEY, choice);
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked: the choice lasts until the page is reloaded at most.
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const useChoice = () => useSyncExternalStore(subscribe, readChoice, (): Choice => "server");

/** Removes Google Analytics cookies from this host and its parent domain. */
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

/** Google Analytics, loaded only after an explicit Accept; nothing from Google loads before that. */
export function AnalyticsConsent({ id }: { id: string }) {
  const choice = useChoice();
  const locale = localeFromPathname(usePathname() ?? "/");
  const copy = COPY[locale ?? "en"];

  if (choice === "granted") {
    return (
      <>
        <Script id="ga-src" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config','${id}');`}
        </Script>
      </>
    );
  }

  if (choice !== "unset") return null;

  return (
    <section
      aria-label={copy.more}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-surface p-4 text-sm shadow-lg"
    >
      <p className="leading-relaxed text-muted">
        {copy.text}{" "}
        <Link href="/cookie-policy" prefetch={false} className="underline hover:text-text">
          {copy.more}
        </Link>
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <button type="button" onClick={() => writeChoice("denied")} className="rounded-xl bg-surface-2 px-4 py-2 font-medium hover:bg-surface-3">
          {copy.decline}
        </button>
        <button type="button" onClick={() => writeChoice("granted")} className="rounded-xl bg-surface-2 px-4 py-2 font-medium hover:bg-surface-3">
          {copy.accept}
        </button>
      </div>
    </section>
  );
}

/** Lets a visitor withdraw or change their choice: wipes GA cookies, reloads to unload gtag, re-shows the banner. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="underline"
      onClick={() => {
        writeChoice(null);
        clearAnalyticsCookies();
        window.location.reload();
      }}
    >
      Change your cookie choice
    </button>
  );
}
