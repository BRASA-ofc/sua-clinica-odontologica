import { motion } from 'framer-motion'
import { steps } from '../data/clinic'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'

/** Como funciona a primeira consulta, em três passos. */
export function Steps() {
  return (
    <section id="como-funciona" className="relative scroll-mt-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-24 md:px-8 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(11,47,75,0.14)]">
            <Photo
              src="/images/clinic.jpg"
              alt="Consultório claro, com cadeira odontológica e bancada branca."
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
            />
          </div>
          <div className="soap float-b pointer-events-none absolute -top-6 -right-4 h-16 w-16" aria-hidden="true" />
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <SectionTitle kicker="Primeira consulta" title="Como funciona a" highlight="sua visita." />
          </Reveal>
          <ol className="relative mt-10 space-y-4">
            <span className="absolute top-6 bottom-6 left-[1.6rem] w-px bg-gradient-to-b from-sky/40 via-sky/20 to-transparent" aria-hidden="true" />
            {steps.map((step, i) => (
              <motion.li
                key={step.index}
                className="card relative flex items-start gap-5 rounded-2xl p-5"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="orb grid h-11 w-11 shrink-0 place-items-center text-sm font-extrabold text-white">{step.index}</span>
                <span>
                  <span className="block font-serif text-xl font-medium text-navy">{step.title}</span>
                  <span className="mt-1 block text-navy/65">{step.text}</span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
