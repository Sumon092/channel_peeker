import type { LocalizedPageContent } from "@/lib/localized-page";

const ANALYZER = "/fr/channel-analyzer";
const UPLOAD_DATE = "/fr/video-upload-date-checker";
const YPP_HELP = "https://support.google.com/youtube/answer/72851?hl=fr";

export const content: LocalizedPageContent = {
  title: "Âge et date de création d'une chaîne YouTube",
  description:
    "Découvrez exactement quand une chaîne YouTube a été créée et quel âge elle a, avec son total de vues et de vidéos. Gratuit, instantané, sans inscription.",
  heading: "Vérificateur d'âge de chaîne YouTube",
  highlight: "Vérificateur d'âge",
  intro: "Voyez exactement quand une chaîne YouTube a été créée et quel âge elle a aujourd'hui. Collez le lien d'une chaîne, un @pseudo ou le lien d'une vidéo pour commencer.",
  updated: "27 novembre 2026",
  dataBadge: "Données officielles YouTube",
  afterTool: [
    {
      p: "Chaque chaîne a une date de création, mais YouTube ne la rend pas facile à trouver. Cette date en dit pourtant long. Une chaîne de 2 millions d'abonnés qui a 10 ans a grandi régulièrement. Une autre arrivée à 2 millions en 8 mois a probablement fait le buzz. Cet outil vous donne la date en quelques secondes, avec le total de vues et le nombre de vidéos, pour avoir une vue d'ensemble.",
    },
  ],
  howTo: [
    "**Collez la chaîne.** Utilisez le @pseudo (comme @mkbhd), l'URL de la chaîne, son ID (qui commence par UC) ou le lien de n'importe laquelle de ses vidéos, Shorts compris. Tout fonctionne.",
    "**Vérifiez la date.** L'outil lit la date de création directement dans les données officielles de YouTube : elle correspond donc à ce que YouTube a lui-même enregistré.",
    `**Utilisez le résultat.** Copiez-le, ou ouvrez l'[analyse complète de la chaîne](${ANALYZER}) pour voir ses mises en ligne récentes et celles qui font le plus de vues.`,
  ],
  before: [
    {
      eyebrow: "La fiche de résultat",
      title: "Ce que vous verrez dans le résultat",
      blocks: [
        { p: "Voici ce que le résultat affichait quand nous avons vérifié @mkbhd le 27 novembre 2026 :" },
        {
          ul: [
            "**Chaîne :** photo, nom (Marques Brownlee) et pseudo.",
            "**Âge :** en années, mois et jours, « 18 ans, 8 mois et 6 jours », plus le total en jours (6 825 jours).",
            "**Date et heure de création,** en UTC : « Créée le 21 mars 2008 à 15:25 UTC ».",
            "**Abonnés :** ≈ 21,5 M, arrondis comme le fait YouTube, ou « Masqué par le créateur » s'ils sont masqués.",
            "**Vues depuis la création :** 5,9 Md.",
            "**Vidéos publiques :** 1 869.",
            "**Abonnés par mois :** environ 95,9 k, calculés pour vous.",
            "**Vues moyennes par vidéo :** 3,2 M, calculées pour vous.",
            "**Pays :** États-Unis, ou « Non renseigné » si le créateur l'a laissé vide.",
            "**ID de la chaîne :** UCBJycsmduvYEL83R_U4JriQ, avec un bouton Copier l'ID.",
            "**Copier le résultat :** copie un résumé d'une ligne avec la date, l'heure et l'âge.",
            "**Copier le lien :** copie un lien de partage (channelpeeker.com/fr/channel-age-checker?c=@mkbhd) qui ouvre l'outil et lance la même vérification. Pratique pour envoyer une chaîne à un client ou à un collègue.",
            "**Ouvrir sur YouTube :** ouvre la chaîne sur YouTube dans un nouvel onglet.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "Ce que signifient les résultats",
    blocks: [
      {
        p: "La date de création est celle où la chaîne elle-même a été créée. Ce n'est pas la date de la première vidéo. Beaucoup de chaînes restent vides pendant des années avant la moindre mise en ligne. Certains créateurs suppriment ou masquent aussi leurs plus anciennes vidéos : la plus ancienne vidéo visible peut donc être bien plus récente que la chaîne.",
      },
      { p: "C'est pourquoi l'âge est surtout utile à côté d'autres chiffres. Voici comment les lire ensemble :" },
      {
        ul: [
          "**Chaîne ancienne, peu de vidéos :** la chaîne est probablement restée en sommeil longtemps, ou le créateur a retiré d'anciens contenus.",
          "**Chaîne récente, gros chiffres :** une croissance rapide, souvent grâce à une ou deux vidéos virales. Regardez les vidéos les plus vues pour savoir si la croissance a tenu.",
          "**Chaîne ancienne, chiffres réguliers :** un historique long et constant. C'est en général le signe le plus rassurant quand on évalue une chaîne.",
        ],
      },
      { h3: "Âge de la chaîne et âge du compte Google" },
      {
        p: "Si vous cherchez l'âge de votre compte YouTube, il y a deux dates. Votre compte Google peut avoir des années de plus que votre chaîne, car une chaîne se crée séparément, parfois longtemps après l'inscription à Gmail. Cet outil affiche la date de création de la chaîne, celle qui compte sur YouTube.",
      },
      { h3: "Trouver la date de création d'une chaîne sans outil" },
      {
        p: "Vous pouvez la vérifier directement sur YouTube. Ouvrez la chaîne, touchez la description sous le nom pour ouvrir le panneau « À propos », puis repérez la date d'inscription. Seule la date s'affiche : il faut calculer l'âge soi-même. C'est ce que fait cet outil pour vous, avec les vues et le nombre de vidéos de la chaîne.",
      },
    ],
  },
  after: [
    {
      eyebrow: "Raisons fréquentes",
      title: "Pourquoi vérifier l'âge d'une chaîne",
      blocks: [
        {
          ul: [
            "**Avant un partenariat ou une collaboration.** Marques et créateurs vérifient qu'une chaîne a un vrai historique et n'est pas sortie de nulle part.",
            "**Avant d'acheter une chaîne.** Si un vendeur affirme que la chaîne « existe depuis 2015 », la date de création montre si c'est vrai.",
            "**Se comparer à la concurrence.** Comparez le temps qu'un concurrent a mis pour atteindre ses chiffres avec celui depuis lequel vous êtes lancé.",
            "**Évaluer une niche.** Si la plupart des grandes chaînes d'un sujet ont plus de 8 ans, c'est un domaine mûr. Si plusieurs chaînes en forte croissance ont moins de 2 ans, il reste de la place pour les nouveaux venus.",
            "**Repérer les chaînes fausses ou recyclées.** Une chaîne toute neuve avec énormément d'abonnés et peu de vidéos peut être un signal d'alerte.",
            "**Simple curiosité.** Découvrir quand votre créateur préféré a commencé, c'est amusant, surtout quand la chaîne est plus ancienne que prévu.",
          ],
        },
      ],
    },
    {
      eyebrow: "Faites le calcul",
      title: "Comment calculer le rythme de croissance d'une chaîne",
      blocks: [
        {
          p: "Une fois l'âge d'une chaîne connu, deux calculs rapides montrent à quelle vitesse elle a grandi. L'outil les fait pour vous et les affiche dans le résultat, mais voici comment ils fonctionnent :",
        },
        {
          ul: [
            "**Abonnés par mois :** total des abonnés ÷ âge de la chaîne en mois. Une chaîne de 600 000 abonnés âgée de 5 ans (60 mois) a gagné environ 10 000 abonnés par mois en moyenne.",
            "**Vues moyennes par vidéo :** total des vues ÷ nombre de vidéos. 30 millions de vues pour 300 vidéos, cela fait 100 000 vues par vidéo.",
          ],
        },
        {
          p: `Gardez en tête que ce sont des moyennes. Une chaîne qui a végété pendant quatre ans puis explosé en un mois ressemble à une chaîne qui a grandi régulièrement. Pour voir quelles vidéos récentes génèrent les vues, ouvrez l'[analyse complète de la chaîne](${ANALYZER}).`,
        },
      ],
    },
  ],
  faq: [
    {
      q: "Comment voir quand une chaîne YouTube a été créée ?",
      a: "Collez le pseudo, l'URL ou le lien d'une vidéo de la chaîne dans l'outil ci-dessus. Vous obtenez la date de création exacte et l'âge de la chaîne. Sur YouTube, la date apparaît dans le panneau « À propos » de la chaîne.",
    },
    {
      q: "Quel âge a mon compte YouTube ?",
      a: "Collez le lien de votre chaîne dans l'outil. Il indique quand votre chaîne a été créée. Votre compte Google peut être plus ancien, car la chaîne est créée séparément.",
    },
    {
      q: "La date de création est-elle celle de la première mise en ligne ?",
      a: "Non. Une chaîne peut rester vide des années avant sa première vidéo, et d'anciennes mises en ligne peuvent être supprimées ou masquées. Voyez « Ce que signifient les résultats » ci-dessus pour lire l'âge à côté du nombre de vidéos.",
    },
    {
      q: "Une chaîne plus ancienne est-elle mieux référencée ou monétisée plus vite ?",
      a: "Pas directement. Le Programme Partenaire YouTube n'exige aucun âge minimum de chaîne. Il regarde les abonnés et les heures de visionnage. Les recommandations dépendent de la réaction des spectateurs à vos vidéos, pas de l'âge de la chaîne.",
      link: { text: "Programme Partenaire YouTube", href: YPP_HELP },
    },
    {
      q: "Puis-je vérifier une chaîne supprimée ou privée ?",
      a: "Non. L'outil ne peut lire que les chaînes publiques. Une fois une chaîne supprimée ou rendue privée, ses données ne sont plus disponibles.",
    },
    {
      q: "Puis-je savoir quand une vidéo précise a été mise en ligne ?",
      a: "Oui, mais avec un autre outil. Utilisez le vérificateur de date de mise en ligne pour obtenir la date et l'heure exactes de publication d'une vidéo.",
      link: { text: "vérificateur de date de mise en ligne", href: UPLOAD_DATE },
    },
    {
      q: "Pourquoi une chaîne paraît-elle plus ancienne que ses vidéos ?",
      a: "En général parce que le créateur a ouvert la chaîne tôt et commencé à publier plus tard, ou qu'il a retiré d'anciennes vidéos. C'est très courant et cela ne signifie pas qu'il y a un problème.",
    },
    {
      q: "La date de création est-elle exacte ?",
      a: "Elle provient directement des registres de YouTube via l'API officielle : c'est la même date que celle que YouTube a enregistrée pour la chaîne. Ce n'est pas une estimation.",
    },
    {
      q: "Puis-je coller le lien d'une vidéo au lieu de la chaîne ?",
      a: "Oui. Collez le lien de n'importe quelle vidéo, y compris d'un Short, et l'outil retrouve la chaîne qui l'a mise en ligne, puis affiche sa date de création. Un ID de chaîne (qui commence par UC) fonctionne aussi.",
    },
    {
      q: "Pourquoi l'outil n'affiche-t-il aucun résultat ?",
      a: "C'est généralement le lien. Collez le lien complet de la chaîne, le pseudo ou le lien d'une vidéo. Les anciennes URL personnalisées en /c/ ne fonctionnent pas : utilisez plutôt le @pseudo ou le lien d'une vidéo. Si la chaîne a été supprimée, rendue privée ou fermée, il ne reste rien de public à lire.",
    },
    {
      q: "L'âge d'une chaîne change-t-il si elle est renommée ?",
      a: "Non. La date de création reste la même quand un créateur change le nom, le pseudo ou la photo de la chaîne. Elle reflète seulement le moment où la chaîne a été créée.",
    },
    {
      q: "Pourquoi une chaîne affiche-t-elle une date étrange comme 1970 ?",
      a: "Ce n'est pas une vraie date. Quelques chaînes, dont la chaîne officielle de YouTube elle-même, reviennent de YouTube avec le 1er janvier 1970 comme date de création, ce qui est une valeur par défaut et non le jour de leur création. Aucune date antérieure à 2005, année du lancement de YouTube, ne peut être juste : l'outil affiche donc « Date de création non publique » plutôt qu'un âge erroné.",
    },
  ],
};
