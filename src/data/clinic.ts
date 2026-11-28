// Conteúdo do site. Tudo aqui é fictício: o projeto é um portfólio, não uma clínica real.

export const clinic = {
  name: "Sua Clínica Odontológica",
  shortName: "Sua Clínica",
  phoneDisplay: "(11) 98000-0000",
  address: {
    line: "Alameda das Acácias, 480 — sala 12",
    city: "Jardim Demonstração — São Paulo/SP",
  },
  hours: [
    { days: "Segunda a sexta", time: "8h às 19h" },
    { days: "Sábado", time: "8h às 13h" },
  ],
  portfolioNote: "Projeto de portfólio · clínica fictícia, sem atendimento real",
  disclaimer:
    "Projeto de portfólio fictício. Não representa uma clínica real, não oferece atendimento e não coleta dados de pacientes.",
}

export const hero = {
  kicker: "Odontologia para toda a família",
  titleStart: "Cuidado leve para um",
  titleEmphasis: "sorriso",
  titleEnd: "saudável.",
  subtitle: "Consultas sem pressa, planos claros e uma equipe que explica cada etapa.",
  primary: "Agendar avaliação",
  secondary: "Falar no WhatsApp",
  rating: "4,9",
  ratingNote: "avaliação demonstrativa",
  photo: "/images/smile.jpg",
  photoAlt: "Paciente sorrindo na cadeira enquanto conversa com a dentista.",
}

export const benefits = [
  { title: "Sem julgamentos", text: "Atendimento acolhedor do começo ao fim." },
  { title: "Plano explicado", text: "Você entende cada etapa antes de começar." },
  { title: "Agenda flexível", text: "Horários de manhã, à noite e aos sábados." },
  { title: "Pagamento fácil", text: "Parcelamento e valores informados antes." },
]

export const services = [
  {
    id: "ortodontia",
    index: "01",
    title: "Aparelho ortodôntico",
    kicker: "Alinhamento",
    summary: "Dentes alinhados e mordida corrigida.",
    description: "O tipo de aparelho e a duração dependem da avaliação de cada caso.",
    notes: ["Indicação a partir da avaliação", "Etapas explicadas antes de começar"],
    image: "/images/align.jpg",
    imageAlt: "Pessoa posicionando um alinhador transparente sobre os dentes.",
    visual: "align" as const,
  },
  {
    id: "restauracao",
    index: "02",
    title: "Restauração",
    kicker: "Estrutura",
    summary: "Forma e função do dente de volta.",
    description: "Material e técnica são definidos na consulta, a partir do exame.",
    notes: ["Plano explicado de forma visual", "Material definido caso a caso"],
    image: "/images/scan.jpg",
    imageAlt: "Profissional observa reconstruções tridimensionais de dentes.",
    visual: "restore" as const,
  },
  {
    id: "carie",
    index: "03",
    title: "Tratamento de cárie",
    kicker: "Cuidado local",
    summary: "Trata a área afetada e preserva o dente.",
    description: "A extensão da cárie define a abordagem, preservando o máximo possível do dente.",
    notes: ["Abordagem conforme a extensão", "Prevenção continua em casa"],
    image: "/images/consult.jpg",
    imageAlt: "Dentista mostra uma radiografia para a paciente.",
    visual: "caries" as const,
  },
  {
    id: "limpeza",
    index: "04",
    title: "Limpeza",
    kicker: "Prevenção",
    summary: "Remove placa e tártaro e previne problemas.",
    description: "Complementa a escovação de casa. A frequência é combinada na consulta.",
    notes: ["Orientação de escovação e fio dental", "Intervalo entre visitas individual"],
    image: "/images/cleaning.jpg",
    imageAlt: "Profissional realiza uma limpeza com o paciente reclinado na cadeira.",
    visual: "clean" as const,
  },
]

export const steps = [
  { index: "01", title: "Conversa", text: "Você conta o que sente e o que espera." },
  { index: "02", title: "Avaliação", text: "Exame completo, com imagens explicadas." },
  { index: "03", title: "Plano", text: "Opções, prazos e valores por escrito." },
]

export const dentist = {
  name: "Dra. Helena Vasconcelos",
  role: "Cirurgiã-dentista responsável",
  credential: "Personagem fictícia · CRO-SP 00.000 (ilustrativo)",
  bio: "Doze anos cuidando de sorrisos com calma, escuta e planejamento individual.",
  portrait: "/images/dentist.jpg",
  portraitAlt: "Profissional de jaleco branco atendendo uma paciente. Imagem ilustrativa.",
  highlights: ["Dentística", "Ortodontia", "Prevenção"],
  stats: [
    { value: 12, label: "anos de atuação" },
    { value: 4, label: "especialidades" },
  ],
}

export const testimonials = [
  { name: "Mariana S.", text: "Primeira vez que saí do dentista sem medo. Explicaram tudo com calma." },
  { name: "Rafael T.", text: "Atendimento pontual e muito atencioso. O plano veio por escrito." },
  { name: "Luiza M.", text: "Clínica linda e tranquila. Minha filha adorou a dentista." },
]

export const faq = [
  {
    q: "Esta clínica existe?",
    a: "Não. Este é um projeto de portfólio: a clínica, a equipe, os depoimentos e os números são fictícios.",
  },
  {
    q: "Como funciona o agendamento?",
    a: "Os botões de agendar abrem uma conversa simulada. Nenhuma mensagem é enviada e nenhum dado é coletado.",
  },
  {
    q: "O que acontece na primeira consulta?",
    a: "Conversa, exame completo e um plano com opções e valores, explicado antes de qualquer tratamento.",
  },
  {
    q: "Quais formas de pagamento?",
    a: "Na proposta fictícia: Pix, cartão e parcelamento, com valores informados antes do tratamento.",
  },
]

export const contactCopy = {
  kicker: "Contato",
  title: "Vamos cuidar do seu sorriso?",
  lead: "Agende pela conversa simulada. Nenhum dado é enviado.",
  action: "Agendar avaliação",
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
  { id: "tratamentos", label: "Tratamentos" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "profissional", label: "Profissional" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "duvidas", label: "Dúvidas" },
  { id: "contato", label: "Contato" },
] as const

export const navLinks = [
  { id: "tratamentos", label: "Tratamentos" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "profissional", label: "Profissional" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "contato", label: "Contato" },
] as const
