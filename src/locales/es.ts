import type { LocalizedToolContent } from "@/lib/i18n";

const UPDATED = "7 de noviembre de 2026";
const API_BADGE = "Datos oficiales de YouTube";

export const content: Record<string, LocalizedToolContent> = {
  "/comment-picker": {
    title: "Sorteo de comentarios de YouTube",
    description:
      "Elige ganadores de tu sorteo entre los comentarios de un video de YouTube — aleatorio criptográfico, hasta 5 ganadores. Gratis, sin registro.",
    heading: "Sorteo de comentarios",
    highlight: "Sorteo",
    intro: "¿Haces un sorteo? Elige ganadores al azar entre los comentarios — equidad demostrable, con una animación de suspenso que puedes grabar para el anuncio.",
    howTo: [
      "Pega el enlace de tu video del sorteo.",
      "Opcional: palabra clave obligatoria (ej. #sorteo), una participación por persona, número de ganadores.",
      "Haz clic en « Elegir ganador » — graba tu pantalla para mostrar la transparencia del sorteo.",
    ],
    meaning: [
      "Los sorteos en comentarios premian a tu audiencia real, pero elegir mientras haces scroll no es aleatorio ni demostrable. Esta herramienta carga los comentarios con la API oficial de YouTube y sortea con aleatoriedad criptográfica directamente en tu navegador — no podríamos favorecer a nadie aunque quisiéramos.",
      "Límites honestos: el sorteo usa los 500 comentarios principales más recientes (las respuestas no cuentan como participaciones), y ninguna herramienta puede verificar quién está suscrito — YouTube no publica esa información. Verifica las condiciones de suscripción manualmente antes de anunciar.",
    ],
    faq: [
      {
        q: "¿Cómo elegir un ganador al azar entre comentarios de YouTube?",
        a: "Pega el enlace del video, ajusta los filtros y pulsa « Elegir ganador ». El sorteo usa el generador aleatorio criptográfico de tu navegador.",
      },
      {
        q: "¿El sorteo es realmente aleatorio?",
        a: "Sí — usamos crypto.getRandomValues (la fuente aleatoria segura del navegador) con selección sin sesgo, ejecutada en tu dispositivo. Graba el sorteo si quieres una prueba visible para tu audiencia.",
      },
      {
        q: "¿Puede verificar que el ganador está suscrito?",
        a: "No — ninguna herramienta puede. YouTube no hace públicas las suscripciones. Verifica esa condición manualmente antes de anunciar al ganador.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/comment-finder": {
    title: "Buscador de comentarios de YouTube",
    description:
      "Busca una palabra, nombre o frase en los comentarios de cualquier video de YouTube. Ordena por populares o recientes y exporta a CSV. Gratis, datos oficiales.",
    heading: "Buscador de comentarios",
    highlight: "Buscador",
    intro: "Busca dentro de los comentarios de un video — encuentra un comentario específico, cada mención de una palabra o tu propio comentario en un video viral.",
    howTo: [
      "Pega un enlace de video o Short.",
      "Opcional: escribe la palabra, nombre o frase que buscas.",
      "Revisa los resultados, por populares o recientes, y descárgalos en CSV.",
    ],
    meaning: [
      "La búsqueda de comentarios de YouTube es muy limitada — en la mayoría de dispositivos solo puedes hacer scroll. Esta herramienta pide a la API oficial que filtre los comentarios según tus términos: ideal para reencontrar un comentario a medias recordado o reunir citas para una investigación.",
      "Mostramos hasta 100 hilos de comentarios principales por búsqueda. Sin término de búsqueda, « populares » sigue el ranking de YouTube; con término, ordenamos por me gusta. « Más recientes » siempre es cronológico.",
    ],
    faq: [
      {
        q: "¿Cómo encontrar un comentario específico en un video de YouTube?",
        a: "Pega el enlace del video y escribe una palabra o frase que recuerdes. La API oficial de YouTube devuelve solo los comentarios que coinciden.",
      },
      {
        q: "¿Puedo encontrar mi propio comentario?",
        a: "Sí — busca el nombre de tu canal o una frase distintiva. Ojo: YouTube devuelve comentarios principales; una respuesta dentro de un hilo no aparece por separado.",
      },
      {
        q: "¿Puedo exportar los comentarios?",
        a: "Sí — en CSV con autor, texto, me gusta, número de respuestas y fecha.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/thumbnail-tools/thumbnail-downloader": {
    title: "Descargar miniaturas de YouTube HD y 4K",
    description:
      "Descarga la miniatura de cualquier video de YouTube en todos los tamaños: HD 1280×720 y, si existe, de 1080p a 4K. Gratis, sin registro.",
    heading: "Descargador de miniaturas",
    highlight: "miniaturas",
    intro: "Consigue la miniatura de cualquier video en todos los tamaños que sirve YouTube — desde SD hasta las nuevas versiones 4K.",
    howTo: [
      "Pega un enlace de video o Short.",
      "Leemos todos los tamaños de miniatura disponibles con la API oficial.",
      "Abre el tamaño que necesites y guarda la imagen.",
    ],
    meaning: [
      "YouTube guarda varias resoluciones de miniatura por video — desde la vista previa pequeña de búsqueda hasta « maxres » en 1280×720, y a veces mucho más. Listamos cada versión con enlace directo, obtenida de la API oficial.",
      "Útil para referencias de diseño, archivar tus propios videos o investigar a la competencia. La imagen sigue siendo propiedad del canal — descárgala como referencia, no para tu propio branding.",
    ],
    faq: [
      {
        q: "¿Cómo descargar una miniatura de YouTube?",
        a: "Pega el enlace del video arriba, elige el tamaño, clic derecho → « Guardar imagen como ». Listo.",
      },
      {
        q: "¿Qué resolución tiene una miniatura de YouTube?",
        a: "El HD estándar es 1280×720 (« maxresdefault »). Algunos videos tienen además versiones de 1080p a 4K, que mostramos cuando YouTube las ofrece.",
      },
      {
        q: "¿Es legal?",
        a: "Las URL son públicas — YouTube las sirve a cada visitante. Los derechos son del creador; usa las descargas como referencia y archivo.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/thumbnail-tools/banner-downloader": {
    title: "Descargar banner de YouTube en HD",
    description:
      "Descarga el banner de cualquier canal de YouTube en resolución completa — TV (2120px), escritorio 2× (2560px), tablet y móvil. Gratis.",
    heading: "Descargador de banners",
    highlight: "banners",
    intro: "Consigue el arte del banner de cualquier canal en todos los tamaños que sirve YouTube — desde la imagen completa de TV hasta el recorte exacto de escritorio.",
    howTo: [
      "Pega un enlace de canal, un @handle o un video del canal.",
      "Leemos la URL del banner con la API oficial de YouTube.",
      "Abre el tamaño que necesites y guárdalo, o copia la URL directa.",
    ],
    meaning: [
      "YouTube guarda una imagen grande de banner y la recorta según el dispositivo: las TV muestran la imagen completa (~2120×1192), el escritorio una franja de 2560×423, y tablets y móviles recortes más estrechos. Te damos enlaces directos a cada recorte, más la imagen original.",
      "Práctico para referencias de diseño, archivar tus creaciones y análisis de competencia. El arte pertenece al dueño del canal — descárgalo como referencia, no para rebrandear.",
    ],
    faq: [
      {
        q: "¿Cómo descargar el banner de un canal de YouTube?",
        a: "Pega el enlace del canal o su @handle arriba. Mostramos el banner en cada recorte — abre, clic derecho, « Guardar imagen como ».",
      },
      {
        q: "¿Qué tamaño tiene un banner de YouTube?",
        a: "Se sube en 2560×1440. La TV muestra todo, el escritorio una franja de 2560×423, y la « zona segura » visible en todas partes es 1546×423 al centro.",
      },
      {
        q: "¿Por qué un canal no tiene banner?",
        a: "No todos los canales lo configuran. Sin banner, la API no devuelve URL — y lo decimos honestamente en vez de adivinar.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/monetization-checker": {
    title: "Verificar monetización de YouTube",
    description:
      "Verifica qué requisitos del Programa de Socios de YouTube cumple visiblemente un canal: suscriptores, país, actividad. Señales honestas, no un sí/no inventado.",
    heading: "Verificador de monetización",
    highlight: "monetización",
    intro: "Mira qué requisitos del Programa de Socios cumple un canal según los datos públicos — honestamente, sin un sí/no inventado.",
    howTo: [
      "Pega un enlace de canal, un @handle o un video del canal.",
      "Verificamos las señales públicas del Programa de Socios con la API oficial.",
      "Lee qué requisitos se cumplen — y cuáles no se pueden verificar públicamente.",
    ],
    meaning: [
      "Desde 2023, YouTube ya no revela públicamente si un canal está monetizado. Los sitios que muestran un « sí/no » están adivinando — por ejemplo, según los anuncios, que también aparecen en videos sin monetizar. Nosotros mostramos qué requisitos visibles (1 000 suscriptores, país del canal, actividad) cumple el canal.",
      "Las horas de visualización y las vistas de Shorts de los últimos 90 días son privadas — solo el dueño las ve en YouTube Studio. Lo que mostramos es verificable; lo que nadie puede verificar, no lo afirmamos.",
    ],
    faq: [
      {
        q: "¿Cómo saber si un canal de YouTube está monetizado?",
        a: "Con certeza, solo siendo el dueño en YouTube Studio. Públicamente solo se pueden verificar los requisitos visibles — exactamente eso mostramos, sin adivinar.",
      },
      {
        q: "¿Qué se necesita para el Programa de Socios?",
        a: "Para la monetización completa: 1 000 suscriptores más 4 000 horas de visualización pública en 12 meses o 10 M de vistas de Shorts en 90 días, en un país donde exista el programa.",
      },
      {
        q: "¿Por qué no muestran un simple sí/no?",
        a: "Porque no se puede verificar públicamente. Un honesto « estas señales se cumplen » es más útil que un sí/no adivinado.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/channel-analyzer": {
    title: "Analizar canal de YouTube gratis",
    description:
      "Analiza cualquier canal de YouTube gratis: suscriptores, vistas por video, ritmo de subida, top videos y un informe para compartir. Sin registro.",
    heading: "Analizador de canales",
    highlight: "Analizador",
    intro: "Pega un canal y obtén sus estadísticas, ritmo de subida y top videos — con un enlace de informe para compartir.",
    howTo: [
      "Pega un enlace de canal, un @handle o cualquier video del canal.",
      "Cargamos las estadísticas públicas con la API oficial de YouTube.",
      "Lee el informe — y compártelo con quien quieras mediante el enlace.",
    ],
    meaning: [
      "El informe combina datos reales de YouTube (suscriptores, vistas, número de videos, antigüedad del canal) con análisis de channelpeeker como la frecuencia de subida y los top videos recientes. Todo lo que calculamos está marcado como estimación.",
      "Ten en cuenta: YouTube redondea los suscriptores públicos a tres cifras significativas — por eso el signo ≈. Las vistas sí son exactas.",
    ],
    faq: [
      {
        q: "¿Cómo analizar el canal de YouTube de otra persona?",
        a: "Pega el enlace o el @handle arriba. Todas las estadísticas públicas vienen directamente de la API oficial de YouTube — sin iniciar sesión, sin extensión.",
      },
      {
        q: "¿Los números de suscriptores son exactos?",
        a: "YouTube redondea los valores públicos (123 456 se muestra como 123 000). Los marcamos con ≈. Las vistas son exactas.",
      },
      {
        q: "¿Puedo compartir el informe?",
        a: "Sí — cada informe tiene su propio enlace para enviar a tus comunidades, patrocinadores o tu equipo.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/watch-time-calculator": {
    title: "Calculadora de horas de visualización",
    description:
      "Convierte vistas y duración media de visualización en horas de visualización — y mira cuántas vistas te faltan para las 4 000 horas.",
    heading: "Calculadora de horas de visualización",
    highlight: "horas de visualización",
    intro: "Convierte vistas y duración media en horas de visualización — y mide exactamente cuánto te falta para las 4 000 horas.",
    howTo: [
      "Escribe un número de vistas — de un video o de tu canal.",
      "Escribe la duración media de visualización de YouTube Studio (Analytics → Interacción).",
      "Lee las horas de visualización — y las vistas necesarias para llegar a 4 000 horas.",
    ],
    meaning: [
      "Las horas de visualización son simplemente vistas × duración media de visualización. El Programa de Socios de YouTube exige 4 000 horas de visualización pública en los últimos 365 días (más 1 000 suscriptores) — esta calculadora traduce tus números a ese requisito.",
      "Solo cuenta la visualización pública de videos largos: el tiempo en el feed de Shorts y los videos privados o eliminados quedan fuera. Los Shorts tienen su propia vía (10 M de vistas en 90 días). El cálculo es exacto; qué horas cuenta YouTube lo resumimos de sus reglas publicadas.",
    ],
    faq: [
      {
        q: "¿Cómo se calculan las horas de visualización de YouTube?",
        a: "Vistas multiplicadas por la duración media de visualización. 100 000 vistas con media de 3:30 son 350 000 minutos — unas 5 833 horas.",
      },
      {
        q: "¿Cuántas vistas necesito para 4 000 horas?",
        a: "Depende de la duración media: con 2 minutos, unas 120 000 vistas; con 5 minutos, unas 48 000. Escribe tu media arriba para el número exacto.",
      },
      {
        q: "¿Los Shorts cuentan para las 4 000 horas?",
        a: "No — el tiempo visto en el feed de Shorts no cuenta. Los Shorts tienen su propia vía de monetización: 10 millones de vistas públicas en 90 días.",
      },
    ],
    dataBadge: "Cálculo transparente",
    updated: UPDATED,
  },
  "/video-upload-date-checker": {
    title: "Fecha de publicación de un video de YouTube",
    description:
      "Descubre la fecha y hora exactas en que se publicó un video de YouTube — al minuto, en tu zona horaria y en UTC. Gratis, datos oficiales.",
    heading: "Verificador de fecha de publicación",
    highlight: "fecha de publicación",
    intro: "YouTube muestra « hace 2 años » — aquí ves la fecha y hora exactas de publicación, al minuto.",
    howTo: [
      "Pega un enlace de video o Short.",
      "Leemos la marca de tiempo exacta desde la API oficial de YouTube.",
      "Copia el resultado — en tu zona horaria y en UTC.",
    ],
    meaning: [
      "La página de reproducción redondea las fechas a « hace X años », pero la API guarda la marca de tiempo exacta de publicación — el momento en que el video se hizo público. La mostramos en tu zona horaria local y en UTC, con la antigüedad precisa.",
      "Las fechas exactas importan para citas, verificación de datos (« ¿qué video fue primero? »), cuestiones de derechos de autor e investigación. Nota: en los estrenos y videos que pasaron de privado a público, la marca corresponde a la publicación, no a la subida del archivo.",
    ],
    faq: [
      {
        q: "¿Cómo ver la fecha exacta de publicación de un video de YouTube?",
        a: "Pega su enlace aquí. YouTube solo muestra fechas relativas; la API da la marca de tiempo exacta, que mostramos al minuto.",
      },
      {
        q: "¿Es la hora de subida o de publicación?",
        a: "De publicación — el momento en que el video se hizo público. En los estrenos puede diferir de la subida del archivo.",
      },
      {
        q: "¿Qué zona horaria se usa?",
        a: "Ambas: la de tu navegador y UTC — para citas sin ambigüedad.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
};
