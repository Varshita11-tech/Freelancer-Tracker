import { classNames } from '../../utils/formatters'

const STATUS_STYLES = {
  // Project status
  Pending: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300',
  'In Progress': 'bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300',
  Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  // Payment status
  Paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  'Partially Paid': 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Unpaid: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  // Priority
  Low: 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300',
  Medium: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-500/15 dark:text-secondary-300',
  High: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
}

export default function Badge({ children, className }) {
  const style = STATUS_STYLES[children] || 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300'
  return (
    <span className={classNames('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap', style, className)}>
      {children}
    </span>
  )
}
