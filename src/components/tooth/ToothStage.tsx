import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { Pointer2D } from '../../three/ToothCanvas'

const ToothCanvas = lazy(() => import('../../three/ToothCanvas'))

type BoundaryProps = {
  children: ReactNode
  onError: () => void
}

type BoundaryState = { failed: boolean }

class ToothBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false }

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

type Props = {
  pointer: RefObject<Pointer2D>
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function ToothStage({ pointer }: Props) {
  const reduced = usePrefersReducedMotion()
  const location = useLocation()
  const host = useRef<HTMLDivElement>(null)
  const [supported, setSupported] = useState(true)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const [detail, setDetail] = useState<'high' | 'low'>('high')

  useEffect(() => {
    setSupported(canUseWebGL())
    const compact = window.matchMedia('(max-width: 767px)')
    const apply = () => setDetail(compact.matches ? 'low' : 'high')
    apply()
    compact.addEventListener('change', apply)
    return () => compact.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const node = host.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const active = visible && location.pathname === '/'

  return (
    <div ref={host} className="relative h-full min-h-[320px] w-full">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2">
        <div className="orbit-spin h-full w-full rounded-full border border-silver/50" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[46%] h-[84%] w-[58%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="orbit-spin h-full w-full rounded-full border border-cyan/40"
          style={{ animationDuration: '58s', animationDirection: 'reverse' }}
        />
      </div>
      {supported ? (
        <ToothBoundary onError={() => setSupported(false)}>
          <Suspense fallback={null}>
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
              role="img"
              aria-label="Molar tridimensional com quatro raízes, em esmalte, girando com iluminação de estúdio."
            >
              <ToothCanvas
                pointer={pointer}
                reduced={reduced}
                detail={detail}
                active={active}
                onReady={() => setReady(true)}
              />
            </div>
          </Suspense>
        </ToothBoundary>
      ) : null}
      <p className="pointer-events-none absolute bottom-6 right-6 hidden text-[10px] tracking-[0.28em] text-white/45 uppercase lg:block">
        Esmalte · estudo 3D
      </p>
    </div>
  )
}
