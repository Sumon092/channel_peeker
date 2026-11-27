import type { LocalizedPageContent } from "@/lib/localized-page";

const ANALYZER = "/pt/channel-analyzer";
const UPLOAD_DATE = "/pt/video-upload-date-checker";
const YPP_HELP = "https://support.google.com/youtube/answer/72851?hl=pt-BR";

export const content: LocalizedPageContent = {
  title: "Verificador de idade e data de criação de canais do YouTube",
  description:
    "Descubra exatamente quando qualquer canal do YouTube foi criado e quantos anos ele tem, com o total de visualizações e de vídeos. Grátis, instantâneo, sem cadastro.",
  heading: "Verificador de idade de canais do YouTube",
  highlight: "idade de canais",
  intro:
    "Veja exatamente quando qualquer canal do YouTube foi criado e quantos anos ele tem hoje. Cole o link do canal, o @usuário ou um link de vídeo para começar.",
  updated: "27 de novembro de 2026",
  dataBadge: "Dados oficiais do YouTube",
  afterTool: [
    {
      p: "Todo canal tem uma data de criação, mas o YouTube não facilita para encontrá-la. E essa data diz muito. Um canal com 2 milhões de inscritos e 10 anos de vida cresceu aos poucos. Um que chegou a 2 milhões em 8 meses provavelmente viralizou. Esta ferramenta mostra a data em segundos, junto com o total de visualizações e de vídeos, para você ver o quadro completo.",
    },
  ],
  howTo: [
    "**Cole o canal.** Use o @usuário (como @mkbhd), o URL do canal, o ID do canal (começa com UC) ou o link de qualquer vídeo do canal, inclusive Shorts. Tudo funciona.",
    "**Confira a data.** A ferramenta lê a data de criação direto dos dados oficiais do YouTube, então ela bate com o que o próprio YouTube registra.",
    `**Use o resultado.** Copie-o ou abra a [análise completa do canal](${ANALYZER}) para ver os envios recentes e quais deles têm mais visualizações.`,
  ],
  before: [
    {
      eyebrow: "O cartão de resultado",
      title: "O que aparece no resultado",
      blocks: [
        { p: "Foi isto que o resultado mostrou quando verificamos o @mkbhd em 27 de novembro de 2026:" },
        {
          ul: [
            "**Canal:** foto, nome (Marques Brownlee) e @usuário.",
            "**Idade:** em anos, meses e dias, “18 anos, 8 meses e 6 dias”, e o total em dias (6.825 dias).",
            "**Data e hora de criação,** em UTC: “Criado em 21 de março de 2008 às 15:25 UTC”.",
            "**Inscritos:** ≈ 21,5 mi, arredondados como o YouTube faz, ou “Oculto pelo criador” se estiverem ocultos.",
            "**Visualizações totais desde a criação:** 5,9 bi.",
            "**Vídeos públicos:** 1.869.",
            "**Inscritos por mês:** cerca de 95,9 mil, já calculados para você.",
            "**Média de visualizações por vídeo:** 3,2 mi, já calculada para você.",
            "**País:** Estados Unidos, ou “Não definido” se o criador deixou em branco.",
            "**ID do canal:** UCBJycsmduvYEL83R_U4JriQ, com um botão Copiar ID.",
            "**Copiar resultado:** copia um resumo de uma linha com a data, a hora e a idade.",
            "**Copiar link:** copia um link de compartilhamento (channelpeeker.com/pt/channel-age-checker?c=@mkbhd) que abre a ferramenta e faz a mesma verificação. Prático para mandar um canal para um cliente ou para alguém da equipe.",
            "**Abrir no YouTube:** abre o canal no YouTube em uma nova guia.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "O que significam os resultados",
    blocks: [
      {
        p: "A data de criação é quando o próprio canal foi criado. Não é a data do primeiro vídeo. Muitos canais ficam vazios por anos antes de alguém enviar qualquer coisa. Alguns criadores também excluem ou ocultam os vídeos mais antigos, então o vídeo mais antigo que você vê pode ser bem mais recente que o canal.",
      },
      { p: "Por isso a idade é mais útil ao lado de outros números. Veja como ler tudo junto:" },
      {
        ul: [
          "**Canal antigo, poucos vídeos:** o canal provavelmente ficou parado por muito tempo, ou o criador removeu conteúdo antigo.",
          "**Canal novo, números grandes:** crescimento rápido, muitas vezes por causa de um ou dois vídeos virais. Veja os vídeos principais para saber se o crescimento se manteve.",
          "**Canal antigo, números estáveis:** um histórico longo e consistente. Costuma ser o sinal mais seguro na hora de avaliar um canal.",
        ],
      },
      { h3: "Idade do canal x idade da Conta do Google" },
      {
        p: "Se você quer saber quantos anos tem sua conta do YouTube, existem duas datas. Sua Conta do Google pode ser anos mais antiga que o canal, porque o canal é criado separadamente, às vezes muito depois de você abrir o Gmail. Esta ferramenta mostra a data de criação do canal, que é a que importa no YouTube.",
      },
      { h3: "Como encontrar a data de criação de um canal sem uma ferramenta" },
      {
        p: "Dá para conferir direto no YouTube. Abra o canal, toque na descrição abaixo do nome para abrir o painel “Sobre” e procure a data de “Inscreveu-se em”. Ela mostra só a data, então você mesmo precisa calcular a idade. É isso que esta ferramenta faz por você, junto com as visualizações e o número de vídeos do canal.",
      },
    ],
  },
  after: [
    {
      eyebrow: "Motivos comuns",
      title: "Por que as pessoas verificam a idade de um canal",
      blocks: [
        {
          ul: [
            "**Antes de um patrocínio ou parceria.** Marcas e criadores conferem se o canal tem um histórico real e não surgiu do nada.",
            "**Antes de comprar um canal.** Se o vendedor diz que o canal “existe desde 2015”, a data de criação mostra se é verdade.",
            "**Comparar com a concorrência.** Compare quanto tempo um concorrente levou para chegar aos números dele com o tempo que você está no YouTube.",
            "**Avaliar um nicho.** Se a maioria dos grandes canais de um tema tem mais de 8 anos, é um espaço maduro. Se vários canais em alta têm menos de 2 anos, ainda há espaço para quem está chegando.",
            "**Identificar canais falsos ou reaproveitados.** Um canal novíssimo com muitos inscritos e poucos vídeos pode ser um sinal de alerta.",
            "**Pura curiosidade.** Descobrir quando seu criador favorito começou é divertido, principalmente quando o canal é mais antigo do que você imaginava.",
          ],
        },
      ],
    },
    {
      eyebrow: "Faça as contas",
      title: "Como calcular a taxa de crescimento de um canal",
      blocks: [
        {
          p: "Quando você sabe a idade de um canal, duas contas rápidas mostram a velocidade do crescimento. A ferramenta calcula as duas e mostra no resultado, mas veja como elas funcionam:",
        },
        {
          ul: [
            "**Inscritos por mês:** total de inscritos ÷ idade do canal em meses. Um canal com 600.000 inscritos e 5 anos (60 meses) ganhou cerca de 10.000 por mês, em média.",
            "**Média de visualizações por vídeo:** total de visualizações ÷ número de vídeos. 30 milhões de visualizações em 300 vídeos dão 100.000 visualizações por vídeo.",
          ],
        },
        {
          p: `Lembre que são médias. Um canal que andou devagar por quatro anos e explodiu em um mês fica igual a um que cresceu de forma constante. Para ver quais vídeos recentes estão puxando as visualizações, abra a [análise completa do canal](${ANALYZER}).`,
        },
      ],
    },
  ],
  faq: [
    {
      q: "Como vejo quando um canal do YouTube foi criado?",
      a: "Cole o @usuário, o URL ou o link de um vídeo do canal na ferramenta acima. Você recebe a data exata de criação e a idade do canal. No próprio YouTube, a data aparece como “Inscreveu-se em” no painel Sobre do canal.",
    },
    {
      q: "Quantos anos tem minha conta do YouTube?",
      a: "Cole o link do seu canal na ferramenta. Ela mostra quando seu canal foi criado. Sua Conta do Google pode ser mais antiga, porque o canal é criado separadamente.",
    },
    {
      q: "A data de criação é a mesma do primeiro envio?",
      a: "Não. Um canal pode ficar vazio por anos antes do primeiro vídeo, e envios antigos podem ser excluídos ou ocultados. Veja em “O que significam os resultados”, acima, como ler a idade ao lado do número de vídeos.",
    },
    {
      q: "Um canal mais antigo ranqueia melhor ou é monetizado mais rápido?",
      a: "Não diretamente. O Programa de Parcerias do YouTube não exige idade mínima do canal. Ele olha inscritos e horas de exibição. As recomendações dependem de como os espectadores reagem aos seus vídeos, não da idade do canal.",
      link: { text: "Programa de Parcerias do YouTube", href: YPP_HELP },
    },
    {
      q: "Dá para verificar um canal excluído ou privado?",
      a: "Não. A ferramenta só lê canais públicos. Depois que um canal é excluído ou fica privado, os dados dele não estão mais disponíveis.",
    },
    {
      q: "Dá para descobrir quando um vídeo específico foi enviado?",
      a: "Dá, mas isso é outra ferramenta. Use o Verificador de data de envio de vídeos para ver a data e a hora exatas de publicação de um vídeo.",
      link: { text: "Verificador de data de envio de vídeos", href: UPLOAD_DATE },
    },
    {
      q: "Por que um canal parece mais antigo que os vídeos dele?",
      a: "Normalmente porque o criador abriu o canal cedo e começou a publicar depois, ou removeu envios antigos. É muito comum e não significa que haja algo errado.",
    },
    {
      q: "A data de criação é precisa?",
      a: "Ela vem direto dos registros do YouTube pela API oficial, então é a mesma data que o YouTube guarda para o canal. Não é uma estimativa.",
    },
    {
      q: "Posso colar o link de um vídeo em vez do canal?",
      a: "Pode. Cole o link de qualquer vídeo, inclusive de um Short, e a ferramenta encontra o canal que o enviou e mostra a data de criação dele. Um ID de canal (começa com UC) também funciona.",
    },
    {
      q: "Por que a ferramenta não mostra resultado?",
      a: "Normalmente é o link. Cole o link completo do canal, o @usuário ou o link de qualquer vídeo. URLs personalizados antigos com /c/ não funcionam, então use o @usuário ou o link de um vídeo. Se o canal foi excluído, ficou privado ou foi encerrado, não sobra nada público para ler.",
    },
    {
      q: "A idade de um canal muda se ele mudar de nome?",
      a: "Não. A data de criação continua a mesma quando o criador muda o nome, o @usuário ou a foto do canal. Ela só reflete quando o canal foi criado.",
    },
    {
      q: "Por que um canal mostra uma data estranha, como 1970?",
      a: "Essa não é uma data real. Alguns canais, inclusive o canal oficial do próprio YouTube, voltam do YouTube com 1º de janeiro de 1970 como data de criação, o que é um valor provisório, não o dia em que foram criados. Qualquer data anterior a 2005, ano de lançamento do YouTube, não pode estar certa, então a ferramenta mostra “Data de criação não pública” em vez de uma idade errada.",
    },
  ],
};
