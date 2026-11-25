import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Entra na tela como uma bolha subindo: sobe, cresce e ganha opacidade. */
export function Reveal({ children, className, delay = 0, y = 40 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 16, delay }}
    >
      {children}
    </motion.div>
  )
}
