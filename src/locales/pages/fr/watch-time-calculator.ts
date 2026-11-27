import type { LocalizedPageContent } from "@/lib/localized-page";

const CHECKER = "/fr/monetization-checker";
const ESTIMATOR = "/revenue-calculator/channel-earnings-estimator"; // English only
const YPP_CHANGES = "https://support.google.com/youtube/answer/12843009?hl=fr";

const n = (x: number) => x.toLocaleString("fr");
const views = (hours: number, sec: number) => n(Math.ceil((hours * 3600) / sec));
const DURATIONS: [string, number][] = [
  ["2 minutes", 120],
  ["3 minutes 30 secondes", 210],
  ["5 minutes", 300],
  ["8 minutes", 480],
  ["10 minutes", 600],
];

export const content: LocalizedPageContent = {
  title: "Calculateur de durée de visionnage YouTube : 4 000 et 8 000 heures",
  description:
    "Convertissez vues et durée de visionnage en heures, suivez votre progression vers 4 000 heures (8 000 à partir de février 2027) et voyez quand vous y arriverez. Gratuit, sans inscription.",
  heading: "Calculateur de durée de visionnage YouTube",
  highlight: "Calculateur de durée de visionnage",
  intro:
    "Découvrez combien d'heures de visionnage vos vidéos ont déjà cumulées et à quelle distance vous êtes des 4 000 heures que YouTube demande avant de vous verser une part des revenus publicitaires. Saisissez vos vues et votre durée moyenne de visionnage, c'est tout.",
  updated: "27 novembre 2026",
  dataBadge: "Calcul transparent, rien d'inventé",
  afterTool: [
    {
      p: "YouTube Studio affiche votre durée de visionnage, mais ne vous dit pas quoi en faire. 30 000 vues suffisent-elles ? Des vidéos plus longues vous y mèneraient-elles plus vite ? Ce calculateur fait le calcul pour vous. Il convertit les vues et la durée moyenne de visionnage en heures, puis indique combien de vues supplémentaires il vous faudrait, à durée égale, pour franchir la barre.",
    },
  ],
  howTo: [
    "Saisissez vos vues. Prenez le nombre de vues d'une seule vidéo, ou le total de votre chaîne sur les 12 derniers mois si vous voulez suivre votre progression vers la monétisation.",
    "Saisissez votre durée moyenne de visionnage. Ouvrez YouTube Studio, allez dans Statistiques, puis dans l'onglet Engagement. Elle y figure en minutes et secondes, par exemple 4:12.",
    "Lisez le résultat. Vous obtenez votre durée de visionnage totale en heures et en minutes, si vous avez dépassé les 4 000 heures et combien de vues il vous manquerait à durée moyenne égale.",
  ],
  howToTip: "Pour suivre votre progression vers la monétisation, réglez la période sur les 365 derniers jours dans Studio avant de recopier les chiffres. C'est la période que YouTube prend en compte.",
  before: [
    {
      eyebrow: "Dans YouTube Studio",
      title: "Comment voir vos heures de visionnage dans YouTube Studio",
      blocks: [
        { p: "Il y a deux endroits où regarder, et ils répondent à des questions différentes." },
        {
          ol: [
            `Pour votre progression vers la monétisation, ouvrez YouTube Studio et cliquez sur Revenus. Vous y voyez vos heures de visionnage publiques des 12 derniers mois, le chiffre que YouTube compte réellement pour le [Programme Partenaire](${CHECKER}). Utilisez-le dans l'onglet « Suivre ma progression ».`,
            "Pour votre rythme récent, ouvrez Statistiques, réglez la période sur les 28 derniers jours et notez votre durée de visionnage en heures. Saisissez-la dans le champ « 28 derniers jours », et le calculateur estime quand vous atteindrez votre objectif.",
          ],
        },
        {
          p: "Les deux chiffres ne concordent pas toujours. Statistiques compte tout, y compris les vues dans le flux Shorts et les vidéos que vous avez rendues privées depuis, alors que Revenus ne compte que ce qui est qualifié.",
        },
      ],
    },
    {
      eyebrow: "Le calcul",
      title: "La formule de la durée de visionnage",
      blocks: [
        { formula: "Heures de visionnage = vues × durée moyenne de visionnage (en minutes) ÷ 60" },
        { p: "Quelques exemples :" },
        {
          ul: [
            "10 000 vues avec une moyenne de 4 minutes = 40 000 minutes = environ 667 heures.",
            "50 000 vues à 3 minutes 30 secondes = 175 000 minutes = environ 2 917 heures.",
            "100 000 vues à 2 minutes = 200 000 minutes = environ 3 333 heures.",
          ],
        },
        {
          p: "Si vous connaissez plutôt la durée de la vidéo et la rétention, calculez d'abord la durée moyenne de visionnage : durée de la vidéo × rétention en %. Une vidéo de 10 minutes avec 40 % de rétention donne une durée moyenne de visionnage de 4 minutes.",
        },
        { h3: "Combien d'heures de visionnage rapportent les vues ?" },
        { p: "Avec une durée moyenne de visionnage de 4 minutes :" },
        {
          table: {
            head: ["Vues", "Heures de visionnage"],
            rows: [100, 1000, 10_000, 100_000, 1_000_000].map((v) => [n(v), `environ ${n(Math.round((v * 4) / 60))}`]),
          },
        },
        { p: "Pour vos propres chiffres, utilisez le calculateur ci-dessus." },
      ],
    },
    {
      eyebrow: "Votre date",
      title: "Suivez votre progression et voyez votre date",
      blocks: [
        {
          p: "Connaître votre total est utile. Savoir quand vous y arriverez, c'est mieux. Dans l'onglet « Suivre ma progression », saisissez vos heures de visionnage des 12 derniers mois et celles des 28 derniers jours. Le calculateur en déduit votre rythme quotidien, le nombre d'heures qu'il vous reste et, à peu près, quand vous franchirez les 4 000 (ou 8 000) à ce rythme. Il indique aussi combien d'heures par jour il faudrait pour y arriver en 90 jours, un objectif pratique si vous voulez accélérer.",
        },
        {
          p: "Prenez la date comme un repère approximatif. La période de 12 mois avance sans cesse : les heures gagnées il y a un an sortent du total à mesure que de nouvelles arrivent.",
        },
      ],
    },
    {
      eyebrow: "Le résultat",
      title: "Ce que vous verrez dans le résultat",
      blocks: [
        {
          p: "Le calculateur a trois onglets. Chacun a un bouton « Essayer un exemple », et voici les résultats de ces exemples (la date est celle du 27 novembre 2026) :",
        },
        {
          ul: [
            "**Vues en heures :** 42 000 vues avec une durée moyenne de visionnage de 5:20 donnent 3 733 heures, soit 224 000 minutes, ce qui représente 93,3 % de 4 000. Il faut 3 000 vues de plus (45 000 au total) à cette durée pour 4 000 heures. Au total, 3 000 heures demandent 33 750 vues et 8 000 heures, 90 000. Avec une durée de vidéo de 12:00, le pourcentage moyen regardé est de 44,4 %. Réparties sur 20 vidéos, cela fait 1 688, 2 250 et 4 500 vues par vidéo.",
            "**Suivre ma progression :** 2 850 heures de visionnage sur les 12 derniers mois représentent 71,3 % de 4 000, avec 1 150 heures restantes, et 740 abonnés sur 1 000. Pour y arriver en 90 jours, il faut environ 12,8 heures par jour. Avec 310 heures sur les 28 derniers jours, le rythme est d'environ 11,1 heures par jour, ce qui mène aux 4 000 vers le 11 mars 2027. Comme cette date tombe après le 1er février 2027, un avertissement rappelle que les nouveaux candidats auront alors besoin de 8 000 heures, avec un bouton qui passe l'objectif à 8 000. Si un rythme ne pouvait jamais y mener, parce que le total sur 12 mois se stabiliserait sous l'objectif, le calculateur le dit au lieu d'afficher une date.",
            "**Durée × rétention :** une vidéo de 14:00 avec 38 % de rétention moyenne a une durée moyenne de visionnage de 5:19. 60 000 vues à cette durée donnent 5 320 heures de visionnage. Pour 3 000, 4 000 et 8 000 heures, il faudrait 33 835, 45 113 et 90 226 vues, soit 1 354, 1 805 et 3 610 par vidéo sur 25 vidéos.",
            "**Dans chaque onglet :** Copier le résultat (un résumé en texte), Copier le lien (un lien qui remplit les mêmes chiffres), Effacer et un lien vers l'estimateur de revenus. Tout est calculé dans votre navigateur. Seul l'onglet utilisé en dernier est enregistré.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "Ce que signifie votre résultat",
    blocks: [
      {
        p: "La durée de visionnage, c'est simple : **vues × durée moyenne de visionnage**. Si une vidéo a 100 000 vues et que les gens la regardent en moyenne 3 minutes 30 secondes, cela fait 350 000 minutes, soit environ 5 833 heures.",
      },
      {
        p: "Le chiffre qui compte pour YouTube, c'est 4 000. Pour toucher une part des revenus publicitaires, il vous faut 1 000 abonnés et 4 000 heures de visionnage publiques sur des vidéos longues au cours des 365 derniers jours. Dans certains pays, il existe aussi un palier antérieur : 500 abonnés, 3 mises en ligne publiques sur les 90 derniers jours et 3 000 heures de visionnage. Ce palier débloque le financement par les fans, comme les souscriptions aux chaînes et les Super Thanks, mais pas les revenus publicitaires.",
      },
      { h3: "Ce qui change le 1er février 2027 : 8 000 heures pour les nouvelles chaînes" },
      {
        p: `À partir du [1er février 2027](${YPP_CHANGES}), les chaînes qui demandent les revenus publicitaires auront besoin de 8 000 heures de visionnage sur les 365 derniers jours, ou de 20 millions de vues de Shorts qualifiées en 90 jours, plus 1 000 abonnés. C'est le double du seuil actuel. Les chaînes déjà dans le Programme Partenaire ne sont pas concernées, et le palier de financement par les fans à 3 000 heures reste le même. Si vous comptez candidater après le 1er février, visez 8 000 heures, soit environ 22 heures de visionnage par jour.`,
      },
      { h3: "Combien de vues faut-il pour 4 000 heures ?" },
      { p: "La durée moyenne de visionnage change tout. Voici combien de vues il faut selon la durée :" },
      {
        table: {
          head: ["Durée moyenne de visionnage", "Vues pour 3 000 heures", "Vues pour 4 000 heures", "Vues pour 8 000 heures"],
          rows: DURATIONS.map(([label, sec]) => [label, views(3000, sec), views(4000, sec), views(8000, sec)]),
        },
      },
      {
        p: "Les heures de visionnage publiques correspondent au temps de visionnage des vidéos longues configurées en public. Les vues dans le flux Shorts et les vidéos privées, non répertoriées ou supprimées ne comptent pas.",
      },
      {
        p: "Passer d'une moyenne de 2 à 8 minutes divise par quatre le nombre de vues nécessaires. C'est pourquoi retenir les spectateurs compte souvent plus que d'obtenir plus de clics.",
      },
      { h3: "Ce qui ne compte pas pour les 4 000 heures" },
      {
        ul: [
          "Le temps de visionnage des Shorts dans le flux Shorts",
          "Les vidéos privées, non répertoriées ou supprimées",
          "Les vidéos diffusées en tant qu'annonces",
          "Les diffusions en direct une fois rendues privées ou supprimées",
        ],
      },
      { p: "Les créateurs de Shorts ont leur propre voie : 10 millions de vues de Shorts qualifiées sur les 90 derniers jours (ou 3 millions pour le palier antérieur)." },
      { h3: "Sur un an, 4 000 heures représentent environ 11 heures par jour" },
      {
        p: "La période de 365 jours est glissante. Le temps de visionnage d'il y a 13 mois sort du total à mesure que le nouveau arrive. 4 000 heures correspondent donc à environ 11 heures de visionnage par jour sur l'ensemble de la chaîne. Si votre total quotidien dans Studio est bien en dessous, vous savez qu'il vous faut plus de vues, des visionnages plus longs, ou les deux.",
      },
    ],
  },
  after: [
    {
      eyebrow: "Plus de visionnage",
      title: "Comment atteindre plus vite 4 000 heures de visionnage",
      blocks: [
        { p: "Vous ne pouvez pas changer les chiffres de l'an dernier, mais vous pouvez changer la suite. Voici ce qui fait le plus bouger la durée de visionnage :" },
        {
          ul: [
            "**Soignez les 30 premières secondes.** La plupart des spectateurs partent tôt. Commencez par ce que la vidéo apporte, pas par une longue intro ou un rappel d'abonnement. Le graphique de rétention d'audience de Studio montre exactement où les gens décrochent.",
            "**Faites quelques vidéos plus longues.** Une vidéo de 12 minutes regardée 6 minutes rapporte trois fois plus de visionnage qu'une vidéo de 4 minutes regardée 2 minutes. Tutoriels, tests et guides pas à pas se prêtent bien aux formats longs.",
            "**Envoyez les spectateurs vers la vidéo suivante.** Utilisez écrans de fin, fiches et playlists pour qu'une vue en devienne deux ou trois. Les séries fonctionnent particulièrement bien.",
            "**Passez en direct.** Les diffusions en direct génèrent souvent de longues sessions, et elles comptent tant que le replay reste public.",
            "**Faites des Shorts une porte d'entrée.** Le temps de visionnage du flux Shorts ne compte pas, mais un Short peut amener de nouveaux spectateurs vers une vidéo longue qui, elle, compte.",
            "**Gardez vos anciennes vidéos publiques.** Supprimer une vidéo ou la rendre privée retire ses heures de visionnage de votre total. Corrigez ou mettez à jour une ancienne vidéo plutôt que de la retirer.",
            "**Faites des vidéos intemporelles.** Tutoriels et explications continuent d'être trouvés pendant des années et ajoutent des heures de visionnage longtemps après leur publication.",
            "**Publiez à un rythme régulier.** Un rythme constant donne à YouTube plus d'occasions de vous recommander et à vos spectateurs une raison de revenir.",
            "**Travaillez vos titres et miniatures.** Un meilleur taux de clics signifie que plus de gens commencent à regarder, et chaque vue supplémentaire ajoute des heures.",
          ],
        },
        { p: `Quand vous approchez du but, vérifiez avec le [Vérificateur de monétisation](${CHECKER}) les conditions publiques que votre chaîne remplit déjà.` },
      ],
    },
    {
      eyebrow: "Total en baisse",
      title: "Pourquoi vos heures de visionnage ont baissé",
      blocks: [
        { p: "Il est normal de voir votre total baisser, même si vous publiez. Les raisons habituelles :" },
        {
          ul: [
            "**La période de 12 mois a avancé.** Les heures datant de plus d'un an ne comptent plus : un gros mois de l'an dernier sort donc du total cette année.",
            "**Vous avez rendu une vidéo privée ou non répertoriée, ou vous l'avez supprimée.** Ses heures de visionnage quittent immédiatement votre total.",
            "**Vos vues ont ralenti.** Si vous gagnez des heures moins vite que les anciennes n'expirent, le total baisse.",
            "**Studio n'est pas encore à jour.** Le chiffre de Revenus peut avoir un jour ou deux de retard sur Statistiques.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Comment YouTube calcule-t-il la durée de visionnage ?",
      a: "Multipliez les vues par la durée moyenne de visionnage. 50 000 vues avec une moyenne de 4 minutes font 200 000 minutes, soit environ 3 333 heures. YouTube Studio fait ce total pour vous, mais le calculateur vous permet de tester des hypothèses avant de publier.",
    },
    {
      q: "Combien de vues faut-il pour 4 000 heures de visionnage ?",
      a: "Cela dépend de la durée pendant laquelle les gens regardent. Avec une moyenne de 2 minutes, il vous faudrait 120 000 vues. À 5 minutes, 48 000, et à 10 minutes, seulement 24 000. Saisissez votre moyenne ci-dessus pour obtenir votre chiffre exact.",
    },
    {
      q: "Le seuil de 4 000 heures va-t-il changer ?",
      a: "Oui, pour les nouvelles chaînes. À partir du 1er février 2027, les nouveaux candidats auront besoin de 8 000 heures de visionnage sur les 365 derniers jours (ou de 20 millions de vues de Shorts qualifiées en 90 jours) et de 1 000 abonnés. Si vous êtes déjà monétisé, rien ne change pour vous.",
    },
    {
      q: "Où trouver ma durée moyenne de visionnage ?",
      a: "Dans YouTube Studio, ouvrez Statistiques et allez dans l'onglet Engagement. Pour une seule vidéo, ouvrez plutôt les statistiques de cette vidéo. Réglez la période sur les 365 derniers jours si vous suivez la monétisation.",
    },
    {
      q: "Les vues de Shorts comptent-elles pour les 4 000 heures de visionnage ?",
      a: "Non. Le temps de visionnage du flux Shorts ne compte pas. Les Shorts ont leur propre voie : 10 millions de vues de Shorts qualifiées en 90 jours, plus 1 000 abonnés.",
    },
    {
      q: "Les diffusions en direct comptent-elles dans les heures de visionnage ?",
      a: "Oui, tant que le direct est public et que vous gardez le replay public. Si vous le rendez privé ou le supprimez ensuite, ces heures sortent de votre total.",
    },
    {
      q: "Les heures de visionnage expirent-elles ?",
      a: "Oui. YouTube ne compte que les 365 derniers jours, et la période avance chaque jour. Les heures d'une vidéo devenue virale il y a 14 mois ne comptent plus, même si les vues restent sur la vidéo.",
    },
    {
      q: "J'ai 4 000 heures. Pourquoi ne suis-je pas encore monétisé ?",
      a: "Atteindre les chiffres vous rend seulement éligible. Il vous faut aussi 1 000 abonnés, puis candidater dans YouTube Studio, rubrique Revenus, et associer un compte AdSense pour YouTube. YouTube examine votre chaîne au regard de ses règles de monétisation avant de l'accepter.",
    },
    {
      q: "Puis-je acheter des heures de visionnage ?",
      a: "Ne le faites pas. Les vues et la durée de visionnage achetées enfreignent les règles de YouTube. Elles sont généralement filtrées et peuvent entraîner le refus de votre candidature ou la suppression de votre chaîne.",
    },
    {
      q: "Combien de minutes représentent 4 000 heures de visionnage ?",
      a: "240 000 minutes. 8 000 heures, l'objectif des nouveaux candidats à partir du 1er février 2027, représentent 480 000 minutes, et l'objectif de 3 000 heures du financement par les fans, 180 000 minutes.",
    },
    {
      q: "Combien d'heures de visionnage rapportent 1 000 vues ?",
      a: "Cela dépend de la durée de visionnage. Avec une moyenne de 4 minutes, 1 000 vues donnent environ 67 heures. À 10 minutes, environ 167 heures. Saisissez vos propres chiffres dans le calculateur ci-dessus.",
    },
    {
      q: "Les 4 000 heures doivent-elles venir d'une seule vidéo ?",
      a: "Non. YouTube additionne les heures de visionnage publiques de toutes vos vidéos longues sur les 12 derniers mois. Beaucoup de petites vidéos comptent autant qu'une grosse.",
    },
    {
      q: "Que se passe-t-il quand j'atteins 4 000 heures de visionnage ?",
      a: "Il vous faut aussi 1 000 abonnés. Une fois les deux atteints, candidatez dans YouTube Studio, rubrique Revenus, acceptez les conditions et associez un compte AdSense pour YouTube. YouTube examine ensuite votre chaîne, ce qui peut prendre jusqu'à 30 jours.",
    },
    {
      q: "YouTube paie-t-il à l'heure de visionnage ?",
      a: "Non. YouTube ne paie pas les heures de visionnage. Une fois monétisé, vous touchez une part des revenus publicitaires, qui dépend des vues, de votre sujet et du pays de votre audience. Notre estimateur de revenus (en anglais) vous donne une fourchette approximative.",
      link: { text: "estimateur de revenus", href: ESTIMATOR },
    },
    {
      q: "Est-ce difficile d'atteindre 4 000 heures de visionnage ?",
      a: "C'est une vraie étape. Sur un an, cela représente environ 11 heures de visionnage par jour sur l'ensemble de la chaîne. Les vidéos plus longues qui retiennent l'attention y arrivent bien plus vite que les courtes, d'où l'importance de la durée moyenne de visionnage.",
    },
    {
      q: "Quel taux de rétention utiliser dans le calculateur ?",
      a: "Utilisez vos vrais chiffres de YouTube Studio si vous les avez. Si vous débutez, essayez quelques valeurs entre 30 % et 50 % pour obtenir une fourchette, puis remplacez-les par votre vrai chiffre dès que vous aurez publié quelques vidéos.",
    },
    {
      q: "Je candidate vers janvier 2027. Quelle règle s'applique à moi ?",
      a: "La règle des 8 000 heures s'applique aux nouveaux candidats à partir du 1er février 2027. L'annonce de YouTube ne précise pas comment seront traitées les candidatures encore en cours d'examen à cette date. Si vous avez déjà 4 000 heures et 1 000 abonnés, mieux vaut donc candidater avant et suivre l'état dans Revenus.",
    },
    {
      q: "Ce calculateur est-il gratuit ?",
      a: "Oui. Sans inscription et sans limite d'utilisation.",
    },
  ],
};
