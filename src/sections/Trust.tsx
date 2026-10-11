import { useEffect, useRef, useState } from 'react'
import { trust } from '../data/clinic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Reveal } from '../components/ui/Reveal'

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
          const progress = Math.min(1, (now - start) / 1100)
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

export function Trust() {
  return (
    <section id="clinica" className="relative scroll-mt-28 overflow-hidden bg-petrol text-ice">
      <svg
        className="wave-sheet wave-sheet-b pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1600 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-100 180 C 200 40, 480 280, 760 120 S 1200 20, 1700 220"
          fill="none"
          stroke="#8fd0e8"
          strokeWidth="46"
          strokeLinecap="round"
        />
        <path
          d="M-80 420 C 240 300, 520 520, 840 360 S 1280 240, 1720 460"
          fill="none"
          stroke="#ffffff"
          strokeWidth="28"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
      <div className="pointer-events-none absolute -top-24 left-[-10%] h-80 w-80 rounded-full bg-cyan/15 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-28 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.32em] text-cyan uppercase">{trust.kicker}</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.96] font-semibold tracking-[-0.04em]">
            {trust.title}
          </h2>
          <p className="mt-6 max-w-md text-ice/70">{trust.lead}</p>
        </Reveal>
        <div className="lg:col-span-7">
          {trust.metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.08}>
              <div className="grid items-end gap-4 border-t border-white/15 py-8 sm:grid-cols-[9rem_1fr]">
                <p className="font-display text-7xl leading-none font-semibold text-cyan">
                  <Count value={metric.value} />
                </p>
                <div>
                  <p className="text-xl text-ice">{metric.label}</p>
                  <p className="mt-2 max-w-sm text-sm text-ice/60">{metric.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.16}>
            <div className="border-t border-white/15 py-8">
              <p className="font-display text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
                {trust.statement}
              </p>
              <p className="mt-3 max-w-md text-sm text-ice/65">{trust.statementNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
