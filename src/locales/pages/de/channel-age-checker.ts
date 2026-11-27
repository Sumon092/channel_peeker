import type { LocalizedPageContent } from "@/lib/localized-page";

const ANALYZER = "/de/channel-analyzer";
const UPLOAD_DATE = "/de/video-upload-date-checker";
const YPP_HELP = "https://support.google.com/youtube/answer/72851?hl=de";

export const content: LocalizedPageContent = {
  title: "YouTube-Kanalalter und Erstellungsdatum prüfen",
  description:
    "Finde heraus, wann genau ein YouTube-Kanal erstellt wurde und wie alt er ist, inklusive Gesamtaufrufen und Videoanzahl. Kostenlos, sofort, ohne Anmeldung.",
  heading: "YouTube-Kanalalter-Check",
  highlight: "Kanalalter-Check",
  intro: "Sieh genau, wann ein YouTube-Kanal erstellt wurde und wie alt er heute ist. Füge zum Start einen Kanal-Link, ein @Handle oder einen Video-Link ein.",
  updated: "27. November 2026",
  dataBadge: "Offizielle YouTube-Daten",
  afterTool: [
    {
      p: "Jeder Kanal hat ein Erstellungsdatum, aber YouTube macht es einem nicht leicht, es zu finden. Dabei verrät dieses Datum eine Menge. Ein Kanal mit 2 Millionen Abonnenten, der 10 Jahre alt ist, ist stetig gewachsen. Einer, der in 8 Monaten auf 2 Millionen kam, ist wahrscheinlich viral gegangen. Dieses Tool zeigt dir das Datum in Sekunden, zusammen mit Gesamtaufrufen und Videoanzahl, damit du das ganze Bild siehst.",
    },
  ],
  howTo: [
    "**Kanal einfügen.** Nutze das @Handle (etwa @mkbhd), die Kanal-URL, die Kanal-ID (sie beginnt mit UC) oder einen Link zu einem beliebigen Video des Kanals, Shorts eingeschlossen. Alles funktioniert.",
    "**Datum prüfen.** Das Tool liest das Erstellungsdatum direkt aus den offiziellen Daten von YouTube. Es stimmt also mit dem überein, was YouTube selbst gespeichert hat.",
    `**Ergebnis nutzen.** Kopiere es oder öffne die [vollständige Kanalanalyse](${ANALYZER}), um die aktuellen Uploads des Kanals zu sehen und welche davon die meisten Aufrufe haben.`,
  ],
  before: [
    {
      eyebrow: "Die Ergebniskarte",
      title: "Was du im Ergebnis siehst",
      blocks: [
        { p: "So sah das Ergebnis aus, als wir @mkbhd am 27. November 2026 geprüft haben:" },
        {
          ul: [
            "**Kanal:** Profilbild, Name (Marques Brownlee) und Handle.",
            "**Alter:** in Jahren, Monaten und Tagen, „18 Jahre, 8 Monate und 6 Tage alt“, dazu die Summe in Tagen (insgesamt 6.825 Tage).",
            "**Erstellungsdatum und -uhrzeit** in UTC: „Erstellt am 21. März 2008 um 15:25 UTC“.",
            "**Abonnenten:** ≈ 21,5 Mio., so gerundet wie bei YouTube, oder „Vom Creator verborgen“, wenn sie ausgeblendet sind.",
            "**Aufrufe seit der Erstellung:** 5,9 Mrd.",
            "**Öffentliche Videos:** 1.869.",
            "**Abonnenten pro Monat:** etwa 95.884, für dich ausgerechnet.",
            "**Durchschnittliche Aufrufe pro Video:** 3,2 Mio., für dich ausgerechnet.",
            "**Land:** Vereinigte Staaten, oder „Nicht angegeben“, wenn der Creator das Feld leer gelassen hat.",
            "**Kanal-ID:** UCBJycsmduvYEL83R_U4JriQ, mit einem Button „ID kopieren“.",
            "**Ergebnis kopieren:** kopiert eine einzeilige Zusammenfassung mit Datum, Uhrzeit und Alter.",
            "**Link kopieren:** kopiert einen Link zum Teilen (channelpeeker.com/de/channel-age-checker?c=@mkbhd), der das Tool öffnet und dieselbe Prüfung startet. Praktisch, um einen Kanal an einen Kunden oder jemanden im Team zu schicken.",
            "**Auf YouTube öffnen:** öffnet den Kanal auf YouTube in einem neuen Tab.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "Was die Ergebnisse bedeuten",
    blocks: [
      {
        p: "Das Erstellungsdatum ist der Tag, an dem der Kanal selbst angelegt wurde. Es ist nicht das Datum des ersten Videos. Viele Kanäle bleiben jahrelang leer, bevor jemand etwas hochlädt. Manche Creator löschen oder verbergen außerdem ihre ältesten Videos, daher kann das älteste sichtbare Video viel jünger sein als der Kanal.",
      },
      { p: "Deshalb ist das Alter neben anderen Zahlen am nützlichsten. So liest du sie zusammen:" },
      {
        ul: [
          "**Alter Kanal, wenige Videos:** Der Kanal lag wahrscheinlich lange brach, oder der Creator hat alte Inhalte entfernt.",
          "**Junger Kanal, große Zahlen:** schnelles Wachstum, oft durch ein oder zwei virale Videos. Sieh dir die Top-Videos an, um zu sehen, ob das Wachstum angehalten hat.",
          "**Alter Kanal, stetige Zahlen:** eine lange, beständige Erfolgsbilanz. Das ist meist das sicherste Zeichen, wenn du einen Kanal einschätzt.",
        ],
      },
      { h3: "Kanalalter und Alter des Google-Kontos" },
      {
        p: "Wenn du wissen willst, wie alt dein YouTube-Konto ist, gibt es zwei Daten. Dein Google-Konto kann Jahre älter sein als dein Kanal, weil ein Kanal separat erstellt wird, manchmal lange nach der Anmeldung bei Gmail. Dieses Tool zeigt das Erstellungsdatum des Kanals, und das ist auf YouTube das entscheidende Datum.",
      },
      { h3: "So findest du das Erstellungsdatum eines Kanals ohne Tool" },
      {
        p: "Du kannst es direkt auf YouTube nachsehen. Öffne den Kanal, tippe auf die Beschreibung unter dem Kanalnamen, um den Bereich „Kanalinfo“ zu öffnen, und such nach „Mitglied seit“. Dort steht nur das Datum, das Alter musst du selbst ausrechnen. Genau das erledigt dieses Tool für dich, zusammen mit den Aufrufen und der Videoanzahl des Kanals.",
      },
    ],
  },
  after: [
    {
      eyebrow: "Häufige Gründe",
      title: "Warum Leute das Alter eines Kanals prüfen",
      blocks: [
        {
          ul: [
            "**Vor einem Sponsoring oder einer Kooperation.** Marken und Creator prüfen, ob ein Kanal eine echte Geschichte hat und nicht aus dem Nichts aufgetaucht ist.",
            "**Vor dem Kauf eines Kanals.** Wenn ein Verkäufer sagt, der Kanal sei „seit 2015 etabliert“, zeigt das Erstellungsdatum, ob das stimmt.",
            "**Vergleich mit der Konkurrenz.** Vergleiche, wie lange ein Konkurrent für seine Zahlen gebraucht hat, mit der Zeit, die du schon dabei bist.",
            "**Eine Nische einschätzen.** Sind die meisten großen Kanäle zu einem Thema über 8 Jahre alt, ist der Bereich ausgereift. Sind mehrere schnell wachsende Kanäle jünger als 2 Jahre, ist noch Platz für Neue.",
            "**Gefälschte oder wiederverwendete Kanäle erkennen.** Ein brandneuer Kanal mit riesigen Abonnentenzahlen und wenigen Videos kann ein Warnsignal sein.",
            "**Einfach Neugier.** Herauszufinden, wann dein Lieblings-Creator angefangen hat, macht Spaß, vor allem wenn der Kanal älter ist als gedacht.",
          ],
        },
      ],
    },
    {
      eyebrow: "Nachrechnen",
      title: "So berechnest du die Wachstumsrate eines Kanals",
      blocks: [
        {
          p: "Wenn du weißt, wie alt ein Kanal ist, zeigen dir zwei schnelle Rechnungen, wie schnell er gewachsen ist. Das Tool rechnet beide für dich aus und zeigt sie im Ergebnis. So funktionieren sie:",
        },
        {
          ul: [
            "**Abonnenten pro Monat:** Abonnenten insgesamt ÷ Kanalalter in Monaten. Ein Kanal mit 600.000 Abonnenten, der 5 Jahre (60 Monate) alt ist, hat im Schnitt etwa 10.000 pro Monat gewonnen.",
            "**Durchschnittliche Aufrufe pro Video:** Aufrufe insgesamt ÷ Anzahl der Videos. 30 Millionen Aufrufe auf 300 Videos ergeben 100.000 Aufrufe pro Video.",
          ],
        },
        {
          p: `Denk daran, dass das Durchschnittswerte sind. Ein Kanal, der vier Jahre vor sich hin dümpelte und dann in einem Monat explodierte, sieht genauso aus wie einer, der stetig gewachsen ist. Welche aktuellen Videos die Aufrufe bringen, siehst du in der [vollständigen Kanalanalyse](${ANALYZER}).`,
        },
      ],
    },
  ],
  faq: [
    {
      q: "Wie sehe ich, wann ein YouTube-Kanal erstellt wurde?",
      a: "Füge das Handle, die URL oder einen Video-Link des Kanals oben in das Tool ein. Du bekommst das genaue Erstellungsdatum und das Alter des Kanals. Auf YouTube selbst steht das Datum als „Mitglied seit“ im Bereich „Kanalinfo“.",
    },
    {
      q: "Wie alt ist mein YouTube-Konto?",
      a: "Füge den Link zu deinem Kanal in das Tool ein. Es zeigt, wann dein Kanal erstellt wurde. Dein Google-Konto kann älter sein, weil der Kanal separat erstellt wird.",
    },
    {
      q: "Ist das Erstellungsdatum dasselbe wie der erste Upload?",
      a: "Nein. Ein Kanal kann jahrelang leer sein, bevor das erste Video kommt, und alte Uploads können gelöscht oder verborgen werden. Unter „Was die Ergebnisse bedeuten“ oben steht, wie du das Alter neben der Videoanzahl liest.",
    },
    {
      q: "Rankt ein älterer Kanal besser oder wird er schneller monetarisiert?",
      a: "Nicht direkt. Das YouTube-Partnerprogramm verlangt kein Mindestalter für Kanäle. Es schaut auf Abonnenten und Wiedergabezeit. Empfehlungen hängen davon ab, wie Zuschauer auf deine Videos reagieren, nicht davon, wie alt der Kanal ist.",
      link: { text: "YouTube-Partnerprogramm", href: YPP_HELP },
    },
    {
      q: "Kann ich einen gelöschten oder privaten Kanal prüfen?",
      a: "Nein. Das Tool kann nur öffentliche Kanäle lesen. Sobald ein Kanal gelöscht oder auf privat gestellt ist, sind seine Daten nicht mehr verfügbar.",
    },
    {
      q: "Kann ich herausfinden, wann ein bestimmtes Video hochgeladen wurde?",
      a: "Ja, aber dafür gibt es ein anderes Tool. Mit dem Upload-Datum-Check bekommst du Datum und Uhrzeit, zu denen ein Video veröffentlicht wurde.",
      link: { text: "Upload-Datum-Check", href: UPLOAD_DATE },
    },
    {
      q: "Warum wirkt ein Kanal älter als seine Videos?",
      a: "Meist, weil der Creator den Kanal früh angelegt und erst später mit dem Posten begonnen hat, oder weil ältere Uploads entfernt wurden. Das ist sehr häufig und bedeutet nicht, dass etwas nicht stimmt.",
    },
    {
      q: "Wie genau ist das Erstellungsdatum?",
      a: "Es kommt über die offizielle API direkt aus den Daten von YouTube, ist also dasselbe Datum, das YouTube für den Kanal gespeichert hat. Es ist keine Schätzung.",
    },
    {
      q: "Kann ich statt des Kanals einen Video-Link einfügen?",
      a: "Ja. Füge einen beliebigen Video-Link ein, auch von einem Short, und das Tool findet den Kanal, der es hochgeladen hat, und zeigt dessen Erstellungsdatum. Eine Kanal-ID (sie beginnt mit UC) funktioniert ebenfalls.",
    },
    {
      q: "Warum zeigt das Tool kein Ergebnis?",
      a: "Meist liegt es am Link. Füge den vollständigen Kanal-Link, das Handle oder einen beliebigen Video-Link ein. Alte benutzerdefinierte URLs mit /c/ funktionieren nicht, nimm dann das @Handle oder einen Video-Link. Wurde der Kanal gelöscht, auf privat gestellt oder gekündigt, gibt es nichts Öffentliches mehr zu lesen.",
    },
    {
      q: "Ändert sich das Alter eines Kanals, wenn er umbenannt wird?",
      a: "Nein. Das Erstellungsdatum bleibt gleich, wenn ein Creator Kanalnamen, Handle oder Bild ändert. Es zeigt nur, wann der Kanal ursprünglich angelegt wurde.",
    },
    {
      q: "Warum zeigt ein Kanal ein seltsames Datum wie 1970?",
      a: "Das ist kein echtes Datum. Einige Kanäle, darunter der offizielle Kanal von YouTube selbst, kommen bei YouTube mit dem 1. Januar 1970 als Erstellungsdatum zurück. Das ist ein Platzhalter, nicht der Tag ihrer Erstellung. Jedes Datum vor 2005, dem Startjahr von YouTube, kann nicht stimmen, daher zeigt das Tool dann „Erstellungsdatum nicht öffentlich“ statt eines falschen Alters.",
    },
  ],
};
