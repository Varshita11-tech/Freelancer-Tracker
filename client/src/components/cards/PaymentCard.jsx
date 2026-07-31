import Card from '../common/Card'
import { formatCurrency } from '../../utils/formatters'

export default function PaymentCard({ label, value, icon: Icon, tone = 'primary' }) {
  const tones = {
    primary: 'text-primary-600 bg-primary-50 dark:bg-primary-500/10',
    accent: 'text-accent-600 bg-accent-50 dark:bg-accent-500/10',
    warning: 'text-orange-500 bg-orange-50 dark:bg-orange-500/10',
    danger: 'text-danger bg-red-50 dark:bg-red-500/10',
  }
  return (
    <Card className="flex items-center gap-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-1 font-mono text-xl font-bold text-slate-800 dark:text-white">{formatCurrency(value)}</p>
      </div>
    </Card>
  )
}
