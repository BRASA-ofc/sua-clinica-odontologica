import { motion, useMotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { hero } from '../data/clinic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ToothStage } from '../components/tooth/ToothStage'
import type { Pointer2D } from '../three/ToothCanvas'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const pointer = useRef<Pointer2D>({ x: 0, y: 0 })
  const textX = useMotionValue(0)
  const textY = useMotionValue(0)

  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
        pointer.current.x = x
        pointer.current.y = y
        if (!reduced) {
          textX.set(x * -10)
          textY.set(y * -6)
        }
      }}
      onPointerLeave={() => {
        pointer.current.x = 0
        pointer.current.y = 0
        textX.set(0)
        textY.set(0)
      }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(5,7,10,0) 0%, rgba(5,7,10,0.45) 26%, #070b10 48%, #05070b 100%)',
        }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/70 blur-3xl" />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <motion.div
          className="order-1 px-5 pt-24 md:px-8 lg:w-[44%] lg:px-12 lg:pt-28 xl:px-16"
          style={{ x: textX, y: textY }}
        >
          <motion.p
            className="text-[11px] tracking-[0.32em] text-lagoon uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {hero.kicker}
          </motion.p>
          <h1 className="mt-4 font-display text-[clamp(2.7rem,4.8vw,5.1rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-navy">
            {hero.title.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={`block ${index === 2 ? 'text-lagoon' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.12 + index * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        <div className="relative order-2 h-[68vh] min-h-[440px] bg-[linear-gradient(180deg,rgba(5,7,10,0)_0%,#0a1016_22%,#05070b_100%)] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%] lg:bg-none">
          <ToothStage pointer={pointer} />
        </div>

        <motion.div
          className="relative z-10 order-3 max-w-xl px-5 pt-2 md:px-8 lg:w-[44%] lg:px-12 lg:pt-5 xl:px-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
        >
          <p className="text-lg leading-relaxed text-navy/75 md:text-xl">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 pr-16 sm:flex-row sm:pr-0">
            <a href="#tratamentos" className="btn btn-solid group">
              {hero.primary}
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a href="#contato" className="btn btn-ghost group">
              {hero.secondary}
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>

        <motion.dl
          className="relative z-10 order-4 mt-auto grid gap-6 border-t border-mist px-5 pt-6 pb-8 sm:grid-cols-3 md:px-8 lg:w-[44%] lg:px-12 xl:px-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {hero.signals.map((signal) => (
            <div key={signal.label}>
              <dt className="font-display text-3xl font-semibold tracking-tight text-navy">
                {signal.value}
              </dt>
              <dd className="mt-1 text-sm text-navy/80">{signal.label}</dd>
              <dd className="text-[11px] tracking-[0.16em] text-lagoon uppercase">{signal.note}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
