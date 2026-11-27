import type { LocalizedToolContent } from "@/lib/i18n";

const UPDATED = "22. November 2026";
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
      "Klicke auf „Gewinner ziehen“ — nimm den Bildschirm auf, um die Auslosung transparent zu zeigen.",
    ],
    meaning: [
      "Kommentar-Gewinnspiele belohnen dein echtes Publikum, aber per Scrollen zu wählen ist weder zufällig noch beweisbar. Dieses Tool lädt die Kommentare über die offizielle YouTube-API und lost die Gewinner mit kryptografischer Zufälligkeit direkt in deinem Browser aus — wir könnten niemanden bevorzugen, selbst wenn wir wollten.",
      "Ehrliche Grenzen: Die Auslosung erfolgt aus den neuesten 500 Top-Level-Kommentaren (Antworten zählen nicht als eigene Lose), und kein Tool der Welt kann prüfen, wer ein Kanal-Abo hat — YouTube gibt das nicht frei. Prüfe Abo-Bedingungen also manuell vor der Verkündung.",
      "Meldet sich ein Gewinner nicht? Dann ziehst du mit „Noch einmal auslosen“ einfach nach, ohne die Kommentare neu zu laden. Willst du Kommentare nur lesen oder gezielt durchsuchen statt auslosen, ist unsere Kommentarsuche das passende Werkzeug.",
    ],
    faq: [
      {
        q: "Wie lose ich einen Gewinner aus YouTube-Kommentaren aus?",
        a: "Video-Link oben einfügen, Filter setzen, „Gewinner ziehen“ klicken. Die Auslosung nutzt den kryptografischen Zufallsgenerator deines Browsers über die geladenen Kommentare.",
      },
      {
        q: "Ist die Auslosung wirklich zufällig?",
        a: "Ja — wir nutzen crypto.getRandomValues (die sichere Zufallsquelle des Browsers) mit verzerrungsfreier Auswahl, direkt auf deinem Gerät. Nimm die Auslosung auf, wenn du einen sichtbaren Beweis für dein Publikum möchtest.",
      },
      {
        q: "Kann das Tool prüfen, ob der Gewinner abonniert hat?",
        a: "Nein — kein Tool kann das. YouTube legt Abos nicht öffentlich offen. Prüfe Abo-Bedingungen manuell, bevor du den Gewinner verkündest.",
      },
      {
        q: "Wie viele Kommentare werden geladen?",
        a: "Bis zu 500 der neuesten Top-Level-Kommentare. Bei großen Gewinnspielen hilft ein Pflicht-Stichwort, damit alle echten Teilnahmen in der Auswahl landen – oder du lost kurz nach Teilnahmeschluss aus.",
      },
      {
        q: "Kann ich mehrere Gewinner ziehen?",
        a: "Ja, bis zu fünf auf einmal und ohne doppelte Gewinner. Dazu bekommst du einen fertigen Ankündigungstext zum Kopieren.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/comment-finder": {
    title: "YouTube Kommentar-Suche",
    description:
      "Durchsuche die Kommentare jedes YouTube-Videos nach Wort, Name oder Satz. Nach Top oder Neueste sortieren, als CSV exportieren. Offizielle YouTube-Daten.",
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
      "Wir zeigen bis zu 100 Top-Level-Kommentar-Threads pro Suche. Ohne Suchbegriff nutzt „Top-Kommentare“ YouTubes eigenes Ranking; mit Suchbegriff sortieren wir die Treffer nach Likes. „Neueste zuerst“ ist in beiden Fällen streng chronologisch.",
      "Antwort-Threads zählen wir mit, klappen sie aber nicht auf. Welche Kommentare zu deinem Suchbegriff passen, entscheidet YouTube selbst – findest du nichts, lohnt sich oft eine andere Schreibweise oder ein kürzeres Stichwort.",
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
      {
        q: "Warum sehe ich höchstens 100 Kommentare?",
        a: "Pro Suche laden wir eine Seite mit bis zu 100 Top-Level-Threads. Bei Videos mit vielen Kommentaren hilft es, den Suchbegriff enger zu fassen.",
      },
      {
        q: "Warum heißt es, die Kommentare seien deaktiviert?",
        a: "Hat der Creator die Kommentare abgeschaltet oder ist das Video als „speziell für Kinder“ eingestuft, liefert die YouTube-API keine Kommentardaten. Das sagen wir dann auch so, statt etwas zu erfinden.",
      },
      {
        q: "Wie finde ich alle meine alten YouTube-Kommentare?",
        a: "Dafür ist dieses Tool nicht gedacht, es durchsucht immer ein einzelnes Video. Eine Übersicht über alles, was du kommentiert hast, findest du bei Google unter „Meine Aktivitäten“ → YouTube-Kommentare. Weißt du noch, unter welchem Video es war, bist du hier schneller.",
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
      "Welche Größen wir anzeigen, hängt vom Video ab – wir listen nur, was es wirklich gibt. Seit 2026 liefert YouTube für manche Videos zusätzlich 1080p, 1440p und 4K. Die meisten Creator laden ihr Thumbnail in HD hoch, das ist die Version „Max. Auflösung“ mit 1280×720; bei älteren oder niedrig aufgelösten Uploads fehlt sie. Dazu kommen kleinere Kopien, die YouTube in Feed, Suche und Einbettungen verwendet.",
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
      {
        q: "Warum gibt es kein Thumbnail in HD?",
        a: "Die 1280×720-Version erzeugt YouTube nur, wenn Video oder eigenes Thumbnail in HD hochgeladen wurden. Ältere und niedrig aufgelöste Uploads haben nur die kleineren Größen.",
      },
      {
        q: "Kann ich YouTube-Thumbnails in 4K herunterladen?",
        a: "Ja, sofern YouTube eins hat. Seit 2026 gibt es für manche Videos Thumbnails in 1080p, 1440p und 4K – wir zeigen sie automatisch an, wenn sie existieren.",
      },
      {
        q: "Klappt das auch mit Shorts?",
        a: "Ja. Füg einen youtube.com/shorts/-Link ein, und du bekommst das Thumbnail des Shorts in allen verfügbaren Größen.",
      },
      {
        q: "Geht das auch für viele Videos auf einmal?",
        a: "Ja: Im Modus „Mehrere“ fügst du bis zu 20 Links ein und exportierst alle Bild-Links als CSV.",
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
      {
        q: "Ist das legal?",
        a: "Die Bild-URLs sind öffentlich, YouTube liefert sie jedem Besucher aus. Das Motiv bleibt aber Eigentum des Creators: Nutze die Downloads als Referenz oder Archiv, nicht als dein eigenes Branding.",
      },
      {
        q: "Kann ich auch das Profilbild eines Kanals herunterladen?",
        a: "Ja, dafür gibt es unseren Profilbild-Downloader. Er liefert das Kanalbild in voller Auflösung bis 800 px.",
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
      "Grundlage sind die 50 neuesten öffentlichen Uploads. „Uploads (90 Tage)“ zählt, wie viele davon in den letzten drei Monaten erschienen sind – ein schneller Hinweis darauf, ob der Kanal aktiv ist. Das Diagramm „Aufrufe pro Upload“ zeigt die Videos in Reihenfolge, sodass Ausreißer nach oben und Durststrecken sofort auffallen.",
      "Beachte: YouTube rundet öffentliche Abonnentenzahlen auf drei signifikante Stellen — deshalb das ≈-Zeichen. Aufrufzahlen sind exakt.",
      "Watchtime, Impressionen und Klickrate sind privat und nur für den Kanalinhaber sichtbar. Kein externes Tool kann sie für fremde Kanäle anzeigen – auch wenn manche das behaupten.",
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
      {
        q: "Ist die Kanal-Analyse kostenlos?",
        a: "Ja. Ohne Konto, ohne Browser-Erweiterung – gelesen werden nur öffentliche Daten über die offizielle YouTube Data API.",
      },
      {
        q: "Wie viele Videos werden ausgewertet?",
        a: "Die 50 neuesten öffentlichen Uploads. Das reicht, um aktuellen Rhythmus und Leistung zu zeigen, ohne die komplette Kanalgeschichte durchzugehen.",
      },
      {
        q: "Warum zeigt ihr keine Watchtime oder Klickrate?",
        a: "Weil YouTube diese Werte nur dem Kanalinhaber zeigt. Tools, die sie für fremde Kanäle ausgeben, raten.",
      },
      {
        q: "Sind die Zahlen live?",
        a: "Fast. Ergebnisse werden kurz zwischengespeichert, damit es schnell bleibt und das API-Kontingent reicht. Jeder Report zeigt genau, wann die Daten abgerufen wurden.",
      },
    ],
    dataBadge: API_BADGE,
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
      {
        q: "Wie finde ich heraus, wann ein YouTube-Kanal erstellt wurde?",
        a: "Das zeigt dieses Tool nicht, denn es arbeitet mit einzelnen Videos. Für das Erstellungsdatum eines Kanals gibt es unseren Kanalalter-Check – einfach Handle oder Kanal-Link einfügen.",
      },
      {
        q: "Ist das Tool kostenlos?",
        a: "Ja: kostenlos, ohne Anmeldung und mit offiziellen YouTube-Daten.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
};
