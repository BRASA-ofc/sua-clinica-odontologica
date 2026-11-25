import { motion } from 'framer-motion'
import { sections } from '../../data/clinic'
import { useActiveSection } from '../../hooks/useActiveSection'

export function SectionRail() {
  const active = useActiveSection()

  return (
    <nav className="glass fixed top-1/2 right-4 z-30 hidden -translate-y-1/2 flex-col gap-3 rounded-full p-2 lg:flex" aria-label="Progresso da página">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-label={section.label}
          aria-current={active === section.id ? 'true' : undefined}
          className="group relative grid h-4 w-4 place-items-center"
        >
          <span className="h-2 w-2 rounded-full bg-white/90 shadow-inner ring-1 ring-sky/40 transition-transform group-hover:scale-150" />
          {active === section.id ? (
            <motion.span layoutId="rail-orb" className="orb absolute inset-0" transition={{ type: 'spring', stiffness: 380, damping: 24 }} />
          ) : null}
          <span className="pointer-events-none absolute right-7 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold whitespace-nowrap text-navy opacity-0 shadow transition-opacity group-hover:opacity-100">
            {section.label}
          </span>
        </a>
      ))}
    </nav>
  )
}
