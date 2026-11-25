import { useSyncExternalStore } from 'react'

/**
 * Animações ficam ligadas por padrão. O visitante pode pausá-las pelo botão
 * da barra de navegação; a escolha fica salva neste navegador.
 */
const KEY = 'sua-clinica:animacoes-pausadas'
const listeners = new Set<() => void>()

function read() {
  try {
    return window.localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

let paused = typeof window !== 'undefined' ? read() : false

function apply() {
  if (typeof document !== 'undefined') document.documentElement.dataset.motion = paused ? 'off' : 'on'
}
apply()

export function setMotionPaused(value: boolean) {
  paused = value
  try {
    window.localStorage.setItem(KEY, value ? '1' : '0')
  } catch {
    // armazenamento indisponível: vale só para esta visita
  }
  apply()
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** true quando o visitante pausou as animações. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, () => paused, () => false)
}
