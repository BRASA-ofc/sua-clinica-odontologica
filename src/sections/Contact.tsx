import { ArrowRight, Clock3, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clinic, contactCopy } from '../data/clinic'
import { Reveal } from '../components/ui/Reveal'

export function Contact() {
  return (
    <section id="contato" className="relative scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#0f4c78] via-navy to-[#082338] p-8 text-white md:p-12">
            {/* brilho Aero no topo e bolhas */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" aria-hidden="true" />
            <div className="soap float-a pointer-events-none absolute -top-6 right-16 h-24 w-24 opacity-60" aria-hidden="true" />
            <div className="soap float-c pointer-events-none absolute right-6 bottom-10 h-10 w-10 opacity-50" aria-hidden="true" />

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="kicker bg-white/10 text-cyan">{contactCopy.kicker}</span>
                <h2 className="mt-4 font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.08] font-medium">{contactCopy.title}</h2>
                <p className="mt-4 max-w-md text-white/70">{contactCopy.lead}</p>
                <Link to="/conversa" className="btn btn-light group mt-8">
                  {contactCopy.action}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-1">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-cyan">
                    <MapPin size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold">{clinic.address.line}</span>
                    <span className="text-white/65">{clinic.address.city}</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-cyan">
                    <Clock3 size={18} aria-hidden="true" />
                  </span>
                  <span>
                    {clinic.hours.map((item) => (
                      <span key={item.days} className="block">
                        <span className="font-bold">{item.days}</span> <span className="text-white/65">· {item.time}</span>
                      </span>
                    ))}
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-cyan">
                    <Phone size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold">{clinic.phoneDisplay}</span>
                    <span className="text-white/65">Dados fictícios, apenas para demonstração.</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
