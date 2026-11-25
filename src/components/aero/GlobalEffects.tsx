import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** Brilho que segue o cursor e ondinha de água ao clicar nos botões. */
export function GlobalEffects() {
  const reduced = usePrefersReducedMotion()
  const [fine, setFine] = useState(false)
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 20 })
  const sy = useSpring(y, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    setFine(media.matches)
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    const onDown = (event: PointerEvent) => {
      const btn = (event.target as HTMLElement | null)?.closest<HTMLElement>('.btn')
      if (!btn || reduced) return
      const box = btn.getBoundingClientRect()
      const size = Math.max(box.width, box.height)
      const dot = document.createElement('span')
      dot.className = 'ripple'
      dot.style.width = `${size}px`
      dot.style.height = `${size}px`
      dot.style.left = `${event.clientX - box.left - size / 2}px`
      dot.style.top = `${event.clientY - box.top - size / 2}px`
      btn.appendChild(dot)
      window.setTimeout(() => dot.remove(), 750)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [reduced, x, y])

  if (!fine || reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[5] h-[420px] w-[420px] rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(160,235,255,0.18) 35%, rgba(255,255,255,0) 70%)',
        mixBlendMode: 'soft-light',
      }}
    />
  )
}
