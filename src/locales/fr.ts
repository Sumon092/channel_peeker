import type { LocalizedToolContent } from "@/lib/i18n";

const UPDATED = "7 novembre 2026";
const API_BADGE = "Données YouTube officielles";

export const content: Record<string, LocalizedToolContent> = {
  "/comment-picker": {
    title: "Tirage au sort commentaires YouTube",
    description:
      "Tirez au sort les gagnants de votre concours parmi les commentaires d'une vidéo YouTube — aléatoire cryptographique, une participation par personne, jusqu'à 5 gagnants. Gratuit.",
    heading: "Tirage au sort de commentaires",
    highlight: "Tirage au sort",
    intro: "Vous organisez un concours ? Tirez les gagnants au hasard parmi les commentaires — équité prouvable, avec une animation de suspense à enregistrer pour l'annonce.",
    howTo: [
      "Collez le lien de votre vidéo concours.",
      "En option : mot-clé obligatoire (ex. #concours), une participation par personne, nombre de gagnants.",
      "Cliquez sur « Pick winner » — filmez votre écran pour montrer la transparence du tirage.",
    ],
    meaning: [
      "Les concours en commentaires récompensent votre vrai public, mais choisir en scrollant n'est ni aléatoire ni prouvable. Cet outil charge les commentaires via l'API officielle YouTube et tire les gagnants avec un aléatoire cryptographique, directement dans votre navigateur — nous ne pourrions favoriser personne, même si nous le voulions.",
      "Limites honnêtes : le tirage porte sur les 500 commentaires de premier niveau les plus récents (les réponses ne comptent pas comme participations), et aucun outil au monde ne peut vérifier qui est abonné — YouTube ne publie pas cette information. Vérifiez les conditions d'abonnement manuellement avant l'annonce.",
    ],
    faq: [
      {
        q: "Comment tirer au sort un gagnant parmi des commentaires YouTube ?",
        a: "Collez le lien de la vidéo, réglez vos filtres et cliquez sur « Pick winner ». Le tirage utilise le générateur aléatoire cryptographique de votre navigateur.",
      },
      {
        q: "Le tirage est-il vraiment aléatoire ?",
        a: "Oui — nous utilisons crypto.getRandomValues (la source aléatoire sécurisée du navigateur) avec une sélection sans biais, exécutée sur votre appareil. Enregistrez le tirage si vous voulez une preuve visible pour votre public.",
      },
      {
        q: "L'outil peut-il vérifier que le gagnant est abonné ?",
        a: "Non — aucun outil ne le peut. YouTube ne rend pas les abonnements publics. Vérifiez cette condition manuellement avant d'annoncer le gagnant.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/comment-finder": {
    title: "Rechercher dans les commentaires YouTube",
    description:
      "Cherchez un mot, un nom ou une phrase dans les commentaires de n'importe quelle vidéo YouTube. Tri par top ou récents, export CSV. Gratuit, données officielles.",
    heading: "Recherche de commentaires",
    highlight: "Recherche de commentaires",
    intro: "Cherchez dans les commentaires d'une vidéo — retrouvez un commentaire précis, chaque mention d'un mot, ou votre propre commentaire sous une vidéo virale.",
    howTo: [
      "Collez un lien de vidéo ou de Short.",
      "En option, saisissez un mot, un nom ou une phrase à chercher.",
      "Parcourez les résultats, triés par top ou récents, et téléchargez-les en CSV.",
    ],
    meaning: [
      "La recherche de commentaires de YouTube est très limitée — sur la plupart des appareils, on ne peut que scroller. Cet outil demande à l'API officielle de filtrer les commentaires d'une vidéo selon vos termes : idéal pour retrouver un commentaire à moitié oublié ou collecter des citations pour une recherche.",
      "Nous affichons jusqu'à 100 fils de commentaires de premier niveau par recherche. Sans terme de recherche, « Top » suit le classement de YouTube ; avec un terme, nous trions les résultats par likes. « Plus récents » reste strictement chronologique.",
    ],
    faq: [
      {
        q: "Comment retrouver un commentaire précis sous une vidéo YouTube ?",
        a: "Collez le lien de la vidéo et tapez un mot ou une phrase dont vous vous souvenez. L'API officielle YouTube ne renvoie que les commentaires correspondants.",
      },
      {
        q: "Puis-je retrouver mon propre commentaire ?",
        a: "Oui — cherchez votre nom de chaîne ou une formulation distinctive. Attention : YouTube renvoie les commentaires de premier niveau ; une réponse dans un fil n'apparaît pas séparément.",
      },
      {
        q: "Puis-je exporter les commentaires ?",
        a: "Oui — en CSV avec auteur, texte, likes, nombre de réponses et date.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/thumbnail-tools/thumbnail-downloader": {
    title: "Télécharger miniature YouTube HD & 4K",
    description:
      "Téléchargez la miniature de n'importe quelle vidéo YouTube dans toutes les tailles : HD 1280×720 et, si disponible, 1080p à 4K. Gratuit, sans inscription.",
    heading: "Téléchargeur de miniatures",
    highlight: "miniatures",
    intro: "Récupérez la miniature de n'importe quelle vidéo dans toutes les tailles servies par YouTube — du SD aux nouvelles versions 4K.",
    howTo: [
      "Collez un lien de vidéo ou de Short.",
      "Nous lisons toutes les tailles de miniatures disponibles via l'API officielle.",
      "Ouvrez la taille voulue et enregistrez l'image.",
    ],
    meaning: [
      "YouTube stocke plusieurs résolutions de miniature pour chaque vidéo — de la petite vignette de recherche au « maxres » en 1280×720, et parfois bien au-delà. Nous listons chaque version avec un lien direct, issue de l'API officielle.",
      "Utile pour les références design, l'archivage de vos propres vidéos ou la veille concurrentielle. L'image reste la propriété de la chaîne — téléchargez pour référence, pas pour votre propre branding.",
    ],
    faq: [
      {
        q: "Comment télécharger une miniature YouTube ?",
        a: "Collez le lien de la vidéo ci-dessus, choisissez la taille, clic droit → « Enregistrer l'image sous ». C'est tout.",
      },
      {
        q: "Quelle est la résolution d'une miniature YouTube ?",
        a: "Le HD standard est 1280×720 (« maxresdefault »). Certaines vidéos ont en plus des versions 1080p à 4K, affichées quand YouTube les fournit.",
      },
      {
        q: "Est-ce légal ?",
        a: "Les URL sont publiques — YouTube les sert à chaque visiteur. Les droits restent au créateur ; utilisez les téléchargements pour référence et archivage.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/thumbnail-tools/banner-downloader": {
    title: "Télécharger bannière YouTube en HD",
    description:
      "Téléchargez la bannière de n'importe quelle chaîne YouTube en pleine résolution — TV (2120px), bureau 2× (2560px), tablette et mobile. Gratuit.",
    heading: "Téléchargeur de bannières",
    highlight: "bannières",
    intro: "Récupérez la bannière de n'importe quelle chaîne dans toutes les tailles servies par YouTube — de l'image TV complète au recadrage bureau exact.",
    howTo: [
      "Collez un lien de chaîne, un @handle ou une vidéo de la chaîne.",
      "Nous lisons l'URL de la bannière via l'API officielle YouTube.",
      "Ouvrez la taille qu'il vous faut et enregistrez-la, ou copiez l'URL directe.",
    ],
    meaning: [
      "YouTube stocke une grande image de bannière et la recadre selon l'appareil : les TV affichent l'image complète (~2120×1192), le bureau une bande de 2560×423, tablettes et mobiles des recadrages plus étroits. Nous fournissons des liens directs vers chaque recadrage, plus l'image source.",
      "Pratique pour les références design, l'archivage de vos créations et l'analyse concurrentielle. L'illustration appartient au propriétaire de la chaîne — téléchargez pour référence, pas pour rebrander.",
    ],
    faq: [
      {
        q: "Comment télécharger la bannière d'une chaîne YouTube ?",
        a: "Collez le lien de la chaîne ou son @handle ci-dessus. Nous affichons la bannière dans chaque recadrage — ouvrez, clic droit, « Enregistrer l'image sous ».",
      },
      {
        q: "Quelle est la taille d'une bannière YouTube ?",
        a: "On téléverse en 2560×1440. La TV montre tout, le bureau une bande de 2560×423, et la « zone sûre » visible partout fait 1546×423 au centre.",
      },
      {
        q: "Pourquoi une chaîne n'a-t-elle pas de bannière ?",
        a: "Toutes les chaînes n'en définissent pas. Sans bannière, l'API ne renvoie aucune URL — et nous le disons honnêtement au lieu de deviner.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/monetization-checker": {
    title: "Vérifier la monétisation YouTube",
    description:
      "Vérifiez quelles conditions du Programme Partenaire YouTube une chaîne remplit visiblement : abonnés, pays, activité. Des signaux honnêtes, pas un oui/non inventé.",
    heading: "Vérificateur de monétisation",
    highlight: "monétisation",
    intro: "Voyez quelles conditions du Programme Partenaire une chaîne remplit d'après les données publiques — honnêtement, sans oui/non inventé.",
    howTo: [
      "Collez un lien de chaîne, un @handle ou une vidéo de la chaîne.",
      "Nous vérifions les signaux publics du Programme Partenaire via l'API officielle.",
      "Lisez quelles conditions sont remplies — et lesquelles sont invérifiables publiquement.",
    ],
    meaning: [
      "Depuis 2023, YouTube ne révèle plus publiquement si une chaîne est monétisée. Les sites qui affichent un « oui/non » devinent — par exemple d'après les publicités, qui tournent aussi sur des vidéos non monétisées. Nous montrons à la place quelles conditions visibles (1 000 abonnés, pays de la chaîne, activité) la chaîne remplit.",
      "Le temps de visionnage et les vues Shorts des 90 derniers jours sont privés — seul le propriétaire les voit dans YouTube Studio. Ce que nous affichons est vérifiable ; ce que personne ne peut vérifier, nous ne l'affirmons pas.",
    ],
    faq: [
      {
        q: "Comment savoir si une chaîne YouTube est monétisée ?",
        a: "Avec certitude, uniquement en tant que propriétaire dans YouTube Studio. Publiquement, on ne peut vérifier que les conditions visibles — c'est exactement ce que nous montrons, sans deviner.",
      },
      {
        q: "Que faut-il pour le Programme Partenaire ?",
        a: "Pour la monétisation complète : 1 000 abonnés plus 4 000 heures de visionnage public sur 12 mois ou 10 M de vues Shorts sur 90 jours, dans un pays où le programme existe.",
      },
      {
        q: "Pourquoi pas un simple oui/non ?",
        a: "Parce que c'est invérifiable publiquement. Un honnête « ces signaux sont remplis » est plus utile qu'un oui/non deviné.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/channel-analyzer": {
    title: "Analyser une chaîne YouTube gratuitement",
    description:
      "Analysez n'importe quelle chaîne YouTube gratuitement : abonnés, vues par vidéo, rythme de publication, top vidéos et rapport partageable. Sans inscription.",
    heading: "Analyse de chaîne",
    highlight: "Analyse de chaîne",
    intro: "Collez une chaîne et obtenez ses statistiques, son rythme de publication et ses top vidéos — avec un lien de rapport à partager.",
    howTo: [
      "Collez un lien de chaîne, un @handle ou n'importe quelle vidéo de la chaîne.",
      "Nous chargeons les statistiques publiques via l'API officielle YouTube.",
      "Lisez le rapport — et partagez-le avec qui vous voulez grâce au lien.",
    ],
    meaning: [
      "Le rapport combine de vraies données YouTube (abonnés, vues, nombre de vidéos, âge de la chaîne) et des analyses channelpeeker comme la fréquence de publication et les top vidéos récentes. Tout ce que nous calculons est signalé comme estimation.",
      "À noter : YouTube arrondit les nombres d'abonnés publics à trois chiffres significatifs — d'où le signe ≈. Les vues, elles, sont exactes.",
    ],
    faq: [
      {
        q: "Comment analyser la chaîne YouTube de quelqu'un d'autre ?",
        a: "Collez le lien ou le @handle ci-dessus. Toutes les statistiques publiques viennent directement de l'API officielle YouTube — sans connexion, sans extension.",
      },
      {
        q: "Les nombres d'abonnés sont-ils exacts ?",
        a: "YouTube arrondit les valeurs publiques (123 456 s'affiche 123 000). Nous les marquons d'un ≈. Les vues sont exactes.",
      },
      {
        q: "Puis-je partager le rapport ?",
        a: "Oui — chaque rapport a son propre lien, à envoyer à vos communautés, sponsors ou votre équipe.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/watch-time-calculator": {
    title: "Calculateur de temps de visionnage YouTube",
    description:
      "Convertissez vues et durée moyenne de visionnage en heures de visionnage — et voyez combien de vues il vous manque pour les 4 000 heures.",
    heading: "Calculateur de visionnage",
    highlight: "visionnage",
    intro: "Transformez vues et durée moyenne en heures de visionnage — et mesurez exactement la distance qui vous sépare des 4 000 heures.",
    howTo: [
      "Saisissez un nombre de vues — d'une vidéo ou de votre chaîne.",
      "Saisissez la durée moyenne de visionnage de YouTube Studio (Analytics → Engagement).",
      "Lisez les heures de visionnage — et les vues nécessaires pour atteindre 4 000 heures.",
    ],
    meaning: [
      "Le temps de visionnage, c'est simplement vues × durée moyenne de visionnage. Le Programme Partenaire YouTube exige 4 000 heures de visionnage public sur les 365 derniers jours (plus 1 000 abonnés) — ce calculateur traduit vos chiffres dans cette exigence.",
      "Seul le visionnage public des vidéos longues compte : le temps passé dans le flux Shorts et les vidéos privées ou supprimées sont exclus. Les Shorts ont leur propre voie (10 M de vues en 90 jours). Le calcul est exact ; quelles heures YouTube compte, nous le résumons depuis ses règles publiées.",
    ],
    faq: [
      {
        q: "Comment se calcule le temps de visionnage YouTube ?",
        a: "Vues multipliées par la durée moyenne de visionnage. 100 000 vues à 3:30 de moyenne font 350 000 minutes — environ 5 833 heures.",
      },
      {
        q: "Combien de vues pour 4 000 heures ?",
        a: "Cela dépend de la durée moyenne : à 2 minutes, environ 120 000 vues ; à 5 minutes, environ 48 000. Saisissez votre moyenne ci-dessus pour le chiffre exact.",
      },
      {
        q: "Les Shorts comptent-ils pour les 4 000 heures ?",
        a: "Non — le visionnage dans le flux Shorts ne compte pas. Les Shorts ont leur propre voie de monétisation : 10 millions de vues publiques en 90 jours.",
      },
    ],
    dataBadge: "Calcul transparent",
    updated: UPDATED,
  },
  "/video-upload-date-checker": {
    title: "Date de publication d'une vidéo YouTube",
    description:
      "Trouvez la date et l'heure exactes de publication d'une vidéo YouTube — à la minute près, dans votre fuseau horaire et en UTC. Gratuit, données officielles.",
    heading: "Vérificateur de date de publication",
    highlight: "date de publication",
    intro: "YouTube affiche « il y a 2 ans » — ici vous voyez la date et l'heure exactes de publication, à la minute près.",
    howTo: [
      "Collez un lien de vidéo ou de Short.",
      "Nous lisons l'horodatage exact depuis l'API officielle YouTube.",
      "Copiez le résultat — dans votre fuseau horaire et en UTC.",
    ],
    meaning: [
      "La page de lecture arrondit les dates en « il y a X ans », mais l'API conserve l'horodatage exact de publication — l'instant où la vidéo est devenue publique. Nous l'affichons dans votre fuseau local et en UTC, avec l'âge précis.",
      "Les dates exactes comptent pour les citations, le fact-checking (« quelle vidéo était la première ? »), les questions de droits d'auteur et la recherche. Note : pour les premières et les vidéos passées de privé à public, l'horodatage correspond à la mise en ligne publique, pas au téléversement du fichier.",
    ],
    faq: [
      {
        q: "Comment voir la date exacte de publication d'une vidéo YouTube ?",
        a: "Collez son lien ici. YouTube n'affiche que des dates relatives ; l'API fournit l'horodatage exact, que nous affichons à la minute près.",
      },
      {
        q: "Est-ce l'heure de téléversement ou de publication ?",
        a: "De publication — l'instant où la vidéo est devenue publique. Pour les premières, cela peut différer du téléversement du fichier.",
      },
      {
        q: "Quel fuseau horaire est utilisé ?",
        a: "Les deux : celui de votre navigateur et l'UTC — pour des citations sans ambiguïté.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
};
