import type { LocalizedPageContent } from "@/lib/localized-page";

const CHECKER = "/de/monetization-checker";
const ESTIMATOR = "/revenue-calculator/channel-earnings-estimator"; // English only
const YPP_CHANGES = "https://support.google.com/youtube/answer/12843009?hl=de";

const n = (x: number) => x.toLocaleString("de");
const views = (hours: number, sec: number) => n(Math.ceil((hours * 3600) / sec));
const DURATIONS: [string, number][] = [
  ["2 Minuten", 120],
  ["3 Minuten 30 Sekunden", 210],
  ["5 Minuten", 300],
  ["8 Minuten", 480],
  ["10 Minuten", 600],
];

export const content: LocalizedPageContent = {
  title: "YouTube-Wiedergabezeit-Rechner: 4.000 und 8.000 Stunden",
  description:
    "Rechne Aufrufe und Wiedergabedauer in Stunden um, verfolge deinen Fortschritt bis 4.000 Stunden (8.000 ab Februar 2027) und sieh, wann du dort ankommst. Kostenlos, ohne Anmeldung.",
  heading: "YouTube-Wiedergabezeit-Rechner",
  highlight: "Wiedergabezeit-Rechner",
  intro:
    "Finde heraus, wie viele Stunden Wiedergabezeit deine Videos schon gesammelt haben und wie weit du von den 4.000 Stunden entfernt bist, die YouTube verlangt, bevor es dich an der Werbung beteiligt. Gib deine Aufrufe und die durchschnittliche Wiedergabedauer ein. Mehr braucht es nicht.",
  updated: "27. November 2026",
  dataBadge: "Rechenweg offen, nichts erfunden",
  afterTool: [
    {
      p: "YouTube Studio zeigt dir deine Wiedergabezeit, sagt dir aber nicht, was du damit anfangen sollst. Reichen 30.000 Aufrufe? Kämst du mit längeren Videos schneller ans Ziel? Dieser Rechner nimmt dir die Mathematik ab. Er macht aus Aufrufen und durchschnittlicher Wiedergabedauer Stunden und zeigt, wie viele Aufrufe du bei gleicher Dauer noch bräuchtest, um die Grenze zu knacken.",
    },
  ],
  howTo: [
    "Gib deine Aufrufe ein. Nimm die Zahl für ein einzelnes Video oder die Summe deines Kanals aus den letzten 12 Monaten, wenn du deinen Fortschritt Richtung Monetarisierung prüfen willst.",
    "Gib die durchschnittliche Wiedergabedauer ein. Öffne YouTube Studio, gehe zu Analytics und dann zum Tab „Interaktion“. Dort steht sie in Minuten und Sekunden, zum Beispiel 4:12.",
    "Lies das Ergebnis. Du bekommst deine gesamte Wiedergabezeit in Stunden und Minuten, ob du die 4.000 Stunden schon geschafft hast und wie viele Aufrufe du bei gleicher Durchschnittsdauer noch bräuchtest.",
  ],
  howToTip: "Wenn du deinen Fortschritt Richtung Monetarisierung prüfen willst, stell den Zeitraum in Studio auf die letzten 365 Tage, bevor du die Zahlen übernimmst. Diesen Zeitraum sieht sich YouTube an.",
  before: [
    {
      eyebrow: "In YouTube Studio",
      title: "So findest du deine Wiedergabezeit in YouTube Studio",
      blocks: [
        { p: "Es gibt zwei Stellen, und sie beantworten unterschiedliche Fragen." },
        {
          ol: [
            `Für deinen Fortschritt bei der Monetarisierung öffnest du YouTube Studio und klickst auf „Einnahmen“. Dort steht deine öffentliche Wiedergabezeit der letzten 12 Monate, also die Zahl, die YouTube für das [Partnerprogramm](${CHECKER}) tatsächlich zählt. Diese Zahl gehört in den Tab „Fortschritt verfolgen“.`,
            "Für dein aktuelles Tempo öffnest du Analytics, stellst den Zeitraum auf die letzten 28 Tage und notierst deine Wiedergabezeit in Stunden. Trag sie ins Feld „letzte 28 Tage“ ein, und der Rechner ermittelt, wann du dein Ziel erreichst.",
          ],
        },
        {
          p: "Die beiden Zahlen stimmen nicht immer überein. Analytics zählt alles, auch Aufrufe im Shorts-Feed und Videos, die du später auf privat gestellt hast. „Einnahmen“ zählt nur, was gültig ist.",
        },
      ],
    },
    {
      eyebrow: "Die Rechnung",
      title: "Die Formel für die Wiedergabezeit",
      blocks: [
        { formula: "Stunden Wiedergabezeit = Aufrufe × durchschnittliche Wiedergabedauer (in Minuten) ÷ 60" },
        { p: "Ein paar Rechenbeispiele:" },
        {
          ul: [
            "10.000 Aufrufe mit durchschnittlich 4 Minuten = 40.000 Minuten = etwa 667 Stunden.",
            "50.000 Aufrufe mit 3 Minuten 30 Sekunden = 175.000 Minuten = etwa 2.917 Stunden.",
            "100.000 Aufrufe mit 2 Minuten = 200.000 Minuten = etwa 3.333 Stunden.",
          ],
        },
        {
          p: "Wenn du stattdessen Videolänge und Zuschauerbindung kennst, rechnest du zuerst die durchschnittliche Wiedergabedauer aus: Videolänge × Bindung in %. Ein 10-Minuten-Video mit 40 % Bindung ergibt eine durchschnittliche Wiedergabedauer von 4 Minuten.",
        },
        { h3: "Wie viele Stunden Wiedergabezeit bringen Aufrufe?" },
        { p: "Bei einer durchschnittlichen Wiedergabedauer von 4 Minuten:" },
        {
          table: {
            head: ["Aufrufe", "Stunden Wiedergabezeit"],
            rows: [100, 1000, 10_000, 100_000, 1_000_000].map((v) => [n(v), `etwa ${n(Math.round((v * 4) / 60))}`]),
          },
        },
        { p: "Für deine eigenen Zahlen nutzt du den Rechner oben." },
      ],
    },
    {
      eyebrow: "Dein Datum",
      title: "Fortschritt verfolgen und dein Datum sehen",
      blocks: [
        {
          p: "Deine Summe zu kennen ist nützlich. Zu wissen, wann du ankommst, ist besser. Gib im Tab „Fortschritt verfolgen“ deine Wiedergabezeit der letzten 12 Monate und die der letzten 28 Tage ein. Der Rechner ermittelt dein Tagestempo, wie viele Stunden dir noch fehlen und ungefähr wann du bei diesem Tempo die 4.000 (oder 8.000) überschreitest. Er zeigt auch, wie viele Stunden pro Tag du bräuchtest, um es in 90 Tagen zu schaffen. Ein gutes Ziel, wenn du Tempo machen willst.",
        },
        {
          p: "Sieh das Datum als grobe Orientierung. Der 12-Monats-Zeitraum wandert ständig weiter, also fallen Stunden von vor einem Jahr heraus, während neue dazukommen.",
        },
      ],
    },
    {
      eyebrow: "Das Ergebnis",
      title: "Was du im Ergebnis siehst",
      blocks: [
        {
          p: "Der Rechner hat drei Tabs. Jeder hat einen Button „Beispiel ausprobieren“, und das sind die Ergebnisse dieser Beispiele (das Datum stammt vom 27. November 2026):",
        },
        {
          ul: [
            "**Aufrufe in Stunden:** 42.000 Aufrufe bei 5:20 durchschnittlicher Wiedergabedauer ergeben 3.733 Stunden oder 224.000 Minuten, das sind 93,3 % von 4.000. Dafür fehlen 3.000 weitere Aufrufe (45.000 insgesamt) bei dieser Dauer für 4.000 Stunden. Insgesamt braucht es für 3.000 Stunden 33.750 Aufrufe und für 8.000 Stunden 90.000. Mit einer Videolänge von 12:00 liegt der durchschnittlich angesehene Anteil bei 44,4 %. Verteilt auf 20 Videos sind das 1.688, 2.250 und 4.500 Aufrufe pro Video.",
            "**Fortschritt verfolgen:** 2.850 Stunden Wiedergabezeit in den letzten 12 Monaten sind 71,3 % von 4.000, es fehlen noch 1.150 Stunden, und es sind 740 von 1.000 Abonnenten. Um es in 90 Tagen zu schaffen, braucht es etwa 12,8 Stunden pro Tag. Mit 310 Stunden in den letzten 28 Tagen liegt das Tempo bei etwa 11,1 Stunden pro Tag, damit erreichst du 4.000 ungefähr am 11. März 2027. Weil das nach dem 1. Februar 2027 liegt, weist ein Hinweis darauf hin, dass neue Bewerber dann 8.000 Stunden brauchen, mit einem Button, der das Ziel auf 8.000 umstellt. Würde ein Tempo nie reichen, weil sich die 12-Monats-Summe unter dem Ziel einpendelt, sagt der Rechner das, statt ein Datum zu zeigen.",
            "**Länge × Bindung:** Ein 14:00-Video mit 38 % durchschnittlicher Bindung hat eine durchschnittliche Wiedergabedauer von 5:19. 60.000 Aufrufe bei dieser Dauer ergeben 5.320 Stunden Wiedergabezeit. Für 3.000, 4.000 und 8.000 Stunden bräuchtest du 33.835, 45.113 und 90.226 Aufrufe, also 1.354, 1.805 und 3.610 pro Video bei 25 Videos.",
            "**In jedem Tab:** Ergebnis kopieren (eine Zusammenfassung als Text), Link kopieren (ein Link, der dieselben Zahlen einträgt), Leeren und ein Link zum Einnahmenrechner. Alles wird in deinem Browser berechnet. Gespeichert wird nur, welchen Tab du zuletzt benutzt hast.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "Was dein Ergebnis zur Wiedergabezeit bedeutet",
    blocks: [
      {
        p: "Wiedergabezeit ist einfach: **Aufrufe × durchschnittliche Wiedergabedauer**. Hat ein Video 100.000 Aufrufe und schauen die Leute im Schnitt 3 Minuten 30 Sekunden zu, sind das 350.000 Minuten oder etwa 5.833 Stunden.",
      },
      {
        p: "Die Zahl, auf die es YouTube ankommt, ist 4.000. Für einen Anteil an den Werbeeinnahmen brauchst du 1.000 Abonnenten und 4.000 Stunden öffentliche Wiedergabezeit auf langen Videos in den letzten 365 Tagen. In einigen Ländern gibt es außerdem eine frühere Stufe: 500 Abonnenten, 3 öffentliche Uploads in den letzten 90 Tagen und 3.000 Stunden Wiedergabezeit. Diese Stufe schaltet Fan-Funding wie Kanalmitgliedschaften und Super Thanks frei, aber keine Werbeeinnahmen.",
      },
      { h3: "Ab dem 1. Februar 2027: 8.000 Stunden für neue Kanäle" },
      {
        p: `Ab dem [1. Februar 2027](${YPP_CHANGES}) brauchen Kanäle, die sich für Werbeeinnahmen bewerben, 8.000 Stunden Wiedergabezeit in den letzten 365 Tagen oder 20 Millionen gültige Shorts-Aufrufe in 90 Tagen, dazu 1.000 Abonnenten. Das ist doppelt so viel wie heute. Kanäle, die schon im Partnerprogramm sind, betrifft das nicht, und die Stufe Fan-Funding mit 3.000 Stunden bleibt gleich. Wenn du dich erst nach dem 1. Februar bewerben willst, plane mit 8.000. Das sind etwa 22 Stunden Wiedergabezeit pro Tag.`,
      },
      { h3: "Wie viele Aufrufe du für 4.000 Stunden brauchst" },
      { p: "Die durchschnittliche Wiedergabedauer macht einen riesigen Unterschied. So viele Aufrufe braucht es bei unterschiedlicher Dauer:" },
      {
        table: {
          head: ["Durchschnittliche Wiedergabedauer", "Aufrufe für 3.000 Stunden", "Aufrufe für 4.000 Stunden", "Aufrufe für 8.000 Stunden"],
          rows: DURATIONS.map(([label, sec]) => [label, views(3000, sec), views(4000, sec), views(8000, sec)]),
        },
      },
      {
        p: "Öffentliche Wiedergabezeit heißt: Wiedergabezeit auf langen Videos, die auf „Öffentlich“ gestellt sind. Aufrufe im Shorts-Feed sowie private, nicht gelistete und gelöschte Videos zählen nicht.",
      },
      {
        p: "Wer von 2 auf 8 Minuten Durchschnitt kommt, braucht drei Viertel weniger Aufrufe. Deshalb ist es oft wichtiger, die Leute am Zuschauen zu halten, als mehr Klicks zu bekommen.",
      },
      { h3: "Was nicht zu den 4.000 Stunden zählt" },
      {
        ul: [
          "Wiedergabezeit von Shorts im Shorts-Feed",
          "Private, nicht gelistete oder gelöschte Videos",
          "Videos, die als Werbung laufen",
          "Livestreams, sobald sie auf privat gestellt oder gelöscht wurden",
        ],
      },
      { p: "Für Shorts-Creator gibt es stattdessen einen eigenen Weg: 10 Millionen gültige Shorts-Aufrufe in den letzten 90 Tagen (oder 3 Millionen für die frühere Stufe)." },
      { h3: "Aufs Jahr verteilt sind 4.000 Stunden etwa 11 Stunden am Tag" },
      {
        p: "Der 365-Tage-Zeitraum ist rollierend. Wiedergabezeit von vor 13 Monaten fällt heraus, während neue dazukommt. Damit entsprechen 4.000 Stunden etwa 11 Stunden Wiedergabezeit pro Tag, über den ganzen Kanal gerechnet. Liegt dein Tageswert in Studio deutlich darunter, weißt du: Du brauchst mehr Aufrufe, längeres Zuschauen oder beides.",
      },
    ],
  },
  after: [
    {
      eyebrow: "Mehr Wiedergabezeit",
      title: "So kommst du schneller auf 4.000 Stunden Wiedergabezeit",
      blocks: [
        { p: "Die Zahlen vom letzten Jahr kannst du nicht ändern, aber das, was als Nächstes passiert. Diese Dinge bewegen die Wiedergabezeit am stärksten:" },
        {
          ul: [
            "**Optimiere die ersten 30 Sekunden.** Die meisten Zuschauer steigen früh aus. Fang mit dem an, was das Video liefert, nicht mit einem langen Intro oder einem Kanal-Hinweis. Im Diagramm zur Zuschauerbindung in Studio siehst du genau, wo die Leute abspringen.",
            "**Mach auch längere Videos.** Ein 12-Minuten-Video, das die Leute 6 Minuten hält, bringt dreimal so viel Wiedergabezeit wie ein 4-Minuten-Video, das 2 Minuten geschaut wird. Tutorials, Tests und Schritt-für-Schritt-Anleitungen passen gut zu längeren Formaten.",
            "**Schick Zuschauer zum nächsten Video.** Nutze Abspanne, Infokarten und Playlists, damit aus einem Aufruf zwei oder drei werden. Serien funktionieren hier besonders gut.",
            "**Geh live.** Livestreams bringen oft lange Sitzungen, und sie zählen, solange die Aufzeichnung öffentlich bleibt.",
            "**Nutze Shorts als Türöffner.** Wiedergabezeit aus dem Shorts-Feed zählt nicht, aber ein Short kann neue Zuschauer zu einem langen Video bringen, das zählt.",
            "**Lass alte Videos öffentlich.** Wer ein Video löscht oder auf privat stellt, verliert dessen Wiedergabezeit aus der Summe. Überarbeite oder aktualisiere ein altes Video lieber, statt es offline zu nehmen.",
            "**Mach zeitlose Videos.** Tutorials und Erklärvideos werden jahrelang gefunden und sammeln Wiedergabezeit, lange nachdem du sie veröffentlicht hast.",
            "**Lade regelmäßig hoch.** Ein fester Rhythmus gibt YouTube mehr Gelegenheiten, dich zu empfehlen, und deinem Publikum einen Grund wiederzukommen.",
            "**Arbeite an Titeln und Thumbnails.** Eine bessere Klickrate heißt, dass mehr Leute anfangen zuzuschauen, und jeder zusätzliche Aufruf bringt Stunden.",
          ],
        },
        { p: `Wenn du nah dran bist, prüfe mit dem [Monetarisierungs-Check](${CHECKER}), welche öffentlichen Voraussetzungen dein Kanal schon erfüllt.` },
      ],
    },
    {
      eyebrow: "Sinkende Summe",
      title: "Warum deine Wiedergabezeit gesunken ist",
      blocks: [
        { p: "Es ist normal, dass deine Summe sinkt, auch wenn du hochlädst. Die üblichen Gründe:" },
        {
          ul: [
            "**Der 12-Monats-Zeitraum ist weitergewandert.** Stunden, die älter als ein Jahr sind, zählen nicht mehr. Ein starker Monat im letzten Jahr fällt dieses Jahr also heraus.",
            "**Du hast ein Video auf privat oder nicht gelistet gestellt oder gelöscht.** Seine Wiedergabezeit verschwindet sofort aus deiner Summe.",
            "**Deine Aufrufe sind langsamer geworden.** Wenn du Stunden langsamer sammelst, als alte herausfallen, sinkt die Summe.",
            "**Studio hinkt hinterher.** Der Wert unter „Einnahmen“ kann ein, zwei Tage hinter Analytics liegen.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Wie berechnet YouTube die Wiedergabezeit?",
      a: "Multipliziere die Aufrufe mit der durchschnittlichen Wiedergabedauer. 50.000 Aufrufe mit durchschnittlich 4 Minuten sind 200.000 Minuten, also etwa 3.333 Stunden. YouTube Studio rechnet das für dich zusammen, aber mit dem Rechner kannst du schon vor dem Hochladen durchspielen, was wäre, wenn.",
    },
    {
      q: "Wie viele Aufrufe brauche ich für 4.000 Stunden Wiedergabezeit?",
      a: "Das hängt davon ab, wie lange die Leute zuschauen. Bei 2 Minuten im Schnitt bräuchtest du 120.000 Aufrufe. Bei 5 Minuten sind es 48.000 und bei 10 Minuten nur 24.000. Gib oben deinen Durchschnitt ein, um deine genaue Zahl zu sehen.",
    },
    {
      q: "Ändert sich die 4.000-Stunden-Grenze?",
      a: "Ja, für neue Kanäle. Ab dem 1. Februar 2027 brauchen neue Bewerber 8.000 Stunden Wiedergabezeit in den letzten 365 Tagen (oder 20 Millionen gültige Shorts-Aufrufe in 90 Tagen) und 1.000 Abonnenten. Bist du schon monetarisiert, ändert sich für dich nichts.",
    },
    {
      q: "Wo finde ich meine durchschnittliche Wiedergabedauer?",
      a: "Öffne in YouTube Studio Analytics und gehe zum Tab „Interaktion“. Für ein einzelnes Video öffnest du stattdessen die Analytics dieses Videos. Stell den Zeitraum auf die letzten 365 Tage, wenn du die Monetarisierung im Blick hast.",
    },
    {
      q: "Zählen Shorts-Aufrufe zu den 4.000 Stunden Wiedergabezeit?",
      a: "Nein. Wiedergabezeit aus dem Shorts-Feed zählt nicht. Shorts haben einen eigenen Weg: 10 Millionen gültige Shorts-Aufrufe in 90 Tagen plus 1.000 Abonnenten.",
    },
    {
      q: "Zählen Livestreams zur Wiedergabezeit?",
      a: "Ja, solange der Stream öffentlich ist und die Aufzeichnung öffentlich bleibt. Stellst du sie später auf privat oder löschst sie, fallen diese Stunden aus deiner Summe.",
    },
    {
      q: "Verfällt Wiedergabezeit?",
      a: "Ja. YouTube zählt nur die letzten 365 Tage, und der Zeitraum verschiebt sich jeden Tag. Stunden von einem Video, das vor 14 Monaten viral ging, zählen nicht mehr, auch wenn die Aufrufe noch am Video stehen.",
    },
    {
      q: "Ich habe 4.000 Stunden. Warum bin ich noch nicht monetarisiert?",
      a: "Wer die Zahlen erreicht, ist nur berechtigt. Du brauchst außerdem 1.000 Abonnenten, musst dich dann in YouTube Studio unter „Einnahmen“ bewerben und ein AdSense für YouTube-Konto verknüpfen. YouTube prüft deinen Kanal anhand seiner Monetarisierungsrichtlinien, bevor es ihn freigibt.",
    },
    {
      q: "Kann ich Wiedergabezeit kaufen?",
      a: "Lass es. Gekaufte Aufrufe und Wiedergabezeit verstoßen gegen die Regeln von YouTube. Sie werden meist herausgefiltert und können dazu führen, dass deine Bewerbung abgelehnt oder dein Kanal entfernt wird.",
    },
    {
      q: "Wie viele Minuten sind 4.000 Stunden Wiedergabezeit?",
      a: "240.000 Minuten. 8.000 Stunden, das Ziel für neue Bewerber ab dem 1. Februar 2027, sind 480.000 Minuten, und das Ziel von 3.000 Stunden für Fan-Funding sind 180.000 Minuten.",
    },
    {
      q: "Wie viele Stunden Wiedergabezeit bringen 1.000 Aufrufe?",
      a: "Das hängt davon ab, wie lange die Leute zuschauen. Bei 4 Minuten im Schnitt bringen 1.000 Aufrufe etwa 67 Stunden. Bei 10 Minuten etwa 167 Stunden. Gib deine eigenen Zahlen oben in den Rechner ein.",
    },
    {
      q: "Müssen die 4.000 Stunden von einem einzigen Video kommen?",
      a: "Nein. YouTube zählt die öffentliche Wiedergabezeit aller deiner langen Videos aus den letzten 12 Monaten zusammen. Viele kleine Videos zählen genauso viel wie ein großes.",
    },
    {
      q: "Was passiert, wenn ich 4.000 Stunden Wiedergabezeit erreiche?",
      a: "Du brauchst außerdem 1.000 Abonnenten. Hast du beides, bewirbst du dich in YouTube Studio unter „Einnahmen“, akzeptierst die Bedingungen und verknüpfst ein AdSense für YouTube-Konto. Danach prüft YouTube deinen Kanal, was bis zu 30 Tage dauern kann.",
    },
    {
      q: "Zahlt YouTube pro Stunde Wiedergabezeit?",
      a: "Nein. YouTube zahlt nicht für Wiedergabezeit. Sobald du monetarisiert bist, bekommst du einen Anteil an den Werbeeinnahmen, der von den Aufrufen, deinem Thema und dem Wohnort deines Publikums abhängt. Unser Einnahmenrechner (auf Englisch) gibt dir eine grobe Spanne.",
      link: { text: "Einnahmenrechner", href: ESTIMATOR },
    },
    {
      q: "Sind 4.000 Stunden Wiedergabezeit schwer zu erreichen?",
      a: "Es ist ein echter Meilenstein. Aufs Jahr verteilt sind es etwa 11 Stunden Wiedergabezeit pro Tag, über den ganzen Kanal. Längere Videos, die die Aufmerksamkeit halten, kommen viel schneller ans Ziel als kurze. Deshalb ist die durchschnittliche Wiedergabedauer so wichtig.",
    },
    {
      q: "Welche Bindungsrate soll ich im Rechner verwenden?",
      a: "Nimm deine echten Zahlen aus YouTube Studio, wenn du welche hast. Wenn du gerade anfängst, probier ein paar Werte zwischen 30 % und 50 % aus, um eine Spanne zu sehen, und ersetze sie durch deinen echten Wert, sobald du ein paar Videos online hast.",
    },
    {
      q: "Ich bewerbe mich etwa im Januar 2027. Welche Regel gilt für mich?",
      a: "Die 8.000-Stunden-Regel gilt für neue Bewerber ab dem 1. Februar 2027. Die Ankündigung von YouTube sagt nicht, wie mit Bewerbungen umgegangen wird, die an diesem Tag noch geprüft werden. Wenn du 4.000 Stunden und 1.000 Abonnenten schon hast, ist es also sinnvoll, dich vorher zu bewerben und den Status unter „Einnahmen“ zu verfolgen.",
    },
    {
      q: "Ist dieser Rechner kostenlos?",
      a: "Ja. Ohne Anmeldung und ohne Nutzungslimit.",
    },
  ],
};
