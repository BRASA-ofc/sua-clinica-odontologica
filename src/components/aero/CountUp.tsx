import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** Número que conta até o valor quando entra na tela. */
export function CountUp({ value, pad = 0, duration = 1.6 }: { value: number; pad?: number; duration?: number }) {
  const paused = usePrefersReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (paused) {
      setShown(value)
      return
    }
    const controls = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [inView, paused, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {String(shown).padStart(pad, '0')}
    </span>
  )
}
