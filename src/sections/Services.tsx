import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { services } from '../data/clinic'
import { ServiceArt } from '../components/services/ServiceArt'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'
import { Tilt } from '../components/aero/Tilt'

type Service = (typeof services)[number]

export function Services() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = services.find((service) => service.id === openId) ?? null
  const trigger = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    setOpenId(null)
    trigger.current?.focus()
  }, [])

  return (
    <section id="tratamentos" className="relative scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionTitle kicker="Tratamentos" title="Quatro cuidados para" highlight="um sorriso brilhante." />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="font-semibold text-navy/75">
              Cada tratamento começa por uma avaliação. Abra os cartões para entender como cada cuidado funciona.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 2) * 0.12}>
              <ServiceCard
                service={service}
                onOpen={(node) => {
                  trigger.current = node
                  setOpenId(service.id)
                }}
              />
            </Reveal>
          ))}
        </div>
      </div>
      <ServiceDialog service={open} onClose={close} />
    </section>
  )
}

const hoverBubbles = [
  { left: '16%', size: 16, ms: 1000, delay: 0 },
  { left: '38%', size: 26, ms: 1300, delay: 80 },
  { left: '60%', size: 14, ms: 900, delay: 150 },
  { left: '80%', size: 22, ms: 1200, delay: 40 },
]

function ServiceCard({ service, onOpen }: { service: Service; onOpen: (node: HTMLElement) => void }) {
  return (
    <Tilt className="glass h-full overflow-hidden rounded-[2rem]">
      <button
        type="button"
        data-service={service.id}
        onClick={(event) => onOpen(event.currentTarget)}
        className="group flex h-full w-full flex-col p-2.5 text-left"
      >
        <span className="relative block h-56 overflow-hidden rounded-[1.6rem] bg-foam md:h-64">
          {service.image ? (
            <Photo
              src={service.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
          ) : null}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sky/50 via-transparent to-white/20" />
          <ServiceArt kind={service.visual} />
          <span className="kicker absolute top-4 left-4">
            {service.index} · {service.kicker}
          </span>
          {/* bolhas que sobem ao passar o cursor */}
          {hoverBubbles.map((b) => (
            <span
              key={b.left}
              className="pointer-events-none absolute -bottom-8"
              style={{ left: b.left, width: b.size, height: b.size }}
            >
              <span
                className="soap block h-full w-full opacity-0 ease-out group-hover:-translate-y-72 group-hover:opacity-100"
                style={{ transitionProperty: 'transform, opacity', transitionDuration: `${b.ms}ms`, transitionDelay: `${b.delay}ms` }}
              />
            </span>
          ))}
        </span>
        <span className="flex flex-1 flex-col px-4 pt-5 pb-4">
          <span className="font-display text-2xl leading-tight font-black text-navy md:text-[1.7rem]">{service.title}</span>
          <span className="mt-3 block text-sm leading-relaxed text-navy/75">{service.summary}</span>
          <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-extrabold text-lagoon">
            <span className="relative">
              Ver detalhes
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-sky transition-all duration-500 group-hover:w-full" />
            </span>
            <span className="orb grid h-7 w-7 place-items-center text-white transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-rotate-45">
              <ArrowRight size={14} aria-hidden="true" />
            </span>
          </span>
        </span>
      </button>
    </Tilt>
  )
}

function ServiceDialog({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const titleId = useId()
  const dialog = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!service) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const root = dialog.current
    const focusable = () =>
      root ? [...root.querySelectorAll<HTMLElement>('button, a, [href], [tabindex]:not([tabindex="-1"])')] : []
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !root) return
      const items = focusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    focusable()[0]?.focus()
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [service, onClose])

  return createPortal(
    <AnimatePresence>
      {service ? (
        <motion.div key="dialog" className="fixed inset-0 z-[85] grid place-items-center p-3 sm:p-6">
          <motion.button
            type="button"
            aria-label="Fechar detalhes do tratamento"
            className="absolute inset-0 bg-sky/30 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="glass relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-white/80"
            initial={{ opacity: 0, scale: 0.6, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full text-navy transition-transform duration-300 hover:rotate-90"
            >
              <span className="sr-only">Fechar</span>
              <X size={18} aria-hidden="true" />
            </button>
            <div className="overflow-y-auto p-3 sm:p-4">
              <div className="relative overflow-hidden rounded-[1.6rem] bg-foam">
                {service.image ? (
                  <motion.div initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
                    <Photo src={service.image} alt={service.imageAlt} className="aspect-[16/9] w-full object-cover" />
                  </motion.div>
                ) : (
                  <div className="relative aspect-[16/9]">
                    <ServiceArt kind={service.visual} />
                  </div>
                )}
                <span className="kicker absolute bottom-4 left-4">
                  {service.index} · {service.kicker}
                </span>
              </div>
              <div className="px-3 pt-6 pb-4 sm:px-5">
                <motion.h3
                  id={titleId}
                  className="font-display text-3xl leading-tight font-black text-navy sm:text-4xl"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="mt-4 text-lg leading-relaxed text-navy/80"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {service.description}
                </motion.p>
                <ul className="mt-6 space-y-3">
                  {service.notes.map((note, i) => (
                    <motion.li
                      key={note}
                      className="flex gap-3 rounded-2xl bg-white/70 p-3 text-sm font-semibold text-navy/85"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.28 + i * 0.08 }}
                    >
                      <span className="orb orb-green grid h-5 w-5 shrink-0 place-items-center text-white">
                        <Check size={11} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {note}
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-relaxed text-navy/60">
                  A conversa a seguir é uma simulação. Nenhum dado é enviado e não há conexão com o WhatsApp.
                </p>
                <button
                  type="button"
                  className="btn btn-green mt-5"
                  onClick={() => {
                    onClose()
                    navigate('/conversa', { state: { topic: service.title } })
                  }}
                >
                  Solicitar informações
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
