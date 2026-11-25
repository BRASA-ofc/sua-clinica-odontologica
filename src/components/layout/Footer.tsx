import { clinic, navLinks, services } from '../../data/clinic'
import { Reveal } from '../ui/Reveal'

export function Footer() {
  return (
    <footer className="relative z-10 mt-10 overflow-hidden text-white">
      {/* onda de água no topo */}
      <svg className="block h-20 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="animate-[aurora-drift_10s_ease-in-out_infinite_alternate]"
          d="M0 40 C 240 0, 480 80, 720 40 S 1200 0, 1440 40 L 1440 80 L 0 80 Z"
          fill="#0a6fb0"
          opacity="0.5"
        />
        <path d="M0 50 C 300 15, 560 85, 820 45 S 1260 20, 1440 55 L 1440 80 L 0 80 Z" fill="#075a94" />
      </svg>
      <div className="relative bg-gradient-to-b from-[#075a94] to-[#043a63]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />
        <Reveal className="relative mx-auto max-w-6xl px-5 pt-10 pb-24 md:px-8">
          <p className="font-display text-4xl leading-[1.05] font-black md:text-5xl">
            Seu sorriso merece <span className="text-cyan">brilhar.</span>
          </p>
          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-display text-2xl font-black">{clinic.name}</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">{clinic.disclaimer}</p>
              <a href="#contato" className="btn btn-light mt-6 w-fit px-5 py-3 text-sm">
                Falar com a clínica
              </a>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-extrabold tracking-[0.2em] text-cyan uppercase">Navegar</p>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} className="text-sm text-white/80 transition hover:pl-1 hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <p className="text-xs font-extrabold tracking-[0.2em] text-cyan uppercase">Cuidados</p>
              <ul className="mt-4 space-y-2">
                {services.map((service) => (
                  <li key={service.id}>
                    <a href="#tratamentos" className="text-sm text-white/80 transition hover:pl-1 hover:text-white">
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <p className="text-xs font-extrabold tracking-[0.2em] text-cyan uppercase">Visita ilustrativa</p>
              <p className="mt-4 text-sm text-white/85">{clinic.address.line}</p>
              <p className="text-sm text-white/85">{clinic.address.city}</p>
              <p className="mt-1 text-xs text-white/55">{clinic.address.note}</p>
              <ul className="mt-4 space-y-1 text-sm text-white/85">
                {clinic.hours.map((item) => (
                  <li key={item.days}>
                    {item.days} · {item.time}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm">{clinic.phoneDisplay}</p>
              <p className="text-xs text-white/55">{clinic.phoneNote}</p>
            </div>
          </div>
          <div className="mt-12 space-y-1 border-t border-white/15 pt-6 pr-20 text-xs text-white/55">
            <p>Portfólio fictício · sem atendimento real</p>
            <p>
              Modelo 3D baseado em{' '}
              <a
                className="underline hover:text-white"
                href="https://sketchfab.com/3d-models/dental-arches-a17fda74c85344709624e9e39a6634b6"
                target="_blank"
                rel="noreferrer"
              >
                “Dental arches”
              </a>
              , de{' '}
              <a className="underline hover:text-white" href="https://sketchfab.com/Lydran96" target="_blank" rel="noreferrer">
                Lydran96
              </a>
              , licença{' '}
              <a className="underline hover:text-white" href="https://creativecommons.org/licenses/by/4.0/deed.pt-br" target="_blank" rel="noreferrer">
                CC BY 4.0
              </a>{' '}
              (dentes realinhados; gengiva e base criadas para este projeto).
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
