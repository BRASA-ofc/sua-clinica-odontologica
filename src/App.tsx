import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ChatPage } from './pages/ChatPage'
import { Home } from './pages/Home'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

const ease = [0.22, 1, 0.36, 1] as const

export default function App() {
  const location = useLocation()
  const paused = usePrefersReducedMotion()
  const known = location.pathname === '/' || location.pathname === '/conversa'
  const chatOpen = location.pathname === '/conversa'

  useEffect(() => {
    document.title = chatOpen
      ? 'Conversa · Sua Clínica Odontológica'
      : 'Sua Clínica Odontológica'
  }, [chatOpen])

  useEffect(() => {
    if (!chatOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [chatOpen])

  if (!known) return <Navigate to="/" replace />

  return (
    <MotionConfig reducedMotion={paused ? 'always' : 'never'}>
      <div inert={chatOpen ? true : undefined} aria-hidden={chatOpen}>
        <Home />
      </div>
      <AnimatePresence>
        {chatOpen ? (
          <motion.div
            key="conversa"
            className="aero-sky fixed inset-0 z-[80]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="mx-auto flex h-full w-full max-w-md flex-col md:py-6">
              <p className="hidden px-2 pb-3 text-center text-xs font-bold tracking-[0.18em] text-navy/70 uppercase md:block">
                Simulação de conversa
              </p>
              <div className="min-h-0 flex-1 overflow-hidden md:rounded-[1.6rem] md:border md:border-white/80 md:shadow-[0_30px_80px_rgba(10,70,130,0.3)]">
                <ChatPage />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  )
}
