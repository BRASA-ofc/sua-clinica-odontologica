import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'
import { hero } from '../data/clinic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ArchStage } from '../components/tooth/ArchStage'
import { Magnetic } from '../components/aero/Magnetic'
import { CountUp } from '../components/aero/CountUp'
import type { ArchControl } from '../three/ArchCanvas'

const ease = [0.22, 1, 0.36, 1] as const
const spring = { type: 'spring', stiffness: 160, damping: 16 } as const

export function Hero() {
  const paused = usePrefersReducedMotion()
  const section = useRef<HTMLElement>(null)
  const control = useRef<ArchControl>({ pointer: { x: 0, y: 0 }, drag: 0, fling: 0, bite: 0, scroll: 0, flash: 0 })
  const tx = useMotionValue(0)
  const ty = useMotionValue(0)
  const textX = useSpring(tx, { stiffness: 80, damping: 18 })
  const textY = useSpring(ty, { stiffness: 80, damping: 18 })

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const [wide] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    control.current.scroll = wide ? value : 0
  })
  const stageY = useTransform(scrollYProgress, [0, 1], [0, wide ? 160 : 0])
  const textFade = useTransform(scrollYProgress, [0, 0.7], [1, wide ? 0 : 1])
  const textLift = useTransform(scrollYProgress, [0, 1], [0, wide ? -80 : 0])

  return (
    <section
      ref={section}
      id="inicio"
      className="relative overflow-hidden"
      onPointerMove={(event) => {
        if (paused || event.pointerType === 'touch') return
        const box = event.currentTarget.getBoundingClientRect()
        tx.set(((event.clientX - box.left) / box.width - 0.5) * -14)
        ty.set(((event.clientY - box.top) / box.height - 0.5) * -10)
      }}
      onPointerLeave={() => {
        tx.set(0)
        ty.set(0)
      }}
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-0 px-5 pt-24 pb-6 md:px-8 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-4 lg:pt-24 lg:pb-12">
        <motion.div className="relative z-10 lg:col-span-6" style={{ x: textX, y: textY }}>
          <motion.div style={{ opacity: textFade, y: textLift }}>
            <motion.span className="kicker" initial={{ opacity: 0, y: 14, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={spring}>
              <Sparkles size={14} aria-hidden="true" />
              {hero.kicker}
            </motion.span>

            <h1 className="mt-6 font-display text-[clamp(2.7rem,5.6vw,5.3rem)] leading-[1] font-black tracking-[-0.03em] text-navy">
              {hero.title.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    className={`block ${index === 2 ? 'text-gloss-green' : index === 1 ? 'text-gloss' : ''}`}
                    initial={{ y: '110%', rotate: 3 }}
                    animate={{ y: '0%', rotate: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + index * 0.12, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed font-semibold text-navy/80 md:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease }}
            >
              <Magnetic>
                <a href="#tratamentos" className="btn btn-solid group w-full whitespace-nowrap sm:w-auto">
                  {hero.primary}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contato" className="btn btn-ghost w-full whitespace-nowrap sm:w-auto">
                  {hero.secondary}
                </a>
              </Magnetic>
            </motion.div>

            <dl className="mt-10 grid grid-cols-3 gap-3 sm:max-w-lg">
              {hero.signals.map((signal, index) => (
                <motion.div
                  key={signal.label}
                  className={`glass rounded-2xl px-3 py-3 text-center sm:px-4 ${['float-a', 'float-b', 'float-c'][index]}`}
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.85 + index * 0.12 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                >
                  <dt className="font-display text-3xl font-black text-gloss">
                    <CountUp value={Number(signal.value)} pad={2} />
                  </dt>
                  <dd className="mt-0.5 text-xs leading-tight font-bold text-navy sm:text-sm">{signal.label}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative -mx-5 h-[46vh] max-h-[400px] min-h-[280px] md:mx-0 lg:col-span-6 lg:h-[84vh] lg:max-h-none"
          style={{ y: stageY }}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.2 }}
        >
          <ArchStage control={control} />
        </motion.div>
      </div>

      <motion.a
        href="#proposta"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-5 left-1/2 hidden h-12 w-7 -translate-x-1/2 justify-center rounded-full border-2 border-white/90 bg-white/30 pt-2 backdrop-blur-sm lg:flex"
        style={{ opacity: textFade }}
      >
        <motion.span
          className="h-2 w-2 rounded-full bg-sky"
          animate={paused ? undefined : { y: [0, 16, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.a>
    </section>
  )
}
