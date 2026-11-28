import { BubbleCanvas } from './BubbleCanvas'

/** Fundo fixo: céu claro, uma faixa de luz e poucas bolhas discretas (toque Frutiger Aero). */
export function AeroSky() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="aero-sky absolute inset-0" />
      <svg className="aero-ribbon top-[14%] h-56" viewBox="0 0 1600 260" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ribbon-a" x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#bfe7fb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 160 C 300 40, 620 60, 900 120 S 1380 220, 1600 90 L 1600 130 C 1380 250, 1100 170, 900 150 S 300 90, 0 200 Z" fill="url(#ribbon-a)" />
      </svg>
      <div className="absolute inset-0 opacity-70">
        <BubbleCanvas />
      </div>
    </div>
  )
}
