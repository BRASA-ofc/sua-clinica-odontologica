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
  subtitle: "Tecnologia e cuidado humano para o seu sorriso.",
  primary: "Conheça nossos tratamentos",
  secondary: "Agende sua avaliação",
  signals: [
    {
      value: "12",
      label: "anos de atuação",
      note: "",
    },
    {
      value: "01",
      label: "paciente por vez",
      note: "",
    },
    {
      value: "04",
      label: "tratamentos",
      note: "",
    },
  ],
}

export const proposal = {
  kicker: "A proposta",
  title: "Cuidado odontológico que começa ouvindo você.",
  lead: "Primeiro a conversa, depois o plano.",
  points: [
    {
      index: "01",
      title: "Escuta",
      text: "Sua história entra no planejamento.",
    },
    {
      index: "02",
      title: "Clareza",
      text: "Cada etapa explicada antes de começar.",
    },
    {
      index: "03",
      title: "Presença",
      text: "Acompanhamento no ritmo da sua rotina.",
    },
  ],
}

export const dentist = {
  name: "Dra. Helena Vasconcelos",
  role: "Cirurgiã-dentista responsável",
  fictionNote: "Personagem fictícia",
  credential: "Registro ilustrativo · CRO-SP 00.000",
  portrait: "/images/dentist.jpg",
  portraitAlt:
    "Profissional de jaleco branco conversando com uma paciente durante uma consulta odontológica. Imagem ilustrativa.",
  imageNote: "Foto ilustrativa",
  title: "Cuidar do seu sorriso começa com confiança.",
  bio: "Atendimento atencioso e planejamento individual para cada paciente.",
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
  differentials: ["Tempo para perguntas", "Explicação visual", "Acompanhamento próximo"],
}

export const trust = {
  kicker: "A clínica",
  title: "Confiança se mostra no modo de atender.",
  lead: "Números demonstrativos deste portfólio.",
  metrics: [
    {
      value: 12,
      label: "anos de prática",
      note: "",
    },
    {
      value: 4,
      label: "tratamentos",
      note: "",
    },
  ],
  statement: "Um plano por pessoa",
  statementNote: "",
}

export const services = [
  {
    id: "ortodontia",
    index: "01",
    title: "Instalação de aparelho ortodôntico",
    kicker: "Alinhamento",
    summary: "Alinhamento dos dentes e correção da mordida.",
    description: "O tipo de aparelho e a duração dependem da avaliação de cada caso.",
    notes: ["Indicação a partir da avaliação", "Etapas explicadas antes de começar"],
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
    summary: "Recupera a forma e a função do dente.",
    description: "Material e técnica são definidos na consulta, a partir do exame.",
    notes: ["Plano explicado de forma visual", "Material definido caso a caso"],
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
    summary: "Trata a área afetada e preserva o dente.",
    description: "A extensão da cárie define a abordagem, preservando o máximo possível do dente.",
    notes: ["Abordagem conforme a extensão", "Prevenção continua em casa"],
    image: "",
    imageAlt: "Ilustração didática de um dente em corte, com esmalte, dentina e uma área marcada para avaliação.",
    visual: "caries" as const,
  },
  {
    id: "limpeza",
    index: "04",
    title: "Limpeza dentária",
    kicker: "Prevenção",
    summary: "Remove placa e tártaro e previne problemas.",
    description: "Complementa a escovação de casa. A frequência é combinada na consulta.",
    notes: ["Orientação de escovação e fio dental", "Intervalo entre visitas individual"],
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
      text: "Você conta o que sente; o exame vem depois.",
      image: "/images/smile.jpg",
      imageAlt:
        "Paciente sorrindo na cadeira enquanto conversa com a profissional de odontologia.",
    },
    {
      index: "02",
      title: "Tecnologia a serviço do seu bem-estar.",
      text: "Imagens que ajudam você a entender o exame.",
      image: "/images/consult.jpg",
      imageAlt:
        "Dentista de jaleco aponta uma radiografia panorâmica para uma paciente sentada na cadeira.",
    },
    {
      index: "03",
      title: "Um plano que cabe na sua rotina.",
      text: "Retornos combinados com o seu tempo.",
      image: "/images/clinic.jpg",
      imageAlt:
        "Consultório odontológico claro, com cadeira, equipo e bancada branca iluminados por luz natural.",
    },
  ],
}

export const contactCopy = {
  kicker: "Contato",
  title: "Vamos cuidar do seu sorriso.",
  lead: "Abra a conversa simulada. Nenhum dado é enviado.",
  action: "Conversar agora",
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
  { id: "brilho", label: "Brilho" },
  { id: "proposta", label: "Proposta" },
  { id: "dentista", label: "Profissional" },
  { id: "clinica", label: "A clínica" },
  { id: "tratamentos", label: "Tratamentos" },
  { id: "diferenciais", label: "Percurso" },
  { id: "contato", label: "Contato" },
] as const

export const navLinks = [
  { id: "proposta", label: "Proposta" },
  { id: "dentista", label: "Profissional" },
  { id: "tratamentos", label: "Tratamentos" },
  { id: "contato", label: "Contato" },
] as const
