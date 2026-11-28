import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Bubble = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  phase: number
  wobble: number
  popping: number
}

type Spark = { x: number; y: number; vx: number; vy: number; life: number; size: number }

const SPRITE = 128

function makeSprite() {
  const canvas = document.createElement('canvas')
  canvas.width = SPRITE
  canvas.height = SPRITE
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas
  const c = SPRITE / 2
  const r = SPRITE / 2 - 2

  const body = ctx.createRadialGradient(c, c, r * 0.55, c, c, r)
  body.addColorStop(0, 'rgba(255,255,255,0)')
  body.addColorStop(0.62, 'rgba(180,235,255,0.10)')
  body.addColorStop(0.8, 'rgba(140,220,255,0.35)')
  body.addColorStop(0.9, 'rgba(255,190,245,0.38)')
  body.addColorStop(0.97, 'rgba(255,255,255,0.9)')
  body.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = body
  ctx.beginPath()
  ctx.arc(c, c, r, 0, Math.PI * 2)
  ctx.fill()

  const tint = ctx.createLinearGradient(0, 0, SPRITE, SPRITE)
  tint.addColorStop(0, 'rgba(120,255,220,0.10)')
  tint.addColorStop(0.5, 'rgba(255,255,255,0)')
  tint.addColorStop(1, 'rgba(120,170,255,0.16)')
  ctx.fillStyle = tint
  ctx.beginPath()
  ctx.arc(c, c, r, 0, Math.PI * 2)
  ctx.fill()

  const hi = ctx.createRadialGradient(c - r * 0.42, c - r * 0.46, 0, c - r * 0.42, c - r * 0.46, r * 0.34)
  hi.addColorStop(0, 'rgba(255,255,255,0.95)')
  hi.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hi
  ctx.beginPath()
  ctx.ellipse(c - r * 0.4, c - r * 0.44, r * 0.3, r * 0.2, -0.7, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.beginPath()
  ctx.arc(c + r * 0.45, c + r * 0.5, r * 0.07, 0, Math.PI * 2)
  ctx.fill()
  return canvas
}

/**
 * Bolhas de sabão que sobem o tempo todo, desviam do cursor e
 * estouram com um clique em área livre da página.
 */
export function BubbleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const sprite = makeSprite()
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    let width = 0
    let height = 0
    let frame = 0
    let last = performance.now()
    const pointer = { x: -9999, y: -9999 }
    const bubbles: Bubble[] = []
    const sparks: Spark[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (anywhere: boolean, x?: number, y?: number, r?: number): Bubble => ({
      x: x ?? Math.random() * width,
      y: y ?? (anywhere ? Math.random() * height : height + 80),
      r: r ?? 8 + Math.random() ** 2 * 30,
      vx: (Math.random() - 0.5) * 12,
      vy: -(18 + Math.random() * 30),
      phase: Math.random() * Math.PI * 2,
      wobble: 0.6 + Math.random() * 1.2,
      popping: 0,
    })

    resize()
    const target = width < 768 ? 5 : 11
    for (let i = 0; i < target; i += 1) bubbles.push(spawn(true))

    const pop = (bubble: Bubble) => {
      bubble.popping = 0.0001
      const count = 10 + Math.round(bubble.r / 4)
      for (let i = 0; i < count; i += 1) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4
        const speed = 60 + Math.random() * 140
        sparks.push({
          x: bubble.x + Math.cos(angle) * bubble.r,
          y: bubble.y + Math.sin(angle) * bubble.r,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1.5 + Math.random() * 2.5,
        })
      }
    }

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    const onDown = (event: PointerEvent) => {
      const el = event.target as HTMLElement | null
      if (el?.closest('a, button, input, textarea, select, label, [role="dialog"], [role="button"], [data-interactive]')) return
      const hit = bubbles.find(
        (b) => !b.popping && Math.hypot(b.x - event.clientX, b.y - event.clientY) < b.r + 14,
      )
      if (hit) {
        pop(hit)
      } else {
        for (let i = 0; i < 3; i += 1) {
          bubbles.push(
            spawn(false, event.clientX + (Math.random() - 0.5) * 30, event.clientY, 6 + Math.random() * 16),
          )
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const b of bubbles) {
        const scale = b.popping ? 1 + b.popping * 0.6 : 1 + Math.sin(b.phase * 2) * 0.03
        const alpha = b.popping ? Math.max(0, 1 - b.popping * 3) : 1
        const size = b.r * 2 * scale
        ctx.globalAlpha = alpha
        ctx.drawImage(sprite, b.x - size / 2, b.y - size / 2, size, size * (1 - Math.sin(b.phase) * 0.03))
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = '#ffffff'
      for (const s of sparks) {
        ctx.globalAlpha = Math.max(0, s.life)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      for (const b of bubbles) {
        b.phase += dt * b.wobble
        if (b.popping) {
          b.popping += dt
          continue
        }
        const dx = b.x - pointer.x
        const dy = b.y - pointer.y
        const dist = Math.hypot(dx, dy)
        const reach = b.r < 11 ? 30 : b.r + 120
        if (dist < reach && dist > 0.01) {
          const force = (1 - dist / reach) * 900
          b.vx += (dx / dist) * force * dt
          b.vy += (dy / dist) * force * dt
        }
        b.vx += Math.sin(b.phase) * 8 * dt
        b.vx *= 0.97
        b.vy += (-(22 + b.r * 0.4) - b.vy) * 0.6 * dt
        b.x += b.vx * dt
        b.y += b.vy * dt
      }
      for (let i = bubbles.length - 1; i >= 0; i -= 1) {
        const b = bubbles[i]
        if ((b.popping && b.popping > 0.35) || b.y < -b.r * 2 - 20) bubbles.splice(i, 1)
      }
      while (bubbles.length < target) bubbles.push(spawn(false))
      if (bubbles.length > target + 30) bubbles.splice(0, bubbles.length - target - 30)

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i]
        s.life -= dt * 2.2
        s.vy += 120 * dt
        s.x += s.vx * dt
        s.y += s.vy * dt
        if (s.life <= 0) sparks.splice(i, 1)
      }
      draw()
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', resize)
    if (reduced) {
      draw()
    } else {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown)
      document.addEventListener('pointerleave', onLeave)
      frame = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden && !reduced) {
        last = performance.now()
        frame = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />
}
