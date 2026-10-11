import { motion, useScroll, useTransform } from 'framer-motion'

const bands = [
  { top: '1%', duration: '16s', delay: '0s', opacity: 0.72, width: 30, color: '#8fd0e8', tide: 0 },
  { top: '5%', duration: '24s', delay: '-6s', opacity: 0.38, width: 56, color: '#d7eef6', tide: 1 },
  { top: '9%', duration: '14s', delay: '-3s', opacity: 0.55, width: 16, color: '#ffffff', tide: 2 },
  { top: '13%', duration: '20s', delay: '-11s', opacity: 0.48, width: 26, color: '#7ec8e3', tide: 0 },
  { top: '17%', duration: '28s', delay: '-8s', opacity: 0.32, width: 64, color: '#bfe4f1', tide: 1 },
  { top: '21%', duration: '15s', delay: '-2s', opacity: 0.6, width: 22, color: '#9fd8ee', tide: 2 },
  { top: '25%', duration: '22s', delay: '-14s', opacity: 0.42, width: 36, color: '#d7eef6', tide: 0 },
  { top: '29%', duration: '13s', delay: '-5s', opacity: 0.5, width: 14, color: '#1b6d88', tide: 1 },
  { top: '33%', duration: '26s', delay: '-9s', opacity: 0.36, width: 48, color: '#cfe9f3', tide: 2 },
  { top: '37%', duration: '17s', delay: '-1s', opacity: 0.58, width: 24, color: '#8fd0e8', tide: 0 },
  { top: '41%', duration: '21s', delay: '-12s', opacity: 0.34, width: 58, color: '#bfe4f1', tide: 1 },
  { top: '45%', duration: '14s', delay: '-7s', opacity: 0.46, width: 18, color: '#1b6d88', tide: 2 },
  { top: '49%', duration: '19s', delay: '-4s', opacity: 0.52, width: 28, color: '#9fd8ee', tide: 0 },
  { top: '53%', duration: '27s', delay: '-16s', opacity: 0.3, width: 52, color: '#d7eef6', tide: 1 },
  { top: '57%', duration: '15s', delay: '-3s', opacity: 0.55, width: 16, color: '#ffffff', tide: 2 },
  { top: '61%', duration: '23s', delay: '-10s', opacity: 0.4, width: 40, color: '#7ec8e3', tide: 0 },
  { top: '65%', duration: '12s', delay: '-6s', opacity: 0.5, width: 20, color: '#1b6d88', tide: 1 },
  { top: '69%', duration: '25s', delay: '-13s', opacity: 0.34, width: 60, color: '#cfe9f3', tide: 2 },
  { top: '73%', duration: '16s', delay: '-2s', opacity: 0.58, width: 22, color: '#9fd8ee', tide: 0 },
  { top: '77%', duration: '21s', delay: '-8s', opacity: 0.36, width: 46, color: '#bfe4f1', tide: 1 },
  { top: '81%', duration: '14s', delay: '-5s', opacity: 0.48, width: 16, color: '#ffffff', tide: 2 },
  { top: '85%', duration: '18s', delay: '-11s', opacity: 0.52, width: 26, color: '#8fd0e8', tide: 0 },
  { top: '89%', duration: '26s', delay: '-15s', opacity: 0.3, width: 54, color: '#d7eef6', tide: 1 },
  { top: '93%', duration: '13s', delay: '-4s', opacity: 0.46, width: 14, color: '#1b6d88', tide: 2 },
  { top: '97%', duration: '20s', delay: '-9s', opacity: 0.4, width: 34, color: '#9fd8ee', tide: 0 },
]

const tides = [
  'M0 40 C 80 8, 160 72, 240 40 S 400 8, 480 40 S 640 72, 720 40 S 880 8, 960 40 S 1120 72, 1200 40',
  'M0 28 C 100 68, 180 4, 280 36 S 460 76, 560 28 S 740 4, 840 40 S 1020 72, 1200 28',
  'M0 52 C 70 12, 150 78, 250 44 S 420 6, 520 48 S 700 84, 800 36 S 980 8, 1200 52',
]

function Ribbon({
  duration,
  delay,
  opacity,
  width,
  color,
  reverse,
  tide,
}: {
  duration: string
  delay: string
  opacity: number
  width: number
  color: string
  reverse?: boolean
  tide: number
}) {
  const path = tides[tide] ?? tides[0]
  return (
    <div
      className={`flow-ribbon ${reverse ? 'flow-ribbon-reverse' : ''}`}
      style={{ animationDuration: duration, animationDelay: delay }}
    >
      <svg viewBox="0 0 1200 80" className="h-32 w-1/2 overflow-visible" preserveAspectRatio="none" aria-hidden="true">
        <path d={path} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" opacity={opacity} />
      </svg>
      <svg viewBox="0 0 1200 80" className="h-32 w-1/2 overflow-visible" preserveAspectRatio="none" aria-hidden="true">
        <path d={path} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" opacity={opacity} />
      </svg>
    </div>
  )
}

export function WaveField() {
  const { scrollY } = useScroll()
  const ySlow = useTransform(scrollY, [0, 4000], [0, -280])
  const yFast = useTransform(scrollY, [0, 4000], [0, -640])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute inset-x-0 top-0 h-[130%]" style={{ y: ySlow }}>
        {bands
          .filter((_, index) => index % 2 === 0)
          .map((band) => (
            <div key={band.top} className="absolute right-0 left-0" style={{ top: band.top }}>
              <Ribbon {...band} />
            </div>
          ))}
      </motion.div>
      <motion.div className="absolute inset-x-0 top-0 h-[130%]" style={{ y: yFast }}>
        {bands
          .filter((_, index) => index % 2 === 1)
          .map((band) => (
            <div key={band.top} className="absolute right-0 left-0" style={{ top: band.top }}>
              <Ribbon {...band} reverse />
            </div>
          ))}
      </motion.div>
    </div>
  )
}
