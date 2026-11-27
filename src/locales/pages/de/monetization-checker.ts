import type { LocalizedPageContent } from "@/lib/localized-page";
import { REQUIREMENTS_2027_ID } from "@/lib/monetization";
import { NICHES, nicheRpm } from "@/lib/revenue-data";

const ESTIMATOR = "/revenue-calculator/channel-earnings-estimator"; // English only
const WATCH_TIME = "/de/watch-time-calculator";
const ANALYZER = "/de/channel-analyzer";
const YPP_CHANGES = "https://support.google.com/youtube/answer/12843009?hl=de";
const YPP_HELP = "https://support.google.com/youtube/answer/72851?hl=de";

const NICHE_NAMES: Record<string, string> = {
  finance: "Finanzen und Geldanlage",
  business: "Business und Marketing",
  tech: "Technik und Software",
  education: "Bildung und Anleitungen",
  health: "Gesundheit und Fitness",
  food: "Essen und Kochen",
  gaming: "Gaming",
  entertainment: "Unterhaltung und Vlogs",
};
const usd = (n: number) => `${n.toFixed(2).replace(".", ",")} US-$`;
const RPM_ROWS = Object.keys(NICHE_NAMES).map((id) => {
  const r = nicheRpm(NICHES.find((n) => n.id === id)!);
  return [NICHE_NAMES[id], `${usd(r.low)} – ${usd(r.high)}`];
});

export const content: LocalizedPageContent = {
  title: "YouTube-Monetarisierung prüfen: Ist dieser Kanal monetarisiert?",
  description:
    "Prüfe jeden YouTube-Kanal anhand der Regeln des Partnerprogramms, inklusive der Änderungen vom Februar 2027. Sieh dir die öffentlichen Signale an und was sie wirklich bedeuten. Kostenlos.",
  heading: "YouTube-Monetarisierungs-Check",
  highlight: "Monetarisierungs-Check",
  intro:
    "Finde heraus, ob ein YouTube-Kanal die Voraussetzungen des Partnerprogramms erfüllt und was seine öffentlichen Signale über die Monetarisierung verraten. Füge einen Kanal-Link, ein @Handle oder einen Video-Link ein.",
  updated: "27. November 2026",
  dataBadge: "Offizielle YouTube-Daten",
  afterTool: [
    {
      p: "Eines vorab: YouTube veröffentlicht nicht, ob ein Kanal monetarisiert ist. Das sieht nur der Inhaber in YouTube Studio. Ein Tool kann die öffentlichen Voraussetzungen prüfen, die Spuren lesen, die ein monetarisierter Kanal hinterlässt, und bei allem anderen ehrlich sein. Genau das macht dieser Check.",
    },
  ],
  howTo: [
    "**Kanal einfügen.** Nutze das @Handle, die Kanal-URL, die Kanal-ID oder einen Link zu einem Video, Short oder Livestream des Kanals.",
    "**Prüfung starten.** Wir sehen uns Abonnentenzahl, Land, aktuelle Uploads und die Einstellung „speziell für Kinder“ an und vergleichen alles mit beiden Stufen des Partnerprogramms.",
    "**Ergebnis lesen.** Jede Voraussetzung ist als erfüllt, teilweise erfüllt, nicht erfüllt oder nicht öffentlich markiert. So siehst du genau, was bestätigt ist und was nicht.",
  ],
  before: [
    {
      eyebrow: "Die Ergebniskarte",
      title: "Was du im Ergebnis siehst",
      blocks: [
        { p: "So sah das Ergebnis aus, als wir @veritasium am 27. November 2026 geprüft haben:" },
        {
          ul: [
            "**Kanal:** Profilbild, Name (Veritasium) und Handle, dazu ≈ 21,5 Mio. Abonnenten und 555 Videos.",
            "**Countdown:** „Noch 66 Tage, bis YouTubes neue Anforderungen für Werbeeinnahmen gelten“, mit Link zu den Anforderungen für 2027 weiter unten. Er verschwindet am 1. Februar 2027.",
            "**Stufe Fan-Funding:** „Erfüllt alle öffentlichen Anforderungen“. Mindestens 500 Abonnenten (wo verfügbar): erfüllt, ≈ 21,5 Mio. 3 öffentliche Uploads in den letzten 90 Tagen: erfüllt, 25 Uploads. Partnerprogramm-Land: erfüllt, Vereinigte Staaten. Kein Kanal „speziell für Kinder“: erfüllt. 3.000 Stunden Wiedergabezeit oder 3 Mio. Shorts-Aufrufe: nicht öffentlich.",
            "**Stufe Werbeeinnahmen:** „Erfüllt alle öffentlichen Anforderungen“. Mindestens 1.000 Abonnenten: erfüllt, ≈ 21,5 Mio. Land: erfüllt. Nicht speziell für Kinder: erfüllt. 4.000 Stunden Wiedergabezeit oder 10 Mio. Shorts-Aufrufe: nicht öffentlich, mit dem Hinweis, dass neue Bewerber ab dem 1. Februar 2027 8.000 Stunden oder 20 Mio. Shorts-Aufrufe brauchen. Aktuelle Uploads zählen hier nicht.",
            "**Beide Stufen:** keine aktiven Verwarnungen, hält die Monetarisierungsrichtlinien ein: nicht öffentlich.",
            "**Aktiv bleiben:** 25 öffentliche Uploads in den letzten 90 Tagen. Das reicht für die Regel ab 2027, egal welcher Art die Videos sind. Die Zahl fasst lange Videos und Shorts zusammen, weil YouTubes öffentliche Daten sie nicht zuverlässig trennen. Das ist nur zur Info und ändert die Einschätzung nicht.",
            "**Selbst nachsehen:** ein Button „Kanal auf YouTube öffnen“ und vier Häkchen (Button „Mitglied werden“, Shop-Tab oder Produktregal, Super Thanks oder Super Chat, Werbung bei neuen Videos), jeweils mit einer Zeile dazu, wie aussagekräftig dieses Signal ist.",
            "**Unsere Einschätzung:** „Möglicherweise monetarisiert“, solange nichts angehakt ist, weil die öffentlichen Anforderungen erfüllt sind. Hakst du „Ich sehe einen „Mitglied werden“-Button“ an, wird daraus „Sehr wahrscheinlich monetarisiert“. Was du anhakst, wird nicht gespeichert.",
            "**Geschätzte monatliche Einnahmen:** etwa 22.900 bis 91.600 US-$, gekennzeichnet als „Schätzung, keine Auszahlung“. Grundlage sind die Aufrufe der 11 Videos aus den letzten 30 Tagen, bei gemischter Nische und einem Publikum aus den USA, Großbritannien, Kanada oder Australien. Die Schätzung erscheint nur, wenn ein Kanal die öffentlichen Anforderungen für Werbeeinnahmen erfüllt. Sonst steht dort „Nicht angezeigt: Dieser Kanal erfüllt die öffentlichen Anforderungen für Werbeeinnahmen nicht.“",
            "**Einnahmen schätzen:** öffnet den Einnahmenrechner (auf Englisch) mit @veritasium, wo du Nische und Publikum für die vollständige Aufschlüsselung wählst.",
            "**Zuletzt geprüft:** Deine letzten 5 Kanäle erscheinen unter dem Suchfeld, mit einem Button zum Leeren. Ein Klick prüft einen Kanal erneut. Die Liste bleibt nur in deinem Browser.",
            "**Link kopieren:** kopiert einen Link zum Teilen (channelpeeker.com/de/monetization-checker?c=@veritasium), der das Tool öffnet und dieselbe Prüfung startet.",
            "**Wann die Daten abgerufen wurden,** damit du weißt, wie aktuell sie sind.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "YouTube-Monetarisierung: Voraussetzungen heute und ab dem 1. Februar 2027",
    id: REQUIREMENTS_2027_ID,
    blocks: [
      {
        p: "YouTube hat zwei Stufen der Monetarisierung. Die erste schaltet Fan-Funding frei. Die zweite bringt zusätzlich einen Anteil an den Einnahmen aus Werbung und Premium. Am 1. Februar 2027 verdoppeln sich für neue Kanäle die Ziele für Wiedergabezeit und Shorts-Aufrufe in der zweiten Stufe. Die Abonnentenzahl bleibt bei 1.000.",
      },
      {
        table: {
          corner: true,
          head: ["", "Fan-Funding", "Werbeeinnahmen, bis 31. Januar 2027", "Werbeeinnahmen, ab 1. Februar 2027"],
          rows: [
            ["Abonnenten", "500", "1.000", "1.000"],
            ["Öffentliche Uploads", "3 in den letzten 90 Tagen", "–", "–"],
            ["Stunden Wiedergabezeit (letzte 365 Tage)", "3.000", "4.000", "8.000"],
            ["Oder Shorts-Aufrufe (letzte 90 Tage)", "3 Millionen", "10 Millionen", "20 Millionen"],
            ["Was freigeschaltet wird", "Kanalmitgliedschaften, Supers, Shopping", "Alles oben, plus Einnahmen aus Werbung und YouTube Premium", "Dasselbe"],
          ],
        },
      },
      { p: "Einnahmen aus YouTube Premium sind ein Anteil an dem, was Premium-Abonnenten zahlen, wenn sie deine Videos ansehen." },
      { p: "Ein paar Punkte, die du kennen solltest:" },
      {
        ul: [
          "Die Änderung von 2027 gilt nur für neue Bewerber. Kanäle, die schon im Partnerprogramm sind, behalten ihren Status.",
          "Die Stufe Fan-Funding ändert sich nicht.",
          "Die Stufe mit 500 Abonnenten gibt es nur in einigen Ländern. Überall sonst beginnen Kanäle bei 1.000.",
          "Außerdem musst du die Monetarisierungsrichtlinien von YouTube einhalten, darfst keine aktiven Verwarnungen wegen Verstößen gegen die Community-Richtlinien haben und musst in einem Land leben, in dem das Partnerprogramm verfügbar ist.",
        ],
      },
      { h3: "Was sich 2027 sonst noch für monetarisierte Kanäle ändert" },
      {
        ul: [
          "**Aktiv bleiben:** Ab dem 1. Februar 2027 braucht ein monetarisierter Kanal mindestens eines davon: 1.000 Stunden Wiedergabezeit im vergangenen Jahr, 1 Million Shorts-Aufrufe in den letzten 90 Tagen oder 2 lange Videos bzw. 5 Shorts alle 90 Tage. Wer darunter liegt, bekommt 90 Tage, um aufzuholen.",
          "**Einnahmen mit Shorts:** Um jeden Monat aus dem Creator-Pool für Shorts zu verdienen, braucht ein Kanal 10 Millionen Shorts-Aufrufe in den letzten 90 Tagen. Wer das verfehlt, verliert dadurch keine Einnahmen mit langen Videos.",
          "**Neue Bedingungen:** Kanäle, die schon im Programm sind, müssen die aktualisierten Bedingungen bis zum 31. Januar 2027 in YouTube Studio akzeptieren. Sonst verdienen sie mit den betroffenen Funktionen nichts mehr.",
        ],
      },
      { p: `Die vollständige Ankündigung von YouTube findest du auf der Seite zu den [Änderungen am YouTube-Partnerprogramm](${YPP_CHANGES}).` },
    ],
  },
  after: [
    {
      eyebrow: "Sichtbare Signale",
      title: "So erkennst du ohne Tool, ob ein Kanal monetarisiert ist",
      blocks: [
        { p: "Die meisten öffentlichen Hinweise kannst du selbst entdecken. Manche sagen deutlich mehr aus als andere." },
        {
          ul: [
            "**Ein Button „Mitglied werden“ neben „Abonnieren“.** Kanalmitgliedschaften gibt es nur für Kanäle im Partnerprogramm. Das ist das stärkste öffentliche Signal überhaupt.",
            "**Super Thanks, Super Chat oder Super Stickers.** Auch das sind Funktionen des Partnerprogramms.",
            "**Ein Shop-Tab oder ein Produktregal.** Das bedeutet meist, dass Shopping aktiviert ist, und auch das setzt das Partnerprogramm voraus.",
            `**Werbung bei Videos.** Das ist der schwächste Hinweis. [YouTube kann bei jedem Video Werbung zeigen, auch bei Kanälen, die nicht im Programm sind und an dieser Werbung nichts verdienen.](${YPP_HELP})`,
            "**Die Abonnentenzahl.** Ein Kanal mit weniger als 500 Abonnenten hat sich so gut wie sicher noch nicht qualifiziert.",
          ],
        },
        { p: "Kein einzelnes Signal ist ein Beweis. Ein „Mitglied werden“-Button sagt viel. Werbung allein sagt sehr wenig." },
        { p: "Unser Check geht diese Hinweise mit dir durch und verbindet sie mit den öffentlichen Voraussetzungen zu einer Einschätzung." },
      ],
    },
    {
      eyebrow: "Einzelne Videos",
      title: "Lässt sich prüfen, ob ein einzelnes Video oder ein Short monetarisiert ist?",
      blocks: [
        {
          p: "Nicht zuverlässig. Selbst auf einem monetarisierten Kanal kann ein einzelnes Video nichts einbringen. Es kann speziell für Kinder sein, wegen des Themas nur eingeschränkte Werbung haben oder Musik enthalten, die jemand anderes beansprucht hat. Werbeunterbrechungen beim Ansehen beweisen nicht, dass der Creator Geld bekommt. Wenn du hier einen Video- oder Shorts-Link einfügst, prüfen wir den Kanal dahinter, denn dieser Teil ist öffentlich.",
        },
      ],
    },
    {
      eyebrow: "Häufige Gründe",
      title: "Warum ein Kanal vielleicht noch nicht monetarisiert ist",
      blocks: [
        {
          ul: [
            `**Zu wenig Wiedergabezeit oder Shorts-Aufrufe.** Das ist mit Abstand der häufigste Grund. Mit dem [Wiedergabezeit-Rechner](${WATCH_TIME}) siehst du, wie weit du noch entfernt bist.`,
            "**Wiederverwendete oder sich wiederholende Inhalte.** YouTube lehnt Kanäle ab, die vor allem Videos anderer erneut hochladen oder fast identische Videos in Masse produzieren.",
            "**Inhalte speziell für Kinder.** Solche Kanäle können teilnehmen, verdienen aber weniger: keine personalisierte Werbung und keine Kanalmitgliedschaften oder Supers.",
            "**Wohnort.** Das Partnerprogramm ist nicht in jedem Land verfügbar.",
            "**Verwarnungen.** Eine aktive Verwarnung wegen eines Verstoßes gegen die Community-Richtlinien kann die Freigabe blockieren oder verzögern.",
            "**Nie beworben.** Wer die Zahlen erreicht, wird nicht automatisch aufgenommen. Du musst dich in YouTube Studio unter „Einnahmen“ bewerben.",
          ],
        },
      ],
    },
    {
      eyebrow: "Dein eigener Kanal",
      title: "So prüfst du deinen eigenen Kanal",
      blocks: [
        {
          p: "Öffne YouTube Studio und gehe zu „Einnahmen“. Dort siehst du deine genaue Wiedergabezeit, deine Shorts-Aufrufe und Abonnenten, wie nah du jeder Stufe bist und den Status deiner Bewerbung, falls du dich schon beworben hast. Das ist die einzige offizielle Antwort. Ein Tool wie dieses ist praktisch, um andere Kanäle zu prüfen oder schnell zu sehen, was öffentlich ist.",
        },
        { p: `Du willst wissen, was ein monetarisierter Kanal verdienen könnte? Probier den [Einnahmenrechner](${ESTIMATOR}) (auf Englisch) aus.` },
      ],
    },
    {
      eyebrow: "Nächste Schritte",
      title: "Wer einen Monetarisierungs-Check nutzt und was danach kommt",
      blocks: [
        { p: "Jeder prüft aus einem anderen Grund, und der nächste Schritt hängt von deinem ab." },
        {
          ul: [
            `**Creator, die ihren Fortschritt verfolgen.** Prüfe hier, was öffentlich ist, und öffne dann „Einnahmen“ in YouTube Studio für deine genaue Wiedergabezeit. Wenn du nah dran bist, zeigt dir der [Wiedergabezeit-Rechner](${WATCH_TIME}), wie viele Aufrufe dir noch fehlen.`,
            `**Marken und Agenturen, die ein Sponsoring prüfen.** Ein monetarisierter Kanal hat die Prüfung von YouTube bestanden, und das sagt schon etwas über die Inhalte. Sieh dir die aktuellen Uploads und Aufrufe des Kanals im [Kanal-Analyzer](${ANALYZER}) an, bevor du etwas unterschreibst.`,
            `**Creator, die die Konkurrenz einschätzen.** Wenn ein Konkurrent aus deiner Nische monetarisiert ist, gibt dir der [Einnahmenrechner](${ESTIMATOR}) (auf Englisch) eine grobe Vorstellung davon, was die Nische einbringen kann.`,
            "**Wer einen Kanal kauft oder verkauft.** Verlass dich nie auf ein „monetarisiert“ auf Zuruf. Bitte den Verkäufer, die Seite „Einnahmen“ in YouTube Studio live per Bildschirmfreigabe zu zeigen. Das ist der verlässlichste Beweis, denn Screenshots lassen sich bearbeiten.",
          ],
        },
      ],
    },
    {
      eyebrow: "Shorts und Livestreams",
      title: "Monetarisierung von YouTube Shorts und Livestreams",
      id: "shorts-and-live",
      blocks: [
        {
          p: "Shorts haben einen eigenen Weg ins Partnerprogramm. Statt mit Wiedergabezeit kann sich ein Kanal mit Shorts-Aufrufen qualifizieren: 10 Millionen in den letzten 90 Tagen heute oder 20 Millionen für neue Bewerber ab dem 1. Februar 2027, dazu 1.000 Abonnenten. Wiedergabezeit aus dem Shorts-Feed zählt nicht zum Ziel für die Wiedergabezeit, du kannst beides also nicht kombinieren.",
        },
        {
          p: "Auch die Einnahmen mit Shorts funktionieren anders. Das Werbegeld aus dem Shorts-Feed fließt in einen gemeinsamen Topf, den Creator-Pool für Shorts, der nach dem Anteil an den Aufrufen unter den Creatorn aufgeteilt wird. Ab dem 1. Februar 2027 muss ein monetarisierter Kanal alle 90 Tage 10 Millionen Shorts-Aufrufe halten, um weiter aus diesem Pool zu verdienen. Wer das verfehlt, verliert dadurch keine Einnahmen mit langen Videos.",
        },
        {
          p: "Livestreams sind einfacher. Wiedergabezeit aus einem öffentlichen Livestream zählt zur Wiedergabezeit, solange die Aufzeichnung öffentlich bleibt. Monetarisierte Kanäle können während des Streams außerdem mit Super Chat und Super Stickers verdienen. Du kannst einen Livestream-Link in den Check einfügen, und er prüft den Kanal dahinter.",
        },
      ],
    },
    {
      eyebrow: "Bewerbung",
      title: "So bewirbst du dich für die YouTube-Monetarisierung",
      blocks: [
        { p: "Sobald dein Kanal die Voraussetzungen erfüllt, bewirbst du dich in YouTube Studio. Das ist kostenlos und dauert ein paar Minuten." },
        {
          ol: [
            "Aktiviere die Zwei-Faktor-Authentifizierung für dein Google-Konto. YouTube verlangt das.",
            "Öffne YouTube Studio und wähle im Menü links „Einnahmen“.",
            "Klicke auf „Jetzt bewerben“, lies die Bedingungen des Partnerprogramms und akzeptiere sie.",
            "Richte ein AdSense für YouTube-Konto ein oder verknüpfe ein vorhandenes. Darüber zahlt YouTube dich aus.",
            "Warte auf die Prüfung. Die Systeme und Prüfer von YouTube sehen sich deinen Kanal als Ganzes an, und das kann bis zu 30 Tage dauern. Den Status verfolgst du unter „Einnahmen“.",
          ],
        },
        {
          p: "Wirst du abgelehnt, nennt YouTube dir den Grund. Nach einer ersten Ablehnung kannst du dich nach 30 Tagen erneut bewerben oder innerhalb von 21 Tagen Einspruch einlegen, wenn du die Entscheidung für falsch hältst.",
        },
      ],
    },
    {
      eyebrow: "Einnahmen",
      title: "Wie viel verdienen monetarisierte Kanäle?",
      blocks: [
        {
          p: "Das hängt viel stärker vom Thema ab als von der Zahl der Aufrufe. Werbetreibende zahlen mehr, um Menschen zu erreichen, die gerade Geld ausgeben wollen. Deshalb kann ein Kanal über Finanzen oder Software pro Aufruf ein Vielfaches dessen verdienen, was ein Gaming- oder Unterhaltungskanal mit gleich großem Publikum bekommt.",
        },
        {
          p: "Einnahmen werden meist als RPM (Revenue per Mille) gemessen: was ein Creator pro 1.000 Aufrufe nach dem Anteil von YouTube verdient, über alle Aufrufe hinweg, auch die ohne Werbung.",
        },
        {
          table: {
            head: ["Nische", "Geschätzter RPM-Bereich (US-$ pro 1.000 Aufrufe)"],
            rows: RPM_ROWS,
            caption: "Für ein Publikum aus den USA, Großbritannien, Kanada oder Australien, nach den Annahmen des Einnahmenrechners.",
          },
        },
        {
          p: "Das sind Schätzungen, keine Auszahlungen. Dein tatsächlicher RPM hängt davon ab, wo dein Publikum lebt, wie lang deine Videos sind, welche Jahreszeit gerade ist und wie viele Anzeigen deine Videos zeigen.",
        },
        { p: `Eine grobe Zahl für jeden Kanal liefert der [Einnahmenrechner](${ESTIMATOR}) (auf Englisch).` },
      ],
    },
    {
      eyebrow: "Pro Video",
      title: "Verdient jedes Video Geld, sobald ein Kanal monetarisiert ist?",
      blocks: [
        {
          p: "Nein. Im Partnerprogramm zu sein heißt, dass ein Kanal verdienen kann, nicht dass jedes Video etwas einbringt. Videos mit eingeschränkter Werbung (etwa wegen derber Sprache oder heikler Themen), Videos speziell für Kinder und Videos, bei denen jemand anderes Musik oder Bildmaterial beansprucht hat, bringen wenig oder gar nichts. Deshalb können zwei Kanäle mit gleich vielen Aufrufen auch sehr unterschiedlich viel verdienen. Thema, Wohnort des Publikums und Videolänge verändern, was ein Aufruf mit Werbung wert ist.",
        },
      ],
    },
    {
      eyebrow: "Monetarisierung behalten",
      title: "Kann ein Kanal die Monetarisierung verlieren?",
      blocks: [
        { p: "Ja. Die Aufnahme ist nicht für immer, und YouTube prüft Kanäle, die schon im Programm sind, weiterhin. Die häufigsten Gründe für einen Verlust:" },
        {
          ul: [
            "**Funkstille.** YouTube kann die Monetarisierung für Kanäle abschalten, die 6 Monate lang kein Video hochgeladen oder nichts gepostet haben. Ab dem 1. Februar 2027 müssen monetarisierte Kanäle außerdem aktiv bleiben: 2 lange Videos oder 5 Shorts alle 90 Tage, 1.000 Stunden Wiedergabezeit im Jahr oder 1 Million Shorts-Aufrufe in 90 Tagen.",
            "**Verstöße gegen die Monetarisierungsrichtlinien.** Wiederverwendete Inhalte, massenhaft produzierte Videos oder irreführende Metadaten können einen Kanal aus dem Programm werfen, auch nach der Aufnahme.",
            "**Neue Bedingungen nicht akzeptiert.** Kanäle, die schon im Programm sind, müssen die aktualisierten Bedingungen von YouTube bis zum 31. Januar 2027 akzeptieren. Sonst verdienen sie mit den betroffenen Funktionen nichts mehr.",
          ],
        },
      ],
    },
    {
      eyebrow: "Warum Ergebnisse abweichen",
      title: "Warum verschiedene Monetarisierungs-Checks Unterschiedliches sagen",
      blocks: [
        {
          p: "Wenn du ein paar Checks ausprobiert hast, hast du vermutlich gesehen, dass sie sich widersprechen. Der Grund: Keiner von ihnen sieht YouTubes echte Daten. Jeder liest andere öffentliche Hinweise und gewichtet sie anders. Manche werten Werbung bei einem Video als Beweis, obwohl YouTube auch bei Kanälen Werbung zeigt, die dafür nicht bezahlt werden. Manche lesen Signale direkt aus den YouTube-Seiten aus, was jedes Mal bricht, wenn YouTube das Layout ändert. Und andere geben ein selbstsicheres Ja oder Nein, das die Daten gar nicht hergeben.",
        },
        {
          p: "Wir sind lieber offen bei den Lücken. Dieser Check zeigt, welche Voraussetzungen bestätigt sind, welche nicht öffentlich sind und wie aussagekräftig jeder Hinweis wirklich ist, den du selbst nachsehen kannst.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Kann dieses Tool sicher sagen, ob ein Kanal monetarisiert ist?",
      a: "Nein, und das kann kein externes Tool. YouTube hält den Monetarisierungsstatus zwischen sich und dem Kanalinhaber geheim. Dieser Check zeigt, welche öffentlichen Voraussetzungen ein Kanal erfüllt und was die öffentlichen Hinweise nahelegen, und markiert alles andere als nicht öffentlich.",
    },
    {
      q: "Welche Voraussetzungen gelten für die YouTube-Monetarisierung derzeit?",
      a: "Bis zum 31. Januar 2027 brauchst du für Werbeeinnahmen 1.000 Abonnenten und dazu 4.000 Stunden Wiedergabezeit in den letzten 365 Tagen oder 10 Millionen Shorts-Aufrufe in den letzten 90 Tagen. In einigen Ländern gibt es eine frühere Stufe für Fan-Funding mit 500 Abonnenten, 3 öffentlichen Uploads in den letzten 90 Tagen und 3.000 Stunden Wiedergabezeit oder 3 Millionen Shorts-Aufrufen.",
    },
    {
      q: "Ändern sich die Voraussetzungen 2027?",
      a: "Ja. Ab dem 1. Februar 2027 brauchen neue Kanäle, die sich für Werbeeinnahmen bewerben, 1.000 Abonnenten und dazu 8.000 Stunden Wiedergabezeit in den letzten 365 Tagen oder 20 Millionen Shorts-Aufrufe in den letzten 90 Tagen. Die Stufe Fan-Funding mit 500 Abonnenten bleibt gleich.",
    },
    {
      q: "Ich bin schon monetarisiert. Brauche ich jetzt 8.000 Stunden?",
      a: "Nein. Die höhere Hürde gilt nur für neue Bewerber. Du musst aber die aktualisierten Bedingungen von YouTube bis zum 31. Januar 2027 in Studio akzeptieren, und ab dem 1. Februar 2027 muss dein Kanal aktiv bleiben, um im Programm zu bleiben.",
    },
    {
      q: "Kann ein Kanal mit 500 Abonnenten monetarisiert werden?",
      a: "Teilweise. In Ländern mit der Stufe Fan-Funding schalten 500 Abonnenten plus die Voraussetzungen für Uploads und Wiedergabezeit Kanalmitgliedschaften, Supers und Shopping frei. Für Werbeeinnahmen braucht es weiterhin 1.000 Abonnenten.",
    },
    {
      q: "Bedeutet Werbung bei einem Video, dass der Kanal monetarisiert ist?",
      a: "Nein. YouTube kann bei jedem Video Werbung zeigen, auch bei Kanälen außerhalb des Partnerprogramms, und diese Creator bekommen nichts davon. Ein „Mitglied werden“-Button ist ein viel besseres Zeichen.",
    },
    {
      q: "Warum könnt ihr die Wiedergabezeit nicht prüfen?",
      a: "Die Wiedergabezeit ist privat. Nur der Kanalinhaber sieht sie in YouTube Studio, und YouTubes öffentliche Daten enthalten sie nicht. Deine eigene kannst du mit dem Wiedergabezeit-Rechner schätzen.",
      link: { text: "Wiedergabezeit-Rechner", href: WATCH_TIME },
    },
    {
      q: "Warum ist die Abonnentenzahl nur ungefähr?",
      a: "YouTube rundet öffentliche Abonnentenzahlen über 1.000 auf drei signifikante Stellen, aus 1.234 wird also 1,23 Tsd. Unter 1.000 ist die Zahl genau, und genau in diesem Bereich zählen die Grenzwerte.",
    },
    {
      q: "Verdienen Kanäle speziell für Kinder weniger?",
      a: "Meistens ja. Videos speziell für Kinder bekommen keine personalisierte Werbung, und Funktionen wie Kanalmitgliedschaften, Supers und Kommentare sind deaktiviert. Damit fallen mehrere Einnahmequellen weg.",
    },
    {
      q: "Wie werden Shorts monetarisiert?",
      a: "Es gibt zwei getrennte Zahlen. Um über Shorts ins Partnerprogramm zu kommen, braucht ein Kanal 1.000 Abonnenten und 10 Millionen Shorts-Aufrufe in 90 Tagen, für neue Bewerber ab dem 1. Februar 2027 sind es 20 Millionen. Wer drin ist, muss ab dem 1. Februar 2027 alle 90 Tage 10 Millionen Shorts-Aufrufe halten, um weiter aus dem Creator-Pool für Shorts zu verdienen. Mehr dazu im Abschnitt über Shorts weiter oben.",
      link: { text: "Abschnitt über Shorts", href: "#shorts-and-live" },
    },
    {
      q: "Wie viel verdient ein monetarisierter Kanal?",
      a: "Das schwankt stark je nach Thema, Wohnort des Publikums und Videolänge. Kanäle über Finanzen und Technik können pro Aufruf ein Vielfaches von Unterhaltungskanälen verdienen. Unser Einnahmenrechner (auf Englisch) zeigt dir eine realistische Spanne.",
      link: { text: "Einnahmenrechner", href: ESTIMATOR },
    },
    {
      q: "Kann ich mit diesem Tool meinen eigenen Kanal prüfen?",
      a: "Ja. Füge dein @Handle ein, um zu sehen, was öffentlich ist. Deine genaue Wiedergabezeit und den Status deiner Bewerbung findest du in YouTube Studio unter „Einnahmen“.",
    },
    {
      q: "Wie lange prüft YouTube eine Bewerbung für die Monetarisierung?",
      a: "Bis zu 30 Tage. Während der Prüfung siehst du den Status unter „Einnahmen“ in YouTube Studio.",
    },
    {
      q: "Was passiert, wenn meine Bewerbung abgelehnt wird?",
      a: "YouTube nennt dir den Hauptgrund. Nach einer ersten Ablehnung kannst du dich nach 30 Tagen erneut bewerben. Hältst du die Entscheidung für falsch, kannst du stattdessen innerhalb von 21 Tagen Einspruch einlegen.",
    },
    {
      q: "Was ist der Unterschied zwischen berechtigt und monetarisiert?",
      a: "Berechtigt heißt, dass ein Kanal die Zahlen erreicht: Abonnenten plus Wiedergabezeit oder Shorts-Aufrufe. Monetarisiert heißt, dass er sich beworben, die Prüfung von YouTube bestanden hat und aufgenommen wurde. Viele berechtigte Kanäle sind nicht monetarisiert, weil sie sich noch nicht beworben haben oder abgelehnt wurden.",
    },
    {
      q: "Kann ein monetarisierter Kanal die Monetarisierung verlieren?",
      a: "Ja. YouTube kann sie abschalten, wenn ein Kanal monatelang nichts hochlädt, gegen die Monetarisierungsrichtlinien verstößt oder ab dem 1. Februar 2027 die aktualisierten Bedingungen nicht akzeptiert oder nicht aktiv bleibt.",
    },
    {
      q: "Kann ich am Handy prüfen, ob ein Kanal monetarisiert ist?",
      a: "Ja. Dieser Check funktioniert in jedem mobilen Browser. Kopiere den Kanal- oder Video-Link in der YouTube-App über „Teilen“ und füge ihn oben in das Feld ein.",
    },
    {
      q: "Speichert ihr die Kanäle, die ich prüfe?",
      a: "Wir speichern die Kanäle nicht, die du in den Check eingibst. Damit das Tool schnell bleibt und um Missbrauch zu verhindern, speichert der Server die öffentlichen Daten von YouTube kurz zwischen und zählt eine Stunde lang die Anfragen pro IP-Adresse. Wenn du einen Link zum Teilen öffnest (der auf ?c=@Handle endet), steht diese Adresse etwa zwei Wochen lang in unseren normalen Server-Logs. Google Analytics haben wir so eingestellt, dass Kanalnamen aus den Seitenadressen entfernt werden. Deine Häkchen in der Checkliste und die Liste der zuletzt geprüften Kanäle verlassen deinen Browser nie, und du kannst die Liste jederzeit leeren.",
    },
  ],
};
