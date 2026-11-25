import { motion } from 'framer-motion'
import { ShieldCheck, Smile, Sparkles } from 'lucide-react'
import { dentist } from '../data/clinic'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'
import { Tilt } from '../components/aero/Tilt'

const badges = [
  { text: 'Atendimento sem pressa', Icon: Smile, className: 'top-[14%] -left-3 md:-left-8 float-a' },
  { text: 'Plano explicado', Icon: ShieldCheck, className: 'top-[48%] -right-3 md:-right-8 float-b', green: true },
  { text: 'Sorriso brilhante', Icon: Sparkles, className: '-bottom-5 right-6 float-c' },
]

export function Dentist() {
  return (
    <section id="dentista" className="relative scroll-mt-24">
      <div className="mx-auto grid grid-cols-1 max-w-6xl items-center gap-14 px-5 py-24 md:px-8 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-6">
          <Tilt max={6} className="glass overflow-hidden rounded-[2.2rem] p-2.5">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[1.8rem]">
                <Photo
                  src={dentist.portrait}
                  alt={dentist.portraitAlt}
                  priority
                  className="aspect-[4/5] h-auto max-h-[78vh] w-full object-cover object-[22%_18%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-sky/40" />
                <p className="absolute right-4 bottom-4 left-4 rounded-xl bg-white/75 px-3 py-2 text-xs font-semibold text-navy backdrop-blur-md">
                  {dentist.imageNote}
                </p>
              </div>
            </div>
          </Tilt>
          {badges.map(({ text, Icon, className, green }) => (
            <motion.span
              key={text}
              className={`glass absolute z-10 flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-bold text-navy ${className}`}
              whileHover={{ scale: 1.1, rotate: -2 }}
            >
              <span className={`orb ${green ? 'orb-green' : ''} grid h-8 w-8 place-items-center text-white`}>
                <Icon size={15} aria-hidden="true" />
              </span>
              {text}
            </motion.span>
          ))}
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <SectionTitle kicker="Quem cuida" title="Cuidar do seu sorriso começa" highlight="com confiança." />
            <p className="mt-6 text-lg leading-relaxed font-semibold text-navy/80">{dentist.bio}</p>
          </Reveal>

          <Reveal delay={0.1} className="glass mt-8 rounded-[1.8rem] p-6">
            <p className="font-display text-3xl font-black text-gloss">{dentist.name}</p>
            <p className="mt-1 font-bold text-navy/80">{dentist.role}</p>
            <p className="mt-2 text-xs font-bold tracking-[0.1em] text-lagoon uppercase">{dentist.fictionNote}</p>
            <p className="mt-3 text-sm text-navy/70">{dentist.credential}</p>

            <div className="mt-6 grid grid-cols-1 gap-6 border-t border-white/80 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-extrabold tracking-[0.18em] text-lagoon uppercase">Atuação</p>
                <p className="mt-2 font-semibold text-navy">{dentist.years}</p>
                <p className="mt-1 text-xs text-navy/60">{dentist.yearsNote}</p>
              </div>
              <div>
                <p className="text-[11px] font-extrabold tracking-[0.18em] text-lagoon uppercase">Abordagem</p>
                <p className="mt-2 font-semibold text-navy">{dentist.approach}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/80 pt-6">
              <p className="text-[11px] font-extrabold tracking-[0.18em] text-lagoon uppercase">Formação demonstrativa</p>
              <ul className="mt-3 space-y-2">
                {dentist.formation.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-navy/85">
                    <span className="orb mt-1 h-3 w-3 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-navy/60">{dentist.formationNote}</p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {dentist.differentials.map((item) => (
                <motion.li
                  key={item}
                  className="btn-ghost rounded-full px-4 py-2 text-sm font-bold"
                  whileHover={{ y: -4, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
