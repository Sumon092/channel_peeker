import type { LocalizedToolContent } from "@/lib/i18n";

const UPDATED = "7 de novembro de 2026";
const API_BADGE = "Dados oficiais do YouTube";

export const content: Record<string, LocalizedToolContent> = {
  "/comment-picker": {
    title: "Sorteio de comentários do YouTube",
    description:
      "Sorteie os ganhadores do seu sorteio entre os comentários de um vídeo do YouTube — aleatório criptográfico, uma participação por pessoa, até 5 ganhadores. Grátis, sem cadastro.",
    heading: "Sorteio de comentários",
    highlight: "Sorteio",
    intro: "Vai fazer um sorteio? Escolha os ganhadores aleatoriamente entre os comentários — justiça comprovável, com uma animação de suspense que você pode gravar para o anúncio.",
    howTo: [
      "Cole o link do vídeo do seu sorteio.",
      "Opcional: palavra-chave obrigatória (ex.: #sorteio), uma participação por pessoa, número de ganhadores.",
      "Clique em « Pick winner » — grave a tela para mostrar a transparência do sorteio.",
    ],
    meaning: [
      "Sorteios nos comentários recompensam seu público de verdade, mas escolher rolando a tela não é aleatório nem comprovável. Esta ferramenta carrega os comentários pela API oficial do YouTube e sorteia com aleatoriedade criptográfica direto no seu navegador — não poderíamos favorecer ninguém, mesmo se quiséssemos.",
      "Limites honestos: o sorteio usa os 500 comentários principais mais recentes (respostas não contam como participações), e nenhuma ferramenta consegue verificar quem é inscrito — o YouTube não divulga essa informação. Verifique as condições de inscrição manualmente antes de anunciar.",
    ],
    faq: [
      {
        q: "Como sortear um ganhador entre comentários do YouTube?",
        a: "Cole o link do vídeo, ajuste os filtros e clique em « Pick winner ». O sorteio usa o gerador aleatório criptográfico do seu navegador.",
      },
      {
        q: "O sorteio é mesmo aleatório?",
        a: "Sim — usamos crypto.getRandomValues (a fonte aleatória segura do navegador) com seleção sem viés, executada no seu aparelho. Grave o sorteio se quiser uma prova visível para o público.",
      },
      {
        q: "Dá para verificar se o ganhador é inscrito?",
        a: "Não — nenhuma ferramenta consegue. O YouTube não torna as inscrições públicas. Verifique essa condição manualmente antes de anunciar o ganhador.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/comment-finder": {
    title: "Buscador de comentários do YouTube",
    description:
      "Pesquise uma palavra, nome ou frase nos comentários de qualquer vídeo do YouTube. Ordene por populares ou recentes e exporte em CSV. Grátis, dados oficiais.",
    heading: "Buscador de comentários",
    highlight: "Buscador",
    intro: "Pesquise dentro dos comentários de um vídeo — encontre um comentário específico, cada menção a uma palavra ou o seu próprio comentário em um vídeo viral.",
    howTo: [
      "Cole um link de vídeo ou Short.",
      "Opcional: digite a palavra, nome ou frase que procura.",
      "Veja os resultados, por populares ou recentes, e baixe em CSV.",
    ],
    meaning: [
      "A busca de comentários do YouTube é muito limitada — na maioria dos aparelhos só dá para rolar a tela. Esta ferramenta pede à API oficial que filtre os comentários pelos seus termos: ideal para reencontrar um comentário meio lembrado ou reunir citações para pesquisa.",
      "Mostramos até 100 threads de comentários principais por busca. Sem termo de busca, « populares » segue o ranking do próprio YouTube; com termo, ordenamos por curtidas. « Mais recentes » é sempre cronológico.",
    ],
    faq: [
      {
        q: "Como encontrar um comentário específico em um vídeo do YouTube?",
        a: "Cole o link do vídeo e digite uma palavra ou frase que você lembra. A API oficial do YouTube devolve só os comentários correspondentes.",
      },
      {
        q: "Posso encontrar meu próprio comentário?",
        a: "Sim — busque o nome do seu canal ou uma frase marcante. Atenção: o YouTube devolve comentários principais; uma resposta dentro de um thread não aparece separadamente.",
      },
      {
        q: "Posso exportar os comentários?",
        a: "Sim — em CSV com autor, texto, curtidas, número de respostas e data.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/thumbnail-tools/thumbnail-downloader": {
    title: "Baixar thumbnail do YouTube em HD e 4K",
    description:
      "Baixe a thumbnail de qualquer vídeo do YouTube em todos os tamanhos: HD 1280×720 e, quando houver, de 1080p a 4K. Grátis, sem cadastro.",
    heading: "Baixador de thumbnails",
    highlight: "thumbnails",
    intro: "Pegue a thumbnail de qualquer vídeo em todos os tamanhos que o YouTube oferece — do SD às novas versões em 4K.",
    howTo: [
      "Cole um link de vídeo ou Short.",
      "Lemos todos os tamanhos de thumbnail disponíveis pela API oficial.",
      "Abra o tamanho que precisar e salve a imagem.",
    ],
    meaning: [
      "O YouTube guarda várias resoluções de thumbnail por vídeo — da pequena prévia de busca ao « maxres » em 1280×720, e às vezes muito além. Listamos cada versão com link direto, obtida da API oficial.",
      "Útil para referências de design, arquivar seus próprios vídeos ou pesquisar a concorrência. A imagem continua sendo do canal — baixe como referência, não para o seu próprio branding.",
    ],
    faq: [
      {
        q: "Como baixar uma thumbnail do YouTube?",
        a: "Cole o link do vídeo acima, escolha o tamanho, clique com o botão direito → « Salvar imagem como ». Pronto.",
      },
      {
        q: "Qual é a resolução de uma thumbnail do YouTube?",
        a: "O HD padrão é 1280×720 (« maxresdefault »). Alguns vídeos têm também versões de 1080p a 4K, exibidas quando o YouTube as fornece.",
      },
      {
        q: "Isso é legal?",
        a: "As URLs são públicas — o YouTube as entrega a qualquer visitante. Os direitos são do criador; use os downloads como referência e arquivo.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/thumbnail-tools/banner-downloader": {
    title: "Baixar banner do YouTube em HD",
    description:
      "Baixe o banner de qualquer canal do YouTube em resolução completa — TV (2120px), desktop 2× (2560px), tablet e celular. Grátis.",
    heading: "Baixador de banners",
    highlight: "banners",
    intro: "Pegue a arte do banner de qualquer canal em todos os tamanhos que o YouTube oferece — da imagem completa de TV ao recorte exato de desktop.",
    howTo: [
      "Cole um link de canal, um @handle ou um vídeo do canal.",
      "Lemos a URL do banner pela API oficial do YouTube.",
      "Abra o tamanho que precisar e salve, ou copie a URL direta.",
    ],
    meaning: [
      "O YouTube guarda uma imagem grande de banner e a recorta conforme o aparelho: TVs mostram a imagem completa (~2120×1192), o desktop uma faixa de 2560×423, tablets e celulares recortes mais estreitos. Damos links diretos para cada recorte, mais a imagem original.",
      "Prático para referências de design, arquivar suas criações e análise de concorrência. A arte pertence ao dono do canal — baixe como referência, não para rebrandear.",
    ],
    faq: [
      {
        q: "Como baixar o banner de um canal do YouTube?",
        a: "Cole o link do canal ou o @handle acima. Mostramos o banner em cada recorte — abra, clique com o botão direito, « Salvar imagem como ».",
      },
      {
        q: "Qual é o tamanho de um banner do YouTube?",
        a: "O upload recomendado é 2560×1440. A TV mostra tudo, o desktop uma faixa de 2560×423, e a « área segura » visível em todo lugar é 1546×423 no centro.",
      },
      {
        q: "Por que um canal não tem banner?",
        a: "Nem todo canal configura um. Sem banner, a API não devolve URL — e dizemos isso honestamente em vez de adivinhar.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/monetization-checker": {
    title: "Verificar monetização do YouTube",
    description:
      "Veja quais requisitos do Programa de Parcerias do YouTube um canal cumpre visivelmente: inscritos, país, atividade. Sinais honestos, não um sim/não inventado.",
    heading: "Verificador de monetização",
    highlight: "monetização",
    intro: "Veja quais requisitos do Programa de Parcerias um canal cumpre segundo os dados públicos — honestamente, sem um sim/não inventado.",
    howTo: [
      "Cole um link de canal, um @handle ou um vídeo do canal.",
      "Verificamos os sinais públicos do Programa de Parcerias pela API oficial.",
      "Leia quais requisitos são cumpridos — e quais não dá para verificar publicamente.",
    ],
    meaning: [
      "Desde 2023, o YouTube não revela mais publicamente se um canal é monetizado. Sites que mostram um « sim/não » estão adivinhando — por exemplo, pelos anúncios, que também aparecem em vídeos não monetizados. Nós mostramos quais requisitos visíveis (1.000 inscritos, país do canal, atividade) o canal cumpre.",
      "As horas de exibição e as visualizações de Shorts dos últimos 90 dias são privadas — só o dono vê no YouTube Studio. O que mostramos é verificável; o que ninguém pode verificar, não afirmamos.",
    ],
    faq: [
      {
        q: "Como saber se um canal do YouTube é monetizado?",
        a: "Com certeza, só sendo o dono no YouTube Studio. Publicamente só dá para verificar os requisitos visíveis — é exatamente isso que mostramos, sem adivinhar.",
      },
      {
        q: "O que é preciso para o Programa de Parcerias?",
        a: "Para a monetização completa: 1.000 inscritos mais 4.000 horas de exibição pública em 12 meses ou 10 mi de visualizações de Shorts em 90 dias, em um país onde o programa exista.",
      },
      {
        q: "Por que vocês não mostram um simples sim/não?",
        a: "Porque não dá para verificar publicamente. Um honesto « estes sinais são cumpridos » é mais útil que um sim/não chutado.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/channel-analyzer": {
    title: "Analisar canal do YouTube grátis",
    description:
      "Analise qualquer canal do YouTube grátis: inscritos, visualizações por vídeo, ritmo de postagem, top vídeos e um relatório compartilhável. Sem cadastro.",
    heading: "Analisador de canais",
    highlight: "Analisador",
    intro: "Cole um canal e receba estatísticas, ritmo de postagem e top vídeos — com um link de relatório para compartilhar.",
    howTo: [
      "Cole um link de canal, um @handle ou qualquer vídeo do canal.",
      "Carregamos as estatísticas públicas pela API oficial do YouTube.",
      "Leia o relatório — e compartilhe com quem quiser pelo link.",
    ],
    meaning: [
      "O relatório combina dados reais do YouTube (inscritos, visualizações, número de vídeos, idade do canal) com análises do channelpeeker, como frequência de postagem e top vídeos recentes. Tudo o que calculamos é marcado como estimativa.",
      "Atenção: o YouTube arredonda os inscritos públicos para três algarismos significativos — por isso o sinal ≈. As visualizações são exatas.",
    ],
    faq: [
      {
        q: "Como analisar o canal do YouTube de outra pessoa?",
        a: "Cole o link ou o @handle acima. Todas as estatísticas públicas vêm direto da API oficial do YouTube — sem login, sem extensão.",
      },
      {
        q: "Os números de inscritos são exatos?",
        a: "O YouTube arredonda os valores públicos (123.456 aparece como 123 mil). Marcamos com ≈. As visualizações são exatas.",
      },
      {
        q: "Posso compartilhar o relatório?",
        a: "Sim — cada relatório tem um link próprio para mandar a comunidades, patrocinadores ou seu time.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
  "/watch-time-calculator": {
    title: "Calculadora de horas de exibição do YouTube",
    description:
      "Converta visualizações e duração média de exibição em horas de exibição — e veja quantas visualizações faltam para as 4.000 horas.",
    heading: "Calculadora de horas de exibição",
    highlight: "horas de exibição",
    intro: "Transforme visualizações e duração média em horas de exibição — e saiba exatamente quanto falta para as 4.000 horas.",
    howTo: [
      "Digite um número de visualizações — de um vídeo ou do seu canal.",
      "Digite a duração média de exibição do YouTube Studio (Análises → Engajamento).",
      "Leia as horas de exibição — e as visualizações necessárias para chegar a 4.000 horas.",
    ],
    meaning: [
      "Horas de exibição são simplesmente visualizações × duração média de exibição. O Programa de Parcerias do YouTube exige 4.000 horas de exibição pública nos últimos 365 dias (mais 1.000 inscritos) — esta calculadora traduz seus números para esse requisito.",
      "Só conta a exibição pública de vídeos longos: o tempo no feed de Shorts e vídeos privados ou excluídos ficam de fora. Os Shorts têm caminho próprio (10 mi de visualizações em 90 dias). O cálculo é exato; quais horas o YouTube conta, resumimos das regras publicadas.",
    ],
    faq: [
      {
        q: "Como as horas de exibição do YouTube são calculadas?",
        a: "Visualizações multiplicadas pela duração média de exibição. 100 mil visualizações com média de 3:30 dão 350 mil minutos — cerca de 5.833 horas.",
      },
      {
        q: "Quantas visualizações preciso para 4.000 horas?",
        a: "Depende da duração média: com 2 minutos, cerca de 120 mil visualizações; com 5 minutos, cerca de 48 mil. Digite a sua média acima para o número exato.",
      },
      {
        q: "Shorts contam para as 4.000 horas?",
        a: "Não — o tempo assistido no feed de Shorts não conta. Os Shorts têm caminho próprio de monetização: 10 milhões de visualizações públicas em 90 dias.",
      },
    ],
    dataBadge: "Cálculo transparente",
    updated: UPDATED,
  },
  "/video-upload-date-checker": {
    title: "Data de publicação de um vídeo do YouTube",
    description:
      "Descubra a data e a hora exatas em que um vídeo do YouTube foi publicado — no minuto, no seu fuso horário e em UTC. Grátis, dados oficiais.",
    heading: "Verificador de data de publicação",
    highlight: "data de publicação",
    intro: "O YouTube mostra « há 2 anos » — aqui você vê a data e a hora exatas da publicação, no minuto.",
    howTo: [
      "Cole um link de vídeo ou Short.",
      "Lemos o carimbo de tempo exato pela API oficial do YouTube.",
      "Copie o resultado — no seu fuso horário e em UTC.",
    ],
    meaning: [
      "A página de exibição arredonda as datas para « há X anos », mas a API guarda o carimbo exato de publicação — o momento em que o vídeo ficou público. Mostramos no seu fuso local e em UTC, com a idade precisa.",
      "Datas exatas importam para citações, checagem de fatos (« qual vídeo veio primeiro? »), questões de direitos autorais e pesquisa. Nota: em estreias e vídeos que passaram de privado a público, o carimbo é o da publicação, não o do upload do arquivo.",
    ],
    faq: [
      {
        q: "Como ver a data exata de publicação de um vídeo do YouTube?",
        a: "Cole o link aqui. O YouTube só mostra datas relativas; a API fornece o carimbo exato, que mostramos no minuto.",
      },
      {
        q: "É a hora do upload ou da publicação?",
        a: "Da publicação — o momento em que o vídeo ficou público. Em estreias, pode diferir do upload do arquivo.",
      },
      {
        q: "Qual fuso horário é usado?",
        a: "Os dois: o do seu navegador e o UTC — para citações sem ambiguidade.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
};
