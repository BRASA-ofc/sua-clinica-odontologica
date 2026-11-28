import { motion } from 'framer-motion'
import { CalendarClock, CreditCard, HeartHandshake, ListChecks } from 'lucide-react'
import { benefits } from '../data/clinic'

const icons = [HeartHandshake, ListChecks, CalendarClock, CreditCard]

/** Faixa "por que nós": quatro vantagens curtas, como nos sites de clínicas reais. */
export function Benefits() {
  return (
    <section aria-label="Por que escolher a Sua Clínica" className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ul className="glass grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, i) => {
            const Icon = icons[i] ?? HeartHandshake
            return (
              <motion.li
                key={item.title}
                className="group flex gap-4 p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky/10 text-sky transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold text-navy">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-navy/65">{item.text}</span>
                </span>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
