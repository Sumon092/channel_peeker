import type { LocalizedToolContent } from "@/lib/i18n";

const UPDATED = "22 de novembro de 2026";
const API_BADGE = "Dados oficiais do YouTube";

export const content: Record<string, LocalizedToolContent> = {
  "/comment-picker": {
    title: "Sorteio de comentários do YouTube",
    description:
      "Sorteie os ganhadores entre os comentários de um vídeo do YouTube — aleatório criptográfico, até 5 ganhadores. Grátis, sem cadastro.",
    heading: "Sorteio de comentários",
    highlight: "Sorteio",
    intro: "Vai fazer um sorteio? Escolha os ganhadores aleatoriamente entre os comentários — justiça comprovável, com uma animação de suspense que você pode gravar para o anúncio.",
    howTo: [
      "Cole o link do vídeo do seu sorteio.",
      "Opcional: palavra-chave obrigatória (ex.: #sorteio), uma participação por pessoa, número de ganhadores.",
      "Clique em « Sortear vencedor » — grave a tela para mostrar a transparência do sorteio.",
    ],
    meaning: [
      "Sorteios nos comentários recompensam seu público de verdade, mas escolher rolando a tela não é aleatório nem comprovável. Esta ferramenta carrega os comentários pela API oficial do YouTube e sorteia com aleatoriedade criptográfica direto no seu navegador — não poderíamos favorecer ninguém, mesmo se quiséssemos.",
      "Limites honestos: o sorteio usa os 500 comentários principais mais recentes (respostas não contam como participações), e nenhuma ferramenta consegue verificar quem é inscrito — o YouTube não divulga essa informação. Verifique as condições de inscrição manualmente antes de anunciar.",
      "O ganhador sumiu? Clique em « Sortear de novo » e saia outro na hora, sem recarregar os comentários. Se a ideia for só ler os comentários ou achar um específico, o nosso buscador de comentários resolve melhor.",
    ],
    faq: [
      {
        q: "Como sortear um ganhador entre comentários do YouTube?",
        a: "Cole o link do vídeo, ajuste os filtros e clique em « Sortear vencedor ». O sorteio usa o gerador aleatório criptográfico do seu navegador.",
      },
      {
        q: "O sorteio é mesmo aleatório?",
        a: "Sim — usamos crypto.getRandomValues (a fonte aleatória segura do navegador) com seleção sem viés, executada no seu aparelho. Grave o sorteio se quiser uma prova visível para o público.",
      },
      {
        q: "Dá para verificar se o ganhador é inscrito?",
        a: "Não — nenhuma ferramenta consegue. O YouTube não torna as inscrições públicas. Verifique essa condição manualmente antes de anunciar o ganhador.",
      },
      {
        q: "Quantos comentários a ferramenta carrega?",
        a: "Até os 500 comentários principais mais recentes. Em sorteios grandes, peça uma palavra-chave obrigatória para que todas as participações de verdade entrem, ou faça o sorteio logo depois de encerrar.",
      },
      {
        q: "Dá para sortear mais de um ganhador?",
        a: "Dá: até 5 de uma vez, sem repetir ninguém. Ainda vem um texto pronto para copiar e anunciar o resultado.",
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
      "As respostas entram na contagem de cada conversa, mas não são abertas. E quem decide quais comentários batem com a sua busca é o próprio YouTube — se nada aparecer, vale tentar outra grafia ou uma palavra mais curta.",
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
      {
        q: "Por que aparecem no máximo 100 comentários?",
        a: "Cada busca traz uma página com até 100 conversas principais. Em vídeos com muitos comentários, use termos mais específicos para achar o que procura dentro dessa página.",
      },
      {
        q: "Por que diz que os comentários estão desativados?",
        a: "Quando o criador desativa os comentários, ou o vídeo é marcado como conteúdo para crianças, a API do YouTube não devolve nenhum comentário. A gente avisa isso em vez de chutar.",
      },
      {
        q: "Dá para buscar comentários pelo celular?",
        a: "Dá, direto no navegador do celular, sem baixar app nem fazer login. Copie o link no botão Compartilhar do app do YouTube e cole aqui.",
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
      "Os tamanhos mudam de vídeo para vídeo, porque só mostramos os que existem de fato. Desde 2026, o YouTube oferece versões em 1080p, 1440p e 4K para alguns vídeos. A maioria dos criadores envia a thumbnail em HD — é a versão « resolução máxima », de 1280×720, que pode faltar em vídeos antigos ou de baixa qualidade. Também há cópias menores, usadas no feed, na busca e nos vídeos incorporados.",
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
      {
        q: "Por que não aparece a thumbnail em HD?",
        a: "O YouTube só gera a versão de 1280×720 quando o vídeo ou a thumbnail personalizada foram enviados em HD. Vídeos antigos ou em baixa resolução têm só os tamanhos menores.",
      },
      {
        q: "Dá para baixar thumbnail em 4K?",
        a: "Dá, quando o YouTube tem. Desde 2026, alguns vídeos ganharam thumbnails em 1080p, 1440p e 4K, e elas aparecem automaticamente na lista.",
      },
      {
        q: "Funciona com Shorts?",
        a: "Funciona. Cole um link youtube.com/shorts/ e você recebe a thumbnail do Short em todos os tamanhos disponíveis.",
      },
      {
        q: "Consigo baixar thumbnails de vários vídeos de uma vez?",
        a: "Consegue. Mude para o modo « Em lote », cole até 20 links e exporte todos os links das imagens em CSV.",
      },
      {
        q: "Como baixar thumbnail pelo celular?",
        a: "Abra o tamanho que você quer, toque e segure na imagem e escolha « Salvar imagem » (ou « Baixar imagem », dependendo do navegador). Não precisa instalar nenhum app.",
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
      {
        q: "Baixar banner de outro canal é permitido?",
        a: "Os endereços das imagens são públicos — o YouTube entrega esses arquivos para qualquer visitante. Mas a arte continua sendo do criador. Use como referência ou arquivo, nunca como identidade visual do seu canal.",
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
      "O relatório considera os 50 envios públicos mais recentes. « Envios (90 dias) » mostra quantos saíram nos últimos três meses — um jeito rápido de ver se o canal continua ativo. Já o gráfico « Visualizações por envio » coloca os vídeos em ordem, então dá para enxergar na hora o que bombou e as fases mais fracas.",
      "Atenção: o YouTube arredonda os inscritos públicos para três algarismos significativos — por isso o sinal ≈. As visualizações são exatas.",
      "Tempo de exibição, impressões e taxa de cliques são privados e ficam só com o dono do canal. Nenhuma ferramenta externa consegue mostrar esses números de outro canal.",
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
      {
        q: "O analisador de canais é grátis?",
        a: "É. Não precisa de conta nem de extensão, e ele só lê dados públicos pela API oficial do YouTube.",
      },
      {
        q: "Quantos vídeos entram na análise?",
        a: "Os 50 envios públicos mais recentes. É o bastante para mostrar o ritmo e o desempenho atuais sem vasculhar toda a história do canal.",
      },
      {
        q: "Por que vocês não mostram tempo de exibição nem CTR?",
        a: "Porque o YouTube só mostra esses dados para o dono do canal. Ferramenta que diz exibir isso de canais alheios está chutando.",
      },
      {
        q: "Os números são em tempo real?",
        a: "Quase. Guardamos os resultados em cache por pouco tempo para manter tudo rápido e dentro da cota da API. Cada relatório mostra exatamente quando os dados foram buscados.",
      },
    ],
    dataBadge: API_BADGE,
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
      {
        q: "Dá para ver a data exata pelo app do YouTube?",
        a: "Só em parte. Abrindo a descrição, o app costuma mostrar o dia da publicação, mas não o horário nem o fuso. Quando você precisa da hora certa, para uma citação ou para saber qual vídeo saiu primeiro no mesmo dia, cole o link aqui.",
      },
      {
        q: "A ferramenta é grátis?",
        a: "É, sim: grátis, sem cadastro e com dados oficiais do YouTube.",
      },
    ],
    dataBadge: API_BADGE,
    updated: UPDATED,
  },
};
