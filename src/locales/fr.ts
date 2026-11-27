import type { LocalizedToolContent } from "@/lib/i18n";

const UPDATED = "22 novembre 2026";
const API_BADGE = "Données YouTube officielles";

export const content: Record<string, LocalizedToolContent> = {
  "/comment-picker": {
    title: "Tirage au sort commentaires YouTube",
    description:
      "Tirez au sort les gagnants de votre concours parmi les commentaires d'une vidéo YouTube — aléatoire cryptographique, jusqu'à 5 gagnants. Gratuit.",
    heading: "Tirage au sort de commentaires",
    highlight: "Tirage au sort",
    intro: "Vous organisez un concours ? Tirez les gagnants au hasard parmi les commentaires — équité prouvable, avec une animation de suspense à enregistrer pour l'annonce.",
    howTo: [
      "Collez le lien de votre vidéo concours.",
      "En option : mot-clé obligatoire (ex. #concours), une participation par personne, nombre de gagnants.",
      "Cliquez sur « Tirer le gagnant » — filmez votre écran pour montrer la transparence du tirage.",
    ],
    meaning: [
      "Les concours en commentaires récompensent votre vrai public, mais choisir en scrollant n'est ni aléatoire ni prouvable. Cet outil charge les commentaires via l'API officielle YouTube et tire les gagnants avec un aléatoire cryptographique, directement dans votre navigateur — nous ne pourrions favoriser personne, même si nous le voulions.",
      "Limites honnêtes : le tirage porte sur les 500 commentaires de premier niveau les plus récents (les réponses ne comptent pas comme participations), et aucun outil au monde ne peut vérifier qui est abonné — YouTube ne publie pas cette information. Vérifiez les conditions d'abonnement manuellement avant l'annonce.",
      "Un gagnant ne se manifeste pas ? Cliquez sur « Relancer le tirage » : pas besoin de recharger les commentaires. Et si vous voulez simplement lire ou fouiller les commentaires plutôt que tirer au sort, notre outil de recherche de commentaires est fait pour ça.",
    ],
    faq: [
      {
        q: "Comment tirer au sort un gagnant parmi des commentaires YouTube ?",
        a: "Collez le lien de la vidéo, réglez vos filtres et cliquez sur « Tirer le gagnant ». Le tirage utilise le générateur aléatoire cryptographique de votre navigateur.",
      },
      {
        q: "Le tirage est-il vraiment aléatoire ?",
        a: "Oui — nous utilisons crypto.getRandomValues (la source aléatoire sécurisée du navigateur) avec une sélection sans biais, exécutée sur votre appareil. Enregistrez le tirage si vous voulez une preuve visible pour votre public.",
      },
      {
        q: "L'outil peut-il vérifier que le gagnant est abonné ?",
        a: "Non — aucun outil ne le peut. YouTube ne rend pas les abonnements publics. Vérifiez cette condition manuellement avant d'annoncer le gagnant.",
      },
      {
        q: "Combien de commentaires l'outil charge-t-il ?",
        a: "Jusqu'aux 500 commentaires principaux les plus récents. Pour un gros concours, exigez un mot-clé afin que toutes les vraies participations restent dans le lot, ou lancez le tirage peu après la clôture.",
      },
      {
        q: "Peut-on tirer plusieurs gagnants ?",
        a: "Oui, jusqu'à 5 d'un coup, sans doublon. Un message d'annonce prêt à copier est fourni avec.",
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
      "Les fils de réponses sont comptés, mais pas dépliés. Et c'est YouTube qui décide quels commentaires correspondent à votre recherche : si rien ne remonte, essayez une autre orthographe ou un mot plus court.",
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
      {
        q: "Pourquoi 100 commentaires au maximum ?",
        a: "Chaque recherche récupère une page de 100 fils de commentaires au plus. Sur une vidéo très commentée, mieux vaut affiner les mots-clés pour trouver ce que vous cherchez dans cette page.",
      },
      {
        q: "Pourquoi l'outil indique-t-il que les commentaires sont désactivés ?",
        a: "Quand le créateur a fermé les commentaires, ou que la vidéo est conçue pour les enfants, l'API YouTube ne renvoie aucun commentaire. Nous l'indiquons tel quel au lieu de deviner.",
      },
      {
        q: "Est-ce que ça marche sur mobile ?",
        a: "Oui, directement dans le navigateur de votre téléphone, sans appli ni compte. Copiez le lien depuis le bouton Partager de l'appli YouTube et collez-le ici.",
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
      "Les tailles proposées varient d'une vidéo à l'autre, car nous n'affichons que celles qui existent vraiment. Depuis 2026, YouTube fournit pour certaines vidéos des versions 1080p, 1440p et 4K. La plupart des créateurs envoient leur miniature en HD : c'est la version « résolution maximale », en 1280×720, absente sur certaines vidéos anciennes ou de faible qualité. S'y ajoutent des copies plus petites, utilisées dans le fil, la recherche et les lecteurs intégrés.",
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
      {
        q: "Pourquoi n'y a-t-il pas de miniature HD ?",
        a: "YouTube ne crée la version 1280×720 que si la vidéo ou la miniature personnalisée a été envoyée en HD. Les vidéos anciennes ou en basse résolution n'ont que les petites tailles.",
      },
      {
        q: "Peut-on télécharger une miniature YouTube en 4K ?",
        a: "Oui, quand YouTube en dispose. Depuis 2026, certaines vidéos ont des miniatures en 1080p, 1440p et 4K ; elles apparaissent automatiquement dans la liste.",
      },
      {
        q: "Ça fonctionne avec les Shorts ?",
        a: "Oui. Collez un lien youtube.com/shorts/ pour obtenir la miniature du Short dans toutes les tailles disponibles.",
      },
      {
        q: "Peut-on récupérer les miniatures de plusieurs vidéos d'un coup ?",
        a: "Oui : passez en mode « En lot », collez jusqu'à 20 liens et exportez tous les liens d'images en CSV.",
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
      {
        q: "Est-ce légal ?",
        a: "Les adresses des images sont publiques : YouTube les sert à tous les visiteurs. Le visuel, lui, reste la propriété du créateur. Téléchargez-le pour vous inspirer ou archiver, pas pour en faire votre propre identité visuelle.",
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
      "Le rapport porte sur les 50 dernières vidéos publiques de la chaîne. La case « Mises en ligne (90 jours) » indique combien sont sorties ces trois derniers mois, de quoi voir d'un coup d'œil si la chaîne est encore active. Le graphique « Vues par mise en ligne » les aligne dans l'ordre : les vidéos qui ont décollé comme les passages à vide sautent aux yeux.",
      "À noter : YouTube arrondit les nombres d'abonnés publics à trois chiffres significatifs — d'où le signe ≈. Les vues, elles, sont exactes.",
      "Durée de visionnage, impressions, taux de clics : ces chiffres sont réservés au propriétaire de la chaîne. Aucun outil extérieur ne peut les afficher pour une autre chaîne.",
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
      {
        q: "L'analyse de chaîne est-elle gratuite ?",
        a: "Oui. Ni compte ni extension : l'outil lit uniquement des données publiques via l'API officielle YouTube Data.",
      },
      {
        q: "Combien de vidéos sont analysées ?",
        a: "Les 50 dernières mises en ligne publiques. C'est suffisant pour mesurer le rythme et les performances du moment sans remonter toute l'histoire de la chaîne.",
      },
      {
        q: "Pourquoi pas de durée de visionnage ni de taux de clics ?",
        a: "YouTube les réserve au propriétaire de la chaîne. Les outils qui prétendent les afficher pour d'autres chaînes font des suppositions.",
      },
      {
        q: "Les chiffres sont-ils en temps réel ?",
        a: "Presque. Les résultats sont gardés en cache quelques instants pour rester rapides et respecter le quota de l'API YouTube. Chaque rapport indique précisément quand ses données ont été récupérées.",
      },
    ],
    dataBadge: API_BADGE,
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
      {
        q: "Comment trouver la date de publication d'un Short ?",
        a: "Collez simplement le lien du Short : l'outil accepte les liens youtube.com/shorts/ comme ceux des vidéos classiques. C'est souvent le plus rapide, puisque le lecteur Shorts n'affiche pas la date à l'écran.",
      },
      {
        q: "Peut-on voir la date sans passer par un outil ?",
        a: "En partie. Une fois la description dépliée, YouTube indique généralement le jour de publication, mais ni l'heure ni le fuseau horaire. Pour une citation précise, ou pour départager deux vidéos sorties le même jour, il faut l'horodatage complet.",
      },
      {
        q: "L'outil est-il gratuit ?",
        a: "Oui. Pas de compte à créer, rien à installer : il interroge directement les données officielles de YouTube.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
};
