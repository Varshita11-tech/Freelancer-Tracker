import { motion } from 'framer-motion'

export default function Loader({ full = false, label = 'Loading…' }) {
  return (
    <div className={full ? 'flex h-[60vh] w-full flex-col items-center justify-center gap-3' : 'flex flex-col items-center justify-center gap-3 py-10'}>
      <div className="relative h-12 w-12">
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-primary-200 dark:border-primary-900"
        />
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 border-r-secondary-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
        />
      </div>
      <p className="text-sm font-medium text-slate-400">{label}</p>
    </div>
  )
}
