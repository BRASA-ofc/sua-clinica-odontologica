import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Pause, Play, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { clinic, navLinks } from '../../data/clinic'
import { useActiveSection } from '../../hooks/useActiveSection'
import { setMotionPaused, usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function Logo() {
  return (
    <span className="orb grid h-10 w-10 place-items-center text-white transition-transform duration-500 group-hover:rotate-[360deg]">
      <svg viewBox="0 0 24 24" className="h-5 w-5 drop-shadow" aria-hidden="true">
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
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const active = useActiveSection()
  const paused = usePrefersReducedMotion()

  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > 40
    setCompact((current) => (current === next ? current : next))
    // some ao descer e volta ao subir
    const previous = scrollY.getPrevious() ?? 0
    const goingDown = value > previous + 4 && value > 280
    const goingUp = value < previous - 4
    if (goingDown) setHidden(true)
    else if (goingUp || value < 120) setHidden(false)
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

  const highlight = hovered ?? active

  return (
    <header className="fixed top-0 right-0 left-0 z-40 px-3 pt-3 md:px-6">
      <motion.div
        className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 md:px-4"
        initial={{ y: -90 }}
        animate={{ height: compact ? 58 : 68, y: hidden && !open ? -100 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        <a href="#inicio" className="group flex items-center gap-3">
          <Logo />
          <span>
            <span className="block font-display text-[1.1rem] leading-none font-black text-navy">{clinic.shortName}</span>
            <span className="mt-0.5 block text-[10px] font-extrabold tracking-[0.2em] text-lagoon uppercase">Odontológica</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Seções" onPointerLeave={() => setHovered(null)}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onPointerEnter={() => setHovered(link.id)}
              aria-current={active === link.id ? 'true' : undefined}
              className="relative rounded-full px-4 py-2 font-display text-sm font-extrabold text-navy/80 transition-colors hover:text-navy"
            >
              {highlight === link.id ? (
                <motion.span
                  layoutId="nav-bubble"
                  className="btn-ghost absolute inset-0 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              ) : null}
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMotionPaused(!paused)}
          aria-pressed={paused}
          title={paused ? 'Retomar animações' : 'Pausar animações'}
          className="btn-ghost grid h-10 w-10 place-items-center rounded-full text-navy transition-transform hover:scale-110"
        >
          <span className="sr-only">{paused ? 'Retomar animações' : 'Pausar animações'}</span>
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        </button>
        <button
          type="button"
          className="btn-ghost grid h-11 w-11 place-items-center rounded-full text-navy md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
        </div>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              key="menu"
              className="aero-sky fixed inset-0 z-[90] md:hidden"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex h-[5rem] items-center justify-between px-5">
                <span className="font-display text-xl font-black text-navy">{clinic.shortName}</span>
                <button
                  type="button"
                  className="btn-ghost grid h-11 w-11 place-items-center rounded-full text-navy"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Fechar menu</span>
                  <X size={18} />
                </button>
              </div>
              <nav id="menu-mobile" className="flex h-[calc(100svh-5rem)] flex-col justify-between px-5 pt-4 pb-10" aria-label="Seções">
                <ul className="space-y-3">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -30, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.05 * index }}
                    >
                      <a
                        href={`#${link.id}`}
                        className="glass block rounded-3xl px-6 py-4 font-display text-3xl font-black text-navy"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <p className="glass max-w-xs rounded-2xl p-4 text-sm leading-relaxed text-navy/75">{clinic.disclaimer}</p>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  )
}
