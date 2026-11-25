import { Ear, Eye, HeartHandshake } from 'lucide-react'
import { proposal } from '../data/clinic'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'
import { Tilt } from '../components/aero/Tilt'

const icons = [Ear, Eye, HeartHandshake]
const floats = ['float-a', 'float-b', 'float-c']

export function Proposal() {
  return (
    <section id="proposta" className="relative scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionTitle kicker={proposal.kicker} title="Cuidado odontológico que" highlight="começa ouvindo você." />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="glass rounded-3xl p-6 text-lg leading-relaxed font-semibold text-navy/80">{proposal.lead}</p>
          </Reveal>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {proposal.points.map((point, index) => {
            const Icon = icons[index] ?? Ear
            return (
              <Reveal key={point.index} delay={0.1 * index}>
                <li className="list-none">
                  <Tilt className="glass h-full rounded-[2rem] p-7">
                    <div className={`orb ${index === 1 ? 'orb-green' : ''} ${floats[index]} grid h-16 w-16 place-items-center text-white`}>
                      <Icon size={28} aria-hidden="true" />
                    </div>
                    <p className="mt-6 font-display text-sm font-black tracking-[0.2em] text-lagoon/70">{point.index}</p>
                    <h3 className="mt-1 font-display text-3xl font-black text-navy">{point.title}</h3>
                    <p className="mt-3 leading-relaxed text-navy/75">{point.text}</p>
                  </Tilt>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
