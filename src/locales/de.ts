import type { LocalizedToolContent } from "@/lib/i18n";

const UPDATED = "7. November 2026";
const API_BADGE = "Offizielle YouTube-Daten";

export const content: Record<string, LocalizedToolContent> = {
  "/comment-picker": {
    title: "YouTube Kommentar-Gewinnspiel Auslosung",
    description:
      "Lose Gewinner fair aus den Kommentaren deines YouTube-Videos aus — kryptografisch zufällig, ein Los pro Person, bis zu 5 Gewinner. Kostenlos, ohne Anmeldung.",
    heading: "Comment Picker: Gewinnspiel-Auslosung",
    highlight: "Comment Picker",
    intro: "Du machst ein Gewinnspiel? Lose Gewinner zufällig aus den Kommentaren aus — nachweisbar fair, mit einer Spannungs-Animation, die du für die Siegerverkündung aufnehmen kannst.",
    howTo: [
      "Füge den Link deines Gewinnspiel-Videos ein.",
      "Optional: Pflicht-Stichwort (z. B. #gewinnspiel), ein Los pro Person, Anzahl der Gewinner.",
      "Klicke auf „Pick winner“ — nimm den Bildschirm auf, um die Auslosung transparent zu zeigen.",
    ],
    meaning: [
      "Kommentar-Gewinnspiele belohnen dein echtes Publikum, aber per Scrollen zu wählen ist weder zufällig noch beweisbar. Dieses Tool lädt die Kommentare über die offizielle YouTube-API und lost die Gewinner mit kryptografischer Zufälligkeit direkt in deinem Browser aus — wir könnten niemanden bevorzugen, selbst wenn wir wollten.",
      "Ehrliche Grenzen: Die Auslosung erfolgt aus den neuesten 500 Top-Level-Kommentaren (Antworten zählen nicht als eigene Lose), und kein Tool der Welt kann prüfen, wer ein Kanal-Abo hat — YouTube gibt das nicht frei. Prüfe Abo-Bedingungen also manuell vor der Verkündung.",
    ],
    faq: [
      {
        q: "Wie lose ich einen Gewinner aus YouTube-Kommentaren aus?",
        a: "Video-Link oben einfügen, Filter setzen, „Pick winner“ klicken. Die Auslosung nutzt den kryptografischen Zufallsgenerator deines Browsers über die geladenen Kommentare.",
      },
      {
        q: "Ist die Auslosung wirklich zufällig?",
        a: "Ja — wir nutzen crypto.getRandomValues (die sichere Zufallsquelle des Browsers) mit verzerrungsfreier Auswahl, direkt auf deinem Gerät. Nimm die Auslosung auf, wenn du einen sichtbaren Beweis für dein Publikum möchtest.",
      },
      {
        q: "Kann das Tool prüfen, ob der Gewinner abonniert hat?",
        a: "Nein — kein Tool kann das. YouTube legt Abos nicht öffentlich offen. Prüfe Abo-Bedingungen manuell, bevor du den Gewinner verkündest.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/comment-finder": {
    title: "YouTube Kommentar-Suche",
    description:
      "Durchsuche die Kommentare jedes YouTube-Videos nach einem Wort, Namen oder Satz. Nach Top oder Neueste sortieren, als CSV exportieren. Kostenlos, offizielle YouTube-Daten.",
    heading: "Comment Finder: Kommentare durchsuchen",
    highlight: "Comment Finder",
    intro: "Durchsuche die Kommentare eines Videos — finde einen bestimmten Kommentar, jede Erwähnung eines Worts oder deinen eigenen Kommentar unter einem viralen Video.",
    howTo: [
      "Füge einen Video- oder Shorts-Link ein.",
      "Optional: Suchwort, Name oder Satz eingeben.",
      "Durchsuche die Treffer, sortiert nach Top oder Neueste, und lade sie als CSV herunter.",
    ],
    meaning: [
      "YouTubes eigene Kommentarsuche ist stark eingeschränkt — auf den meisten Geräten kannst du nur scrollen. Dieses Tool lässt die offizielle API die Kommentare eines Videos nach deinen Suchbegriffen filtern: ideal, um einen halb erinnerten Kommentar wiederzufinden oder Zitate für Recherchen zu sammeln.",
      "Wir zeigen bis zu 100 Top-Level-Kommentar-Threads pro Suche. Ohne Suchbegriff nutzt „Top comments“ YouTubes eigenes Ranking; mit Suchbegriff sortieren wir die Treffer nach Likes. „Neueste zuerst“ ist in beiden Fällen streng chronologisch.",
    ],
    faq: [
      {
        q: "Wie finde ich einen bestimmten Kommentar unter einem YouTube-Video?",
        a: "Video-Link einfügen und ein Wort oder einen Satz eintippen, an den du dich erinnerst. Die offizielle YouTube-API liefert nur die passenden Kommentare zurück.",
      },
      {
        q: "Kann ich meinen eigenen Kommentar finden?",
        a: "Ja — such nach deinem Kanalnamen oder einer markanten Formulierung. Beachte: YouTube liefert Top-Level-Kommentare; eine Antwort innerhalb eines Threads erscheint nicht einzeln.",
      },
      {
        q: "Kann ich die Kommentare exportieren?",
        a: "Ja — als CSV mit Autor, Text, Likes, Antwortanzahl und Datum.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/thumbnail-tools/thumbnail-downloader": {
    title: "YouTube Thumbnail Downloader in HD & 4K",
    description:
      "Lade das Thumbnail jedes YouTube-Videos in allen Größen herunter: HD 1280×720 und, wenn vorhanden, 1080p bis 4K. Kostenlos, ohne Anmeldung.",
    heading: "Thumbnail Downloader",
    highlight: "Thumbnail Downloader",
    intro: "Hol dir das Vorschaubild jedes Videos in jeder Größe, die YouTube ausliefert — von SD bis zu den neuen 4K-Versionen.",
    howTo: [
      "Füge einen Video- oder Shorts-Link ein.",
      "Wir lesen alle verfügbaren Thumbnail-Größen über die offizielle API.",
      "Öffne die gewünschte Größe und speichere das Bild.",
    ],
    meaning: [
      "YouTube speichert für jedes Video mehrere Thumbnail-Auflösungen — vom kleinen Suchvorschaubild bis zu „maxres“ in 1280×720 und teils weit darüber. Wir listen jede Version mit direktem Link auf, bezogen aus der offiziellen API.",
      "Nützlich für Design-Referenzen, Archive deiner eigenen Videos oder Konkurrenz-Recherche. Das Bild bleibt Eigentum des Kanals — nutze Downloads als Referenz, nicht als eigenes Branding.",
    ],
    faq: [
      {
        q: "Wie lade ich ein YouTube-Thumbnail herunter?",
        a: "Video-Link oben einfügen, Größe auswählen, Rechtsklick → „Bild speichern unter“. Fertig.",
      },
      {
        q: "Welche Auflösung hat ein YouTube-Thumbnail?",
        a: "Standard-HD ist 1280×720 („maxresdefault“). Manche Videos haben zusätzlich 1080p- bis 4K-Versionen, die wir anzeigen, wenn YouTube sie bereitstellt.",
      },
      {
        q: "Ist das legal?",
        a: "Die URLs sind öffentlich — YouTube liefert sie an jeden Besucher aus. Das Bildrecht bleibt beim Ersteller; nutze Downloads für Referenz und Archiv.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/thumbnail-tools/banner-downloader": {
    title: "YouTube Banner Downloader in HD",
    description:
      "Lade das Kanalbanner jedes YouTube-Kanals in voller Auflösung herunter — TV (2120px), Desktop 2× (2560px), Tablet und Mobil. Kostenlos, offizielle Daten.",
    heading: "Banner Downloader",
    highlight: "Banner Downloader",
    intro: "Hol dir das Banner-Artwork jedes Kanals in allen Größen, die YouTube ausliefert — vom vollen TV-Bild bis zum exakten Desktop-Zuschnitt.",
    howTo: [
      "Füge einen Kanal-Link, @Handle oder ein Video des Kanals ein.",
      "Wir lesen die Banner-URL über die offizielle YouTube-API.",
      "Öffne die passende Größe und speichere sie, oder kopiere die Direkt-URL.",
    ],
    meaning: [
      "YouTube speichert ein großes Bannerbild und schneidet es je nach Gerät zu: TV-Apps zeigen das volle Bild (~2120×1192), Desktop einen breiten Streifen von 2560×423, Tablets und Handys schmalere Ausschnitte. Wir geben dir Direktlinks zu jedem Zuschnitt plus das Originalbild.",
      "Praktisch für Design-Referenzen, Archive deiner eigenen Artworks und Wettbewerbs-Analyse. Das Artwork gehört dem Kanalbetreiber — lade es als Referenz, nicht als fremdes Branding.",
    ],
    faq: [
      {
        q: "Wie lade ich das Banner eines YouTube-Kanals herunter?",
        a: "Kanal-Link oder @Handle oben einfügen. Wir zeigen das Banner in jedem Zuschnitt — öffnen, Rechtsklick, „Bild speichern unter“.",
      },
      {
        q: "Welche Größe hat ein YouTube-Banner?",
        a: "Hochgeladen wird 2560×1440. TV zeigt alles, Desktop einen 2560×423-Streifen, und der überall sichtbare „sichere Bereich“ ist 1546×423 in der Mitte.",
      },
      {
        q: "Warum hat ein Kanal kein Banner?",
        a: "Nicht jeder Kanal lädt eines hoch. Ohne Banner liefert die API keine URL — und wir sagen das ehrlich, statt zu raten.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/monetization-checker": {
    title: "YouTube Monetarisierung prüfen",
    description:
      "Prüfe, welche Anforderungen des YouTube-Partnerprogramms ein Kanal sichtbar erfüllt: Abonnenten, Land, Aktivität. Ehrliche Signale statt erfundenem Ja/Nein.",
    heading: "Monetarisierungs-Check",
    highlight: "Monetarisierungs-Check",
    intro: "Sieh, welche Anforderungen des Partnerprogramms ein Kanal aus öffentlichen Daten erfüllt — ehrlich, ohne erfundenes Ja/Nein.",
    howTo: [
      "Füge einen Kanal-Link, @Handle oder ein Video des Kanals ein.",
      "Wir prüfen die öffentlich sichtbaren Partnerprogramm-Signale über die offizielle API.",
      "Lies, welche Anforderungen erfüllt sind — und welche sich öffentlich nicht prüfen lassen.",
    ],
    meaning: [
      "Seit 2023 verrät YouTube öffentlich nicht mehr, ob ein Kanal monetarisiert ist. Seiten, die dir ein klares „Ja/Nein“ zeigen, raten — etwa anhand eingeblendeter Werbung, die auch auf nicht monetarisierten Videos läuft. Wir zeigen stattdessen, welche sichtbaren Anforderungen (z. B. 1.000 Abonnenten, Kanalland, Aktivität) ein Kanal erfüllt.",
      "Watchtime und Shorts-Aufrufe der letzten 90 Tage sind privat — die kennt nur der Kanalinhaber in YouTube Studio. Was wir zeigen, ist belegbar; was niemand prüfen kann, behaupten wir nicht.",
    ],
    faq: [
      {
        q: "Wie erkenne ich, ob ein YouTube-Kanal monetarisiert ist?",
        a: "Mit Sicherheit nur als Kanalinhaber in YouTube Studio. Öffentlich prüfbar sind die sichtbaren Anforderungen — genau die zeigen wir, ohne zu raten.",
      },
      {
        q: "Was braucht ein Kanal für das Partnerprogramm?",
        a: "Für volle Monetarisierung: 1.000 Abonnenten plus 4.000 öffentliche Watchtime-Stunden in 12 Monaten oder 10 Mio. Shorts-Aufrufe in 90 Tagen, dazu ein Land, in dem das Programm verfügbar ist.",
      },
      {
        q: "Warum zeigt ihr kein einfaches Ja/Nein?",
        a: "Weil es öffentlich nicht feststellbar ist. Ein ehrliches „diese Signale sind erfüllt“ ist nützlicher als ein geratenes Ja/Nein.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/channel-analyzer": {
    title: "YouTube Kanal-Analyse kostenlos",
    description:
      "Analysiere jeden YouTube-Kanal kostenlos: Abonnenten, Aufrufe pro Video, Upload-Rhythmus, Top-Videos und ein teilbarer Report. Ohne Anmeldung.",
    heading: "Kanal-Analyse",
    highlight: "Kanal-Analyse",
    intro: "Füge einen Kanal ein und erhalte Statistiken, Upload-Rhythmus und Top-Videos — mit einem Link, den du teilen kannst.",
    howTo: [
      "Füge einen Kanal-Link, @Handle oder ein beliebiges Video des Kanals ein.",
      "Wir laden die öffentlichen Statistiken über die offizielle YouTube-API.",
      "Lies den Report — und teile ihn über den Link mit wem du willst.",
    ],
    meaning: [
      "Der Report zeigt echte YouTube-Daten (Abonnenten, Aufrufe, Videoanzahl, Alter des Kanals) neben channelpeeker-Einordnungen wie Upload-Frequenz und Top-Videos der letzten Uploads. Alles, was wir berechnen, ist als Schätzung gekennzeichnet.",
      "Beachte: YouTube rundet öffentliche Abonnentenzahlen auf drei signifikante Stellen — deshalb das ≈-Zeichen. Aufrufzahlen sind exakt.",
    ],
    faq: [
      {
        q: "Wie analysiere ich einen fremden YouTube-Kanal?",
        a: "Kanal-Link oder @Handle oben einfügen. Alle öffentlichen Statistiken kommen direkt aus der offiziellen YouTube-API — ohne Login, ohne Extension.",
      },
      {
        q: "Sind die Abonnentenzahlen exakt?",
        a: "YouTube rundet öffentliche Abonnentenzahlen (123.456 wird als 123.000 angezeigt). Wir kennzeichnen sie mit ≈. Aufrufe sind exakt.",
      },
      {
        q: "Kann ich den Report teilen?",
        a: "Ja — jeder Report hat einen eigenen Link, den du in Communities, an Sponsoren oder dein Team schicken kannst.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/watch-time-calculator": {
    title: "YouTube Watchtime-Rechner",
    description:
      "Rechne Aufrufe und durchschnittliche Wiedergabedauer in Watchtime-Stunden um — und sieh, wie viele Aufrufe dir zu 4.000 Stunden fehlen.",
    heading: "Watchtime-Rechner",
    highlight: "Watchtime-Rechner",
    intro: "Verwandle Aufrufe und Wiedergabedauer in Watchtime-Stunden — und sieh genau, wie weit du von den 4.000 Stunden entfernt bist.",
    howTo: [
      "Gib eine Aufrufzahl ein — von einem Video oder deinem Kanal.",
      "Trage die durchschnittliche Wiedergabedauer aus YouTube Studio ein (Analytics → Interaktion).",
      "Lies die Watchtime-Stunden ab — und wie viele Aufrufe du für 4.000 Stunden brauchst.",
    ],
    meaning: [
      "Watchtime ist schlicht Aufrufe × durchschnittliche Wiedergabedauer. Das YouTube-Partnerprogramm verlangt 4.000 öffentliche Watchtime-Stunden in den letzten 365 Tagen (plus 1.000 Abonnenten) — dieser Rechner übersetzt deine Zahlen in genau diese Anforderung.",
      "Es zählt nur öffentliche Long-Form-Watchtime: Shorts-Feed-Zeit, private und gelöschte Videos zählen nicht. Shorts haben einen eigenen Weg (10 Mio. Aufrufe in 90 Tagen). Die Rechnung hier ist exakt; welche Stunden YouTube zählt, fassen wir aus den offiziellen Regeln zusammen.",
    ],
    faq: [
      {
        q: "Wie wird YouTube-Watchtime berechnet?",
        a: "Aufrufe mal durchschnittliche Wiedergabedauer. 100.000 Aufrufe bei Ø 3:30 ergeben 350.000 Minuten — etwa 5.833 Stunden.",
      },
      {
        q: "Wie viele Aufrufe brauche ich für 4.000 Stunden?",
        a: "Kommt auf die Wiedergabedauer an: bei Ø 2 Minuten rund 120.000 Aufrufe, bei Ø 5 Minuten rund 48.000. Gib oben deinen eigenen Durchschnitt ein.",
      },
      {
        q: "Zählen Shorts zur 4.000-Stunden-Anforderung?",
        a: "Nein — Watchtime aus dem Shorts-Feed zählt nicht. Shorts haben einen eigenen Monetarisierungsweg: 10 Mio. öffentliche Shorts-Aufrufe in 90 Tagen.",
      },
    ],
    dataBadge: "Nachvollziehbare Rechnung",
    updated: UPDATED,
  },
  "/video-upload-date-checker": {
    title: "YouTube Upload-Datum herausfinden",
    description:
      "Finde Datum und Uhrzeit heraus, zu der ein YouTube-Video veröffentlicht wurde — minutengenau, in deiner Zeitzone und UTC. Kostenlos, offizielle Daten.",
    heading: "Upload-Datum-Checker",
    highlight: "Upload-Datum-Checker",
    intro: "YouTube zeigt „vor 2 Jahren“ — hier siehst du das exakte Veröffentlichungsdatum samt Uhrzeit, auf die Minute genau.",
    howTo: [
      "Füge einen Video- oder Shorts-Link ein.",
      "Wir lesen den exakten Zeitstempel aus der offiziellen YouTube-API.",
      "Kopiere das Ergebnis — in deiner Zeitzone und in UTC.",
    ],
    meaning: [
      "Die Watch-Seite rundet Daten zu „vor X Jahren“, aber die API speichert den exakten Veröffentlichungs-Zeitstempel — den Moment, in dem das Video öffentlich wurde. Wir zeigen ihn in deiner lokalen Zeitzone und in UTC, plus das präzise Alter.",
      "Exakte Daten sind wichtig für Zitate, Faktenchecks („welches Video war zuerst?“), Urheberrechtsfragen und Recherche. Hinweis: Bei Premieren und ehemals privaten Videos ist der Zeitstempel der Moment der Veröffentlichung, nicht des Datei-Uploads.",
    ],
    faq: [
      {
        q: "Wie sehe ich das genaue Upload-Datum eines YouTube-Videos?",
        a: "Link hier einfügen. YouTube selbst zeigt nur relative Daten; die API liefert den exakten Zeitstempel, den wir minutengenau anzeigen.",
      },
      {
        q: "Ist das die Upload- oder die Veröffentlichungszeit?",
        a: "Die Veröffentlichungszeit — der Moment, in dem das Video öffentlich wurde. Bei Premieren kann das vom Datei-Upload abweichen.",
      },
      {
        q: "Welche Zeitzone wird verwendet?",
        a: "Beide: die Zeitzone deines Browsers und UTC — damit Zitate eindeutig sind.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
};
