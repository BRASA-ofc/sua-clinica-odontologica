import { AnimatePresence, motion } from 'framer-motion'
import { Hand } from 'lucide-react'
import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { ArchControl } from '../../three/ArchCanvas'

const ArchCanvas = lazy(() => import('../../three/ArchCanvas'))

class Boundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

type Burst = { id: number; x: number; y: number }

export function ArchStage({ control }: { control: RefObject<ArchControl> }) {
  const paused = usePrefersReducedMotion()
  const location = useLocation()
  const host = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; moved: number; last: number; v: number } | null>(null)
  const [supported] = useState(canUseWebGL)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const [detail] = useState<'high' | 'low'>(() => (window.matchMedia('(max-width: 767px)').matches ? 'low' : 'high'))
  const [hover, setHover] = useState(false)
  const [bursts, setBursts] = useState<Burst[]>([])
  const [grabbing, setGrabbing] = useState(false)
  const onReady = useCallback(() => setReady(true), [])

  useEffect(() => {
    const node = host.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.02 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const bite = (x: number, y: number) => {
    control.current.bite = 1
    control.current.flash = 1
    const box = host.current?.getBoundingClientRect()
    if (!box) return
    const id = Date.now() + Math.random()
    setBursts((list) => [...list.slice(-4), { id, x: x - box.left, y: y - box.top }])
    window.setTimeout(() => setBursts((list) => list.filter((b) => b.id !== id)), 900)
  }

  const show = supported && !failed

  return (
    <div ref={host} className="relative h-full w-full select-none">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(170,235,255,0.45)_42%,rgba(255,255,255,0)_70%)]" />
      <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-12 w-[60%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(10,90,160,0.3),rgba(10,90,160,0))] blur-sm" />

      {show ? (
        <Boundary onError={() => setFailed(true)}>
          <Suspense fallback={null}>
            <div
              role="button"
              tabIndex={0}
              aria-label="Arcada dentária em 3D. Arraste para girar; clique ou pressione Enter para fazer o sorriso brilhar."
              className={`absolute inset-0 touch-pan-y transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'} ${
                grabbing ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onPointerDown={(event) => {
                drag.current = { x: event.clientX, moved: 0, last: performance.now(), v: 0 }
                setGrabbing(true)
              }}
              onPointerMove={(event) => {
                const box = event.currentTarget.getBoundingClientRect()
                control.current.pointer.x = ((event.clientX - box.left) / box.width - 0.5) * 2
                control.current.pointer.y = ((event.clientY - box.top) / box.height - 0.5) * 2
                const d = drag.current
                if (!d) return
                const dx = event.clientX - d.x
                const now = performance.now()
                d.v = (dx * 0.012) / Math.max(0.008, (now - d.last) / 1000)
                d.last = now
                d.x = event.clientX
                d.moved += Math.abs(dx)
                control.current.drag += dx * 0.012
                if (d.moved > 4 && !event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.setPointerCapture(event.pointerId)
                }
              }}
              onPointerUp={(event) => {
                const d = drag.current
                drag.current = null
                setGrabbing(false)
                if (!d) return
                if (d.moved < 5) bite(event.clientX, event.clientY)
                else control.current.fling = Math.max(-6, Math.min(6, d.v * 0.25))
              }}
              onPointerCancel={() => {
                drag.current = null
                setGrabbing(false)
              }}
              onPointerLeave={() => {
                control.current.pointer.x = 0
                control.current.pointer.y = 0
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  const box = host.current?.getBoundingClientRect()
                  if (box) bite(box.left + box.width / 2, box.top + box.height / 2)
                }
                if (event.key === 'ArrowLeft') control.current.drag -= 0.3
                if (event.key === 'ArrowRight') control.current.drag += 0.3
              }}
            >
              <ArchCanvas
                control={control}
                paused={paused}
                detail={detail}
                active={visible && location.pathname === '/'}
                onHover={setHover}
                onReady={onReady}
              />
            </div>
          </Suspense>
        </Boundary>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div className="soap grid h-[60%] w-[60%] place-items-center">
            <svg viewBox="0 0 24 24" className="h-1/2 w-1/2 text-white drop-shadow-[0_8px_16px_rgba(10,90,160,0.4)]" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2.2c2.2 0 4.1 1.2 4.8 3.2.6 1.8.4 3.6.1 5.1-.2 1.1-.1 2 .5 2.8.6.7 1.6 1.2 1.6 2.5 0 1.9-1.6 4.5-3.2 4.5-.9 0-1.2-1-1.6-2-.4-.8-.8-1.2-1.2-1.2s-.8.4-1.2 1.2c-.4 1-.7 2-1.6 2-1.6 0-3.2-2.6-3.2-4.5 0-1.3 1-1.8 1.6-2.5.6-.8.7-1.7.5-2.8-.3-1.5-.5-3.3.1-5.1C7.9 3.4 9.8 2.2 12 2.2z"
              />
            </svg>
          </div>
        </div>
      )}

      {!ready && show ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="soap h-24 w-24 animate-pulse" />
        </div>
      ) : null}

      <AnimatePresence>
        {bursts.map((burst) => (
          <span key={burst.id} className="pointer-events-none absolute" style={{ left: burst.x, top: burst.y }}>
            {Array.from({ length: 10 }, (_, i) => {
              const angle = (i / 10) * Math.PI * 2
              return (
                <motion.span
                  key={i}
                  className="soap absolute block h-4 w-4"
                  initial={{ x: -8, y: -8, scale: 0.4, opacity: 1 }}
                  animate={{ x: Math.cos(angle) * 80 - 8, y: Math.sin(angle) * 80 - 8 - 20, scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
              )
            })}
          </span>
        ))}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-[7%] flex justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={hover ? 'hover' : 'hint'}
            className="flex items-center gap-2 rounded-full border border-white/90 bg-white/75 px-4 py-2 text-xs font-bold whitespace-nowrap text-navy shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          >
            <Hand size={14} aria-hidden="true" />
            {hover ? 'Clique para ver o sorriso brilhar' : 'Arraste para girar · clique para brilhar'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
