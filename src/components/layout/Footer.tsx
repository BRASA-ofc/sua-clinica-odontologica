import { clinic, navLinks, services } from '../../data/clinic'
import { Reveal } from '../ui/Reveal'

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-petrol text-ice">
      <svg
        className="wave-sheet wave-sheet-a pointer-events-none absolute inset-0 h-full w-[140%] opacity-30"
        viewBox="0 0 1600 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-120 220 C 180 80, 460 340, 780 160 S 1240 40, 1760 240"
          fill="none"
          stroke="#8fd0e8"
          strokeWidth="40"
          strokeLinecap="round"
        />
      </svg>
      <div className="pointer-events-none absolute -top-16 right-0 font-display text-[18vw] leading-none font-semibold tracking-tight text-white/[0.04]">
        sorriso
      </div>
      <Reveal className="mx-auto max-w-6xl px-5 pt-20 pb-28 md:px-8">
        <p className="text-xs tracking-[0.28em] text-cyan uppercase">Encerramento</p>
        <p className="mt-4 max-w-xl font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl">
          Seu sorriso merece cuidado.
        </p>
        <div className="mt-14 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-2xl font-semibold">{clinic.name}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ice/70">{clinic.disclaimer}</p>
            <a href="#contato" className="btn btn-light mt-6 w-fit px-4 py-3 text-sm">
              Falar com a clínica
            </a>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.22em] text-cyan uppercase">Navegar</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-ice/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs tracking-[0.22em] text-cyan uppercase">Cuidados</p>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#tratamentos"
                    className="text-sm text-ice/80 transition-colors hover:text-white"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs tracking-[0.22em] text-cyan uppercase">Visita ilustrativa</p>
            <p className="mt-4 text-sm text-ice/85">{clinic.address.line}</p>
            <p className="text-sm text-ice/85">{clinic.address.city}</p>
            <p className="mt-2 text-xs text-ice/55">{clinic.address.note}</p>
            <ul className="mt-5 space-y-1 text-sm text-ice/85">
              {clinic.hours.map((item) => (
                <li key={item.days}>
                  {item.days} · {item.time}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-ice/55">{clinic.hoursNote}</p>
            <p className="mt-5 text-sm">{clinic.phoneDisplay}</p>
            <p className="text-xs text-ice/55">{clinic.phoneNote}</p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 pr-20 text-xs text-ice/50">
          <p>Portfólio fictício · sem atendimento real</p>
        </div>
      </Reveal>
    </footer>
  )
}
