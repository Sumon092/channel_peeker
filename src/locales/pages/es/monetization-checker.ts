import type { LocalizedPageContent } from "@/lib/localized-page";
import { REQUIREMENTS_2027_ID } from "@/lib/monetization";
import { NICHES, nicheRpm } from "@/lib/revenue-data";

const ESTIMATOR = "/revenue-calculator/channel-earnings-estimator"; // English only
const WATCH_TIME = "/es/watch-time-calculator";
const ANALYZER = "/es/channel-analyzer";
const YPP_CHANGES = "https://support.google.com/youtube/answer/12843009?hl=es-419";
const YPP_HELP = "https://support.google.com/youtube/answer/72851?hl=es-419";

const NICHE_NAMES: Record<string, string> = {
  finance: "Finanzas e inversión",
  business: "Negocios y marketing",
  tech: "Tecnología y software",
  education: "Educación y tutoriales",
  health: "Salud y fitness",
  food: "Comida y cocina",
  gaming: "Videojuegos",
  entertainment: "Entretenimiento y vlogs",
};
const usd = (n: number) => `US$${n.toFixed(2)}`;
const RPM_ROWS = Object.keys(NICHE_NAMES).map((id) => {
  const r = nicheRpm(NICHES.find((n) => n.id === id)!);
  return [NICHE_NAMES[id], `${usd(r.low)} – ${usd(r.high)}`];
});

export const content: LocalizedPageContent = {
  title: "Verificador de monetización de YouTube: ¿este canal está monetizado?",
  description:
    "Revisa cualquier canal de YouTube según las reglas del Programa de socios, incluidos los cambios de febrero de 2027. Mira las señales públicas y lo que de verdad significan. Gratis.",
  heading: "Verificador de monetización de YouTube",
  highlight: "Verificador de monetización",
  intro:
    "Averigua si un canal de YouTube cumple los requisitos del Programa de socios y qué dicen sus señales públicas sobre la monetización. Pega el enlace de un canal, un @usuario o el enlace de un video.",
  updated: "27 de noviembre de 2026",
  dataBadge: "Datos oficiales de YouTube",
  afterTool: [
    {
      p: "Algo que conviene saber antes de empezar: YouTube no publica si un canal está monetizado. Solo el dueño lo ve en YouTube Studio. Lo que una herramienta sí puede hacer es revisar los requisitos públicos, leer las pistas que deja un canal monetizado y ser honesta con todo lo demás. Eso es justo lo que hace este verificador.",
    },
  ],
  howTo: [
    "**Pega el canal.** Usa el @usuario, la URL del canal, el ID del canal o el enlace de cualquiera de sus videos, Shorts o transmisiones en vivo.",
    "**Haz la revisión.** Miramos los suscriptores, el país, las subidas recientes y la configuración “creado para niños” del canal, y los comparamos con los dos niveles del Programa de socios.",
    "**Lee el veredicto.** Cada requisito aparece como cumplido, parcialmente cumplido, no cumplido o no público, para que veas exactamente qué está confirmado y qué no.",
  ],
  before: [
    {
      eyebrow: "La tarjeta de resultado",
      title: "Lo que verás en el resultado",
      blocks: [
        { p: "Esto es lo que mostró el resultado cuando revisamos @veritasium el 27 de noviembre de 2026:" },
        {
          ul: [
            "**Canal:** foto, nombre (Veritasium) y usuario, con ≈ 21.5 M de suscriptores y 555 videos.",
            "**Cuenta regresiva:** “Faltan 66 días para que entren en vigor los nuevos requisitos de YouTube para ingresos por anuncios”, con un enlace a los requisitos de 2027 más abajo. Desaparece el 1 de febrero de 2027.",
            "**Nivel de financiación de fans:** “Cumple todos los requisitos públicos”. Al menos 500 suscriptores (donde esté disponible): cumplido, ≈ 21.5 M. 3 subidas públicas en los últimos 90 días: cumplido, 25 subidas. País del Programa de socios: cumplido, Estados Unidos. No es un canal creado para niños: cumplido. 3,000 horas de reproducción o 3 M de vistas de Shorts: no público.",
            "**Nivel de ingresos por anuncios:** “Cumple todos los requisitos públicos”. Al menos 1,000 suscriptores: cumplido, ≈ 21.5 M. País: cumplido. No es creado para niños: cumplido. 4,000 horas de reproducción o 10 M de vistas de Shorts: no público, con una nota de que desde el 1 de febrero de 2027 quienes soliciten por primera vez necesitarán 8,000 horas o 20 M de vistas de Shorts. Las subidas recientes no cuentan aquí.",
            "**Ambos niveles:** sin faltas activas y cumpliendo las políticas de monetización: no público.",
            "**Mantenerse activo:** 25 subidas públicas en los últimos 90 días, suficientes para la regla de 2027 sean del tipo que sean. El conteo junta videos largos y Shorts, porque los datos públicos de YouTube no permiten separarlos de forma fiable. Es solo informativo y no cambia el veredicto.",
            "**Compruébalo tú mismo:** un botón “Abrir el canal en YouTube” y cuatro casillas (botón “Unirse”, pestaña Tienda o estante de productos, Súper gracias o Súper chat, anuncios en videos recientes), cada una con una línea sobre cuánto pesa esa pista.",
            "**Nuestra lectura:** “Posiblemente monetizado” sin nada marcado, porque se cumplen los requisitos públicos. Al marcar “Veo un botón ‘Unirse’” cambia a “Muy probablemente monetizado”. Nada de lo que marques se guarda.",
            "**Ganancias mensuales estimadas:** unos US$22,900 a US$91,600, con la etiqueta “Estimación, no un pago”. Se calcula con las vistas de los 11 videos subidos en los últimos 30 días, suponiendo un nicho mixto y una audiencia de EE. UU., Reino Unido, Canadá o Australia. Solo aparece cuando el canal cumple los requisitos públicos de ingresos por anuncios. Si no, el recuadro dice “No se muestra: este canal no cumple los requisitos públicos de ingresos por anuncios.”",
            "**Estimar ganancias:** abre el estimador de ganancias (en inglés) con @veritasium ya escrito, donde eliges el nicho y la audiencia para ver el desglose completo.",
            "**Revisados recientemente:** tus últimos 5 canales aparecen debajo del cuadro de búsqueda, con un botón Borrar. Haz clic en uno para revisarlo otra vez. La lista se queda solo en tu navegador.",
            "**Copiar enlace:** copia un enlace para compartir (channelpeeker.com/es/monetization-checker?c=@veritasium) que abre la herramienta y hace la misma revisión.",
            "**Cuándo se obtuvieron los datos,** para que sepas qué tan recientes son.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "Requisitos de monetización de YouTube, hoy y desde el 1 de febrero de 2027",
    id: REQUIREMENTS_2027_ID,
    blocks: [
      {
        p: "YouTube tiene dos niveles de monetización. El primero desbloquea la financiación de fans. El segundo agrega una parte de los ingresos por anuncios y de Premium. El 1 de febrero de 2027, las metas de horas de reproducción y de vistas de Shorts del segundo nivel se duplican para los canales nuevos. El requisito de suscriptores se queda en 1,000.",
      },
      {
        table: {
          corner: true,
          head: ["", "Financiación de fans", "Ingresos por anuncios, hasta el 31 de enero de 2027", "Ingresos por anuncios, desde el 1 de febrero de 2027"],
          rows: [
            ["Suscriptores", "500", "1,000", "1,000"],
            ["Subidas públicas", "3 en los últimos 90 días", "–", "–"],
            ["Horas de reproducción (últimos 365 días)", "3,000", "4,000", "8,000"],
            ["O vistas de Shorts (últimos 90 días)", "3 millones", "10 millones", "20 millones"],
            ["Qué desbloquea", "Membresías del canal, Supers, Shopping", "Todo lo anterior, más ingresos por anuncios y YouTube Premium", "Lo mismo"],
          ],
        },
      },
      { p: "Los ingresos de YouTube Premium son una parte de lo que pagan los suscriptores de Premium cuando ven tus videos." },
      { p: "Algunos puntos que conviene saber:" },
      {
        ul: [
          "El cambio de 2027 solo aplica a quienes soliciten por primera vez. Los canales que ya están en el Programa de socios conservan su estado.",
          "El nivel de financiación de fans no cambia.",
          "El nivel de 500 suscriptores solo existe en algunos países. En el resto, los canales empiezan en 1,000.",
          "También necesitas cumplir las políticas de monetización de YouTube, no tener faltas activas por incumplimiento de los Lineamientos de la Comunidad y vivir en un país donde el Programa de socios esté disponible.",
        ],
      },
      { h3: "Qué más cambia en 2027 para los canales monetizados" },
      {
        ul: [
          "**Mantenerse activo:** desde el 1 de febrero de 2027, un canal monetizado necesita al menos una de estas opciones: 1,000 horas de reproducción en el último año, 1 millón de vistas de Shorts en los últimos 90 días, o 2 videos largos o 5 Shorts subidos cada 90 días. Los canales que no lleguen tienen 90 días para ponerse al día.",
          "**Ganancias con Shorts:** para recibir dinero del fondo para creadores de Shorts cada mes, un canal necesita 10 millones de vistas de Shorts en los últimos 90 días. No alcanzarlo no afecta las ganancias de los videos largos.",
          "**Nuevas condiciones:** los canales que ya están en el programa deben aceptar las condiciones actualizadas en YouTube Studio antes del 31 de enero de 2027. Si no, dejan de ganar con las funciones afectadas.",
        ],
      },
      { p: `El anuncio completo de YouTube está en su página de [cambios en el Programa de socios de YouTube](${YPP_CHANGES}).` },
    ],
  },
  after: [
    {
      eyebrow: "Señales visibles",
      title: "Cómo saber si un canal está monetizado sin una herramienta",
      blocks: [
        { p: "Puedes detectar tú mismo la mayoría de las pistas públicas. Algunas pesan mucho más que otras." },
        {
          ul: [
            "**Un botón “Unirse” junto a Suscribirse.** Las membresías del canal solo existen para canales del Programa de socios, así que es la señal pública más fuerte que hay.",
            "**Súper gracias, Súper chat o Súper stickers.** También son funciones del Programa de socios.",
            "**Una pestaña Tienda o un estante de productos.** Normalmente significa que Shopping está activado, y eso también requiere el Programa de socios.",
            `**Anuncios en los videos.** Es la pista más débil. [YouTube puede mostrar anuncios en cualquier video, incluso en canales que no están en el programa y no reciben nada por esos anuncios.](${YPP_HELP})`,
            "**El número de suscriptores.** Un canal con menos de 500 suscriptores casi seguro todavía no califica.",
          ],
        },
        { p: "Ninguna pista sola es una prueba. Un botón “Unirse” dice mucho. Los anuncios, por sí solos, dicen muy poco." },
        { p: "Nuestro verificador recorre estas pistas contigo y las combina con los requisitos públicos en un nivel de confianza." },
      ],
    },
    {
      eyebrow: "Videos individuales",
      title: "¿Se puede saber si un video o un Short concreto está monetizado?",
      blocks: [
        {
          p: "No con certeza. Incluso en un canal monetizado, un video puede no ganar nada. Puede ser creado para niños, tener anuncios limitados por su tema o incluir música que otra persona reclamó. Las pausas publicitarias que ves mientras miras no prueban que el creador esté cobrando. Si pegas aquí el enlace de un video o de un Short, revisamos el canal que está detrás, porque esa es la parte pública.",
        },
      ],
    },
    {
      eyebrow: "Razones comunes",
      title: "Por qué un canal podría no estar monetizado todavía",
      blocks: [
        {
          ul: [
            `**Pocas horas de reproducción o vistas de Shorts.** Es, por mucho, la razón más común. Usa la [calculadora de tiempo de reproducción](${WATCH_TIME}) para ver cuánto te falta.`,
            "**Contenido reutilizado o repetitivo.** YouTube rechaza canales que sobre todo vuelven a subir videos de otros o producen en masa videos casi idénticos.",
            "**Contenido creado para niños.** Estos canales pueden entrar, pero ganan menos: sin anuncios personalizados y sin membresías ni Supers.",
            "**Ubicación.** El Programa de socios no está disponible en todos los países.",
            "**Faltas.** Una falta activa por incumplimiento de los Lineamientos de la Comunidad puede bloquear o retrasar la aprobación.",
            "**Nunca lo solicitó.** Alcanzar los números no te inscribe de forma automática. Tienes que postularte en YouTube Studio, en Ingresos.",
          ],
        },
      ],
    },
    {
      eyebrow: "Tu propio canal",
      title: "Cómo revisar tu propio canal",
      blocks: [
        {
          p: "Abre YouTube Studio y ve a Ingresos. Ahí verás tus horas de reproducción, vistas de Shorts y suscriptores exactos, cuánto te falta para cada nivel y el estado de tu solicitud si ya te postulaste. Es la única respuesta oficial. Una herramienta como esta sirve para revisar otros canales o echar un vistazo rápido a lo que es público.",
        },
        { p: `¿Quieres saber cuánto podría ganar un canal monetizado? Prueba el [estimador de ganancias](${ESTIMATOR}) (en inglés).` },
      ],
    },
    {
      eyebrow: "Próximos pasos",
      title: "Quién usa un verificador de monetización y qué hacer después",
      blocks: [
        { p: "Cada quien revisa por una razón distinta, y el siguiente paso depende de la tuya." },
        {
          ul: [
            `**Creadores que siguen su propio progreso.** Revisa aquí lo que es público y luego abre la sección Ingresos de YouTube Studio para ver tus horas de reproducción exactas. Si estás cerca, la [calculadora de tiempo de reproducción](${WATCH_TIME}) te muestra cuántas vistas más necesitas.`,
            `**Marcas y agencias que evalúan un patrocinio.** Un canal monetizado pasó la revisión del propio YouTube, y eso ya dice algo de su contenido. Mira las subidas y vistas recientes del canal en el [analizador de canales](${ANALYZER}) antes de firmar nada.`,
            `**Creadores que miden a la competencia.** Si un rival de tu nicho está monetizado, el [estimador de ganancias](${ESTIMATOR}) (en inglés) te da una idea aproximada de lo que puede pagar el nicho.`,
            "**Quienes compran o venden un canal.** Nunca creas un “monetizado” solo de palabra. Pídele al vendedor que comparta en vivo su pantalla con la página Ingresos de YouTube Studio. Es la prueba más confiable, porque las capturas de pantalla se pueden editar.",
          ],
        },
      ],
    },
    {
      eyebrow: "Shorts y en vivo",
      title: "Monetización de Shorts y transmisiones en vivo en YouTube",
      id: "shorts-and-live",
      blocks: [
        {
          p: "Los Shorts tienen su propio camino al Programa de socios. En lugar de horas de reproducción, un canal puede calificar con vistas de Shorts: 10 millones en los últimos 90 días hoy, o 20 millones para quienes soliciten por primera vez desde el 1 de febrero de 2027, más 1,000 suscriptores. El tiempo de reproducción del feed de Shorts no cuenta para la meta de horas de reproducción, así que no se pueden sumar las dos cosas.",
        },
        {
          p: "Las ganancias con Shorts también funcionan distinto. El dinero de los anuncios del feed de Shorts va a un fondo compartido, el fondo para creadores de Shorts, que se reparte entre los creadores según su parte de las vistas. Desde el 1 de febrero de 2027, un canal monetizado necesita mantener 10 millones de vistas de Shorts cada 90 días para seguir cobrando de ese fondo. No alcanzarlo no afecta las ganancias de los videos largos.",
        },
        {
          p: "Las transmisiones en vivo son más sencillas. El tiempo de reproducción de una transmisión pública cuenta para las horas de reproducción, siempre que la repetición siga pública. Los canales monetizados también pueden ganar con Súper chat y Súper stickers durante la transmisión. Puedes pegar el enlace de una transmisión en vivo en el verificador, y revisará el canal que está detrás.",
        },
      ],
    },
    {
      eyebrow: "Solicitud",
      title: "Cómo solicitar la monetización de YouTube",
      blocks: [
        { p: "Cuando tu canal cumple los requisitos, te postulas en YouTube Studio. Es gratis y toma unos minutos." },
        {
          ol: [
            "Activa la verificación en 2 pasos de tu Cuenta de Google. YouTube la exige.",
            "Abre YouTube Studio y selecciona Ingresos en el menú de la izquierda.",
            "Haz clic en Postularse ahora, revisa y acepta las condiciones del Programa de socios.",
            "Crea una cuenta de AdSense para YouTube o vincula una que ya tengas. Así es como YouTube te paga.",
            "Espera la revisión. Los sistemas y revisores de YouTube evalúan tu canal en conjunto, y la revisión puede tardar hasta 30 días. Puedes seguir el estado en Ingresos.",
          ],
        },
        {
          p: "Si te rechazan, YouTube te dice por qué. Después de un primer rechazo, puedes volver a postularte a los 30 días, o apelar dentro de los 21 días si crees que la decisión fue un error.",
        },
      ],
    },
    {
      eyebrow: "Ganancias",
      title: "¿Cuánto ganan los canales monetizados?",
      blocks: [
        {
          p: "Depende mucho más del tema que del número de vistas. Los anunciantes pagan más por llegar a personas a punto de gastar dinero, así que un canal de finanzas o de software puede ganar varias veces más por vista que uno de videojuegos o entretenimiento con una audiencia del mismo tamaño.",
        },
        {
          p: "Las ganancias suelen medirse en RPM (ingresos por cada mil vistas): lo que gana un creador por cada 1,000 vistas después de la parte de YouTube, contando todas sus vistas, incluso las que no tuvieron anuncios.",
        },
        {
          table: {
            head: ["Nicho", "Rango estimado de RPM (US$ por cada 1,000 vistas)"],
            rows: RPM_ROWS,
            caption: "Para una audiencia de EE. UU., Reino Unido, Canadá o Australia, según los supuestos del estimador de ganancias.",
          },
        },
        {
          p: "Son estimaciones, no pagos. Tu RPM real depende de dónde está tu audiencia, la duración de tus videos, la época del año y cuántos anuncios muestran tus videos.",
        },
        { p: `Para una cifra aproximada de cualquier canal, prueba el [estimador de ganancias](${ESTIMATOR}) (en inglés).` },
      ],
    },
    {
      eyebrow: "Por video",
      title: "¿Cada video gana dinero cuando el canal está monetizado?",
      blocks: [
        {
          p: "No. Estar en el Programa de socios significa que un canal puede ganar, no que cada video lo haga. Los videos con anuncios limitados (por ejemplo, por lenguaje fuerte o temas delicados), los videos creados para niños y los videos en los que otra persona reclamó la música o las imágenes pueden ganar poco o nada. Por eso también dos canales con las mismas vistas pueden ganar cantidades muy distintas. El tema, la ubicación de la audiencia y la duración del video cambian lo que vale una vista con anuncio.",
        },
      ],
    },
    {
      eyebrow: "Conservarla",
      title: "¿Un canal puede perder la monetización?",
      blocks: [
        { p: "Sí. Entrar no es para siempre, y YouTube sigue revisando los canales que ya están en el programa. Las razones más comunes para perderla:" },
        {
          ul: [
            "**Quedarse en silencio.** YouTube puede desactivar la monetización de los canales que llevan 6 meses sin subir un video ni publicar nada. Desde el 1 de febrero de 2027, los canales monetizados también deben mantenerse activos: 2 videos largos o 5 Shorts cada 90 días, o 1,000 horas de reproducción en un año, o 1 millón de vistas de Shorts en 90 días.",
            "**Incumplir las políticas de monetización.** El contenido reutilizado, los videos producidos en masa o los metadatos engañosos pueden sacar a un canal del programa, incluso después de aprobado.",
            "**No aceptar las nuevas condiciones.** Los canales que ya están en el programa deben aceptar las condiciones actualizadas de YouTube antes del 31 de enero de 2027, o dejan de ganar con las funciones afectadas.",
          ],
        },
      ],
    },
    {
      eyebrow: "Por qué cambian los resultados",
      title: "Por qué distintos verificadores de monetización dan respuestas diferentes",
      blocks: [
        {
          p: "Si probaste varios verificadores, seguro viste que no coinciden. Es porque ninguno puede ver los registros reales de YouTube. Cada uno lee pistas públicas distintas y les da un peso distinto. Algunos toman los anuncios de un video como prueba, aunque YouTube puede mostrar anuncios en canales a los que no se les paga por ellos. Otros extraen señales de las páginas de YouTube, lo que falla cada vez que YouTube cambia el diseño. Y otros dan un sí o un no muy seguro que los datos no alcanzan a respaldar.",
        },
        {
          p: "Preferimos ser claros con lo que no se sabe. Este verificador muestra qué requisitos están confirmados, cuáles no son públicos y cuánto pesa en realidad cada pista que puedes revisar tú mismo.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "¿Esta herramienta puede decir con certeza si un canal está monetizado?",
      a: "No, y ninguna herramienta externa puede. YouTube mantiene el estado de monetización en privado entre la plataforma y el dueño del canal. Este verificador te dice qué requisitos públicos cumple un canal y qué sugieren las pistas públicas, y marca todo lo demás como no público.",
    },
    {
      q: "¿Cuáles son los requisitos de monetización de YouTube ahora?",
      a: "Hasta el 31 de enero de 2027, los ingresos por anuncios requieren 1,000 suscriptores más 4,000 horas de reproducción en los últimos 365 días o 10 millones de vistas de Shorts en los últimos 90 días. En algunos países existe un nivel previo de financiación de fans con 500 suscriptores, 3 subidas públicas en los últimos 90 días y 3,000 horas de reproducción o 3 millones de vistas de Shorts.",
    },
    {
      q: "¿Los requisitos de monetización cambian en 2027?",
      a: "Sí. Desde el 1 de febrero de 2027, los canales nuevos que soliciten ingresos por anuncios necesitarán 1,000 suscriptores más 8,000 horas de reproducción en los últimos 365 días o 20 millones de vistas de Shorts en los últimos 90 días. El nivel de financiación de fans de 500 suscriptores sigue igual.",
    },
    {
      q: "Ya estoy monetizado. ¿Ahora necesito 8,000 horas?",
      a: "No. La meta más alta es solo para quienes soliciten por primera vez. Lo que sí debes hacer es aceptar las condiciones actualizadas de YouTube en Studio antes del 31 de enero de 2027 y, desde el 1 de febrero de 2027, mantener tu canal activo para conservar tu lugar en el programa.",
    },
    {
      q: "¿Un canal se puede monetizar con 500 suscriptores?",
      a: "En parte. En los países con el nivel de financiación de fans, 500 suscriptores más los requisitos de subidas y de horas de reproducción desbloquean membresías del canal, Supers y Shopping. Los ingresos por anuncios siguen necesitando 1,000 suscriptores.",
    },
    {
      q: "¿Ver anuncios en un video significa que el canal está monetizado?",
      a: "No. YouTube puede mostrar anuncios en cualquier video, incluso en canales fuera del Programa de socios, y esos creadores no reciben nada. Un botón “Unirse” es una señal mucho mejor.",
    },
    {
      q: "¿Por qué no pueden revisar las horas de reproducción?",
      a: "Las horas de reproducción son privadas. Solo el dueño del canal las ve en YouTube Studio, y los datos públicos de YouTube no las incluyen. Puedes estimar las tuyas con la calculadora de tiempo de reproducción.",
      link: { text: "calculadora de tiempo de reproducción", href: WATCH_TIME },
    },
    {
      q: "¿Por qué el número de suscriptores es aproximado?",
      a: "YouTube redondea los suscriptores públicos de más de 1,000 a tres cifras significativas, así que 1,234 aparece como 1.23 K. Por debajo de 1,000 el número es exacto, y es justo en ese rango donde importan los límites.",
    },
    {
      q: "¿Los canales creados para niños ganan menos?",
      a: "Por lo general, sí. Los videos creados para niños no reciben anuncios personalizados, y funciones como las membresías del canal, los Supers y los comentarios están desactivadas, lo que elimina varias formas de ganar dinero.",
    },
    {
      q: "¿Cómo se monetizan los Shorts?",
      a: "Hay dos cifras distintas. Para entrar al Programa de socios por los Shorts, un canal necesita 1,000 suscriptores y 10 millones de vistas de Shorts en 90 días, que suben a 20 millones para quienes soliciten por primera vez desde el 1 de febrero de 2027. Una vez dentro, desde el 1 de febrero de 2027, el canal necesita mantener 10 millones de vistas de Shorts cada 90 días para seguir cobrando del fondo para creadores de Shorts. Encontrarás más detalles en la sección de Shorts de arriba.",
      link: { text: "sección de Shorts", href: "#shorts-and-live" },
    },
    {
      q: "¿Cuánto gana un canal monetizado?",
      a: "Varía muchísimo según el tema, la ubicación de la audiencia y la duración de los videos. Los canales de finanzas y tecnología pueden ganar muchas veces más por vista que los de entretenimiento. Nuestro estimador de ganancias (en inglés) te da un rango realista.",
      link: { text: "estimador de ganancias", href: ESTIMATOR },
    },
    {
      q: "¿Puedo revisar mi propio canal con esta herramienta?",
      a: "Sí. Pega tu @usuario para ver lo que es público. Para tus horas de reproducción exactas y el estado de tu solicitud, ve a YouTube Studio y abre Ingresos.",
    },
    {
      q: "¿Cuánto tarda YouTube en revisar una solicitud de monetización?",
      a: "Hasta 30 días. Mientras está en revisión, el estado aparece en la sección Ingresos de YouTube Studio.",
    },
    {
      q: "¿Qué pasa si rechazan mi solicitud de monetización?",
      a: "YouTube te dice el motivo principal. Después de un primer rechazo, puedes volver a postularte a los 30 días. Si crees que la decisión fue un error, puedes apelar dentro de los 21 días.",
    },
    {
      q: "¿Cuál es la diferencia entre ser apto y estar monetizado?",
      a: "Apto significa que un canal alcanza los números: suscriptores más horas de reproducción o vistas de Shorts. Monetizado significa que se postuló, pasó la revisión de YouTube y fue aceptado. Muchos canales aptos no están monetizados porque todavía no se postularon o fueron rechazados.",
    },
    {
      q: "¿Un canal monetizado puede perder la monetización?",
      a: "Sí. YouTube puede desactivarla si un canal deja de subir videos durante meses, incumple las políticas de monetización o, desde el 1 de febrero de 2027, no acepta las condiciones actualizadas o no se mantiene activo.",
    },
    {
      q: "¿Puedo revisar desde el celular si un canal está monetizado?",
      a: "Sí. Este verificador funciona en cualquier navegador del celular. Copia el enlace del canal o del video en la app de YouTube con Compartir y pégalo en el cuadro de arriba.",
    },
    {
      q: "¿Guardan los canales que reviso?",
      a: "No guardamos los canales que escribes en el verificador. Para que la herramienta sea rápida y evitar abusos, el servidor guarda por poco tiempo los datos públicos que recibe de YouTube y cuenta las solicitudes por dirección IP durante una hora. Si abres un enlace para compartir (que termina en ?c=@usuario), esa dirección aparece en los registros normales de nuestro servidor durante unas dos semanas. Configuramos Google Analytics para quitar los nombres de canales de las direcciones de las páginas. Tus marcas en la lista de comprobación y tu lista de revisados recientemente nunca salen de tu navegador, y puedes borrar la lista cuando quieras.",
    },
  ],
};
