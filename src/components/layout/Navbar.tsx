import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { clinic, navLinks } from '../../data/clinic'

export function Navbar() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > 12
    setSolid((current) => (current === next ? current : next))
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
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-colors duration-300 ${
        solid || open
          ? 'border-b border-mist/80 bg-ice/90 backdrop-blur-md'
          : 'bg-ice/75 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#inicio" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 bg-white text-navy transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2.2c2.2 0 4.1 1.2 4.8 3.2.6 1.8.4 3.6.1 5.1-.2 1.1-.1 2 .5 2.8.6.7 1.6 1.2 1.6 2.5 0 1.9-1.6 4.5-3.2 4.5-.9 0-1.2-1-1.6-2-.4-.8-.8-1.2-1.2-1.2s-.8.4-1.2 1.2c-.4 1-.7 2-1.6 2-1.6 0-3.2-2.6-3.2-4.5 0-1.3 1-1.8 1.6-2.5.6-.8.7-1.7.5-2.8-.3-1.5-.5-3.3.1-5.1C7.9 3.4 9.8 2.2 12 2.2z"
              />
            </svg>
          </span>
          <span>
            <span className="block font-display text-[1.05rem] leading-none font-semibold tracking-tight text-navy">
              {clinic.shortName}
            </span>
            <span className="mt-1 block text-[10px] tracking-[0.22em] text-lagoon uppercase">
              Odontológica
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Seções">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-navy/75 transition-colors duration-200 hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white/70 text-navy md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open
        ? createPortal(
            <AnimatePresence>
              <motion.div
                className="fixed inset-0 z-[90] bg-[#f4f8fb] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex h-[4.5rem] items-center justify-between px-5">
                  <span className="font-display text-lg font-semibold text-navy">{clinic.shortName}</span>
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white text-navy"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Fechar menu</span>
                    <X size={18} />
                  </button>
                </div>
                <nav
                  id="menu-mobile"
                  className="flex h-[calc(100svh-4.5rem)] flex-col justify-between px-6 pt-6 pb-12"
                  aria-label="Seções"
                >
                  <ul className="space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * index }}
                      >
                        <a
                          href={`#${link.id}`}
                          className="block border-b border-mist py-4 font-display text-4xl font-semibold tracking-tight text-navy"
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                  <p className="max-w-xs text-sm leading-relaxed text-navy/60">{clinic.disclaimer}</p>
                </nav>
              </motion.div>
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  )
}
