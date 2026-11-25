import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Props = {
  children: ReactNode
  className?: string
  max?: number
}

/** Inclina o cartão em 3D seguindo o cursor, com um reflexo de vidro. */
export function Tilt({ children, className = '', max = 9 }: Props) {
  const reduced = usePrefersReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 180, damping: 18 })
  const sy = useSpring(py, { stiffness: 180, damping: 18 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])

  return (
    <motion.div
      className={`tilt ${className}`}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      whileHover={reduced ? undefined : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType === 'touch') return
        const box = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - box.left) / box.width
        const y = (event.clientY - box.top) / box.height
        px.set(x)
        py.set(y)
        event.currentTarget.style.setProperty('--gx', `${x * 100}%`)
        event.currentTarget.style.setProperty('--gy', `${y * 100}%`)
        event.currentTarget.style.setProperty('--go', '1')
      }}
      onPointerLeave={(event) => {
        px.set(0.5)
        py.set(0.5)
        event.currentTarget.style.setProperty('--go', '0')
      }}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </motion.div>
  )
}
