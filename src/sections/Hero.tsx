import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Clock3, MessageCircle, ShieldCheck, Star } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { clinic, hero } from '../data/clinic'
import { Photo } from '../components/ui/Photo'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  return (
    <section ref={section} id="inicio" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pt-32 pb-16 md:px-8 lg:grid-cols-12 lg:gap-10 lg:pt-36 lg:pb-24">
        <div className="lg:col-span-6">
          <motion.span
            className="kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {hero.kicker}
          </motion.span>

          <motion.h1
            className="mt-5 font-serif text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[1.04] font-medium tracking-[-0.025em] text-navy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
          >
            {hero.titleStart} <span className="serif-em">{hero.titleEmphasis}</span> {hero.titleEnd}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-lg leading-relaxed text-navy/70"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <Link to="/conversa" className="btn btn-solid group">
              {hero.primary}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link to="/conversa" className="btn btn-ghost">
              <MessageCircle size={18} aria-hidden="true" />
              {hero.secondary}
            </Link>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-3 text-sm text-navy/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <span className="flex text-amber-400" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span>
              <strong className="text-navy">{hero.rating}</strong> · {hero.ratingNote}
            </span>
          </motion.div>
        </div>

        <motion.div
          className="relative lg:col-span-6"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease }}
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_70px_rgba(11,47,75,0.18)]">
            <motion.div style={{ y: photoY, scale: photoScale }}>
              <Photo src={hero.photo} alt={hero.photoAlt} priority className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]" />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-white/10" />
          </div>

          {/* cartões flutuantes de vidro */}
          <motion.div
            className="glass float-a absolute -left-3 bottom-8 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-left-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
          >
            <span className="orb grid h-10 w-10 place-items-center text-white">
              <Clock3 size={18} aria-hidden="true" />
            </span>
            <span className="text-sm">
              <span className="block font-bold text-navy">Aberto hoje</span>
              <span className="text-navy/60">{clinic.hours[0].time}</span>
            </span>
          </motion.div>
          <motion.div
            className="glass float-b absolute -right-3 top-8 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-right-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
          >
            <span className="orb grid h-10 w-10 place-items-center text-white">
              <ShieldCheck size={18} aria-hidden="true" />
            </span>
            <span className="text-sm">
              <span className="block font-bold text-navy">Plano por escrito</span>
              <span className="text-navy/60">antes de começar</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
