import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import type { CSSProperties } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'

const upper = [
  { x: 84, w: 34 },
  { x: 120, w: 38 },
  { x: 160, w: 40 },
  { x: 202, w: 40 },
  { x: 244, w: 38 },
  { x: 284, w: 34 },
]
const lower = [
  { x: 96, w: 32 },
  { x: 130, w: 34 },
  { x: 166, w: 33 },
  { x: 201, w: 33 },
  { x: 236, w: 34 },
  { x: 272, w: 32 },
]
const stains = [
  { cx: 100, cy: 120, r: 6 },
  { cx: 140, cy: 108, r: 5 },
  { cx: 182, cy: 126, r: 7 },
  { cx: 220, cy: 112, r: 5 },
  { cx: 262, cy: 124, r: 6 },
  { cx: 300, cy: 110, r: 4 },
  { cx: 150, cy: 160, r: 5 },
  { cx: 214, cy: 164, r: 6 },
  { cx: 252, cy: 158, r: 4 },
]

const MIN_X = 80
const MAX_X = 322

/** limpeza local: 0 = sujo, 1 = limpo, conforme a faixa passa pela posição x */
function useClean(progress: MotionValue<number>, x: number) {
  return useTransform(progress, (v) => {
    const band = MIN_X + v * (MAX_X - MIN_X + 40)
    return Math.min(1, Math.max(0, (band - x) / 40))
  })
}

function Tooth({ progress, x, y, w, h, lowerRow }: { progress: MotionValue<number>; x: number; y: number; w: number; h: number; lowerRow?: boolean }) {
  const clean = useClean(progress, x + w / 2)
  const fill = useTransform(clean, [0, 1], ['#e6d39a', '#ffffff'])
  const plaque = useTransform(clean, [0, 1], [0.85, 0])
  const shine = useTransform(clean, [0.6, 1], [0, 0.9])
  const r = lowerRow ? 8 : 10
  return (
    <g>
      <motion.rect x={x} y={y} width={w} height={h} rx={r} style={{ fill }} stroke="#d8e6ee" strokeWidth="1.2" />
      <motion.rect
        x={x + 2}
        y={lowerRow ? y : y + h - 12}
        width={w - 4}
        height={10}
        rx={5}
        fill="#c9a85a"
        style={{ opacity: plaque }}
      />
      <motion.rect x={x + 6} y={y + 6} width={6} height={h - 18} rx={3} fill="#ffffff" style={{ opacity: shine }} />
    </g>
  )
}

function Stain({ progress, cx, cy, r }: { progress: MotionValue<number>; cx: number; cy: number; r: number }) {
  const clean = useClean(progress, cx)
  const opacity = useTransform(clean, [0, 0.7], [0.75, 0])
  const scale = useTransform(clean, [0, 1], [1, 0.2])
  return <motion.circle cx={cx} cy={cy} r={r} fill="#a9823f" style={{ opacity, scale, transformOrigin: `${cx}px ${cy}px` }} />
}

export function Shine() {
  const paused = usePrefersReducedMotion()
  const progress = useMotionValue(0.15)
  const [value, setValue] = useState(15)
  const [touched, setTouched] = useState(false)
  const idleTimer = useRef<number | null>(null)
  const art = useRef<SVGSVGElement>(null)
  const ids = useId().replace(/:/g, '')

  useMotionValueEvent(progress, 'change', (v) => setValue(Math.round(v * 100)))

  // vai e volta sozinho enquanto ninguém mexe
  useEffect(() => {
    if (touched || paused) return
    const controls = animate(progress, [progress.get(), 1, 1, 0.05], {
      duration: 6,
      times: [0, 0.55, 0.75, 1],
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 0.6,
    })
    return () => controls.stop()
  }, [touched, paused, progress])

  const interact = (v: number) => {
    setTouched(true)
    progress.set(Math.min(1, Math.max(0, v)))
    if (idleTimer.current) window.clearTimeout(idleTimer.current)
    idleTimer.current = window.setTimeout(() => setTouched(false), 5000)
  }

  useEffect(() => () => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current)
  }, [])

  const bandX = useTransform(progress, (v) => MIN_X + v * (MAX_X - MIN_X + 40) - 20)
  const sparkle = useTransform(progress, [0.82, 1], [0, 1])
  const glow = useTransform(progress, [0.6, 1], [0, 0.65])

  return (
    <section id="brilho" className="relative scroll-mt-24 px-3 py-10 md:px-6">
      <div className="glass relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 overflow-hidden rounded-[2.5rem] px-6 py-14 md:px-12 lg:grid-cols-12">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan/25 blur-3xl" aria-hidden="true" />
        <Reveal className="lg:col-span-5">
          <SectionTitle kicker="Prevenção" title="Veja a limpeza" highlight="em ação." />
          <p className="mt-5 leading-relaxed font-semibold text-navy/75">
            Arraste sobre o sorriso e veja a diferença.
          </p>
          <div className="mt-8">
            <div className="flex justify-between text-xs font-extrabold tracking-[0.16em] text-lagoon uppercase">
              <span>Antes</span>
              <span className="tabular-nums">{value}%</span>
              <span>Depois</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(event) => interact(Number(event.target.value) / 100)}
              aria-label="Progresso da limpeza na ilustração"
              className="aero-range mt-3 w-full"
              style={{ '--fill': `${value}%` } as CSSProperties}
            />
          </div>
          <p className="mt-5 text-xs text-navy/60">Ilustração demonstrativa. Não representa resultado de tratamento.</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative">
            <motion.div
              className="pointer-events-none absolute inset-[8%] rounded-full bg-white blur-3xl"
              style={{ opacity: glow }}
              aria-hidden="true"
            />
            <svg
              ref={art}
              viewBox="40 20 320 230"
              className="relative w-full cursor-ew-resize touch-pan-y drop-shadow-[0_20px_40px_rgba(10,80,140,0.25)]"
              role="img"
              aria-label="Ilustração de um sorriso que vai ficando limpo e brilhante"
              onPointerMove={(event) => {
                if (event.pointerType === 'mouse' && event.buttons === 0) return
                const box = event.currentTarget.getBoundingClientRect()
                interact(((event.clientX - box.left) / box.width - 0.12) / 0.8)
              }}
              onPointerDown={(event) => {
                const box = event.currentTarget.getBoundingClientRect()
                interact(((event.clientX - box.left) / box.width - 0.12) / 0.8)
              }}
            >
              <defs>
                <linearGradient id={`lip-${ids}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff9fb1" />
                  <stop offset="0.5" stopColor="#ef6f8c" />
                  <stop offset="1" stopColor="#d9506f" />
                </linearGradient>
                <linearGradient id={`band-${ids}`} x1="0" x2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#bff0ff" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <clipPath id={`mouth-${ids}`}>
                  <path d="M70 120 Q200 62 330 120 Q200 222 70 120Z" />
                </clipPath>
              </defs>

              {/* lábios */}
              <path d="M48 120 Q120 52 200 66 Q280 52 352 120 Q200 262 48 120Z" fill={`url(#lip-${ids})`} />
              <path d="M90 92 Q200 58 310 92" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />

              <g clipPath={`url(#mouth-${ids})`}>
                <rect x="60" y="60" width="290" height="170" fill="#6b1f33" />
                <path d="M70 92 Q200 70 330 92 L330 104 Q200 84 70 104Z" fill="#f08aa0" />
                <path d="M80 182 Q200 206 320 182 L320 200 Q200 222 80 200Z" fill="#f08aa0" />
                {upper.map((t) => (
                  <Tooth key={`u${t.x}`} progress={progress} x={t.x} y={78} w={t.w} h={64} />
                ))}
                {lower.map((t) => (
                  <Tooth key={`l${t.x}`} progress={progress} x={t.x} y={144} w={t.w} h={44} lowerRow />
                ))}
                {stains.map((s) => (
                  <Stain key={`${s.cx}-${s.cy}`} progress={progress} {...s} />
                ))}
                {/* faixa de limpeza com espuma */}
                <motion.g style={{ x: bandX }}>
                  <rect x="0" y="60" width="40" height="170" fill={`url(#band-${ids})`} />
                  {[0, 1, 2, 3, 4].map((i) => (
                    <circle
                      key={i}
                      cx={14 + (i % 2) * 14}
                      cy={94 + i * 22}
                      r={4 + (i % 3) * 2.5}
                      fill="rgba(255,255,255,0.75)"
                      stroke="#9fe3ff"
                      strokeWidth="1"
                      className={i % 2 ? 'float-a' : 'float-b'}
                    />
                  ))}
                </motion.g>
              </g>

              {/* brilhos quando fica limpo */}
              <motion.g style={{ opacity: sparkle }}>
                {[
                  [150, 96, 9],
                  [236, 104, 7],
                  [118, 160, 6],
                  [270, 150, 8],
                ].map(([x, y, s], i) => (
                  <path
                    key={i}
                    d={`M${x} ${y - s} L${x + s * 0.25} ${y - s * 0.25} L${x + s} ${y} L${x + s * 0.25} ${y + s * 0.25} L${x} ${y + s} L${x - s * 0.25} ${y + s * 0.25} L${x - s} ${y} L${x - s * 0.25} ${y - s * 0.25}Z`}
                    fill="#fff"
                    className="shine-star"
                    style={{ animationDelay: `${i * 0.35}s`, transformOrigin: `${x}px ${y}px` }}
                  />
                ))}
              </motion.g>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
