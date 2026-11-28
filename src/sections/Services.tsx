import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { services } from '../data/clinic'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'

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
        <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionTitle kicker="Tratamentos" title="Cuidados para cada" highlight="fase do sorriso." />
          <p className="max-w-xs text-navy/60">Toque em um tratamento para ver os detalhes.</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                data-service={service.id}
                onClick={(event) => {
                  trigger.current = event.currentTarget
                  setOpenId(service.id)
                }}
                className="card group flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] p-2 text-left"
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-foam">
                  <Photo
                    src={service.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy opacity-0 shadow transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45">
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </span>
                <span className="flex flex-1 flex-col px-3 pt-4 pb-3">
                  <span className="text-xs font-extrabold tracking-[0.14em] text-sky uppercase">{service.kicker}</span>
                  <span className="mt-1 font-serif text-xl font-medium text-navy">{service.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-navy/65">{service.summary}</span>
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <ServiceDialog service={open} onClose={close} />
    </section>
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
            className="absolute inset-0 bg-navy/35 backdrop-blur-sm"
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
            className="relative grid max-h-[92svh] w-full max-w-3xl grid-cols-1 overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-2"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy shadow transition-transform duration-300 hover:rotate-90"
            >
              <span className="sr-only">Fechar</span>
              <X size={18} aria-hidden="true" />
            </button>
            <div className="relative h-52 overflow-hidden md:h-auto">
              <motion.div className="h-full" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
                <Photo src={service.image} alt={service.imageAlt} className="h-full w-full object-cover" />
              </motion.div>
            </div>
            <div className="overflow-y-auto p-7 sm:p-8">
              <span className="text-xs font-extrabold tracking-[0.14em] text-sky uppercase">{service.kicker}</span>
              <h3 id={titleId} className="mt-2 font-serif text-3xl font-medium text-navy">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-navy/70">{service.description}</p>
              <ul className="mt-5 space-y-2.5">
                {service.notes.map((note, i) => (
                  <motion.li
                    key={note}
                    className="flex items-center gap-3 text-sm font-semibold text-navy/80"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint/15 text-mint">
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {note}
                  </motion.li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn-solid group mt-7"
                onClick={() => {
                  onClose()
                  navigate('/conversa', { state: { topic: service.title } })
                }}
              >
                Agendar avaliação
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <p className="mt-4 text-xs text-navy/50">Abre uma conversa simulada. Nenhum dado é enviado.</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
