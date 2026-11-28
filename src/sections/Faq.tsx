import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { faq } from '../data/clinic'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <li className="card overflow-hidden rounded-2xl">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-bold text-navy">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky/10 text-sky"
        >
          <Plus size={16} aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={id}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-5 leading-relaxed text-navy/70">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="duvidas" className="relative scroll-mt-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-24 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionTitle kicker="Dúvidas" title="Perguntas" highlight="frequentes." />
        </Reveal>
        <ul className="space-y-3 lg:col-span-8">
          {faq.map((item, i) => (
            <Item key={item.q} q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
