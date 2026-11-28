import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { testimonials } from '../data/clinic'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'

/** Depoimentos — claramente marcados como fictícios. */
export function Testimonials() {
  return (
    <section id="depoimentos" className="relative scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionTitle kicker="Depoimentos" title="O que dizem" highlight="nossos pacientes." />
          <p className="text-sm text-navy/55">Depoimentos fictícios, criados para este portfólio.</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.figure
              key={item.name}
              className="card relative flex flex-col rounded-[1.75rem] p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Quote className="absolute top-6 right-6 text-sky/20" size={40} aria-hidden="true" />
              <span className="flex text-amber-400" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                ))}
              </span>
              <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed text-navy">“{item.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="orb grid h-9 w-9 place-items-center text-sm font-bold text-white">{item.name[0]}</span>
                <span className="text-sm font-bold text-navy">{item.name}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
