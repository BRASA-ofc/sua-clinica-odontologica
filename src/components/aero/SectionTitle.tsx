import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type Props = {
  kicker: string
  title: string
  /** trecho final com brilho de vidro */
  highlight?: string
  green?: boolean
  light?: boolean
  className?: string
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } } }
const word = {
  hidden: { y: '105%', rotate: 4, opacity: 0 },
  show: { y: '0%', rotate: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 170, damping: 18 } },
}

/** Título com selo e palavras que sobem uma a uma ao entrar na tela. */
export function SectionTitle({ kicker, title, highlight, green = false, light = false, className = '' }: Props) {
  const words = [
    ...title.split(' ').map((text) => ({ text, hl: false })),
    ...(highlight ? highlight.split(' ').map((text) => ({ text, hl: true })) : []),
  ]
  return (
    <div className={className}>
      <motion.span
        className="kicker"
        initial={{ opacity: 0, scale: 0.7, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        <Sparkles size={13} aria-hidden="true" />
        {kicker}
      </motion.span>
      <motion.h2
        className={`mt-5 font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.05] font-black tracking-[-0.025em] ${
          light ? 'text-white drop-shadow-[0_2px_10px_rgba(0,40,90,0.35)]' : 'text-navy'
        }`}
        aria-label={[title, highlight].filter(Boolean).join(' ')}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {words.map((w, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              variants={word}
              className={`inline-block ${w.hl ? (green ? 'text-gloss-green' : light ? 'text-cyan' : 'text-gloss') : ''}`}
            >
              {w.text}
            </motion.span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </motion.h2>
    </div>
  )
}
