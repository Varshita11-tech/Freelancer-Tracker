import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../common/Card'
import { classNames } from '../../utils/formatters'

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = null
    let raf
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

export default function StatCard({ label, value, icon: Icon, prefix = '', suffix = '', tone = 'primary', trend }) {
  const numeric = typeof value === 'number'
  const animated = useCountUp(numeric ? value : 0)

  const tones = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    accent: 'from-accent-500 to-accent-600',
    warning: 'from-orange-400 to-orange-500',
    danger: 'from-red-400 to-red-500',
  }

  return (
    <Card className="relative overflow-hidden">
      <div className={classNames('absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-10', tones[tone])} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-2 font-mono text-2xl font-bold text-slate-800 dark:text-white">
            {prefix}{numeric ? animated.toLocaleString() : value}{suffix}
          </p>
          {trend && (
            <p className={classNames('mt-1 text-xs font-semibold', trend > 0 ? 'text-emerald-500' : 'text-red-500')}>
              {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}% vs last month
            </p>
          )}
        </div>
        {Icon && (
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            className={classNames('flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-card', tones[tone])}
          >
            <Icon size={20} />
          </motion.div>
        )}
      </div>
    </Card>
  )
}
