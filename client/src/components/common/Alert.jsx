import { FiAlertTriangle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { classNames } from '../../utils/formatters'

const STYLES = {
  success: { icon: FiCheckCircle, cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20' },
  error: { icon: FiXCircle, cls: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20' },
  warning: { icon: FiAlertTriangle, cls: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20' },
  info: { icon: FiInfo, cls: 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/20' },
}

export default function Alert({ type = 'info', children, className }) {
  const { icon: Icon, cls } = STYLES[type]
  return (
    <div className={classNames('flex items-start gap-2.5 rounded-xl border p-3.5 text-sm font-medium', cls, className)}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  )
}
