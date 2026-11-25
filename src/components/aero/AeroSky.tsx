import { motion, useScroll, useTransform } from 'framer-motion'
import { BubbleCanvas } from './BubbleCanvas'

const sparkles = [
  { top: '12%', left: '8%', delay: '0s', size: 16 },
  { top: '22%', left: '62%', delay: '-1.1s', size: 12 },
  { top: '38%', left: '88%', delay: '-2.3s', size: 20 },
  { top: '55%', left: '18%', delay: '-0.6s', size: 14 },
  { top: '68%', left: '72%', delay: '-1.8s', size: 18 },
  { top: '84%', left: '40%', delay: '-2.8s', size: 12 },
  { top: '8%', left: '42%', delay: '-1.5s', size: 10 },
]

function Ribbon({ className, from, to, path }: { className: string; from: string; to: string; path: string }) {
  const id = className.replace(/\W/g, '')
  return (
    <svg className={`aurora ${className}`} viewBox="0 0 1600 260" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={from} stopOpacity="0" />
          <stop offset="0.3" stopColor={from} stopOpacity="0.85" />
          <stop offset="0.7" stopColor={to} stopOpacity="0.75" />
          <stop offset="1" stopColor={to} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#g-${id})`} />
      <path d={path} fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="2" />
    </svg>
  )
}

/** Céu Frutiger Aero fixo: sol, raios girando, faixas de luz, brilhos e bolhas interativas. */
export function AeroSky() {
  const { scrollYProgress } = useScroll()
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [0, -12, 18])
  const filter = useTransform(hue, (value) => `hue-rotate(${value}deg)`)
  const raysY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div className="aero-sky absolute inset-0" style={{ filter }} />
      <motion.div className="absolute inset-0" style={{ y: raysY }}>
        <div className="aero-rays" />
        <div className="aero-sun" />
      </motion.div>
      <Ribbon
        className="aurora-a h-48"
        from="#ffffff"
        to="#9ff3ff"
        path="M0 160 C 260 40, 520 40, 800 120 S 1340 230, 1600 80 L 1600 120 C 1340 260, 1060 170, 800 150 S 260 90, 0 200 Z"
      />
      <Ribbon
        className="aurora-b h-56"
        from="#b8f7d4"
        to="#ffffff"
        path="M0 120 C 300 220, 620 10, 900 90 S 1400 200, 1600 60 L 1600 100 C 1400 240, 1180 160, 900 130 S 300 260, 0 170 Z"
      />
      <Ribbon
        className="aurora-c h-40"
        from="#ffffff"
        to="#7fd8ff"
        path="M0 100 C 360 10, 640 200, 960 110 S 1420 20, 1600 140 L 1600 170 C 1420 60, 1240 220, 960 150 S 360 60, 0 140 Z"
      />
      {sparkles.map((item) => (
        <span
          key={`${item.top}-${item.left}`}
          className="sparkle"
          style={{ top: item.top, left: item.left, width: item.size, height: item.size, animationDelay: item.delay }}
        />
      ))}
      <BubbleCanvas />
    </div>
  )
}
