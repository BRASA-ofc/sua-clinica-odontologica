import { ArrowUpRight, Clock3, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clinic, contactCopy } from '../data/clinic'
import { Reveal } from '../components/ui/Reveal'

export function Contact() {
  return (
    <section id="contato" className="relative scroll-mt-28 overflow-hidden bg-white/50">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-0 font-display text-[16vw] leading-none font-semibold tracking-tight text-transparent"
        style={{ WebkitTextStroke: '1px rgba(18,38,46,0.12)' }}
      >
        cuidado
      </p>
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-28 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="text-[11px] tracking-[0.32em] text-lagoon uppercase">{contactCopy.kicker}</p>
          <h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-navy">
            {contactCopy.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy/70">{contactCopy.lead}</p>
          <Link to="/conversa" className="btn btn-solid group mt-8">
            {contactCopy.action}
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-[1.8rem] border border-mist bg-ice p-7">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0 text-lagoon" size={18} aria-hidden="true" />
              <div>
                <p className="text-navy">{clinic.address.line}</p>
                <p className="text-navy">{clinic.address.city}</p>
                <p className="mt-2 text-xs text-navy/55">{clinic.address.note}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3 border-t border-mist pt-6">
              <Clock3 className="mt-0.5 shrink-0 text-lagoon" size={18} aria-hidden="true" />
              <div>
                <ul className="space-y-1 text-navy">
                  {clinic.hours.map((item) => (
                    <li key={item.days}>
                      {item.days}
                      <span className="text-navy/55"> · {item.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-navy/55">{clinic.hoursNote}</p>
              </div>
            </div>
            <div className="mt-6 border-t border-mist pt-6">
              <p className="font-display text-2xl font-semibold tracking-tight text-navy">
                {clinic.phoneDisplay}
              </p>
              <p className="mt-1 text-xs text-navy/55">{clinic.phoneNote}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
