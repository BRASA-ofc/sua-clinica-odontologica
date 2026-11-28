import { useEffect } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** Ondinha suave ao clicar nos botões. */
export function GlobalEffects() {
  const paused = usePrefersReducedMotion()

  useEffect(() => {
    const onDown = (event: PointerEvent) => {
      const btn = (event.target as HTMLElement | null)?.closest<HTMLElement>('.btn')
      if (!btn || paused) return
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
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [paused])

  return null
}
