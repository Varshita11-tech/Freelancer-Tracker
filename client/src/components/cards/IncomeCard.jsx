import Card from '../common/Card'
import { formatCurrency, formatDate, initials } from '../../utils/formatters'
import Badge from '../common/Badge'

export default function IncomeCard({ payment }) {
  return (
    <Card className="flex items-center justify-between gap-4" hover={false}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-primary-500 text-xs font-bold text-white">
          {initials(payment.clientName)}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{payment.clientName}</p>
          <p className="text-xs text-slate-400">{payment.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono text-sm font-bold text-emerald-500">+{formatCurrency(payment.receivedAmount)}</p>
        <p className="text-xs text-slate-400">{formatDate(payment.startDate)}</p>
      </div>
      <Badge>{payment.paymentStatus}</Badge>
    </Card>
  )
}
