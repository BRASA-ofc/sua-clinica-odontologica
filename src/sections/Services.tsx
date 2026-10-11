import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { services } from '../data/clinic'
import { ServiceArt } from '../components/services/ServiceArt'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'

const ease = [0.22, 1, 0.36, 1] as const
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
    <section id="tratamentos" className="scroll-mt-28 bg-white/50">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-[11px] tracking-[0.32em] text-lagoon uppercase">Tratamentos</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-navy">
              Quatro cuidados. Quatro maneiras de olhar para o sorriso.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-navy/70">
              Passe o cursor para ver a composição responder. Toque ou clique para abrir o detalhe
              de cada tratamento.
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          {services.map((service, index) => (
            <ServiceRow
              key={service.id}
              service={service}
              flipped={index % 2 === 1}
              onOpen={(node) => {
                trigger.current = node
                setOpenId(service.id)
              }}
            />
          ))}
        </div>
      </div>
      <ServiceDrawer service={open} onClose={close} />
    </section>
  )
}

function ServiceRow({
  service,
  flipped,
  onOpen,
}: {
  service: Service
  flipped: boolean
  onOpen: (node: HTMLElement) => void
}) {
  return (
    <button
      type="button"
      data-service={service.id}
      onClick={(event) => onOpen(event.currentTarget)}
      className="group grid w-full grid-cols-1 items-center gap-6 border-t border-mist py-8 text-left transition-colors duration-300 hover:bg-foam/70 focus-visible:bg-foam/70 md:grid-cols-12 md:gap-8 md:py-10"
    >
      <span className="font-display text-sm tracking-[0.2em] text-silver md:col-span-1">
        {service.index}
      </span>
      <span className={`md:col-span-5 ${flipped ? 'md:order-3' : ''}`}>
        <span className="text-[11px] tracking-[0.22em] text-lagoon uppercase">{service.kicker}</span>
        <span className="mt-2 block font-display text-3xl leading-tight font-semibold tracking-tight text-navy transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
          {service.title}
        </span>
        <span className="mt-3 block max-w-md text-sm leading-relaxed text-navy/70">
          {service.summary}
        </span>
        <span className="mt-4 inline-flex items-center gap-2 text-sm text-navy">
          Ver detalhes
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </span>
      <span
        className={`relative block h-64 overflow-hidden rounded-[1.6rem] bg-foam md:col-span-6 md:h-80 ${
          service.visual === 'align' ? '[&_img]:saturate-[.6]' : ''
        }`}
      >
        {service.image ? (
          <Photo
            src={service.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : null}
        <ServiceArt kind={service.visual} />
      </span>
    </button>
  )
}

function ServiceDrawer({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const titleId = useId()
  const dialog = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!service) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const root = dialog.current
    const focusable = () =>
      root
        ? [...root.querySelectorAll<HTMLElement>('button, a, [href], [tabindex]:not([tabindex="-1"])')]
        : []
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

  return (
    <AnimatePresence>
      {service ? (
        <>
          <motion.button
            type="button"
            aria-label="Fechar detalhes do tratamento"
            className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-[2px]"
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
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto bg-ice shadow-2xl sm:w-[min(36rem,94vw)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-ice/90 px-6 py-4 backdrop-blur-md">
              <p className="text-[11px] tracking-[0.22em] text-lagoon uppercase">
                {service.index} · {service.kicker}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-full border border-navy/10 bg-white text-navy"
              >
                <span className="sr-only">Fechar</span>
                <X size={18} />
              </button>
            </div>
            <div className="px-6 pb-10">
              <div className="overflow-hidden rounded-[1.5rem] bg-foam">
                {service.image ? (
                  <Photo src={service.image} alt={service.imageAlt} className="aspect-[16/10] w-full object-cover" />
                ) : (
                  <div className="aspect-[16/10]">
                    <ServiceArt kind={service.visual} />
                  </div>
                )}
              </div>
              <h3
                id={titleId}
                className="mt-8 font-display text-4xl leading-tight font-semibold tracking-tight text-navy"
              >
                {service.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-navy/75">{service.description}</p>
              <ul className="mt-8 space-y-3">
                {service.notes.map((note) => (
                  <li key={note} className="border-t border-mist pt-3 text-sm text-navy/80">
                    {note}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs leading-relaxed text-navy/50">
                A conversa a seguir é uma simulação. Nenhum dado é enviado e não há conexão com o
                WhatsApp.
              </p>
              <button
                type="button"
                className="btn btn-solid group mt-6"
                onClick={() => {
                  close()
                  navigate('/conversa', { state: { topic: service.title } })
                }}
              >
                Solicitar informações
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
