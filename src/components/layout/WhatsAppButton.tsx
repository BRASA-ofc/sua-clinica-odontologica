import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { WhatsAppIcon } from '../icons/WhatsAppIcon'

export function WhatsAppButton() {
  return (
    <motion.div
      className="fixed right-4 bottom-4 z-40 md:right-6 md:bottom-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/conversa"
        className="group flex items-center gap-3"
        aria-label="Vamos conversar? Abrir a simulação de conversa"
      >
        <span className="hidden rounded-full border border-white/50 bg-white/90 px-4 py-2 text-sm text-navy shadow-[0_10px_30px_rgba(12,44,56,0.08)] backdrop-blur-md transition-transform duration-300 group-hover:-translate-x-1 md:inline">
          Vamos conversar?
        </span>
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#128C7E] text-white shadow-[0_14px_30px_rgba(18,140,126,0.35)] transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105">
          <WhatsAppIcon />
        </span>
      </Link>
    </motion.div>
  )
}
