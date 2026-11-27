import type { LocalizedPageContent } from "@/lib/localized-page";
import { REQUIREMENTS_2027_ID } from "@/lib/monetization";
import { NICHES, nicheRpm } from "@/lib/revenue-data";

const ESTIMATOR = "/revenue-calculator/channel-earnings-estimator"; // English only
const WATCH_TIME = "/fr/watch-time-calculator";
const ANALYZER = "/fr/channel-analyzer";
const YPP_CHANGES = "https://support.google.com/youtube/answer/12843009?hl=fr";
const YPP_HELP = "https://support.google.com/youtube/answer/72851?hl=fr";

const NICHE_NAMES: Record<string, string> = {
  finance: "Finance et investissement",
  business: "Business et marketing",
  tech: "Tech et logiciels",
  education: "Éducation et tutoriels",
  health: "Santé et forme",
  food: "Cuisine",
  gaming: "Jeux vidéo",
  entertainment: "Divertissement et vlogs",
};
const usd = (n: number) => `${n.toFixed(2).replace(".", ",")} $ US`;
const RPM_ROWS = Object.keys(NICHE_NAMES).map((id) => {
  const r = nicheRpm(NICHES.find((n) => n.id === id)!);
  return [NICHE_NAMES[id], `${usd(r.low)} – ${usd(r.high)}`];
});

export const content: LocalizedPageContent = {
  title: "Vérifier la monétisation YouTube : cette chaîne est-elle monétisée ?",
  description:
    "Vérifiez n'importe quelle chaîne YouTube selon les règles du Programme Partenaire, y compris les changements de février 2027. Voyez les signaux publics et ce qu'ils signifient vraiment. Gratuit.",
  heading: "Vérificateur de monétisation YouTube",
  highlight: "Vérificateur de monétisation",
  intro:
    "Découvrez si une chaîne YouTube remplit les conditions du Programme Partenaire et ce que ses signaux publics disent de sa monétisation. Collez le lien d'une chaîne, un @pseudo ou le lien d'une vidéo.",
  updated: "27 novembre 2026",
  dataBadge: "Données officielles YouTube",
  afterTool: [
    {
      p: "Une chose à savoir avant de commencer : YouTube ne publie pas si une chaîne est monétisée. Seul son propriétaire le voit dans YouTube Studio. Un outil peut vérifier les conditions publiques, lire les indices que laisse une chaîne monétisée et être transparent sur tout le reste. C'est exactement ce que fait ce vérificateur.",
    },
  ],
  howTo: [
    "**Collez la chaîne.** Utilisez le @pseudo, l'URL de la chaîne, son ID ou le lien de n'importe laquelle de ses vidéos, Shorts ou diffusions en direct.",
    "**Lancez la vérification.** Nous regardons le nombre d'abonnés, le pays, les mises en ligne récentes et le paramètre « conçu pour les enfants » de la chaîne, puis nous comparons le tout aux deux paliers du Programme Partenaire.",
    "**Lisez le verdict.** Chaque condition est marquée comme remplie, partiellement remplie, non remplie ou non publique, pour que vous voyiez exactement ce qui est confirmé et ce qui ne l'est pas.",
  ],
  before: [
    {
      eyebrow: "La fiche de résultat",
      title: "Ce que vous verrez dans le résultat",
      blocks: [
        { p: "Voici ce que le résultat affichait quand nous avons vérifié @veritasium le 27 novembre 2026 :" },
        {
          ul: [
            "**Chaîne :** photo, nom (Veritasium) et pseudo, avec ≈ 21,5 M abonnés et 555 vidéos.",
            "**Compte à rebours :** « Plus que 66 jours avant l'entrée en vigueur des nouvelles exigences de YouTube pour les revenus publicitaires », avec un lien vers les conditions de 2027 plus bas. Il disparaît le 1er février 2027.",
            "**Palier financement par les fans :** « Remplit toutes les exigences publiques ». Au moins 500 abonnés (selon le pays) : rempli, ≈ 21,5 M. 3 mises en ligne publiques sur les 90 derniers jours : rempli, 25 mises en ligne. Pays du Programme Partenaire : rempli, États-Unis. Pas une chaîne conçue pour les enfants : rempli. 3 000 heures de visionnage ou 3 M de vues de Shorts : non public.",
            "**Palier revenus publicitaires :** « Remplit toutes les exigences publiques ». Au moins 1 000 abonnés : rempli, ≈ 21,5 M. Pays : rempli. Pas conçue pour les enfants : rempli. 4 000 heures de visionnage ou 10 M de vues de Shorts : non public, avec une note indiquant qu'à partir du 1er février 2027, les nouveaux candidats auront besoin de 8 000 heures ou de 20 M de vues de Shorts. Les mises en ligne récentes ne comptent pas ici.",
            "**Les deux paliers :** aucun avertissement actif et respect des règles de monétisation : non public.",
            "**Rester actif :** 25 mises en ligne publiques sur les 90 derniers jours, ce qui suffit pour la règle de 2027 quel que soit le type de vidéo. Le total regroupe vidéos longues et Shorts, car les données publiques de YouTube ne permettent pas de les distinguer de façon fiable. C'est indicatif et n'influence pas le verdict.",
            "**Vérifiez par vous-même :** un bouton « Ouvrir la chaîne sur YouTube » et quatre cases à cocher (bouton « Rejoindre », onglet Boutique ou étagère de produits, Super Thanks ou Super Chat, annonces sur les vidéos récentes), chacune avec une ligne sur le poids de cet indice.",
            "**Notre avis :** « Peut-être monétisée » tant que rien n'est coché, puisque les conditions publiques sont remplies. Cocher « Je vois un bouton « Rejoindre » » le fait passer à « Très probablement monétisée ». Rien de ce que vous cochez n'est enregistré.",
            "**Revenus mensuels estimés :** environ 22 900 à 91 600 $ US, avec la mention « Estimation, pas un paiement ». Le calcul repose sur les vues des 11 vidéos mises en ligne ces 30 derniers jours, pour une niche mixte et une audience aux États-Unis, au Royaume-Uni, au Canada ou en Australie. Il n'apparaît que si la chaîne remplit les conditions publiques des revenus publicitaires. Sinon, l'encadré indique « Non affiché : cette chaîne ne remplit pas les exigences publiques des revenus publicitaires. »",
            "**Estimer les revenus :** ouvre l'estimateur de revenus (en anglais) avec @veritasium déjà saisi, où vous choisissez la niche et l'audience pour le détail complet.",
            "**Vérifiées récemment :** vos 5 dernières chaînes apparaissent sous le champ de recherche, avec un bouton Effacer. Cliquez sur l'une d'elles pour la vérifier à nouveau. La liste reste uniquement dans votre navigateur.",
            "**Copier le lien :** copie un lien de partage (channelpeeker.com/fr/monetization-checker?c=@veritasium) qui ouvre l'outil et lance la même vérification.",
            "**La date de récupération des données,** pour savoir à quel point elles sont récentes.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "Conditions de monétisation YouTube, aujourd'hui et à partir du 1er février 2027",
    id: REQUIREMENTS_2027_ID,
    blocks: [
      {
        p: "YouTube a deux niveaux de monétisation. Le premier débloque le financement par les fans. Le second ajoute une part des revenus publicitaires et de Premium. Le 1er février 2027, les objectifs d'heures de visionnage et de vues de Shorts du second niveau doublent pour les nouvelles chaînes. L'exigence d'abonnés reste à 1 000.",
      },
      {
        table: {
          corner: true,
          head: ["", "Financement par les fans", "Revenus publicitaires, jusqu'au 31 janvier 2027", "Revenus publicitaires, à partir du 1er février 2027"],
          rows: [
            ["Abonnés", "500", "1 000", "1 000"],
            ["Mises en ligne publiques", "3 sur les 90 derniers jours", "–", "–"],
            ["Heures de visionnage (365 derniers jours)", "3 000", "4 000", "8 000"],
            ["Ou vues de Shorts (90 derniers jours)", "3 millions", "10 millions", "20 millions"],
            ["Ce que cela débloque", "Souscriptions aux chaînes, Supers, Shopping", "Tout ce qui précède, plus les revenus publicitaires et YouTube Premium", "Idem"],
          ],
        },
      },
      { p: "Les revenus YouTube Premium sont une part de ce que paient les abonnés Premium lorsqu'ils regardent vos vidéos." },
      { p: "Quelques points à connaître :" },
      {
        ul: [
          "Le changement de 2027 ne concerne que les nouveaux candidats. Les chaînes déjà dans le Programme Partenaire conservent leur statut.",
          "Le palier du financement par les fans ne change pas.",
          "Le palier à 500 abonnés n'existe que dans certains pays. Ailleurs, les chaînes commencent à 1 000.",
          "Il faut aussi respecter les règles de monétisation de YouTube, n'avoir aucun avertissement actif pour non-respect du Règlement de la communauté et vivre dans un pays où le Programme Partenaire est disponible.",
        ],
      },
      { h3: "Ce qui change aussi en 2027 pour les chaînes monétisées" },
      {
        ul: [
          "**Rester actif :** à partir du 1er février 2027, une chaîne monétisée doit remplir au moins une de ces conditions : 1 000 heures de visionnage sur l'année écoulée, 1 million de vues de Shorts sur les 90 derniers jours, ou 2 vidéos longues ou 5 Shorts mis en ligne tous les 90 jours. Les chaînes en dessous disposent de 90 jours pour rattraper leur retard.",
          "**Revenus des Shorts :** pour percevoir chaque mois une part de la réserve de revenus pour les créateurs de Shorts, une chaîne doit avoir 10 millions de vues de Shorts sur les 90 derniers jours. Ne pas l'atteindre n'affecte pas les revenus des vidéos longues.",
          "**Nouvelles conditions :** les chaînes déjà dans le programme doivent accepter les conditions mises à jour dans YouTube Studio avant le 31 janvier 2027. Sinon, elles ne gagnent plus rien avec les fonctionnalités concernées.",
        ],
      },
      { p: `L'annonce complète de YouTube se trouve sur sa page consacrée aux [modifications du Programme Partenaire YouTube](${YPP_CHANGES}).` },
    ],
  },
  after: [
    {
      eyebrow: "Indices visibles",
      title: "Comment savoir si une chaîne est monétisée sans outil",
      blocks: [
        { p: "Vous pouvez repérer vous-même la plupart des indices publics. Certains pèsent bien plus lourd que d'autres." },
        {
          ul: [
            "**Un bouton « Rejoindre » à côté de « S'abonner ».** Les souscriptions aux chaînes sont réservées aux chaînes du Programme Partenaire : c'est le signe public le plus fort qui soit.",
            "**Des Super Thanks, Super Chat ou Super Stickers.** Ce sont aussi des fonctionnalités du Programme Partenaire.",
            "**Un onglet Boutique ou une étagère de produits.** Cela signifie généralement que le Shopping est activé, ce qui exige aussi le Programme Partenaire.",
            `**Des annonces sur les vidéos.** C'est l'indice le plus faible. [YouTube peut diffuser des annonces sur n'importe quelle vidéo, y compris sur des chaînes qui ne font pas partie du programme et ne touchent rien sur ces annonces.](${YPP_HELP})`,
            "**Le nombre d'abonnés.** Une chaîne de moins de 500 abonnés n'est presque certainement pas encore éligible.",
          ],
        },
        { p: "Aucun indice n'est une preuve à lui seul. Un bouton « Rejoindre » en dit long. Des annonces seules en disent très peu." },
        { p: "Notre vérificateur passe ces indices en revue avec vous et les combine aux conditions publiques pour donner un niveau de confiance." },
      ],
    },
    {
      eyebrow: "Vidéos à l'unité",
      title: "Peut-on savoir si une vidéo ou un Short précis est monétisé ?",
      blocks: [
        {
          p: "Pas de façon fiable. Même sur une chaîne monétisée, une vidéo peut ne rien rapporter. Elle peut être conçue pour les enfants, avoir des annonces limitées à cause de son sujet ou contenir une musique revendiquée par quelqu'un d'autre. Les coupures publicitaires que vous voyez pendant le visionnage ne prouvent pas que le créateur est payé. Si vous collez ici le lien d'une vidéo ou d'un Short, nous vérifions la chaîne qui se trouve derrière, parce que c'est la partie publique.",
        },
      ],
    },
    {
      eyebrow: "Raisons fréquentes",
      title: "Pourquoi une chaîne n'est peut-être pas encore monétisée",
      blocks: [
        {
          ul: [
            `**Pas assez d'heures de visionnage ou de vues de Shorts.** C'est de loin la raison la plus fréquente. Utilisez le [calculateur de durée de visionnage](${WATCH_TIME}) pour voir ce qu'il vous manque.`,
            "**Contenu réutilisé ou répétitif.** YouTube refuse les chaînes qui remettent surtout en ligne les vidéos des autres ou produisent en masse des vidéos presque identiques.",
            "**Contenu conçu pour les enfants.** Ces chaînes peuvent rejoindre le programme, mais elles gagnent moins : pas d'annonces personnalisées, ni souscriptions aux chaînes ni Supers.",
            "**Le pays.** Le Programme Partenaire n'est pas disponible partout.",
            "**Les avertissements.** Un avertissement actif pour non-respect du Règlement de la communauté peut bloquer ou retarder la validation.",
            "**Aucune candidature.** Atteindre les chiffres n'inscrit pas automatiquement. Il faut candidater dans YouTube Studio, rubrique Revenus.",
          ],
        },
      ],
    },
    {
      eyebrow: "Votre propre chaîne",
      title: "Comment vérifier votre propre chaîne",
      blocks: [
        {
          p: "Ouvrez YouTube Studio et allez dans Revenus. Vous y verrez vos heures de visionnage, vos vues de Shorts et vos abonnés exacts, où vous en êtes pour chaque palier et l'état de votre candidature si vous avez déjà postulé. C'est la seule réponse officielle. Un outil comme celui-ci est pratique pour vérifier d'autres chaînes ou jeter un coup d'œil rapide à ce qui est public.",
        },
        { p: `Vous voulez savoir ce qu'une chaîne monétisée peut gagner ? Essayez l'[estimateur de revenus](${ESTIMATOR}) (en anglais).` },
      ],
    },
    {
      eyebrow: "Étapes suivantes",
      title: "Qui utilise un vérificateur de monétisation, et que faire ensuite",
      blocks: [
        { p: "Chacun vérifie pour une raison différente, et l'étape suivante dépend de la vôtre." },
        {
          ul: [
            `**Les créateurs qui suivent leur progression.** Vérifiez ici ce qui est public, puis ouvrez la rubrique Revenus de YouTube Studio pour connaître vos heures de visionnage exactes. Si vous êtes proche du but, le [calculateur de durée de visionnage](${WATCH_TIME}) indique combien de vues il vous manque.`,
            `**Les marques et agences qui évaluent un partenariat.** Une chaîne monétisée a passé l'examen de YouTube, ce qui dit déjà quelque chose de son contenu. Regardez les mises en ligne et les vues récentes de la chaîne dans l'[analyseur de chaîne](${ANALYZER}) avant de signer quoi que ce soit.`,
            `**Les créateurs qui jaugent la concurrence.** Si un concurrent de votre niche est monétisé, l'[estimateur de revenus](${ESTIMATOR}) (en anglais) vous donne une idée approximative de ce que la niche peut rapporter.`,
            "**Ceux qui achètent ou vendent une chaîne.** Ne prenez jamais « monétisée » sur parole. Demandez au vendeur un partage d'écran en direct de la page Revenus de YouTube Studio. C'est la preuve la plus fiable, car une capture d'écran peut être retouchée.",
          ],
        },
      ],
    },
    {
      eyebrow: "Shorts et direct",
      title: "Monétisation des Shorts et des diffusions en direct sur YouTube",
      id: "shorts-and-live",
      blocks: [
        {
          p: "Les Shorts ont leur propre voie d'accès au Programme Partenaire. Au lieu des heures de visionnage, une chaîne peut se qualifier avec des vues de Shorts : 10 millions sur les 90 derniers jours aujourd'hui, ou 20 millions pour les nouveaux candidats à partir du 1er février 2027, plus 1 000 abonnés. Le temps de visionnage dans le flux Shorts ne compte pas pour l'objectif d'heures de visionnage : impossible de cumuler les deux.",
        },
        {
          p: "Les revenus des Shorts fonctionnent aussi autrement. L'argent publicitaire du flux Shorts alimente une réserve commune, la réserve de revenus pour les créateurs de Shorts, répartie entre les créateurs selon leur part des vues. À partir du 1er février 2027, une chaîne monétisée doit conserver 10 millions de vues de Shorts tous les 90 jours pour continuer à percevoir sa part. Ne pas l'atteindre n'affecte pas les revenus des vidéos longues.",
        },
        {
          p: "Les diffusions en direct sont plus simples. Le temps de visionnage d'un direct public compte dans les heures de visionnage, à condition de garder le replay public. Les chaînes monétisées peuvent aussi gagner de l'argent avec les Super Chat et Super Stickers pendant le direct. Vous pouvez coller le lien d'un direct dans le vérificateur : il vérifiera la chaîne qui se trouve derrière.",
        },
      ],
    },
    {
      eyebrow: "Candidature",
      title: "Comment candidater à la monétisation YouTube",
      blocks: [
        { p: "Une fois que votre chaîne remplit les conditions, la candidature se fait dans YouTube Studio. C'est gratuit et cela prend quelques minutes." },
        {
          ol: [
            "Activez la validation en deux étapes sur votre compte Google. YouTube l'exige.",
            "Ouvrez YouTube Studio et sélectionnez Revenus dans le menu de gauche.",
            "Cliquez sur Postuler, puis lisez et acceptez les conditions du Programme Partenaire.",
            "Créez un compte AdSense pour YouTube ou associez celui que vous avez déjà. C'est par là que YouTube vous paie.",
            "Attendez l'examen. Les systèmes et les examinateurs de YouTube évaluent votre chaîne dans son ensemble, et l'examen peut prendre jusqu'à 30 jours. Vous suivez l'état de la candidature dans Revenus.",
          ],
        },
        {
          p: "En cas de refus, YouTube vous en donne la raison. Après un premier refus, vous pouvez candidater à nouveau au bout de 30 jours, ou faire appel dans les 21 jours si vous pensez que la décision est erronée.",
        },
      ],
    },
    {
      eyebrow: "Revenus",
      title: "Combien gagnent les chaînes monétisées ?",
      blocks: [
        {
          p: "Cela dépend bien plus du sujet que du nombre de vues. Les annonceurs paient plus cher pour toucher des gens sur le point de dépenser de l'argent : une chaîne finance ou logiciels peut donc gagner plusieurs fois plus par vue qu'une chaîne de jeux vidéo ou de divertissement avec une audience de même taille.",
        },
        {
          p: "Les revenus se mesurent généralement en RPM (revenu pour mille vues) : ce que gagne un créateur pour 1 000 vues après la part de YouTube, sur l'ensemble de ses vues, y compris celles sans annonce.",
        },
        {
          table: {
            head: ["Niche", "Fourchette de RPM estimée ($ US pour 1 000 vues)"],
            rows: RPM_ROWS,
            caption: "Pour une audience aux États-Unis, au Royaume-Uni, au Canada ou en Australie, d'après les hypothèses de l'estimateur de revenus.",
          },
        },
        {
          p: "Ce sont des estimations, pas des paiements. Votre RPM réel dépend du pays de votre audience, de la durée de vos vidéos, de la saison et du nombre d'annonces diffusées sur vos vidéos.",
        },
        { p: `Pour un chiffre approximatif pour n'importe quelle chaîne, essayez l'[estimateur de revenus](${ESTIMATOR}) (en anglais).` },
      ],
    },
    {
      eyebrow: "Par vidéo",
      title: "Chaque vidéo rapporte-t-elle de l'argent une fois la chaîne monétisée ?",
      blocks: [
        {
          p: "Non. Être dans le Programme Partenaire signifie qu'une chaîne peut gagner de l'argent, pas que chaque vidéo en rapporte. Les vidéos aux annonces limitées (par exemple à cause d'un langage grossier ou de sujets sensibles), les vidéos conçues pour les enfants et celles dont la musique ou les images sont revendiquées par quelqu'un d'autre peuvent rapporter peu, voire rien. C'est aussi pourquoi deux chaînes avec autant de vues peuvent gagner des montants très différents. Le sujet, le pays de l'audience et la durée de la vidéo changent la valeur d'une vue avec annonce.",
        },
      ],
    },
    {
      eyebrow: "Garder la monétisation",
      title: "Une chaîne peut-elle perdre sa monétisation ?",
      blocks: [
        { p: "Oui. L'admission n'est pas définitive, et YouTube continue de contrôler les chaînes déjà dans le programme. Les raisons les plus fréquentes :" },
        {
          ul: [
            "**L'inactivité.** YouTube peut désactiver la monétisation des chaînes qui n'ont mis en ligne aucune vidéo ni rien publié pendant 6 mois. À partir du 1er février 2027, les chaînes monétisées doivent aussi rester actives : 2 vidéos longues ou 5 Shorts tous les 90 jours, ou 1 000 heures de visionnage sur un an, ou 1 million de vues de Shorts en 90 jours.",
            "**Le non-respect des règles de monétisation.** Un contenu réutilisé, des vidéos produites en masse ou des métadonnées trompeuses peuvent faire exclure une chaîne du programme, même après son admission.",
            "**Le refus des nouvelles conditions.** Les chaînes déjà dans le programme doivent accepter les conditions mises à jour de YouTube avant le 31 janvier 2027, sous peine de ne plus rien gagner avec les fonctionnalités concernées.",
          ],
        },
      ],
    },
    {
      eyebrow: "Pourquoi les résultats varient",
      title: "Pourquoi les vérificateurs de monétisation donnent des réponses différentes",
      blocks: [
        {
          p: "Si vous avez essayé plusieurs vérificateurs, vous les avez sans doute vus se contredire. C'est parce qu'aucun d'eux n'a accès aux vrais registres de YouTube. Chacun lit des indices publics différents et leur donne un poids différent. Certains considèrent les annonces sur une vidéo comme une preuve, alors que YouTube peut afficher des annonces sur des chaînes qui ne sont pas payées pour cela. D'autres extraient des signaux des pages de YouTube, ce qui casse à chaque changement de mise en page. Et d'autres encore donnent un oui ou un non catégorique que les données ne permettent pas vraiment d'affirmer.",
        },
        {
          p: "Nous préférons être clairs sur les zones d'ombre. Ce vérificateur montre quelles conditions sont confirmées, lesquelles ne sont pas publiques et quel poids a réellement chaque indice que vous pouvez vérifier vous-même.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Cet outil peut-il dire avec certitude si une chaîne est monétisée ?",
      a: "Non, et aucun outil externe ne le peut. YouTube garde le statut de monétisation confidentiel entre lui et le propriétaire de la chaîne. Ce vérificateur indique quelles conditions publiques une chaîne remplit et ce que suggèrent les indices publics, et marque tout le reste comme non public.",
    },
    {
      q: "Quelles sont les conditions de monétisation de YouTube actuellement ?",
      a: "Jusqu'au 31 janvier 2027, les revenus publicitaires exigent 1 000 abonnés, plus 4 000 heures de visionnage sur les 365 derniers jours ou 10 millions de vues de Shorts sur les 90 derniers jours. Dans certains pays, il existe un palier antérieur de financement par les fans : 500 abonnés, 3 mises en ligne publiques sur les 90 derniers jours et 3 000 heures de visionnage ou 3 millions de vues de Shorts.",
    },
    {
      q: "Les conditions de monétisation changent-elles en 2027 ?",
      a: "Oui. À partir du 1er février 2027, les nouvelles chaînes qui demandent les revenus publicitaires auront besoin de 1 000 abonnés, plus 8 000 heures de visionnage sur les 365 derniers jours ou 20 millions de vues de Shorts sur les 90 derniers jours. Le palier de financement par les fans à 500 abonnés reste identique.",
    },
    {
      q: "Je suis déjà monétisé. Ai-je besoin de 8 000 heures maintenant ?",
      a: "Non. Le seuil plus élevé ne concerne que les nouveaux candidats. Vous devez en revanche accepter les conditions mises à jour de YouTube dans Studio avant le 31 janvier 2027, et à partir du 1er février 2027, votre chaîne doit rester active pour garder sa place dans le programme.",
    },
    {
      q: "Une chaîne peut-elle être monétisée avec 500 abonnés ?",
      a: "En partie. Dans les pays où existe le palier de financement par les fans, 500 abonnés plus les conditions de mises en ligne et d'heures de visionnage débloquent les souscriptions aux chaînes, les Supers et le Shopping. Les revenus publicitaires exigent toujours 1 000 abonnés.",
    },
    {
      q: "Voir des annonces sur une vidéo signifie-t-il que la chaîne est monétisée ?",
      a: "Non. YouTube peut diffuser des annonces sur n'importe quelle vidéo, y compris sur des chaînes hors du Programme Partenaire, et ces créateurs n'en touchent rien. Un bouton « Rejoindre » est un bien meilleur signe.",
    },
    {
      q: "Pourquoi ne pouvez-vous pas vérifier les heures de visionnage ?",
      a: "Les heures de visionnage sont privées. Seul le propriétaire de la chaîne les voit dans YouTube Studio, et les données publiques de YouTube ne les incluent pas. Vous pouvez estimer les vôtres avec le calculateur de durée de visionnage.",
      link: { text: "calculateur de durée de visionnage", href: WATCH_TIME },
    },
    {
      q: "Pourquoi le nombre d'abonnés est-il approximatif ?",
      a: "YouTube arrondit les nombres d'abonnés publics au-delà de 1 000 à trois chiffres significatifs : 1 234 s'affiche donc 1,23 k. En dessous de 1 000, le nombre est exact, et c'est justement là que les seuils comptent.",
    },
    {
      q: "Les chaînes conçues pour les enfants gagnent-elles moins ?",
      a: "En général, oui. Les vidéos conçues pour les enfants ne reçoivent pas d'annonces personnalisées, et des fonctionnalités comme les souscriptions aux chaînes, les Supers et les commentaires sont désactivées, ce qui supprime plusieurs sources de revenus.",
    },
    {
      q: "Comment les Shorts sont-ils monétisés ?",
      a: "Il y a deux chiffres distincts. Pour rejoindre le Programme Partenaire grâce aux Shorts, une chaîne a besoin de 1 000 abonnés et de 10 millions de vues de Shorts en 90 jours, chiffre qui passe à 20 millions pour les nouveaux candidats à partir du 1er février 2027. Une fois admise, à partir du 1er février 2027, elle doit conserver 10 millions de vues de Shorts tous les 90 jours pour continuer à toucher sa part de la réserve de revenus pour les créateurs de Shorts. Plus de détails dans la section sur les Shorts ci-dessus.",
      link: { text: "section sur les Shorts", href: "#shorts-and-live" },
    },
    {
      q: "Combien gagne une chaîne monétisée ?",
      a: "Cela varie énormément selon le sujet, le pays de l'audience et la durée des vidéos. Les chaînes finance et tech peuvent gagner beaucoup plus par vue que les chaînes de divertissement. Notre estimateur de revenus (en anglais) vous donne une fourchette réaliste.",
      link: { text: "estimateur de revenus", href: ESTIMATOR },
    },
    {
      q: "Puis-je vérifier ma propre chaîne avec cet outil ?",
      a: "Oui. Collez votre @pseudo pour voir ce qui est public. Pour vos heures de visionnage exactes et l'état de votre candidature, allez dans YouTube Studio, rubrique Revenus.",
    },
    {
      q: "Combien de temps YouTube met-il à examiner une candidature à la monétisation ?",
      a: "Jusqu'à 30 jours. Pendant l'examen, l'état s'affiche dans la rubrique Revenus de YouTube Studio.",
    },
    {
      q: "Que se passe-t-il si ma candidature à la monétisation est refusée ?",
      a: "YouTube vous indique la raison principale. Après un premier refus, vous pouvez candidater à nouveau au bout de 30 jours. Si vous pensez que la décision est erronée, vous pouvez plutôt faire appel dans les 21 jours.",
    },
    {
      q: "Quelle différence entre être éligible et être monétisé ?",
      a: "Éligible signifie que la chaîne atteint les chiffres : abonnés plus heures de visionnage ou vues de Shorts. Monétisée signifie qu'elle a candidaté, passé l'examen de YouTube et été acceptée. Beaucoup de chaînes éligibles ne sont pas monétisées parce qu'elles n'ont pas encore candidaté ou ont été refusées.",
    },
    {
      q: "Une chaîne monétisée peut-elle perdre sa monétisation ?",
      a: "Oui. YouTube peut la désactiver si une chaîne cesse de publier pendant des mois, enfreint les règles de monétisation ou, à partir du 1er février 2027, n'accepte pas les conditions mises à jour ou ne reste pas active.",
    },
    {
      q: "Puis-je vérifier si une chaîne est monétisée depuis mon téléphone ?",
      a: "Oui. Ce vérificateur fonctionne dans n'importe quel navigateur mobile. Copiez le lien de la chaîne ou de la vidéo dans l'application YouTube avec Partager, puis collez-le dans le champ ci-dessus.",
    },
    {
      q: "Enregistrez-vous les chaînes que je vérifie ?",
      a: "Nous n'enregistrons pas les chaînes que vous saisissez dans le vérificateur. Pour que l'outil reste rapide et pour éviter les abus, le serveur conserve brièvement en cache les données publiques reçues de YouTube et compte les requêtes par adresse IP pendant une heure. Si vous ouvrez un lien de partage (qui se termine par ?c=@pseudo), cette adresse apparaît dans nos journaux de serveur standard pendant environ deux semaines. Nous avons configuré Google Analytics pour supprimer les noms de chaînes des adresses de page. Vos cases cochées et votre liste de chaînes vérifiées récemment ne quittent jamais votre navigateur, et vous pouvez effacer la liste à tout moment.",
    },
  ],
};
