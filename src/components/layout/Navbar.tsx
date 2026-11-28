import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Pause, Play, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { clinic, navLinks } from '../../data/clinic'
import { useActiveSection } from '../../hooks/useActiveSection'
import { setMotionPaused, usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function Logo() {
  return (
    <span className="orb grid h-9 w-9 place-items-center text-white transition-transform duration-500 group-hover:rotate-[360deg]">
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.2c2.2 0 4.1 1.2 4.8 3.2.6 1.8.4 3.6.1 5.1-.2 1.1-.1 2 .5 2.8.6.7 1.6 1.2 1.6 2.5 0 1.9-1.6 4.5-3.2 4.5-.9 0-1.2-1-1.6-2-.4-.8-.8-1.2-1.2-1.2s-.8.4-1.2 1.2c-.4 1-.7 2-1.6 2-1.6 0-3.2-2.6-3.2-4.5 0-1.3 1-1.8 1.6-2.5.6-.8.7-1.7.5-2.8-.3-1.5-.5-3.3.1-5.1C7.9 3.4 9.8 2.2 12 2.2z"
        />
      </svg>
    </span>
  )
}

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const paused = usePrefersReducedMotion()

  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > 24
    setScrolled((current) => (current === next ? current : next))
  })

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="fixed top-0 right-0 left-0 z-40">
      {/* aviso de portfólio */}
      <p className="bg-navy px-4 py-1.5 text-center text-[11px] font-bold tracking-[0.08em] text-white/85 uppercase">
        <span className="hidden sm:inline">{clinic.portfolioNote}</span>
        <span className="sm:hidden">Portfólio · clínica fictícia</span>
      </p>
      <div
        className={`transition-all duration-500 ${
          scrolled ? 'border-b border-navy/5 bg-white/80 shadow-[0_8px_30px_rgba(11,47,75,0.06)] backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          <a href="#inicio" className="group flex items-center gap-2.5">
            <Logo />
            <span className="font-serif text-xl font-medium text-navy">{clinic.shortName}</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Seções">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className="relative px-3 py-2 text-sm font-semibold text-navy/70 transition-colors hover:text-navy"
              >
                {link.label}
                {active === link.id ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute right-3 bottom-0.5 left-3 h-0.5 rounded-full bg-sky"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                ) : null}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMotionPaused(!paused)}
              aria-pressed={paused}
              title={paused ? 'Retomar animações' : 'Pausar animações'}
              className="grid h-9 w-9 place-items-center rounded-full text-navy/60 transition-colors hover:bg-navy/5 hover:text-navy"
            >
              <span className="sr-only">{paused ? 'Retomar animações' : 'Pausar animações'}</span>
              {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            </button>
            <Link to="/conversa" className="btn btn-solid hidden px-5 py-3 text-sm sm:inline-flex">
              Agendar
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-navy/10 bg-white/80 text-navy lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              key="menu"
              className="aero-sky fixed inset-0 z-[90] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex h-16 items-center justify-between px-5">
                <span className="font-serif text-xl font-medium text-navy">{clinic.shortName}</span>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full border border-navy/10 bg-white text-navy"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Fechar menu</span>
                  <X size={18} />
                </button>
              </div>
              <nav id="menu-mobile" className="flex h-[calc(100svh-4rem)] flex-col justify-between px-5 pt-6 pb-10" aria-label="Seções">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={`#${link.id}`}
                        className="block border-b border-navy/10 py-4 font-serif text-3xl font-medium text-navy"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div>
                  <Link to="/conversa" className="btn btn-solid w-full" onClick={() => setOpen(false)}>
                    Agendar avaliação
                  </Link>
                  <p className="mt-4 text-sm leading-relaxed text-navy/60">{clinic.disclaimer}</p>
                </div>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  )
}
