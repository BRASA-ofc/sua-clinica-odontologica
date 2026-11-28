import { motion } from 'framer-motion'

type Props = {
  kicker: string
  title: string
  /** trecho em itálico azul, no fim do título */
  highlight?: string
  center?: boolean
  className?: string
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }
const word = {
  hidden: { y: '100%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

/** Selo + título com serifa; as palavras sobem uma a uma ao entrar na tela. */
export function SectionTitle({ kicker, title, highlight, center = false, className = '' }: Props) {
  const words = [
    ...title.split(' ').map((text) => ({ text, hl: false })),
    ...(highlight ? highlight.split(' ').map((text) => ({ text, hl: true })) : []),
  ]
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      <span className="kicker">{kicker}</span>
      <motion.h2
        className="mt-4 font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.02em] text-navy"
        aria-label={[title, highlight].filter(Boolean).join(' ')}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {words.map((w, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span variants={word} className={`inline-block ${w.hl ? 'serif-em' : ''}`}>
              {w.text}
            </motion.span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </motion.h2>
    </div>
  )
}
