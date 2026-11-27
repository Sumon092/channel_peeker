import type { LocalizedPageContent } from "@/lib/localized-page";
import { REQUIREMENTS_2027_ID } from "@/lib/monetization";
import { NICHES, nicheRpm } from "@/lib/revenue-data";

const ESTIMATOR = "/revenue-calculator/channel-earnings-estimator"; // English only
const WATCH_TIME = "/pt/watch-time-calculator";
const ANALYZER = "/pt/channel-analyzer";
const YPP_CHANGES = "https://support.google.com/youtube/answer/12843009?hl=pt-BR";
const YPP_HELP = "https://support.google.com/youtube/answer/72851?hl=pt-BR";

const NICHE_NAMES: Record<string, string> = {
  finance: "Finanças e investimentos",
  business: "Negócios e marketing",
  tech: "Tecnologia e software",
  education: "Educação e tutoriais",
  health: "Saúde e fitness",
  food: "Culinária",
  gaming: "Games",
  entertainment: "Entretenimento e vlogs",
};
const usd = (n: number) => `US$ ${n.toFixed(2).replace(".", ",")}`;
const RPM_ROWS = Object.keys(NICHE_NAMES).map((id) => {
  const r = nicheRpm(NICHES.find((n) => n.id === id)!);
  return [NICHE_NAMES[id], `${usd(r.low)} – ${usd(r.high)}`];
});

export const content: LocalizedPageContent = {
  title: "Verificador de monetização do YouTube: este canal é monetizado?",
  description:
    "Confira qualquer canal do YouTube nas regras do Programa de Parcerias, incluindo as mudanças de fevereiro de 2027. Veja os sinais públicos e o que eles significam. Grátis.",
  heading: "Verificador de monetização do YouTube",
  highlight: "Verificador de monetização",
  intro:
    "Descubra se um canal do YouTube cumpre os requisitos do Programa de Parcerias e o que os sinais públicos dizem sobre a monetização. Cole o link do canal, o @usuário ou um link de vídeo.",
  updated: "27 de novembro de 2026",
  dataBadge: "Dados oficiais do YouTube",
  afterTool: [
    {
      p: "Antes de começar, vale saber: o YouTube não divulga se um canal é monetizado. Só o dono vê isso no YouTube Studio. O que uma ferramenta consegue fazer é conferir os requisitos públicos, ler as pistas que um canal monetizado deixa e ser transparente sobre todo o resto. É exatamente isso que este verificador faz.",
    },
  ],
  howTo: [
    "**Cole o canal.** Vale o @usuário, o URL do canal, o ID do canal ou o link de qualquer vídeo, Short ou transmissão ao vivo dele.",
    "**Faça a verificação.** Olhamos o número de inscritos, o país, os envios recentes e a configuração “para crianças” do canal, e comparamos tudo com os dois níveis do Programa de Parcerias.",
    "**Leia o resultado.** Cada requisito aparece como cumprido, parcialmente cumprido, não cumprido ou não público, para você ver exatamente o que está confirmado e o que não está.",
  ],
  before: [
    {
      eyebrow: "O cartão de resultado",
      title: "O que aparece no resultado",
      blocks: [
        { p: "Foi isto que o resultado mostrou quando verificamos o @veritasium em 27 de novembro de 2026:" },
        {
          ul: [
            "**Canal:** foto, nome (Veritasium) e @usuário, com ≈ 21,5 mi inscritos e 555 vídeos.",
            "**Contagem regressiva:** “Faltam 66 dias para os novos requisitos do YouTube para receita de anúncios entrarem em vigor”, com link para os requisitos de 2027 mais abaixo. Ela some em 1º de fevereiro de 2027.",
            "**Nível de financiamento por fãs:** “Cumpre todos os requisitos públicos”. Pelo menos 500 inscritos (onde disponível): cumprido, ≈ 21,5 mi. 3 envios públicos nos últimos 90 dias: cumprido, 25 envios. País do Programa de Parcerias: cumprido, Estados Unidos. Não é um canal para crianças: cumprido. 3.000 horas de exibição ou 3 mi de visualizações de Shorts: não público.",
            "**Nível de receita de anúncios:** “Cumpre todos os requisitos públicos”. Pelo menos 1.000 inscritos: cumprido, ≈ 21,5 mi. País: cumprido. Não é para crianças: cumprido. 4.000 horas de exibição ou 10 mi de visualizações de Shorts: não público, com um aviso de que novos candidatos vão precisar de 8.000 horas ou 20 mi de visualizações de Shorts a partir de 1º de fevereiro de 2027. Os envios recentes não contam aqui.",
            "**Os dois níveis:** sem advertências ativas e seguindo as políticas de monetização: não público.",
            "**Manter-se ativo:** 25 envios públicos nos últimos 90 dias, o suficiente para a regra de 2027 seja qual for o tipo de vídeo. A contagem junta vídeos longos e Shorts, porque os dados públicos do YouTube não separam os dois de forma confiável. É só informativo e não muda o veredito.",
            "**Confira você mesmo:** um botão “Abrir o canal no YouTube” e quatro caixas de seleção (botão “Seja membro”, guia Loja ou prateleira de produtos, Super Thanks ou Super Chat, anúncios nos vídeos recentes), cada uma com uma linha dizendo o quanto aquela pista pesa.",
            "**Nossa leitura:** “Possivelmente monetizado” sem nada marcado, já que os requisitos públicos estão cumpridos. Ao marcar “Vejo um botão ‘Seja membro’”, muda para “Muito provavelmente monetizado”. Nada do que você marca é salvo.",
            "**Ganhos mensais estimados:** US$ 22,9 mil – US$ 91,6 mil, com o selo “Estimativa, não um pagamento”. O cálculo usa as visualizações dos 11 vídeos enviados nos últimos 30 dias e supõe um nicho misto e um público dos EUA, Reino Unido, Canadá ou Austrália. Ele só aparece quando o canal cumpre os requisitos públicos de receita de anúncios. Caso contrário, a caixa diz “Não exibido: este canal não cumpre os requisitos públicos de receita de anúncios.”",
            `**Estimar ganhos:** abre o estimador de ganhos (em inglês) com o @veritasium já preenchido, onde você escolhe o nicho e o público para ver o detalhamento completo.`,
            "**Verificados recentemente:** os últimos 5 canais que você verificou aparecem abaixo da caixa de busca, com um botão Limpar. Clique em um para verificar de novo. A lista fica só no seu navegador.",
            "**Copiar link:** copia um link de compartilhamento (channelpeeker.com/pt/monetization-checker?c=@veritasium) que abre a ferramenta e faz a mesma verificação.",
            "**Quando os dados foram obtidos,** para você saber se estão atualizados.",
          ],
        },
      ],
    },
  ],
  meaning: {
    heading: "Requisitos de monetização do YouTube, hoje e a partir de 1º de fevereiro de 2027",
    id: REQUIREMENTS_2027_ID,
    blocks: [
      {
        p: "O YouTube tem dois níveis de monetização. O primeiro libera o financiamento por fãs. O segundo acrescenta uma parte da receita de anúncios e do Premium. Em 1º de fevereiro de 2027, as metas de horas de exibição e de visualizações de Shorts do segundo nível dobram para canais novos. O requisito de inscritos continua em 1.000.",
      },
      {
        table: {
          corner: true,
          head: ["", "Financiamento por fãs", "Receita de anúncios, até 31 de janeiro de 2027", "Receita de anúncios, a partir de 1º de fevereiro de 2027"],
          rows: [
            ["Inscritos", "500", "1.000", "1.000"],
            ["Envios públicos", "3 nos últimos 90 dias", "–", "–"],
            ["Horas de exibição (últimos 365 dias)", "3.000", "4.000", "8.000"],
            ["Ou visualizações de Shorts (últimos 90 dias)", "3 milhões", "10 milhões", "20 milhões"],
            ["O que libera", "Clubes dos canais, Supers, Shopping", "Tudo acima, mais receita de anúncios e do YouTube Premium", "O mesmo"],
          ],
        },
      },
      { p: "A receita do YouTube Premium é uma parte do que os assinantes do Premium pagam quando assistem aos seus vídeos." },
      { p: "Alguns pontos importantes:" },
      {
        ul: [
          "A mudança de 2027 vale só para novos candidatos. Quem já está no Programa de Parcerias mantém o status.",
          "O nível de financiamento por fãs não muda.",
          "O nível de 500 inscritos só existe em alguns países. Nos demais, os canais começam em 1.000.",
          "Também é preciso seguir as políticas de monetização do YouTube, não ter advertências ativas relacionadas às diretrizes da comunidade e morar em um país onde o Programa de Parcerias está disponível.",
        ],
      },
      { h3: "O que mais muda em 2027 para canais monetizados" },
      {
        ul: [
          "**Manter-se ativo:** a partir de 1º de fevereiro de 2027, um canal monetizado precisa de pelo menos uma destas opções: 1.000 horas de exibição no último ano, 1 milhão de visualizações de Shorts nos últimos 90 dias ou 2 vídeos longos ou 5 Shorts enviados a cada 90 dias. Quem ficar abaixo disso ganha 90 dias para se recuperar.",
          "**Ganhos com Shorts:** para receber do Fundo para Criadores do Shorts a cada mês, o canal precisa de 10 milhões de visualizações de Shorts nos últimos 90 dias. Não atingir essa marca não afeta os ganhos com vídeos longos.",
          "**Novos termos:** os canais que já estão no programa precisam aceitar os termos atualizados no YouTube Studio até 31 de janeiro de 2027. Senão, deixam de ganhar com os recursos afetados.",
        ],
      },
      { p: `O anúncio completo do YouTube está na página de [mudanças no Programa de Parcerias](${YPP_CHANGES}).` },
    ],
  },
  after: [
    {
      eyebrow: "Sinais visíveis",
      title: "Como saber se um canal é monetizado sem usar uma ferramenta",
      blocks: [
        { p: "Você consegue identificar a maioria das pistas públicas sozinho. Algumas pesam bem mais que outras." },
        {
          ul: [
            "**Um botão “Seja membro” ao lado de Inscrever-se.** Os Clubes dos canais só existem para canais do Programa de Parcerias, então este é o sinal público mais forte que existe.",
            "**Super Thanks, Super Chat ou Super Stickers.** Também são recursos do Programa de Parcerias.",
            "**Uma guia Loja ou uma prateleira de produtos.** Normalmente significa que o Shopping está ativado, o que também exige o Programa de Parcerias.",
            `**Anúncios nos vídeos.** É a pista mais fraca. [O YouTube pode exibir anúncios em qualquer vídeo, inclusive em canais que não estão no programa e não recebem nada por esses anúncios.](${YPP_HELP})`,
            "**O número de inscritos.** Um canal com menos de 500 inscritos quase certamente ainda não se qualificou.",
          ],
        },
        { p: "Nenhuma pista sozinha é prova. Um botão “Seja membro” diz muito. Anúncios, sozinhos, dizem muito pouco." },
        { p: "Nosso verificador passa por essas pistas com você e as combina com os requisitos públicos em um nível de confiança." },
      ],
    },
    {
      eyebrow: "Vídeos individuais",
      title: "Dá para saber se um vídeo ou Short específico é monetizado?",
      blocks: [
        {
          p: "Não com segurança. Mesmo em um canal monetizado, um vídeo pode não render nada. Ele pode ser para crianças, ter anúncios limitados por causa do tema ou usar uma música que outra pessoa reivindicou. Os intervalos comerciais que você vê ao assistir não provam que o criador está recebendo. Se você colar aqui o link de um vídeo ou Short, verificamos o canal por trás dele, porque essa é a parte pública.",
        },
      ],
    },
    {
      eyebrow: "Motivos comuns",
      title: "Por que um canal pode ainda não ser monetizado",
      blocks: [
        {
          ul: [
            `**Poucas horas de exibição ou visualizações de Shorts.** É, de longe, o motivo mais comum. Use a [calculadora de horas de exibição](${WATCH_TIME}) para ver quanto falta.`,
            "**Conteúdo reutilizado ou repetitivo.** O YouTube recusa canais que basicamente reenviam vídeos de outras pessoas ou produzem em massa vídeos quase idênticos.",
            "**Conteúdo para crianças.** Esses canais podem entrar, mas ganham menos: sem anúncios personalizados e sem Clubes dos canais ou Supers.",
            "**Localização.** O Programa de Parcerias não está disponível em todos os países.",
            "**Advertências.** Uma advertência ativa relacionada às diretrizes da comunidade pode bloquear ou atrasar a aprovação.",
            "**Nunca se candidatou.** Atingir os números não inscreve ninguém automaticamente. É preciso se candidatar no YouTube Studio, em Monetização.",
          ],
        },
      ],
    },
    {
      eyebrow: "Seu próprio canal",
      title: "Como verificar o seu próprio canal",
      blocks: [
        {
          p: "Abra o YouTube Studio e vá em Monetização. Lá aparecem suas horas de exibição, visualizações de Shorts e inscritos exatos, o quanto falta para cada nível e o status da sua candidatura, se você já se candidatou. É a única resposta oficial. Uma ferramenta como esta é útil para conferir outros canais ou dar uma olhada rápida no que é público.",
        },
        { p: `Quer saber quanto um canal monetizado pode ganhar? Experimente o [estimador de ganhos](${ESTIMATOR}) (em inglês).` },
      ],
    },
    {
      eyebrow: "Próximos passos",
      title: "Quem usa um verificador de monetização, e o que fazer em seguida",
      blocks: [
        { p: "Cada pessoa verifica por um motivo, e o próximo passo depende do seu." },
        {
          ul: [
            `**Criadores acompanhando o próprio progresso.** Confira aqui o que é público e depois abra Monetização no YouTube Studio para ver suas horas de exibição exatas. Se estiver perto, a [calculadora de horas de exibição](${WATCH_TIME}) mostra quantas visualizações ainda faltam.`,
            `**Marcas e agências avaliando um patrocínio.** Um canal monetizado passou pela análise do próprio YouTube, o que já diz algo sobre o conteúdo. Veja os envios e as visualizações recentes do canal no [analisador de canais](${ANALYZER}) antes de fechar qualquer acordo.`,
            `**Criadores avaliando a concorrência.** Se um concorrente do seu nicho é monetizado, o [estimador de ganhos](${ESTIMATOR}) (em inglês) dá uma ideia aproximada de quanto o nicho pode render.`,
            "**Quem compra ou vende um canal.** Nunca aceite “monetizado” só na palavra. Peça ao vendedor que compartilhe a tela ao vivo mostrando a página Monetização do YouTube Studio. É a prova mais confiável, porque capturas de tela podem ser editadas.",
          ],
        },
      ],
    },
    {
      eyebrow: "Shorts e lives",
      title: "Monetização de Shorts e transmissões ao vivo no YouTube",
      id: "shorts-and-live",
      blocks: [
        {
          p: "Os Shorts têm um caminho próprio para o Programa de Parcerias. Em vez de horas de exibição, o canal pode se qualificar com visualizações de Shorts: 10 milhões nos últimos 90 dias hoje, ou 20 milhões para novos candidatos a partir de 1º de fevereiro de 2027, mais 1.000 inscritos. O tempo assistido no feed do Shorts não conta para a meta de horas de exibição, então não dá para somar os dois.",
        },
        {
          p: "Os ganhos com Shorts também funcionam de outro jeito. O dinheiro dos anúncios do feed do Shorts vai para um fundo compartilhado, o Fundo para Criadores do Shorts, que é dividido entre os criadores de acordo com a participação de cada um nas visualizações. A partir de 1º de fevereiro de 2027, um canal monetizado precisa manter 10 milhões de visualizações de Shorts a cada 90 dias para continuar recebendo desse fundo. Não atingir essa marca não afeta os ganhos com vídeos longos.",
        },
        {
          p: "As transmissões ao vivo são mais simples. O tempo assistido em uma live pública conta para as horas de exibição, desde que a gravação continue pública. Canais monetizados também podem ganhar com Super Chat e Super Stickers durante a transmissão. Você pode colar o link de uma live no verificador, e ele confere o canal por trás dela.",
        },
      ],
    },
    {
      eyebrow: "Candidatura",
      title: "Como se candidatar à monetização do YouTube",
      blocks: [
        { p: "Quando seu canal cumpre os requisitos, a candidatura é feita no YouTube Studio. É grátis e leva poucos minutos." },
        {
          ol: [
            "Ative a verificação em duas etapas na sua Conta do Google. O YouTube exige isso.",
            "Abra o YouTube Studio e escolha Monetização no menu à esquerda.",
            "Clique em Inscrever-se, revise e aceite os termos do Programa de Parcerias.",
            "Crie uma conta do AdSense para YouTube ou vincule uma que você já tenha. É por ela que o YouTube faz os pagamentos.",
            "Aguarde a análise. Os sistemas e os revisores do YouTube avaliam o canal como um todo, e a análise pode levar até 30 dias. Você acompanha o status em Monetização.",
          ],
        },
        {
          p: "Se o pedido for recusado, o YouTube explica o motivo. Depois de uma primeira recusa, você pode se candidatar de novo após 30 dias, ou recorrer em até 21 dias se achar que a decisão está errada.",
        },
      ],
    },
    {
      eyebrow: "Ganhos",
      title: "Quanto ganham os canais monetizados?",
      blocks: [
        {
          p: "Depende muito mais do tema do que do número de visualizações. Os anunciantes pagam mais para alcançar pessoas prestes a gastar dinheiro, então um canal de finanças ou de software pode ganhar várias vezes mais por visualização do que um canal de games ou de entretenimento com o mesmo público.",
        },
        {
          p: "Os ganhos costumam ser medidos em RPM (receita por mil): quanto o criador ganha a cada 1.000 visualizações depois da parte do YouTube, considerando todas as visualizações, inclusive as que não tiveram anúncio.",
        },
        {
          table: {
            head: ["Nicho", "Faixa estimada de RPM (US$ por 1.000 visualizações)"],
            rows: RPM_ROWS,
            caption: "Para um público dos EUA, Reino Unido, Canadá ou Austrália, com base nas premissas do estimador de ganhos.",
          },
        },
        {
          p: "São estimativas, não pagamentos. Seu RPM real depende da localização do público, da duração dos vídeos, da época do ano e de quantos anúncios seus vídeos exibem.",
        },
        { p: `Para ter um número aproximado de qualquer canal, experimente o [estimador de ganhos](${ESTIMATOR}) (em inglês).` },
      ],
    },
    {
      eyebrow: "Por vídeo",
      title: "Todo vídeo gera dinheiro depois que o canal é monetizado?",
      blocks: [
        {
          p: "Não. Estar no Programa de Parcerias significa que o canal pode ganhar, não que todo vídeo ganhe. Vídeos com anúncios limitados (por exemplo, por palavrões ou temas sensíveis), vídeos para crianças e vídeos em que outra pessoa reivindicou a música ou as imagens podem render pouco ou nada. É também por isso que dois canais com as mesmas visualizações podem ganhar valores bem diferentes. Tema, localização do público e duração do vídeo mudam o quanto vale cada visualização com anúncio.",
        },
      ],
    },
    {
      eyebrow: "Manter a monetização",
      title: "Um canal pode perder a monetização?",
      blocks: [
        {
          p: "Sim. Entrar não é para sempre, e o YouTube continua avaliando os canais que já estão no programa. Os motivos mais comuns para perder a monetização:",
        },
        {
          ul: [
            "**Ficar parado.** O YouTube pode desativar a monetização de canais que passam 6 meses sem enviar vídeos ou publicar nada. A partir de 1º de fevereiro de 2027, canais monetizados também precisam se manter ativos: 2 vídeos longos ou 5 Shorts a cada 90 dias, ou 1.000 horas de exibição em um ano, ou 1 milhão de visualizações de Shorts em 90 dias.",
            "**Desrespeitar as políticas de monetização.** Conteúdo reutilizado, vídeos produzidos em massa ou metadados enganosos podem tirar um canal do programa, mesmo depois de aprovado.",
            "**Não aceitar os novos termos.** Os canais que já estão no programa precisam aceitar os termos atualizados do YouTube até 31 de janeiro de 2027, ou deixam de ganhar com os recursos afetados.",
          ],
        },
      ],
    },
    {
      eyebrow: "Por que os resultados mudam",
      title: "Por que verificadores de monetização diferentes dão respostas diferentes",
      blocks: [
        {
          p: "Se você já testou alguns verificadores, provavelmente viu que eles discordam. Isso acontece porque nenhum deles enxerga os registros reais do YouTube. Cada um lê pistas públicas diferentes e dá pesos diferentes a elas. Alguns tratam anúncios em um vídeo como prova, embora o YouTube possa exibir anúncios em canais que não recebem por eles. Outros extraem sinais das páginas do YouTube, o que quebra sempre que o layout muda. E há os que dão um sim ou não confiante que os dados não sustentam.",
        },
        {
          p: "Preferimos deixar claras as lacunas. Este verificador mostra quais requisitos estão confirmados, quais não são públicos e o quanto pesa, de verdade, cada pista que você pode conferir sozinho.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Esta ferramenta consegue dizer com certeza se um canal é monetizado?",
      a: "Não, e nenhuma ferramenta externa consegue. O YouTube mantém o status de monetização em sigilo entre ele e o dono do canal. Este verificador mostra quais requisitos públicos o canal cumpre e o que as pistas públicas sugerem, e marca todo o resto como não público.",
    },
    {
      q: "Quais são os requisitos de monetização do YouTube hoje?",
      a: "Até 31 de janeiro de 2027, a receita de anúncios exige 1.000 inscritos e mais 4.000 horas de exibição nos últimos 365 dias ou 10 milhões de visualizações de Shorts nos últimos 90 dias. Em alguns países existe um nível anterior de financiamento por fãs, com 500 inscritos, 3 envios públicos nos últimos 90 dias e 3.000 horas de exibição ou 3 milhões de visualizações de Shorts.",
    },
    {
      q: "Os requisitos de monetização vão mudar em 2027?",
      a: "Sim. A partir de 1º de fevereiro de 2027, canais novos que se candidatarem à receita de anúncios vão precisar de 1.000 inscritos e mais 8.000 horas de exibição nos últimos 365 dias ou 20 milhões de visualizações de Shorts nos últimos 90 dias. O nível de financiamento por fãs, de 500 inscritos, continua igual.",
    },
    {
      q: "Já sou monetizado. Agora preciso de 8.000 horas?",
      a: "Não. A meta maior vale só para novos candidatos. Você precisa, sim, aceitar os termos atualizados do YouTube no Studio até 31 de janeiro de 2027 e, a partir de 1º de fevereiro de 2027, manter o canal ativo para continuar no programa.",
    },
    {
      q: "Dá para monetizar um canal com 500 inscritos?",
      a: "Em parte. Nos países com o nível de financiamento por fãs, 500 inscritos mais os requisitos de envios e de horas de exibição liberam Clubes dos canais, Supers e Shopping. A receita de anúncios continua exigindo 1.000 inscritos.",
    },
    {
      q: "Ver anúncios em um vídeo significa que o canal é monetizado?",
      a: "Não. O YouTube pode exibir anúncios em qualquer vídeo, inclusive em canais fora do Programa de Parcerias, e esses criadores não recebem nada. Um botão “Seja membro” é um sinal muito melhor.",
    },
    {
      q: "Por que vocês não conseguem ver as horas de exibição?",
      a: "As horas de exibição são privadas. Só o dono do canal as vê no YouTube Studio, e os dados públicos do YouTube não as incluem. Você pode estimar as suas com a calculadora de horas de exibição.",
      link: { text: "calculadora de horas de exibição", href: WATCH_TIME },
    },
    {
      q: "Por que o número de inscritos é aproximado?",
      a: "O YouTube arredonda os inscritos públicos acima de 1.000 para três algarismos significativos, então 1.234 aparece como 1,23 mil. Abaixo de 1.000 o número é exato, e é justamente nessa faixa que os limites importam.",
    },
    {
      q: "Canais para crianças ganham menos?",
      a: "Normalmente, sim. Vídeos para crianças não recebem anúncios personalizados, e recursos como Clubes dos canais, Supers e comentários ficam desativados, o que elimina várias formas de ganhar dinheiro.",
    },
    {
      q: "Como os Shorts são monetizados?",
      a: "São dois números diferentes. Para entrar no Programa de Parcerias pelos Shorts, o canal precisa de 1.000 inscritos e 10 milhões de visualizações de Shorts em 90 dias, que passam a 20 milhões para novos candidatos a partir de 1º de fevereiro de 2027. Depois de entrar, a partir de 1º de fevereiro de 2027, o canal precisa manter 10 milhões de visualizações de Shorts a cada 90 dias para continuar recebendo do Fundo para Criadores do Shorts. Veja mais na seção sobre Shorts acima.",
      link: { text: "seção sobre Shorts", href: "#shorts-and-live" },
    },
    {
      q: "Quanto ganha um canal monetizado?",
      a: "Varia muito conforme o tema, a localização do público e a duração dos vídeos. Canais de finanças e tecnologia podem ganhar muitas vezes mais por visualização do que canais de entretenimento. Nosso estimador de ganhos (em inglês) mostra uma faixa realista.",
      link: { text: "estimador de ganhos", href: ESTIMATOR },
    },
    {
      q: "Posso verificar meu próprio canal com esta ferramenta?",
      a: "Pode. Cole seu @usuário para ver o que é público. Para saber suas horas de exibição exatas e o status da candidatura, abra o YouTube Studio e vá em Monetização.",
    },
    {
      q: "Quanto tempo o YouTube leva para analisar uma candidatura à monetização?",
      a: "Até 30 dias. Enquanto a análise está em andamento, o status aparece em Monetização, no YouTube Studio.",
    },
    {
      q: "O que acontece se minha candidatura à monetização for recusada?",
      a: "O YouTube informa o motivo principal. Depois de uma primeira recusa, você pode se candidatar de novo após 30 dias. Se achar que a decisão está errada, pode recorrer em até 21 dias.",
    },
    {
      q: "Qual é a diferença entre ser elegível e ser monetizado?",
      a: "Elegível significa que o canal atinge os números: inscritos mais horas de exibição ou visualizações de Shorts. Monetizado significa que ele se candidatou, passou pela análise do YouTube e foi aceito. Muitos canais elegíveis não são monetizados porque ainda não se candidataram ou foram recusados.",
    },
    {
      q: "Um canal monetizado pode perder a monetização?",
      a: "Sim. O YouTube pode desativá-la se o canal passar meses sem enviar vídeos, desrespeitar as políticas de monetização ou, a partir de 1º de fevereiro de 2027, não aceitar os termos atualizados ou não se manter ativo.",
    },
    {
      q: "Dá para verificar se um canal é monetizado pelo celular?",
      a: "Dá. Este verificador funciona em qualquer navegador de celular. Copie o link do canal ou do vídeo no app do YouTube usando Compartilhar e cole na caixa acima.",
    },
    {
      q: "Vocês guardam os canais que eu verifico?",
      a: "Não salvamos os canais que você digita no verificador. Para manter a ferramenta rápida e evitar abusos, o servidor guarda por pouco tempo os dados públicos que recebe do YouTube e conta as solicitações por endereço IP durante uma hora. Se você abrir um link de compartilhamento (que termina em ?c=@usuário), esse endereço aparece nos registros padrão do nosso servidor por cerca de duas semanas. Configuramos o Google Analytics para remover nomes de canais dos endereços das páginas. As marcações da lista de verificação e a lista de verificados recentemente nunca saem do seu navegador, e você pode limpar a lista quando quiser.",
    },
  ],
};
