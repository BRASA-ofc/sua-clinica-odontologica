import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { chatCopy, clinic } from '../data/clinic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'

type Bubble = {
  id: string
  from: 'clinic' | 'visitor'
  text: string
  time: string
}

function nowLabel(offset = 0) {
  const date = new Date(Date.now() + offset * 60000)
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function replyTo(text: string) {
  const value = text.toLowerCase()
  if (/(aparelho|ortodont|alinh)/.test(value)) {
    return 'O aparelho ortodôntico entra no plano só depois de uma avaliação da posição dos dentes. Nesta simulação, a conversa fica por aqui — sem coleta de dados.'
  }
  if (/(restaura)/.test(value)) {
    return 'A restauração busca recompor a estrutura que precisa de cuidado, conforme o exame. Nada é agendado de verdade nesta página.'
  }
  if (/(cárie|carie)/.test(value)) {
    return 'O tratamento da cárie depende da avaliação da área afetada. Sua mensagem não sai desta demonstração.'
  }
  if (/(limpeza|tártaro|tartaro|placa)/.test(value)) {
    return 'A limpeza profissional auxilia na remoção de placa e tártaro, junto da rotina em casa. Esta resposta é só uma simulação.'
  }
  if (/(ol[aá]|oi\b|bom dia|boa tarde|boa noite)/.test(value)) {
    return 'Olá. Que bom ver você por aqui. Pode escrever à vontade — sem informar dados pessoais.'
  }
  return 'Recebemos sua mensagem nesta simulação. Em um atendimento real, a equipe continuaria a conversa. Seu sorriso merece cuidado. Até breve!'
}

export function ChatPage() {
  const reduced = usePrefersReducedMotion()
  const location = useLocation()
  const topic =
    location.state && typeof location.state === 'object' && 'topic' in location.state
      ? String((location.state as { topic?: string }).topic ?? '')
      : ''
  const [messages, setMessages] = useState<Bubble[]>([])
  const [typing, setTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const [ready, setReady] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  const replyTimer = useRef<number | null>(null)

  useEffect(() => {
    const script = [
      chatCopy.welcome,
      chatCopy.thanks,
      ...(topic ? [chatCopy.topic(topic)] : []),
      chatCopy.farewell,
    ]
    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, reduced ? 40 : ms))
      })

    setMessages([])
    setReady(false)
    setTyping(false)

    const run = async () => {
      for (const [index, text] of script.entries()) {
        if (cancelled) return
        setTyping(true)
        await wait(index === 0 ? 650 : 900)
        if (cancelled) return
        setTyping(false)
        setMessages((current) => [
          ...current,
          { id: `clinic-${index}`, from: 'clinic', text, time: nowLabel(index) },
        ])
        await wait(280)
      }
      if (!cancelled) setReady(true)
    }

    void run()
    return () => {
      cancelled = true
      timers.forEach((timer) => window.clearTimeout(timer))
      if (replyTimer.current) window.clearTimeout(replyTimer.current)
    }
  }, [reduced, topic])

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }, [messages, typing, reduced])

  const send = () => {
    const text = draft.trim()
    if (!text || !ready) return
    setDraft('')
    setMessages((current) => [
      ...current,
      {
        id: `visitor-${current.length}`,
        from: 'visitor',
        text,
        time: nowLabel(),
      },
    ])
    setTyping(true)
    replyTimer.current = window.setTimeout(() => {
      setTyping(false)
      setMessages((current) => [
        ...current,
        {
          id: `reply-${current.length}`,
          from: 'clinic',
          text: replyTo(text),
          time: nowLabel(),
        },
      ])
    }, reduced ? 40 : 800)
  }

  return (
    <div className="flex h-full flex-col bg-[#0b3f39]">
      <header className="flex items-center gap-3 bg-[#075E54] px-3 py-3 text-white shadow-md">
        <Link
          to="/"
          className="inline-flex items-center gap-1 rounded-full px-2 py-2 text-sm hover:bg-white/10"
        >
          <ChevronLeft size={22} aria-hidden="true" />
          <span className="hidden sm:inline">Voltar para a clínica</span>
          <span className="sr-only sm:hidden">Voltar para a clínica</span>
        </Link>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-enamel text-navy">
          <WhatsAppIcon className="h-5 w-5 text-[#128C7E]" />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium">{clinic.name}</span>
          <span className="block truncate text-xs text-white/75">{chatCopy.hint}</span>
        </span>
      </header>

      <div
        ref={scroller}
        className="chat-wallpaper flex-1 space-y-2 overflow-y-auto px-3 py-4"
        aria-live="polite"
      >
        <p className="mx-auto mb-4 max-w-sm rounded-lg bg-[#fff4cc] px-3 py-2 text-center text-[11px] leading-relaxed text-[#5c4b16]">
          Esta tela imita uma conversa apenas para o portfólio. Não envia mensagens e não pede dados
          pessoais.
        </p>
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.from === 'visitor' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28 }}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-[15px] leading-snug shadow-sm ${
                  message.from === 'visitor'
                    ? 'rounded-br-none bg-[#d9fdd3] text-[#111b21]'
                    : 'rounded-bl-none bg-white text-[#111b21]'
                }`}
              >
                <p>{message.text}</p>
                <p className="mt-1 text-right text-[11px] text-[#667781]">{message.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing ? (
          <div className="flex justify-start" aria-hidden="true">
            <div className="flex gap-1 rounded-lg bg-white px-3 py-3 shadow-sm">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#8aa]" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#8aa]" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#8aa]" />
            </div>
          </div>
        ) : null}
      </div>

      <form
        className="flex items-end gap-2 bg-[#f0f2f5] px-3 py-3"
        onSubmit={(event) => {
          event.preventDefault()
          send()
        }}
      >
        <label className="sr-only" htmlFor="demo-message">
          Mensagem de demonstração
        </label>
        <input
          id="demo-message"
          value={draft}
          onChange={(event) => setDraft(event.target.value.slice(0, 400))}
          disabled={!ready}
          autoComplete="off"
          placeholder={ready ? 'Escreva uma mensagem de demonstração' : 'A clínica está escrevendo…'}
          className="min-h-12 flex-1 rounded-full bg-white px-4 text-[15px] text-[#111b21] outline-none"
        />
        <button
          type="submit"
          disabled={!ready || draft.trim().length === 0}
          aria-label="Enviar mensagem de demonstração"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#00a884] text-white disabled:opacity-40"
        >
          <Send size={18} />
        </button>
      </form>
      <div className="bg-[#075E54] px-4 py-3 text-center">
        <Link to="/" className="text-sm text-white underline-offset-4 hover:underline">
          Voltar para a clínica
        </Link>
      </div>
    </div>
  )
}
