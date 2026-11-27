import type { LocalizedPageContent } from "@/lib/localized-page";

const CHECKER = "/es/monetization-checker";
const ESTIMATOR = "/revenue-calculator/channel-earnings-estimator"; // English only
const YPP_CHANGES = "https://support.google.com/youtube/answer/12843009?hl=es-419";

const n = (x: number) => x.toLocaleString("es-419");
const views = (hours: number, sec: number) => n(Math.ceil((hours * 3600) / sec));
const DURATIONS: [string, number][] = [
  ["2 minutos", 120],
  ["3 minutos y 30 segundos", 210],
  ["5 minutos", 300],
  ["8 minutos", 480],
  ["10 minutos", 600],
];

export const content: LocalizedPageContent = {
  title: "Calculadora de tiempo de reproducción de YouTube: 4,000 y 8,000 horas",
  description:
    "Convierte vistas y tiempo de reproducción en horas, sigue tu avance hacia las 4,000 horas (8,000 desde febrero de 2027) y mira cuándo llegarás. Gratis, sin registro.",
  heading: "Calculadora de tiempo de reproducción de YouTube",
  highlight: "Calculadora de tiempo de reproducción",
  intro:
    "Descubre cuántas horas de reproducción suman tus videos y qué tan lejos estás de las 4,000 horas que YouTube pide antes de pagarte por los anuncios. Ingresa tus vistas y la duración media de visualización. Es todo lo que necesitas.",
  updated: "27 de noviembre de 2026",
  dataBadge: "Cálculo a la vista, nada inventado",
  afterTool: [
    {
      p: "YouTube Studio te muestra tu tiempo de reproducción, pero no te dice qué hacer con él. ¿Alcanzan 30,000 vistas? ¿Llegarías antes con videos más largos? Esta calculadora hace las cuentas por ti. Convierte las vistas y la duración media de visualización en horas, y te muestra cuántas vistas más necesitarías, con esa misma duración, para pasar la meta.",
    },
  ],
  howTo: [
    "Ingresa tus vistas. Usa las de un solo video o el total de tu canal en los últimos 12 meses si quieres ver tu avance hacia la monetización.",
    "Ingresa tu duración media de visualización. Abre YouTube Studio, ve a Estadísticas y luego a la pestaña Interacción. Ahí aparece en minutos y segundos, por ejemplo 4:12.",
    "Lee el resultado. Verás tu tiempo de reproducción total en horas y minutos, si ya pasaste las 4,000 horas y cuántas vistas más necesitarías con la misma duración media.",
  ],
  howToTip: "Para revisar tu avance hacia la monetización, ajusta el período en Studio a los últimos 365 días antes de copiar los números. Esa es la ventana que mira YouTube.",
  before: [
    {
      eyebrow: "En YouTube Studio",
      title: "Cómo ver tus horas de reproducción en YouTube Studio",
      blocks: [
        { p: "Hay dos lugares donde mirar, y cada uno responde una pregunta distinta." },
        {
          ol: [
            `Para tu avance hacia la monetización, abre YouTube Studio y haz clic en Ingresos. Ahí aparecen tus horas de reproducción públicas de los últimos 12 meses, que es el número que YouTube realmente cuenta para el [Programa de socios](${CHECKER}). Úsalo en la pestaña “Seguir mi progreso”.`,
            "Para tu ritmo reciente, abre Estadísticas, ajusta el período a los últimos 28 días y anota tu tiempo de reproducción en horas. Escríbelo en el campo “últimos 28 días” y la calculadora estima cuándo llegarás a tu meta.",
          ],
        },
        {
          p: "Los dos números no siempre coinciden. Estadísticas cuenta todo, incluidas las vistas del feed de Shorts y los videos que luego hiciste privados, mientras que Ingresos solo cuenta lo que califica.",
        },
      ],
    },
    {
      eyebrow: "La cuenta",
      title: "La fórmula del tiempo de reproducción",
      blocks: [
        { formula: "Horas de reproducción = vistas × duración media de visualización (en minutos) ÷ 60" },
        { p: "Algunos ejemplos:" },
        {
          ul: [
            "10,000 vistas con una media de 4 minutos = 40,000 minutos = unas 667 horas.",
            "50,000 vistas con 3 minutos y 30 segundos = 175,000 minutos = unas 2,917 horas.",
            "100,000 vistas con 2 minutos = 200,000 minutos = unas 3,333 horas.",
          ],
        },
        {
          p: "Si conoces la duración del video y la retención, calcula primero la duración media de visualización: duración del video × retención %. Un video de 10 minutos con 40% de retención tiene una duración media de visualización de 4 minutos.",
        },
        { h3: "¿Cuántas horas de reproducción dan las vistas?" },
        { p: "Con una duración media de visualización de 4 minutos:" },
        {
          table: {
            head: ["Vistas", "Horas de reproducción"],
            rows: [100, 1000, 10_000, 100_000, 1_000_000].map((v) => [n(v), `unas ${n(Math.round((v * 4) / 60))}`]),
          },
        },
        { p: "Para tus propios números, usa la calculadora de arriba." },
      ],
    },
    {
      eyebrow: "Tu fecha",
      title: "Sigue tu progreso y mira tu fecha",
      blocks: [
        {
          p: "Saber tu total es útil. Saber cuándo vas a llegar es mejor. En la pestaña “Seguir mi progreso”, ingresa tus horas de reproducción de los últimos 12 meses y las de los últimos 28 días. La calculadora estima tu ritmo diario, cuántas horas te faltan y, más o menos, cuándo pasarás las 4,000 (u 8,000) a ese ritmo. También muestra cuántas horas al día necesitarías para llegar en 90 días, una meta práctica si quieres acelerar.",
        },
        {
          p: "Toma la fecha como una guía aproximada. La ventana de 12 meses avanza todo el tiempo, así que las horas que ganaste hace un año van saliendo mientras entran las nuevas.",
        },
      ],
    },
    {
      eyebrow: "El resultado",
      title: "Lo que verás en el resultado",
      blocks: [
        {
          p: "La calculadora tiene tres pestañas. Cada una tiene un botón “Probar un ejemplo”, y estos son los resultados de esos ejemplos (la fecha es del 27 de noviembre de 2026):",
        },
        {
          ul: [
            "**Vistas a horas:** 42,000 vistas con una duración media de 5:20 dan 3,733 horas, o 224,000 minutos, que son el 93.3% de 4,000. Son 3,000 vistas más (45,000 en total) con esta duración para 4,000 horas. En total, 3,000 horas piden 33,750 vistas y 8,000 horas, 90,000. Con una duración de video de 12:00, el porcentaje medio visto es del 44.4%. Repartidas en 20 videos, son 1,688, 2,250 y 4,500 vistas por video.",
            "**Seguir mi progreso:** 2,850 horas de reproducción en los últimos 12 meses son el 71.3% de 4,000, con 1,150 horas por delante, y 740 de 1,000 suscriptores. Para llegar en 90 días hacen falta unas 12.8 horas al día. Con 310 horas en los últimos 28 días, el ritmo es de unas 11.1 horas al día, lo que lleva a 4,000 alrededor del 11 de marzo de 2027. Como esa fecha es posterior al 1 de febrero de 2027, un aviso recuerda que para entonces las nuevas solicitudes necesitarán 8,000 horas, con un botón que cambia la meta a 8,000. Si un ritmo nunca llegaría, porque el total de 12 meses se estabilizaría por debajo de la meta, la calculadora lo dice en lugar de mostrar una fecha.",
            "**Duración × retención:** un video de 14:00 con 38% de retención media tiene una duración media de visualización de 5:19. 60,000 vistas con esa duración dan 5,320 horas de reproducción. Para 3,000, 4,000 y 8,000 horas necesitarías 33,835, 45,113 y 90,226 vistas, o 1,354, 1,805 y 3,610 por video en 25 videos.",
            "**En todas las pestañas:** Copiar resultado (un resumen en texto), Copiar enlace (un enlace que rellena los mismos números), Borrar y un enlace al estimador de ganancias. Todo se calcula en tu navegador. Lo único que se guarda es la última pestaña que usaste.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "Qué significa tu resultado de tiempo de reproducción",
    blocks: [
      {
        p: "El tiempo de reproducción es sencillo: **vistas × duración media de visualización**. Si un video tiene 100,000 vistas y la gente lo mira en promedio 3 minutos y 30 segundos, son 350,000 minutos, o unas 5,833 horas.",
      },
      {
        p: "El número que le importa a YouTube es 4,000. Para recibir una parte de los ingresos por anuncios, necesitas 1,000 suscriptores y 4,000 horas de reproducción públicas en videos largos durante los últimos 365 días. En algunos países también hay un nivel previo: 500 suscriptores, 3 subidas públicas en los últimos 90 días y 3,000 horas de reproducción. Ese nivel desbloquea la financiación de fans, como las membresías del canal y Súper gracias, pero no los ingresos por anuncios.",
      },
      { h3: "Cambia el 1 de febrero de 2027: 8,000 horas para canales nuevos" },
      {
        p: `Desde el [1 de febrero de 2027](${YPP_CHANGES}), los canales que soliciten ingresos por anuncios necesitarán 8,000 horas de reproducción en los últimos 365 días, o 20 millones de vistas de Shorts calificadas en 90 días, más 1,000 suscriptores. Es el doble de lo que se pide hoy. Los canales que ya están en el Programa de socios no se ven afectados, y el nivel de financiación de fans de 3,000 horas sigue igual. Si piensas postularte después del 1 de febrero, apunta a 8,000. Eso equivale a unas 22 horas de reproducción al día.`,
      },
      { h3: "Cuántas vistas necesitas para 4,000 horas" },
      { p: "La duración media de visualización marca una diferencia enorme. Estas son las vistas que hacen falta según la duración:" },
      {
        table: {
          head: ["Duración media de visualización", "Vistas para 3,000 horas", "Vistas para 4,000 horas", "Vistas para 8,000 horas"],
          rows: DURATIONS.map(([label, sec]) => [label, views(3000, sec), views(4000, sec), views(8000, sec)]),
        },
      },
      {
        p: "Las horas de reproducción públicas son el tiempo de reproducción en videos largos configurados como públicos. Las vistas del feed de Shorts y los videos privados, ocultos o eliminados no cuentan.",
      },
      {
        p: "Pasar de una media de 2 a 8 minutos reduce en tres cuartas partes las vistas que necesitas. Por eso mantener a la gente mirando suele importar más que conseguir más clics.",
      },
      { h3: "Lo que no cuenta para las 4,000 horas" },
      {
        ul: [
          "El tiempo de reproducción de Shorts en el feed de Shorts",
          "Videos privados, ocultos o eliminados",
          "Videos que se muestran como anuncios",
          "Transmisiones en vivo una vez que se hacen privadas o se eliminan",
        ],
      },
      { p: "Los creadores de Shorts tienen su propio camino: 10 millones de vistas de Shorts calificadas en los últimos 90 días (o 3 millones en el nivel previo)." },
      { h3: "En un año, 4,000 horas son unas 11 horas al día" },
      {
        p: "La ventana de 365 días es móvil. El tiempo de reproducción de hace 13 meses va saliendo mientras entra el nuevo. Así que 4,000 horas equivalen a unas 11 horas de reproducción al día sumando todo el canal. Si tu total diario en Studio está muy por debajo, ya sabes que necesitas más vistas, visualizaciones más largas o las dos cosas.",
      },
    ],
  },
  after: [
    {
      eyebrow: "Más tiempo de reproducción",
      title: "Cómo llegar más rápido a las 4,000 horas de reproducción",
      blocks: [
        { p: "No puedes cambiar los números del año pasado, pero sí lo que pase de ahora en adelante. Esto es lo que más mueve el tiempo de reproducción:" },
        {
          ul: [
            "**Cuida los primeros 30 segundos.** La mayoría de la gente se va pronto. Empieza por lo que ofrece el video, no con una intro larga o un pedido de suscripción. La gráfica de retención de la audiencia en Studio te muestra exactamente dónde se van.",
            "**Haz algunos videos más largos.** Un video de 12 minutos que retiene a la gente 6 minutos da el triple de tiempo de reproducción que uno de 4 minutos que se mira 2. Los tutoriales, las reseñas y las guías paso a paso funcionan bien en formatos largos.",
            "**Lleva al espectador al siguiente video.** Usa pantallas finales, tarjetas y playlists para que una vista se convierta en dos o tres. El contenido en serie funciona especialmente bien.",
            "**Haz transmisiones en vivo.** Las transmisiones en vivo suelen tener sesiones largas, y cuentan siempre que la repetición siga pública.",
            "**Usa los Shorts como puerta de entrada.** El tiempo de reproducción del feed de Shorts no cuenta, pero un Short puede llevar gente nueva a un video largo que sí cuenta.",
            "**Mantén públicos tus videos antiguos.** Eliminar un video o hacerlo privado quita sus horas de reproducción de tu total. Corrige o actualiza un video antiguo en vez de quitarlo.",
            "**Haz videos atemporales.** Los tutoriales y las explicaciones se siguen encontrando durante años, así que suman horas de reproducción mucho después de publicarlos.",
            "**Publica con un calendario fijo.** Un ritmo constante le da a YouTube más oportunidades de recomendarte y a tu audiencia un motivo para volver.",
            "**Trabaja tus títulos y miniaturas.** Una mejor tasa de clics hace que más gente empiece a mirar, y cada vista extra suma horas.",
          ],
        },
        { p: `Cuando estés cerca, revisa con el [Verificador de monetización](${CHECKER}) qué requisitos públicos ya cumple tu canal.` },
      ],
    },
    {
      eyebrow: "Total a la baja",
      title: "Por qué bajaron tus horas de reproducción",
      blocks: [
        { p: "Es normal que tu total baje, incluso si sigues subiendo videos. Las razones habituales:" },
        {
          ul: [
            "**La ventana de 12 meses avanzó.** Las horas de hace más de un año dejan de contar, así que un mes fuerte del año pasado sale de la cuenta este año.",
            "**Hiciste un video privado u oculto, o lo eliminaste.** Sus horas de reproducción salen de tu total al instante.",
            "**Tus vistas se desaceleraron.** Si ganas horas más lento de lo que vencen las antiguas, el total baja.",
            "**Studio todavía no se actualiza.** El número de Ingresos puede ir uno o dos días detrás de Estadísticas.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "¿Cómo calcula YouTube el tiempo de reproducción?",
      a: "Multiplica las vistas por la duración media de visualización. 50,000 vistas con una media de 4 minutos son 200,000 minutos, unas 3,333 horas. YouTube Studio hace la suma por ti, pero la calculadora te deja probar escenarios antes de publicar.",
    },
    {
      q: "¿Cuántas vistas necesito para 4,000 horas de reproducción?",
      a: "Depende de cuánto tiempo mire la gente. Con una media de 2 minutos necesitarías 120,000 vistas. Con 5 minutos son 48,000, y con 10 minutos solo 24,000. Ingresa tu media arriba para ver tu número exacto.",
    },
    {
      q: "¿Va a cambiar el requisito de 4,000 horas?",
      a: "Sí, para los canales nuevos. Desde el 1 de febrero de 2027, quienes soliciten por primera vez necesitarán 8,000 horas de reproducción en los últimos 365 días (o 20 millones de vistas de Shorts calificadas en 90 días) más 1,000 suscriptores. Si ya estás monetizado, nada cambia para ti.",
    },
    {
      q: "¿Dónde encuentro mi duración media de visualización?",
      a: "En YouTube Studio, abre Estadísticas y ve a la pestaña Interacción. Para un solo video, abre las estadísticas de ese video. Ajusta el período a los últimos 365 días si estás siguiendo la monetización.",
    },
    {
      q: "¿Las vistas de Shorts cuentan para las 4,000 horas de reproducción?",
      a: "No. El tiempo de reproducción del feed de Shorts no cuenta. Los Shorts tienen su propio camino: 10 millones de vistas de Shorts calificadas en 90 días, más 1,000 suscriptores.",
    },
    {
      q: "¿Las transmisiones en vivo cuentan como horas de reproducción?",
      a: "Sí, siempre que la transmisión sea pública y la repetición siga pública. Si después la haces privada o la eliminas, esas horas salen de tu total.",
    },
    {
      q: "¿Las horas de reproducción vencen?",
      a: "Sí. YouTube solo cuenta los últimos 365 días, y la ventana avanza cada día. Las horas de un video que se hizo viral hace 14 meses ya no cuentan, aunque las vistas sigan en el video.",
    },
    {
      q: "Tengo 4,000 horas. ¿Por qué todavía no estoy monetizado?",
      a: "Alcanzar los números solo te hace apto. Además necesitas 1,000 suscriptores, luego postularte en YouTube Studio, en Ingresos, y vincular una cuenta de AdSense para YouTube. YouTube revisa tu canal según sus políticas de monetización antes de aprobarlo.",
    },
    {
      q: "¿Puedo comprar horas de reproducción?",
      a: "No lo hagas. Las vistas y el tiempo de reproducción comprados incumplen las reglas de YouTube. Suelen filtrarse y pueden hacer que rechacen tu solicitud o eliminen tu canal.",
    },
    {
      q: "¿Cuántos minutos son 4,000 horas de reproducción?",
      a: "240,000 minutos. 8,000 horas, la meta para quienes soliciten por primera vez desde el 1 de febrero de 2027, son 480,000 minutos, y la meta de 3,000 horas de la financiación de fans son 180,000 minutos.",
    },
    {
      q: "¿Cuántas horas de reproducción dan 1,000 vistas?",
      a: "Depende de cuánto tiempo mire la gente. Con una media de 4 minutos, 1,000 vistas dan unas 67 horas. Con 10 minutos, unas 167 horas. Ingresa tus propios números en la calculadora de arriba.",
    },
    {
      q: "¿Las 4,000 horas tienen que venir de un solo video?",
      a: "No. YouTube suma las horas de reproducción públicas de todos tus videos largos de los últimos 12 meses. Muchos videos pequeños cuentan igual que uno grande.",
    },
    {
      q: "¿Qué pasa cuando llego a 4,000 horas de reproducción?",
      a: "También necesitas 1,000 suscriptores. Cuando tengas las dos cosas, postúlate en YouTube Studio, en Ingresos, acepta las condiciones y vincula una cuenta de AdSense para YouTube. Después YouTube revisa tu canal, lo que puede tardar hasta 30 días.",
    },
    {
      q: "¿YouTube paga por hora de reproducción?",
      a: "No. YouTube no paga por horas de reproducción. Cuando estás monetizado, recibes una parte de los ingresos por anuncios, que depende de las vistas, tu tema y la ubicación de tu audiencia. Nuestro estimador de ganancias (en inglés) te da un rango aproximado.",
      link: { text: "estimador de ganancias", href: ESTIMATOR },
    },
    {
      q: "¿Es difícil llegar a 4,000 horas de reproducción?",
      a: "Es un logro de verdad. Repartidas en un año, son unas 11 horas de reproducción al día sumando todo el canal. Los videos más largos que mantienen la atención llegan mucho más rápido que los cortos, y por eso la duración media de visualización importa tanto.",
    },
    {
      q: "¿Qué tasa de retención debo usar en la calculadora?",
      a: "Usa tus números reales de YouTube Studio si los tienes. Si estás empezando, prueba algunos valores entre 30% y 50% para ver un rango, y luego cámbialos por tu número real cuando tengas algunos videos publicados.",
    },
    {
      q: "Voy a postularme alrededor de enero de 2027. ¿Qué regla me aplica?",
      a: "La regla de 8,000 horas aplica a quienes soliciten por primera vez desde el 1 de febrero de 2027. El anuncio de YouTube no dice qué pasará con las solicitudes que sigan en revisión en esa fecha, así que, si ya tienes 4,000 horas y 1,000 suscriptores, conviene postularte antes y seguir el estado en Ingresos.",
    },
    {
      q: "¿Esta calculadora es gratis?",
      a: "Sí. No tiene registro ni límite de uso.",
    },
  ],
};
