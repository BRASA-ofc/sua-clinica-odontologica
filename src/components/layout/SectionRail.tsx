import { useEffect, useState } from 'react'
import { sections } from '../../data/clinic'

export function SectionRail() {
  const [active, setActive] = useState<string>('inicio')

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.4] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="fixed top-1/2 right-4 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      aria-label="Progresso da página"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-label={section.label}
          aria-current={active === section.id ? 'true' : undefined}
          className={`block h-2 w-2 rounded-full transition-all duration-300 ${
            active === section.id ? 'scale-150 bg-lagoon' : 'bg-silver hover:bg-navy'
          }`}
        />
      ))}
    </nav>
  )
}
