import { useEffect, useRef, useState } from 'react'
import { trust } from '../data/clinic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'

function Count({ value }: { value: number }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced) {
      setShown(value)
      return
    }
    const node = ref.current
    if (!node) return
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1400)
          const eased = 1 - (1 - progress) ** 3
          setShown(Math.round(value * eased))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [reduced, value])

  return (
    <span ref={ref} className="tabular-nums">
      {String(shown).padStart(2, '0')}
    </span>
  )
}

const tankBubbles = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 61) % 100}%`,
  size: 8 + ((i * 13) % 26),
  duration: `${7 + ((i * 7) % 9)}s`,
  delay: `${-((i * 1.7) % 12)}s`,
}))

export function Trust() {
  return (
    <section id="clinica" className="relative scroll-mt-24 px-3 py-10 md:px-6">
      <div className="glass-dark relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] text-white">
        {/* aquário: bolhas subindo dentro do painel */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-cyan/30 blur-3xl" />
          <div className="absolute -right-20 -bottom-40 h-[28rem] w-[28rem] rounded-full bg-mint/25 blur-3xl" />
          {tankBubbles.map((b, i) => (
            <span
              key={i}
              className="soap absolute bottom-[-40px]"
              style={{
                left: b.left,
                width: b.size,
                height: b.size,
                animation: `rise-box ${b.duration} linear ${b.delay} infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative grid grid-cols-1 gap-14 px-6 py-20 md:px-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionTitle kicker={trust.kicker} title="Confiança se mostra" highlight="no modo de atender." light />
            <p className="mt-6 max-w-md text-white/80">{trust.lead}</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {trust.metrics.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 0.1}>
                <div className="group h-full rounded-[2rem] border border-white/30 bg-white/10 p-6 transition-colors duration-300 hover:bg-white/20">
                  <div className={`orb ${index ? 'orb-green' : ''} grid h-28 w-28 place-items-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <span className="font-display text-5xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,40,90,0.5)]">
                      <Count value={metric.value} />
                    </span>
                  </div>
                  <p className="mt-5 text-xl font-bold">{metric.label}</p>
                  <p className="mt-2 text-sm text-white/70">{metric.note}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2} className="sm:col-span-2">
              <div className="rounded-[2rem] border border-white/30 bg-gradient-to-r from-white/20 to-white/5 p-6">
                <p className="font-display text-4xl leading-tight font-black md:text-5xl">{trust.statement}</p>
                <p className="mt-3 max-w-md text-sm text-white/75">{trust.statementNote}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
