import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { WhatsAppIcon } from '../icons/WhatsAppIcon'

export function WhatsAppButton() {
  return (
    <motion.div
      className="fixed right-4 bottom-4 z-40 md:right-6 md:bottom-6"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 14 }}
    >
      <Link to="/conversa" className="group flex items-center gap-3" aria-label="Vamos conversar? Abrir a simulação de conversa">
        <span className="glass hidden rounded-full px-4 py-2 text-sm font-bold text-navy transition-transform duration-300 group-hover:-translate-x-1 md:inline">
          Vamos conversar?
        </span>
        <span className="relative grid h-16 w-16 place-items-center">
          <span className="pulse-ring absolute inset-0 rounded-full bg-mint/60" aria-hidden="true" />
          <span className="orb orb-green float-a relative grid h-16 w-16 place-items-center text-white transition-transform duration-300 group-hover:scale-110">
            <WhatsAppIcon />
          </span>
        </span>
      </Link>
    </motion.div>
  )
}
