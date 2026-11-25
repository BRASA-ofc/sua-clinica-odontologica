import type { CSSProperties } from 'react'

type Kind = 'align' | 'restore' | 'caries' | 'clean'

const teeth = [
  { x: 28, y: 78, dx: -8, dy: 10 },
  { x: 68, y: 48, dx: -4, dy: 14 },
  { x: 112, y: 30, dx: 6, dy: -8 },
  { x: 160, y: 28, dx: -6, dy: 6 },
  { x: 206, y: 40, dx: 8, dy: -10 },
  { x: 246, y: 64, dx: 4, dy: 12 },
  { x: 278, y: 96, dx: -6, dy: 8 },
]

export function ServiceArt({ kind }: { kind: Kind }) {
  if (kind === 'align') {
    return (
      <svg viewBox="0 0 320 150" className="absolute inset-x-4 bottom-4 h-28 w-[calc(100%-2rem)]">
        <path
          d="M24 108C70 28 250 28 296 108"
          fill="none"
          stroke="#f4f8fb"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.85"
        />
        {teeth.map((tooth) => (
          <g
            key={`${tooth.x}-${tooth.y}`}
            className="arch-tooth"
            style={{ '--dx': `${tooth.dx}px`, '--dy': `${tooth.dy}px` } as CSSProperties}
          >
            <path
              d={`M${tooth.x} ${tooth.y}c2-14 8-20 14-20s12 6 14 20c1 8-2 14-6 16h-16c-4-2-7-8-6-16z`}
              fill="#f7f4ee"
              opacity="0.95"
            />
          </g>
        ))}
      </svg>
    )
  }

  if (kind === 'restore') {
    return (
      <svg viewBox="0 0 160 180" className="absolute right-6 bottom-6 h-36 w-32">
        <path
          d="M80 12c22 0 36 14 40 34 4 22 2 46-6 66-6 16-16 26-28 30-4 2-8 2-12 0-14-6-24-18-30-36-8-22-8-48-2-70 6-20 18-24 38-24z"
          fill="#f7f4ee"
        />
        <path
          d="M92 48c10 6 16 20 14 36-2 14-10 24-16 28 8-18 8-36 2-64z"
          className="origin-center fill-cyan/80 transition-all duration-700 group-hover:fill-lagoon"
        />
      </svg>
    )
  }

  if (kind === 'clean') {
    return (
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute top-6 right-6 h-16 w-16 rounded-full border border-white/70 transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute top-10 right-10 h-8 w-8 rounded-full border border-white/80" />
      </div>
    )
  }

  return (
    <svg viewBox="0 0 280 220" className="h-full w-full">
      <rect width="280" height="220" fill="#dff4ff" />
      <path
        d="M140 18c34 0 54 20 60 48 6 30 2 58-12 82-8 16-20 28-36 32-6 2-12 2-18 0-18-6-32-20-42-40-12-28-14-62-6-92 8-28 28-30 54-30z"
        fill="#f7f4ee"
        stroke="#d5e2ea"
      />
      <path
        d="M112 78c8 4 16 20 18 40 8-16 20-28 36-34 2 22-2 42-12 58-8 12-16 16-24 16-14 0-24-12-30-28-8-20-8-38-4-52 4 2 10 2 16 0z"
        fill="#f3e2c4"
      />
      <path d="M132 108c6 10 8 22 6 34 6-8 14-14 24-16-2 14-8 24-16 28-8-6-14-18-14-46z" fill="#f6c9cf" />
      <circle cx="168" cy="62" r="11" fill="none" stroke="#0f78b8" strokeWidth="2" />
      <path d="M176 70l14 14" stroke="#0f78b8" strokeWidth="2" strokeLinecap="round" />
      <text x="24" y="200" fill="#0f78b8" fontSize="11" fontFamily="Nunito, sans-serif">
        área a avaliar · ilustração didática
      </text>
    </svg>
  )
}
