import { motion } from 'framer-motion'
import { classNames } from '../../utils/formatters'

export default function ProgressBar({ value = 0, showLabel = true, className, colorClass }) {
  const color = colorClass || (value >= 100 ? 'bg-accent-500' : value >= 50 ? 'bg-primary-500' : 'bg-warning')
  return (
    <div className={classNames('w-full', className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700/60">
        <motion.div
          className={classNames('h-full rounded-full', color)}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      {showLabel && <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{value}% complete</p>}
    </div>
  )
}
