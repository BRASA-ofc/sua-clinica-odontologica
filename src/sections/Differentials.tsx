import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { differentials } from '../data/clinic'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'
import { Tilt } from '../components/aero/Tilt'

export function Differentials() {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="diferenciais" className="relative scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTitle kicker={differentials.kicker} title="Mais confiança em" highlight="cada etapa do tratamento." />
        </Reveal>

        <div ref={track} className="relative mt-16">
          {/* tubo de vidro que se enche de água conforme a rolagem */}
          <div className="absolute top-0 bottom-0 left-5 w-3 -translate-x-1/2 overflow-hidden rounded-full border border-white/90 bg-white/40 shadow-inner md:left-1/2">
            <motion.div
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-cyan via-sky to-mint"
              style={{ scaleY: fill }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {differentials.items.map((item, index) => {
              const right = index % 2 === 1
              return (
                <div key={item.index} className="relative grid grid-cols-1 items-center gap-6 pl-14 md:grid-cols-2 md:gap-16 md:pl-0">
                  <motion.span
                    className={`orb ${index === 1 ? 'orb-green' : ''} absolute top-8 left-5 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center font-display text-sm font-black text-white md:left-1/2`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                  >
                    {item.index}
                  </motion.span>
                  <Reveal className={right ? 'md:order-2' : ''}>
                    <div className={`glass rounded-[2rem] p-7 ${right ? 'md:ml-6' : 'md:mr-6'}`}>
                      <h3 className="font-display text-3xl leading-tight font-black text-navy">{item.title}</h3>
                      <p className="mt-3 leading-relaxed text-navy/75">{item.text}</p>
                    </div>
                  </Reveal>
                  <Reveal delay={0.1} className={right ? 'md:order-1' : ''}>
                    <Tilt className={`glass overflow-hidden rounded-[2rem] p-2 ${right ? 'md:mr-6' : 'md:ml-6'}`}>
                      <Photo
                        src={item.image}
                        alt={item.imageAlt}
                        className={`aspect-[16/10] w-full rounded-[1.5rem] object-cover ${index === 1 ? 'object-[70%_40%]' : ''}`}
                      />
                    </Tilt>
                  </Reveal>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
