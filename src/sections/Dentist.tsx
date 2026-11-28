import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { dentist } from '../data/clinic'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'
import { CountUp } from '../components/aero/CountUp'

export function Dentist() {
  return (
    <section id="profissional" className="relative scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="glass grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2.25rem] p-4 md:p-6 lg:grid-cols-12 lg:gap-12">
          <Reveal className="relative lg:col-span-5">
            <div className="overflow-hidden rounded-[1.75rem]">
              <Photo
                src={dentist.portrait}
                alt={dentist.portraitAlt}
                className="aspect-[4/5] max-h-[560px] w-full object-cover object-[22%_18%] transition-transform duration-[1.4s] ease-out hover:scale-105"
              />
            </div>
            <motion.div
              className="glass float-a absolute right-4 bottom-4 flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-bold text-navy"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="orb grid h-8 w-8 place-items-center text-white">
                <Award size={15} aria-hidden="true" />
              </span>
              Responsável técnica
            </motion.div>
          </Reveal>

          <div className="px-2 pb-4 lg:col-span-7 lg:pr-8">
            <Reveal>
              <SectionTitle kicker="Quem cuida" title="Experiência com" highlight="cuidado humano." />
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-navy/70">{dentist.bio}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <p className="font-serif text-2xl font-medium text-navy">{dentist.name}</p>
              <p className="mt-1 text-navy/65">{dentist.role}</p>
              <p className="mt-1 text-xs font-bold tracking-[0.08em] text-navy/45 uppercase">{dentist.credential}</p>
            </Reveal>
            <Reveal delay={0.16} className="mt-8 flex flex-wrap items-center gap-8">
              {dentist.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-4xl font-medium text-sky">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="text-sm text-navy/60">{stat.label}</p>
                </div>
              ))}
              <ul className="flex flex-wrap gap-2">
                {dentist.highlights.map((item) => (
                  <li key={item} className="rounded-full bg-sky/10 px-3.5 py-1.5 text-sm font-bold text-lagoon">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
