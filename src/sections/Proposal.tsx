import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { proposal } from '../data/clinic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Reveal } from '../components/ui/Reveal'

export function Proposal() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60])

  return (
    <section id="proposta" ref={ref} className="relative scroll-mt-28 overflow-hidden bg-white/45">
      <motion.p
        style={{ y }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-[-4vw] font-display text-[22vw] leading-none font-semibold tracking-tight text-foam"
      >
        escuta
      </motion.p>
      <div className="relative mx-auto grid max-w-6xl gap-16 px-5 py-28 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.32em] text-lagoon uppercase">{proposal.kicker}</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-navy">
            {proposal.title}
          </h2>
          <span className="mt-8 block h-px w-24 bg-lagoon" />
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-navy/75">{proposal.lead}</p>
          </Reveal>
          <ol className="mt-12">
            {proposal.points.map((point, index) => (
              <Reveal key={point.index} delay={0.08 * index}>
                <li className="grid grid-cols-[auto_1fr] gap-6 border-t border-mist py-7">
                  <span className="font-display text-sm tracking-[0.18em] text-silver">
                    {point.index}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-navy">
                      {point.title}
                    </h3>
                    <p className="mt-2 max-w-md text-navy/70">{point.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
