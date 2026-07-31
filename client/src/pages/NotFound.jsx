import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-light px-4 text-center dark:bg-surface-dark">
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-8xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">404</motion.p>
      <h1 className="font-display text-xl font-bold text-slate-800 dark:text-white">Page not found</h1>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">The page you're looking for doesn't exist or may have been moved.</p>
      <Link to="/dashboard" className="btn-primary mt-2 gap-1.5"><FiHome size={15} /> Back to Dashboard</Link>
    </div>
  )
}
