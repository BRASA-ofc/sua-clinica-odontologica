import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[70] h-1 origin-left bg-gradient-to-r from-cyan via-sky to-mint shadow-[0_0_12px_rgba(80,200,255,0.9)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
