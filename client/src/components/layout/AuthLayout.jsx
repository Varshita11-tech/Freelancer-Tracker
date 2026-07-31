import { motion } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface-light px-4 py-10 dark:bg-surface-dark">
      {/* ambient gradient blobs — signature element */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-400/30 blur-3xl animate-blob" />
        <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-secondary-400/30 blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass relative z-10 w-full max-w-md rounded-3xl p-8 shadow-glow sm:p-10"
      >
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-card">
            <FiBriefcase size={22} />
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {children}
      </motion.div>
    </div>
  )
}
