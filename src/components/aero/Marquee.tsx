import { Droplets, Smile, Sparkles, Sun } from 'lucide-react'

const words = [
  { text: 'Sorriso brilhante', Icon: Sparkles },
  { text: 'Limpeza profunda', Icon: Droplets },
  { text: 'Cuidado leve', Icon: Smile },
  { text: 'Hálito fresco', Icon: Sun },
  { text: 'Planejamento claro', Icon: Sparkles },
  { text: 'Escuta de verdade', Icon: Smile },
]

/** Faixa de vidro com palavras rolando sem parar. */
export function Marquee() {
  const items = [...words, ...words]
  return (
    <div className="relative z-10 -rotate-1 py-6" aria-hidden="true">
      <div className="glass overflow-hidden rounded-none border-x-0 py-3">
        <div className="marquee">
          {items.map(({ text, Icon }, index) => (
            <span key={index} className="mx-3 flex items-center gap-3 font-display text-lg font-extrabold whitespace-nowrap text-navy md:text-xl">
              <span className={`orb grid h-8 w-8 place-items-center text-white ${index % 2 ? 'orb-green' : ''}`}>
                <Icon size={15} />
              </span>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
