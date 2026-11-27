import type { LocalizedPageContent } from "@/lib/localized-page";

const CHECKER = "/pt/monetization-checker";
const ESTIMATOR = "/revenue-calculator/channel-earnings-estimator"; // English only
const YPP_CHANGES = "https://support.google.com/youtube/answer/12843009?hl=pt-BR";

const n = (x: number) => x.toLocaleString("pt-BR");
const views = (hours: number, sec: number) => n(Math.ceil((hours * 3600) / sec));
const DURATIONS: [string, number][] = [
  ["2 minutos", 120],
  ["3 minutos e 30 segundos", 210],
  ["5 minutos", 300],
  ["8 minutos", 480],
  ["10 minutos", 600],
];

export const content: LocalizedPageContent = {
  title: "Calculadora de horas de exibição do YouTube: 4.000 e 8.000 horas",
  description:
    "Transforme visualizações e tempo assistido em horas, acompanhe seu progresso até as 4.000 horas (8.000 a partir de fevereiro de 2027) e veja quando você chega lá. Grátis, sem cadastro.",
  heading: "Calculadora de horas de exibição do YouTube",
  highlight: "Calculadora de horas de exibição",
  intro:
    "Descubra quantas horas de exibição seus vídeos já somaram e quanto falta para as 4.000 horas que o YouTube pede antes de pagar pelos anúncios. Informe suas visualizações e a duração média da visualização. Só isso.",
  updated: "27 de novembro de 2026",
  dataBadge: "Conta à mostra, nada inventado",
  afterTool: [
    {
      p: "O YouTube Studio mostra seu tempo de exibição, mas não diz o que fazer com ele. 30.000 visualizações bastam? Vídeos mais longos chegariam lá mais rápido? Esta calculadora faz a conta por você. Ela transforma visualizações e duração média em horas e mostra quantas visualizações a mais você precisaria, com essa mesma duração, para cruzar a linha.",
    },
  ],
  howTo: [
    "Informe suas visualizações. Use o número de um único vídeo ou o total do canal nos últimos 12 meses, se quiser ver seu progresso rumo à monetização.",
    "Informe a duração média da visualização. Abra o YouTube Studio, vá em Análises e depois na guia Engajamento. Ela aparece lá em minutos e segundos, por exemplo 4:12.",
    "Leia o resultado. Você vê o tempo total de exibição em horas e minutos, se já passou das 4.000 horas e quantas visualizações a mais precisaria com a mesma duração média.",
  ],
  howToTip: "Para ver seu progresso rumo à monetização, ajuste o período no Studio para os últimos 365 dias antes de copiar os números. É essa a janela que o YouTube considera.",
  before: [
    {
      eyebrow: "No YouTube Studio",
      title: "Como ver suas horas de exibição no YouTube Studio",
      blocks: [
        { p: "Há dois lugares para olhar, e cada um responde a uma pergunta diferente." },
        {
          ol: [
            `Para o progresso rumo à monetização, abra o YouTube Studio e clique em Monetização. Lá aparecem suas horas de exibição públicas dos últimos 12 meses, que é o número que o YouTube realmente conta para o [Programa de Parcerias](${CHECKER}). Use esse número na guia “Acompanhar meu progresso”.`,
            "Para o seu ritmo recente, abra Análises, ajuste o período para os últimos 28 dias e anote o tempo de exibição em horas. Coloque esse valor no campo “últimos 28 dias”, e a calculadora estima quando você vai atingir sua meta.",
          ],
        },
        {
          p: "Os dois números nem sempre batem. Análises conta tudo, inclusive as visualizações no feed do Shorts e vídeos que você tornou privados depois, enquanto Monetização conta só o que se qualifica.",
        },
      ],
    },
    {
      eyebrow: "A conta",
      title: "A fórmula do tempo de exibição",
      blocks: [
        { formula: "Horas de exibição = visualizações × duração média da visualização (em minutos) ÷ 60" },
        { p: "Alguns exemplos:" },
        {
          ul: [
            "10.000 visualizações com média de 4 minutos = 40.000 minutos = cerca de 667 horas.",
            "50.000 visualizações com 3 minutos e 30 segundos = 175.000 minutos = cerca de 2.917 horas.",
            "100.000 visualizações com 2 minutos = 200.000 minutos = cerca de 3.333 horas.",
          ],
        },
        {
          p: "Se você sabe a duração do vídeo e a retenção, calcule primeiro a duração média da visualização: duração do vídeo × retenção %. Um vídeo de 10 minutos com 40% de retenção tem duração média de 4 minutos.",
        },
        { h3: "Quantas horas de exibição as visualizações rendem?" },
        { p: "Com duração média da visualização de 4 minutos:" },
        {
          table: {
            head: ["Visualizações", "Horas de exibição"],
            rows: [100, 1000, 10_000, 100_000, 1_000_000].map((v) => [n(v), `cerca de ${n(Math.round((v * 4) / 60))}`]),
          },
        },
        { p: "Para os seus próprios números, use a calculadora acima." },
      ],
    },
    {
      eyebrow: "Sua data",
      title: "Acompanhe seu progresso e veja sua data",
      blocks: [
        {
          p: "Saber o total é útil. Saber quando você chega lá é melhor ainda. Na guia “Acompanhar meu progresso”, informe suas horas de exibição dos últimos 12 meses e as dos últimos 28 dias. A calculadora estima seu ritmo diário, quantas horas ainda faltam e, mais ou menos, quando você cruza as 4.000 (ou 8.000) nesse ritmo. Ela também mostra quantas horas por dia seriam necessárias para chegar lá em 90 dias, uma meta prática se você quiser acelerar.",
        },
        {
          p: "Encare a data como uma referência aproximada. A janela de 12 meses está sempre andando, então as horas que você ganhou há um ano vão saindo enquanto as novas entram.",
        },
      ],
    },
    {
      eyebrow: "O resultado",
      title: "O que aparece no resultado",
      blocks: [
        {
          p: "A calculadora tem três guias. Cada uma tem um botão “Ver um exemplo”, e estes são os resultados desses exemplos (a data é de 27 de novembro de 2026):",
        },
        {
          ul: [
            "**Visualizações em horas:** 42.000 visualizações com duração média de 5:20 somam 3.733 horas, ou 224.000 minutos, que são 93,3% de 4.000. São mais 3.000 visualizações (45.000 no total) nessa duração para 4.000 horas. No total, 3.000 horas pedem 33.750 visualizações e 8.000 horas, 90.000. Com a duração do vídeo de 12:00 preenchida, a porcentagem média assistida é de 44,4%. Divididas em 20 vídeos, são 1.688, 2.250 e 4.500 visualizações por vídeo.",
            "**Acompanhar meu progresso:** 2.850 horas de exibição nos últimos 12 meses são 71,3% de 4.000, com 1.150 horas faltando, e 740 de 1.000 inscritos. Para chegar lá em 90 dias, são cerca de 12,8 horas por dia. Com 310 horas nos últimos 28 dias, o ritmo é de cerca de 11,1 horas por dia, o que leva às 4.000 por volta de 11 de março de 2027. Como essa data é depois de 1º de fevereiro de 2027, um aviso lembra que novos candidatos vão precisar de 8.000 horas até lá, com um botão que muda a meta para 8.000. Se um ritmo nunca chegaria lá, porque o total de 12 meses se estabilizaria abaixo da meta, a calculadora diz isso em vez de mostrar uma data.",
            "**Duração × retenção:** um vídeo de 14:00 com 38% de retenção média tem duração média de visualização de 5:19. 60.000 visualizações nessa duração somam 5.320 horas de exibição. Para 3.000, 4.000 e 8.000 horas, seriam necessárias 33.835, 45.113 e 90.226 visualizações, ou 1.354, 1.805 e 3.610 por vídeo em 25 vídeos.",
            "**Em todas as guias:** Copiar resultado (um resumo em texto), Copiar link (um link que preenche os mesmos números), Limpar e um link para o estimador de ganhos. Tudo é calculado no seu navegador. A única coisa salva é a última guia que você usou.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "O que significa o resultado do tempo de exibição",
    blocks: [
      {
        p: "O tempo de exibição é simples: **visualizações × duração média da visualização**. Se um vídeo tem 100.000 visualizações e as pessoas assistem, em média, 3 minutos e 30 segundos, são 350.000 minutos, ou cerca de 5.833 horas.",
      },
      {
        p: "O número que importa para o YouTube é 4.000. Para receber parte da receita de anúncios, você precisa de 1.000 inscritos e 4.000 horas de exibição públicas em vídeos longos nos últimos 365 dias. Em alguns países também existe um nível anterior: 500 inscritos, 3 envios públicos nos últimos 90 dias e 3.000 horas de exibição. Esse nível libera o financiamento por fãs, como os Clubes dos canais e o Super Thanks, mas não a receita de anúncios.",
      },
      { h3: "Muda em 1º de fevereiro de 2027: 8.000 horas para canais novos" },
      {
        p: `A partir de [1º de fevereiro de 2027](${YPP_CHANGES}), os canais que se candidatarem à receita de anúncios vão precisar de 8.000 horas de exibição nos últimos 365 dias, ou 20 milhões de visualizações qualificadas de Shorts em 90 dias, além de 1.000 inscritos. É o dobro da exigência atual. Quem já está no Programa de Parcerias não é afetado, e o nível de financiamento por fãs, de 3.000 horas, continua igual. Se você pretende se candidatar depois de 1º de fevereiro, mire em 8.000. Isso dá cerca de 22 horas de exibição por dia.`,
      },
      { h3: "Quantas visualizações você precisa para 4.000 horas" },
      { p: "A duração média da visualização faz uma diferença enorme. Veja quantas visualizações são necessárias com diferentes durações:" },
      {
        table: {
          head: ["Duração média da visualização", "Visualizações para 3.000 horas", "Visualizações para 4.000 horas", "Visualizações para 8.000 horas"],
          rows: DURATIONS.map(([label, sec]) => [label, views(3000, sec), views(4000, sec), views(8000, sec)]),
        },
      },
      {
        p: "Horas de exibição públicas são o tempo assistido em vídeos longos definidos como públicos. Visualizações no feed do Shorts e vídeos privados, não listados ou excluídos não contam.",
      },
      {
        p: "Passar de uma média de 2 para 8 minutos corta em três quartos as visualizações necessárias. Por isso manter as pessoas assistindo costuma importar mais do que conseguir mais cliques.",
      },
      { h3: "O que não conta para as 4.000 horas" },
      {
        ul: [
          "Tempo assistido em Shorts no feed do Shorts",
          "Vídeos privados, não listados ou excluídos",
          "Vídeos exibidos como anúncios",
          "Transmissões ao vivo depois de se tornarem privadas ou serem excluídas",
        ],
      },
      { p: "Os criadores de Shorts têm um caminho próprio: 10 milhões de visualizações qualificadas de Shorts nos últimos 90 dias (ou 3 milhões no nível anterior)." },
      { h3: "Ao longo de um ano, 4.000 horas são cerca de 11 horas por dia" },
      {
        p: "A janela de 365 dias é móvel. O tempo de exibição de 13 meses atrás vai saindo enquanto o novo entra. Por isso, 4.000 horas equivalem a cerca de 11 horas de exibição por dia somando o canal todo. Se o seu total diário no Studio está bem abaixo disso, você sabe que precisa de mais visualizações, de visualizações mais longas ou das duas coisas.",
      },
    ],
  },
  after: [
    {
      eyebrow: "Aumente seu tempo de exibição",
      title: "Como chegar mais rápido às 4.000 horas de exibição",
      blocks: [
        { p: "Você não muda os números do ano passado, mas pode mudar o que acontece daqui para frente. Estas são as coisas que mais mexem no tempo de exibição:" },
        {
          ul: [
            "**Acerte os primeiros 30 segundos.** A maioria das pessoas sai cedo. Comece pelo que o vídeo entrega, não por uma introdução longa ou um pedido de inscrição. Veja no gráfico de retenção do Studio exatamente onde as pessoas desistem.",
            "**Faça alguns vídeos mais longos.** Um vídeo de 12 minutos que segura as pessoas por 6 rende três vezes o tempo de exibição de um vídeo de 4 minutos assistido por 2. Tutoriais, análises e passo a passo combinam bem com formatos longos.",
            "**Leve o espectador ao próximo vídeo.** Use telas finais, cards e playlists para que uma visualização vire duas ou três. Conteúdo em série funciona especialmente bem aqui.",
            "**Faça lives.** Transmissões ao vivo costumam ter sessões longas, e elas contam desde que a gravação continue pública.",
            "**Use os Shorts como porta de entrada.** O tempo assistido no feed do Shorts não conta, mas um Short pode levar gente nova para um vídeo longo que conta.",
            "**Mantenha os vídeos antigos públicos.** Excluir ou tornar privado um vídeo tira as horas de exibição dele do seu total. Corrija ou atualize um vídeo antigo em vez de tirá-lo do ar.",
            "**Faça vídeos atemporais.** Tutoriais e explicações continuam sendo encontrados por anos, então somam horas de exibição muito depois da publicação.",
            "**Publique com regularidade.** Um ritmo constante dá ao YouTube mais chances de recomendar você e dá ao público um motivo para voltar.",
            "**Capriche nos títulos e nas miniaturas.** Uma taxa de cliques melhor faz mais gente começar a assistir, e cada visualização extra soma horas.",
          ],
        },
        { p: `Quando estiver perto, confira de novo com o [Verificador de monetização](${CHECKER}) quais requisitos públicos seu canal já cumpre.` },
      ],
    },
    {
      eyebrow: "Total caindo",
      title: "Por que suas horas de exibição caíram",
      blocks: [
        { p: "É normal ver o total cair, mesmo publicando vídeos. Os motivos mais comuns:" },
        {
          ul: [
            "**A janela de 12 meses andou.** Horas de mais de um ano atrás deixam de contar, então um mês forte do ano passado sai da conta neste ano.",
            "**Você tornou um vídeo privado, não listado ou o excluiu.** As horas de exibição dele saem do total na hora.",
            "**Suas visualizações desaceleraram.** Se você ganha horas mais devagar do que as antigas expiram, o total cai.",
            "**O Studio ainda não atualizou.** O número em Monetização pode ficar um ou dois dias atrás de Análises.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Como o YouTube calcula o tempo de exibição?",
      a: "Multiplique as visualizações pela duração média da visualização. 50.000 visualizações com média de 4 minutos são 200.000 minutos, ou cerca de 3.333 horas. O YouTube Studio faz essa soma para você, mas a calculadora permite testar cenários antes de publicar.",
    },
    {
      q: "Quantas visualizações preciso para 4.000 horas de exibição?",
      a: "Depende de quanto tempo as pessoas assistem. Com média de 2 minutos, você precisaria de 120.000 visualizações. Com 5 minutos, 48.000, e com 10 minutos, só 24.000. Informe sua média acima para ver o seu número exato.",
    },
    {
      q: "O requisito de 4.000 horas vai mudar?",
      a: "Sim, para canais novos. A partir de 1º de fevereiro de 2027, novos candidatos vão precisar de 8.000 horas de exibição nos últimos 365 dias (ou 20 milhões de visualizações qualificadas de Shorts em 90 dias) e 1.000 inscritos. Se você já é monetizado, nada muda para você.",
    },
    {
      q: "Onde encontro a duração média da visualização?",
      a: "No YouTube Studio, abra Análises e vá até a guia Engajamento. Para um único vídeo, abra as análises desse vídeo. Ajuste o período para os últimos 365 dias se estiver acompanhando a monetização.",
    },
    {
      q: "As visualizações de Shorts contam para as 4.000 horas de exibição?",
      a: "Não. O tempo assistido no feed do Shorts não conta. Os Shorts têm um caminho próprio: 10 milhões de visualizações qualificadas de Shorts em 90 dias, mais 1.000 inscritos.",
    },
    {
      q: "As transmissões ao vivo contam como horas de exibição?",
      a: "Sim, desde que a transmissão seja pública e a gravação continue pública. Se depois você a tornar privada ou excluí-la, essas horas saem do seu total.",
    },
    {
      q: "As horas de exibição expiram?",
      a: "Sim. O YouTube só conta os últimos 365 dias, e a janela anda todo dia. As horas de um vídeo que viralizou há 14 meses não contam mais, mesmo que as visualizações continuem no vídeo.",
    },
    {
      q: "Tenho 4.000 horas. Por que ainda não sou monetizado?",
      a: "Atingir os números só torna você elegível. Você ainda precisa de 1.000 inscritos e, depois, de se candidatar no YouTube Studio, em Monetização, e vincular uma conta do AdSense para YouTube. O YouTube analisa seu canal segundo as políticas de monetização antes de aprovar.",
    },
    {
      q: "Posso comprar horas de exibição?",
      a: "Não faça isso. Visualizações e tempo de exibição comprados violam as regras do YouTube. Eles costumam ser filtrados e podem levar à recusa da candidatura ou à remoção do canal.",
    },
    {
      q: "Quantos minutos são 4.000 horas de exibição?",
      a: "240.000 minutos. 8.000 horas, a meta para novos candidatos a partir de 1º de fevereiro de 2027, são 480.000 minutos, e a meta de 3.000 horas do financiamento por fãs são 180.000 minutos.",
    },
    {
      q: "Quantas horas de exibição rendem 1.000 visualizações?",
      a: "Depende de quanto tempo as pessoas assistem. Com média de 4 minutos, 1.000 visualizações rendem cerca de 67 horas. Com 10 minutos, cerca de 167 horas. Informe seus números na calculadora acima.",
    },
    {
      q: "As 4.000 horas precisam vir de um único vídeo?",
      a: "Não. O YouTube soma as horas de exibição públicas de todos os seus vídeos longos dos últimos 12 meses. Muitos vídeos pequenos contam tanto quanto um grande.",
    },
    {
      q: "O que acontece quando chego a 4.000 horas de exibição?",
      a: "Você também precisa de 1.000 inscritos. Com os dois, candidate-se no YouTube Studio, em Monetização, aceite os termos e vincule uma conta do AdSense para YouTube. Depois o YouTube analisa seu canal, o que pode levar até 30 dias.",
    },
    {
      q: "O YouTube paga por hora de exibição?",
      a: "Não. O YouTube não paga por horas de exibição. Depois de monetizado, você recebe parte da receita de anúncios, que depende das visualizações, do tema e da localização do público. Nosso estimador de ganhos (em inglês) dá uma faixa aproximada.",
      link: { text: "estimador de ganhos", href: ESTIMATOR },
    },
    {
      q: "É difícil chegar a 4.000 horas de exibição?",
      a: "É um marco de verdade. Ao longo de um ano, são cerca de 11 horas de exibição por dia somando o canal todo. Vídeos mais longos que prendem a atenção chegam lá bem mais rápido do que os curtos, e é por isso que a duração média da visualização importa tanto.",
    },
    {
      q: "Que taxa de retenção devo usar na calculadora?",
      a: "Use seus números reais do YouTube Studio, se tiver. Se está começando, teste alguns valores entre 30% e 50% para ver uma faixa e depois troque pelo seu número real quando tiver alguns vídeos publicados.",
    },
    {
      q: "Vou me candidatar por volta de janeiro de 2027. Qual regra vale para mim?",
      a: "A regra das 8.000 horas vale para novos candidatos a partir de 1º de fevereiro de 2027. O anúncio do YouTube não diz como ficam as candidaturas que ainda estiverem em análise nessa data, então, se você já tem 4.000 horas e 1.000 inscritos, vale a pena se candidatar antes e acompanhar o status em Monetização.",
    },
    {
      q: "Esta calculadora é gratuita?",
      a: "Sim. Não tem cadastro nem limite de uso.",
    },
  ],
};
