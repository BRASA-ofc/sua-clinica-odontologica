import { clinic, navLinks, services } from '../../data/clinic'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-navy/5 bg-white/70 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="font-serif text-2xl font-medium text-navy">{clinic.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-navy/60">{clinic.disclaimer}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs font-extrabold tracking-[0.14em] text-sky uppercase">Navegar</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-sm text-navy/70 transition-colors hover:text-navy">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs font-extrabold tracking-[0.14em] text-sky uppercase">Tratamentos</p>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.id}>
                <a href="#tratamentos" className="text-sm text-navy/70 transition-colors hover:text-navy">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-extrabold tracking-[0.14em] text-sky uppercase">Contato</p>
          <p className="mt-4 text-sm text-navy/70">{clinic.address.line}</p>
          <p className="text-sm text-navy/70">{clinic.address.city}</p>
          <p className="mt-3 text-sm text-navy/70">{clinic.phoneDisplay}</p>
        </div>
      </div>
      <div className="border-t border-navy/5">
        <p className="mx-auto max-w-6xl px-5 py-5 pr-24 text-xs text-navy/50 md:px-8">
          Portfólio fictício · sem atendimento real · fotos ilustrativas
        </p>
      </div>
    </footer>
  )
}
