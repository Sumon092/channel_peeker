import type { LocalizedPageContent } from "@/lib/localized-page";

const ANALYZER = "/es/channel-analyzer";
const UPLOAD_DATE = "/es/video-upload-date-checker";
const YPP_HELP = "https://support.google.com/youtube/answer/72851?hl=es-419";

export const content: LocalizedPageContent = {
  title: "Antigüedad y fecha de creación de un canal de YouTube",
  description:
    "Descubre exactamente cuándo se creó cualquier canal de YouTube y cuántos años tiene, con sus vistas totales y su número de videos. Gratis, al instante, sin registro.",
  heading: "Verificador de antigüedad de canales de YouTube",
  highlight: "antigüedad de canales",
  intro: "Mira exactamente cuándo se creó cualquier canal de YouTube y cuántos años tiene hoy. Para empezar, pega el enlace de un canal, un @usuario o el enlace de un video.",
  updated: "27 de noviembre de 2026",
  dataBadge: "Datos oficiales de YouTube",
  afterTool: [
    {
      p: "Todos los canales tienen una fecha de creación, pero YouTube no la pone fácil de encontrar. Y esa fecha dice mucho. Un canal con 2 millones de suscriptores y 10 años de antigüedad creció de forma constante. Uno que llegó a 2 millones en 8 meses probablemente se hizo viral. Esta herramienta te muestra la fecha en segundos, junto con las vistas totales y el número de videos, para que veas el panorama completo.",
    },
  ],
  howTo: [
    "**Pega el canal.** Usa el @usuario (como @mkbhd), la URL del canal, el ID del canal (empieza con UC) o el enlace de cualquiera de sus videos, Shorts incluidos. Todo funciona.",
    "**Revisa la fecha.** La herramienta lee la fecha de creación directamente de los datos oficiales de YouTube, así que coincide con lo que el propio YouTube tiene registrado.",
    `**Usa el resultado.** Cópialo o abre el [análisis completo del canal](${ANALYZER}) para ver sus subidas recientes y cuáles tienen más vistas.`,
  ],
  before: [
    {
      eyebrow: "La tarjeta de resultado",
      title: "Lo que verás en el resultado",
      blocks: [
        { p: "Esto es lo que mostró el resultado cuando revisamos @mkbhd el 27 de noviembre de 2026:" },
        {
          ul: [
            "**Canal:** foto, nombre (Marques Brownlee) y usuario.",
            "**Antigüedad:** en años, meses y días, “18 años, 8 meses y 6 días”, más el total en días (6,825 días).",
            "**Fecha y hora de creación,** en UTC: “Creado el 21 de marzo de 2008 a las 15:25 UTC”.",
            "**Suscriptores:** ≈ 21.5 M, redondeados como lo hace YouTube, u “Oculto por el creador” si están ocultos.",
            "**Vistas totales desde la creación:** 5924 M.",
            "**Videos públicos:** 1,869.",
            "**Suscriptores por mes:** unos 95.9 k, ya calculados para ti.",
            "**Vistas promedio por video:** 3.2 M, ya calculadas para ti.",
            "**País:** Estados Unidos, o “Sin definir” si el creador lo dejó en blanco.",
            "**ID del canal:** UCBJycsmduvYEL83R_U4JriQ, con un botón Copiar ID.",
            "**Copiar resultado:** copia un resumen de una línea con la fecha, la hora y la antigüedad.",
            "**Copiar enlace:** copia un enlace para compartir (channelpeeker.com/es/channel-age-checker?c=@mkbhd) que abre la herramienta y hace la misma revisión. Práctico para mandarle un canal a un cliente o a alguien del equipo.",
            "**Abrir en YouTube:** abre el canal en YouTube en una pestaña nueva.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "Qué significan los resultados",
    blocks: [
      {
        p: "La fecha de creación es cuando se creó el canal en sí. No es la fecha del primer video. Muchos canales se quedan vacíos durante años antes de que alguien suba algo. Algunos creadores también eliminan u ocultan sus videos más antiguos, así que el video más antiguo que ves puede ser mucho más reciente que el canal.",
      },
      { p: "Por eso la antigüedad es más útil junto a otros números. Así puedes leerlos en conjunto:" },
      {
        ul: [
          "**Canal antiguo, pocos videos:** el canal probablemente estuvo inactivo mucho tiempo, o el creador quitó contenido antiguo.",
          "**Canal nuevo, números grandes:** crecimiento rápido, muchas veces por uno o dos videos virales. Mira sus videos principales para ver si el crecimiento se sostuvo.",
          "**Canal antiguo, números estables:** una trayectoria larga y constante. Suele ser la señal más segura cuando evalúas un canal.",
        ],
      },
      { h3: "Antigüedad del canal frente a antigüedad de la Cuenta de Google" },
      {
        p: "Si quieres saber cuántos años tiene tu cuenta de YouTube, hay dos fechas. Tu Cuenta de Google puede ser años más antigua que tu canal, porque el canal se crea por separado, a veces mucho después de que te registraste en Gmail. Esta herramienta muestra la fecha de creación del canal, que es la que importa en YouTube.",
      },
      { h3: "Cómo encontrar la fecha de creación de un canal sin una herramienta" },
      {
        p: "Puedes verla directamente en YouTube. Abre el canal, toca la descripción debajo del nombre para abrir el panel “Acerca de” y busca la fecha de “Se unió el”. Solo muestra la fecha, así que tendrás que calcular la antigüedad tú mismo. Eso es lo que hace esta herramienta por ti, junto con las vistas y el número de videos del canal.",
      },
    ],
  },
  after: [
    {
      eyebrow: "Razones comunes",
      title: "Por qué la gente revisa la antigüedad de un canal",
      blocks: [
        {
          ul: [
            "**Antes de un patrocinio o una colaboración.** Las marcas y los creadores revisan que un canal tenga una trayectoria real y no haya salido de la nada.",
            "**Antes de comprar un canal.** Si el vendedor dice que el canal “existe desde 2015”, la fecha de creación muestra si es cierto.",
            "**Compararte con la competencia.** Compara cuánto tardó un rival en llegar a sus números con el tiempo que llevas tú.",
            "**Evaluar un nicho.** Si la mayoría de los canales grandes de un tema tienen más de 8 años, es un espacio maduro. Si varios canales en crecimiento tienen menos de 2 años, todavía hay lugar para quienes llegan.",
            "**Detectar canales falsos o reciclados.** Un canal recién creado con muchísimos suscriptores y pocos videos puede ser una señal de alerta.",
            "**Pura curiosidad.** Descubrir cuándo empezó tu creador favorito es divertido, sobre todo cuando el canal resulta más antiguo de lo que pensabas.",
          ],
        },
      ],
    },
    {
      eyebrow: "Haz las cuentas",
      title: "Cómo calcular el ritmo de crecimiento de un canal",
      blocks: [
        {
          p: "Cuando sabes cuántos años tiene un canal, dos cuentas rápidas te dicen qué tan rápido creció. La herramienta las calcula y las muestra en el resultado, pero así funcionan:",
        },
        {
          ul: [
            "**Suscriptores por mes:** total de suscriptores ÷ antigüedad del canal en meses. Un canal con 600,000 suscriptores y 5 años (60 meses) ganó unos 10,000 al mes en promedio.",
            "**Vistas promedio por video:** total de vistas ÷ número de videos. 30 millones de vistas en 300 videos dan 100,000 vistas por video.",
          ],
        },
        {
          p: `Recuerda que son promedios. Un canal que avanzó lento durante cuatro años y explotó en un mes se ve igual que uno que creció de forma constante. Para ver qué videos recientes impulsan las vistas, abre el [análisis completo del canal](${ANALYZER}).`,
        },
      ],
    },
  ],
  faq: [
    {
      q: "¿Cómo veo cuándo se creó un canal de YouTube?",
      a: "Pega el usuario, la URL o el enlace de un video del canal en la herramienta de arriba. Obtendrás la fecha exacta de creación y la antigüedad del canal. En el propio YouTube, la fecha aparece como “Se unió el” en el panel Acerca de del canal.",
    },
    {
      q: "¿Cuántos años tiene mi cuenta de YouTube?",
      a: "Pega el enlace de tu canal en la herramienta. Te muestra cuándo se creó tu canal. Tu Cuenta de Google puede ser más antigua, porque el canal se crea por separado.",
    },
    {
      q: "¿La fecha de creación es la misma que la de la primera subida?",
      a: "No. Un canal puede pasar años vacío antes de su primer video, y las subidas antiguas se pueden eliminar u ocultar. En “Qué significan los resultados”, más arriba, verás cómo leer la antigüedad junto al número de videos.",
    },
    {
      q: "¿Un canal más antiguo posiciona mejor o se monetiza más rápido?",
      a: "No directamente. El Programa de socios de YouTube no exige una antigüedad mínima del canal. Mira los suscriptores y las horas de reproducción. Las recomendaciones dependen de cómo reaccionan los espectadores a tus videos, no de cuántos años tiene el canal.",
      link: { text: "Programa de socios de YouTube", href: YPP_HELP },
    },
    {
      q: "¿Puedo revisar un canal eliminado o privado?",
      a: "No. La herramienta solo puede leer canales públicos. Cuando un canal se elimina o se vuelve privado, sus datos dejan de estar disponibles.",
    },
    {
      q: "¿Puedo saber cuándo se subió un video concreto?",
      a: "Sí, pero con otra herramienta. Usa el Verificador de fecha de subida para ver la fecha y la hora exactas en que se publicó un video.",
      link: { text: "Verificador de fecha de subida", href: UPLOAD_DATE },
    },
    {
      q: "¿Por qué un canal parece más antiguo que sus videos?",
      a: "Por lo general porque el creador abrió el canal pronto y empezó a publicar después, o porque quitó subidas antiguas. Es muy común y no significa que algo esté mal.",
    },
    {
      q: "¿Qué tan exacta es la fecha de creación?",
      a: "Viene directamente de los registros de YouTube a través de la API oficial, así que es la misma fecha que YouTube tiene guardada para el canal. No es una estimación.",
    },
    {
      q: "¿Puedo pegar el enlace de un video en lugar del canal?",
      a: "Sí. Pega el enlace de cualquier video, incluido un Short, y la herramienta encuentra el canal que lo subió y muestra su fecha de creación. Un ID de canal (empieza con UC) también funciona.",
    },
    {
      q: "¿Por qué la herramienta no muestra un resultado?",
      a: "Normalmente es el enlace. Pega el enlace completo del canal, el usuario o el enlace de cualquier video. Las URL personalizadas antiguas con /c/ no funcionan, así que usa el @usuario o el enlace de un video. Si el canal se eliminó, se hizo privado o se cerró, ya no queda nada público que leer.",
    },
    {
      q: "¿Cambia la antigüedad de un canal si le cambian el nombre?",
      a: "No. La fecha de creación sigue igual cuando un creador cambia el nombre, el usuario o la foto del canal. Solo refleja cuándo se creó el canal por primera vez.",
    },
    {
      q: "¿Por qué un canal muestra una fecha rara, como 1970?",
      a: "No es una fecha real. Algunos canales, incluido el canal oficial del propio YouTube, llegan desde YouTube con el 1 de enero de 1970 como fecha de creación, que es un valor de relleno y no el día en que se crearon. Ninguna fecha anterior a 2005, el año en que se lanzó YouTube, puede ser correcta, así que la herramienta muestra “Fecha de creación no pública” en lugar de una antigüedad equivocada.",
    },
  ],
};
