import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clinic, contactCopy } from '../data/clinic'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/aero/SectionTitle'
import { Magnetic } from '../components/aero/Magnetic'
import { Tilt } from '../components/aero/Tilt'

export function Contact() {
  return (
    <section id="contato" className="relative scroll-mt-24">
      <div className="mx-auto grid grid-cols-1 max-w-6xl items-center gap-12 px-5 py-24 md:px-8 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-7">
          <div className="soap float-b pointer-events-none absolute -top-10 -left-6 h-24 w-24" aria-hidden="true" />
          <div className="soap float-c pointer-events-none absolute right-10 -bottom-8 h-14 w-14" aria-hidden="true" />
          <SectionTitle kicker={contactCopy.kicker} title="Vamos cuidar do seu" highlight="sorriso." green />
          <p className="mt-6 max-w-xl text-lg leading-relaxed font-semibold text-navy/80">{contactCopy.lead}</p>
          <Magnetic className="mt-8">
            <Link to="/conversa" className="btn btn-green px-7 py-4 text-lg">
              {contactCopy.action}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <Tilt max={6} className="glass rounded-[2rem] p-7">
            <div className="flex gap-4">
              <span className="orb grid h-11 w-11 shrink-0 place-items-center text-white">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold text-navy">{clinic.address.line}</p>
                <p className="text-navy/85">{clinic.address.city}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-4 border-t border-white/80 pt-6">
              <span className="orb orb-green grid h-11 w-11 shrink-0 place-items-center text-white">
                <Clock3 size={18} aria-hidden="true" />
              </span>
              <div>
                <ul className="space-y-1 text-navy">
                  {clinic.hours.map((item) => (
                    <li key={item.days}>
                      <span className="font-bold">{item.days}</span>
                      <span className="text-navy/70"> · {item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex gap-4 border-t border-white/80 pt-6">
              <span className="orb grid h-11 w-11 shrink-0 place-items-center text-white">
                <Phone size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-2xl font-black text-gloss">{clinic.phoneDisplay}</p>
              </div>
            </div>
            <p className="mt-6 border-t border-white/80 pt-4 text-xs text-navy/60">Dados fictícios, apenas para demonstração.</p>
          </Tilt>
        </Reveal>
      </div>
    </section>
  )
}
