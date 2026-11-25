export const clinic = {
  name: "Sua Clínica Odontológica",
  shortName: "Sua Clínica",
  phoneDisplay: "(11) 98000-0000",
  phoneNote: "Número fictício, usado apenas nesta demonstração.",
  address: {
    line: "Alameda das Acácias, 480 — sala 12",
    city: "Jardim Demonstração — São Paulo/SP",
    note: "Endereço fictício, criado para este portfólio.",
  },
  hours: [
    { days: "Segunda a sexta", time: "8h às 19h" },
    { days: "Sábado", time: "8h às 13h" },
  ],
  hoursNote: "Horários demonstrativos.",
  disclaimer:
    "Projeto de portfólio fictício. Não representa uma clínica real, não oferece atendimento e não coleta dados de pacientes.",
}

export const hero = {
  kicker: "Odontologia contemporânea",
  title: ["Seu sorriso", "merece o melhor", "cuidado."],
  subtitle:
    "Tecnologia, precisão e cuidado humano para transformar sua experiência com a odontologia.",
  primary: "Conheça nossos tratamentos",
  secondary: "Agende sua avaliação",
  signals: [
    {
      value: "12",
      label: "anos de atuação",
      note: "dado demonstrativo",
    },
    {
      value: "01",
      label: "conversa por vez",
      note: "atendimento individual",
    },
    {
      value: "04",
      label: "cuidados em foco",
      note: "saúde bucal",
    },
  ],
}

export const proposal = {
  kicker: "A proposta",
  title: "Cuidado odontológico que começa ouvindo você.",
  lead: "Antes do instrumento, existe uma conversa. O plano nasce do que você sente, do que espera e do que o exame mostra — sem pressa e sem protocolo engessado.",
  points: [
    {
      index: "01",
      title: "Escuta",
      text: "A consulta abre espaço para a sua história. O que dói, o que incomoda e o que você gostaria de entender entram no planejamento.",
    },
    {
      index: "02",
      title: "Clareza",
      text: "Cada etapa é explicada antes de acontecer. Você sabe o que será feito, por quê, e o que ainda depende de avaliação.",
    },
    {
      index: "03",
      title: "Presença",
      text: "O acompanhamento considera a sua rotina. Tecnologia entra como apoio do exame, não como espetáculo.",
    },
  ],
}

export const dentist = {
  name: "Dra. Helena Vasconcelos",
  role: "Cirurgiã-dentista responsável",
  fictionNote: "Personagem fictícia. As credenciais abaixo são demonstrativas.",
  credential: "Registro ilustrativo · CRO-SP 00.000",
  portrait: "/images/dentist.jpg",
  portraitAlt:
    "Profissional de jaleco branco conversando com uma paciente durante uma consulta odontológica. Imagem ilustrativa.",
  imageNote:
    "Fotografia ilustrativa de atendimento. A biografia não descreve a pessoa da imagem.",
  title: "Cuidar do seu sorriso começa com confiança.",
  bio: "Cada sorriso tem uma história. Nosso compromisso é oferecer um atendimento atencioso, com planejamento individualizado e foco na saúde bucal, respeitando as necessidades de cada paciente.",
  years: "12 anos de atuação no mercado",
  yearsNote: "Tempo fictício, usado só na demonstração.",
  formation: [
    "Graduação em Odontologia — instituição demonstrativa",
    "Especialização em Dentística — programa demonstrativo",
    "Aperfeiçoamento em Ortodontia — programa demonstrativo",
  ],
  formationNote:
    "Formação ilustrativa. Nenhuma credencial desta página corresponde a um registro real.",
  approach:
    "A consulta começa ouvindo. O plano vem depois, explicado com calma, no ritmo de quem está na cadeira.",
  differentials: [
    "Tempo reservado para perguntas",
    "Explicação visual de cada etapa",
    "Acompanhamento pensado para a rotina",
  ],
}

export const trust = {
  kicker: "A clínica",
  title: "Confiança se mostra no modo de atender.",
  lead: "Os números abaixo são demonstrativos. Eles organizam a narrativa deste projeto — não são estatísticas clínicas nem resultados comprovados.",
  metrics: [
    {
      value: 12,
      label: "anos de prática ilustrativa",
      note: "Configurado para a demonstração. Não é um dado verificável.",
    },
    {
      value: 4,
      label: "tratamentos para explorar aqui",
      note: "Os cuidados apresentados nas seções seguintes.",
    },
  ],
  statement: "Um plano por pessoa",
  statementNote:
    "Atendimento pensado a partir da escuta e do exame, sem promessa de resultado.",
}

export const services = [
  {
    id: "ortodontia",
    index: "01",
    title: "Instalação de aparelho ortodôntico",
    kicker: "Alinhamento",
    summary:
      "Tratamento voltado ao alinhamento dos dentes e à correção de problemas de posicionamento, conforme avaliação profissional.",
    description:
      "O aparelho entra no plano quando a avaliação mostra que a posição dos dentes pode ser conduzida por esse caminho. O tipo de aparelho, o ritmo e a duração não são iguais para todo mundo: dependem do exame, da mordida e da conversa sobre a sua rotina.",
    notes: [
      "A indicação nasce da avaliação clínica, não de um modelo pronto.",
      "Você entende cada etapa antes de ela começar.",
      "O foco é alinhamento e função, sem promessa de um resultado único.",
    ],
    image: "/images/align.jpg",
    imageAlt:
      "Pessoa posicionando um alinhador transparente sobre os dentes, em close do sorriso.",
    visual: "align" as const,
  },
  {
    id: "restauracao",
    index: "02",
    title: "Restauração dentária",
    kicker: "Estrutura",
    summary:
      "Recuperação da estrutura dentária comprometida, conforme as necessidades clínicas de cada paciente.",
    description:
      "Quando uma parte do dente perde estrutura, a restauração busca recompor o que é necessário para o dia a dia. Material, extensão e técnica são definidos na consulta, a partir do que o exame revela — não de um padrão aplicado a todos.",
    notes: [
      "A decisão considera o quanto da estrutura ainda está preservada.",
      "O plano é explicado de forma visual, antes de qualquer intervenção.",
      "Não há garantia de um aspecto idêntico ao dente original.",
    ],
    image: "/images/scan.jpg",
    imageAlt:
      "Profissional observa reconstruções tridimensionais de dentes em uma mesa de luz.",
    visual: "restore" as const,
  },
  {
    id: "carie",
    index: "03",
    title: "Remoção de cáries",
    kicker: "Cuidado local",
    summary:
      "Tratamento da área afetada pela cárie, com avaliação e abordagem definidas pelo dentista.",
    description:
      "A cárie é tratada a partir da área afetada. O dentista avalia a extensão e define a abordagem — da orientação de higiene à remoção do tecido comprometido, quando ela está indicada. A ilustração ao lado é didática: mostra as camadas do dente, sem imagens de procedimento.",
    notes: [
      "A extensão da lesão orienta a conduta.",
      "Você é informado sobre o que será feito e o que se espera preservar.",
      "A prevenção continua depois da consulta, na rotina em casa.",
    ],
    image: "",
    imageAlt: "Ilustração didática de um dente em corte, com esmalte, dentina e uma área marcada para avaliação.",
    visual: "caries" as const,
  },
  {
    id: "limpeza",
    index: "04",
    title: "Limpeza dentária",
    kicker: "Prevenção",
    summary:
      "Cuidado preventivo para auxiliar na remoção de placa e tártaro, contribuindo para a manutenção da saúde bucal.",
    description:
      "A limpeza profissional auxilia na remoção de placa e tártaro em regiões que a escovação cotidiana alcança com menos facilidade. Ela não substitui a higiene em casa: as duas se completam. A frequência é combinada na consulta, de acordo com a sua necessidade.",
    notes: [
      "É um cuidado de manutenção, não um tratamento milagroso.",
      "Inclui orientação para a rotina de escovação e fio dental.",
      "O intervalo entre visitas é individual.",
    ],
    image: "/images/cleaning.jpg",
    imageAlt:
      "Profissional de odontologia realiza um atendimento com o paciente reclinado na cadeira.",
    visual: "clean" as const,
  },
]

export const differentials = {
  kicker: "O percurso",
  title: "Mais confiança em cada etapa do tratamento.",
  items: [
    {
      index: "01",
      title: "A consulta começa pela escuta.",
      text: "Você senta, conta o que trouxe você até aqui, e só então o exame organiza o que é possível fazer. Nada começa no escuro.",
      image: "/images/smile.jpg",
      imageAlt:
        "Paciente sorrindo na cadeira enquanto conversa com a profissional de odontologia.",
    },
    {
      index: "02",
      title: "Tecnologia a serviço do seu bem-estar.",
      text: "Imagem e registro ajudam a enxergar com mais precisão. Eles apoiam a explicação — você vê o que está sendo avaliado.",
      image: "/images/consult.jpg",
      imageAlt:
        "Dentista de jaleco aponta uma radiografia panorâmica para uma paciente sentada na cadeira.",
    },
    {
      index: "03",
      title: "Um plano que cabe na sua rotina.",
      text: "O consultório foi pensado para uma conversa tranquila. O retorno, quando necessário, acompanha o seu tempo — sem fila de promessas.",
      image: "/images/clinic.jpg",
      imageAlt:
        "Consultório odontológico claro, com cadeira, equipo e bancada branca iluminados por luz natural.",
    },
  ],
}

export const contactCopy = {
  kicker: "Contato",
  title: "Vamos cuidar do seu sorriso.",
  lead: "Nesta demonstração, o agendamento abre uma simulação de conversa. Nada é enviado para um telefone real e nenhum dado pessoal é solicitado.",
  action: "Abrir simulação de conversa",
}

export const chatCopy = {
  welcome: "Olá! Seja bem-vindo à Sua Clínica Odontológica. 😊",
  thanks:
    "Obrigado por conhecer nosso espaço e explorar nossos serviços. Esperamos que sua experiência tenha sido agradável!",
  farewell: "Seu sorriso merece cuidado. Até breve!",
  topic: (topic: string) =>
    `Você pediu informações sobre ${topic}. O cuidado real começa numa avaliação — aqui, a conversa permanece nesta simulação.`,
  hint: "Simulação demonstrativa · sem conexão com o WhatsApp",
}

export const sections = [
  { id: "inicio", label: "Início" },
  { id: "proposta", label: "Proposta" },
  { id: "dentista", label: "Profissional" },
  { id: "clinica", label: "A clínica" },
  { id: "tratamentos", label: "Tratamentos" },
  { id: "brilho", label: "Brilho" },
  { id: "diferenciais", label: "Percurso" },
  { id: "contato", label: "Contato" },
] as const

export const navLinks = [
  { id: "proposta", label: "Proposta" },
  { id: "dentista", label: "Profissional" },
  { id: "tratamentos", label: "Tratamentos" },
  { id: "contato", label: "Contato" },
] as const
