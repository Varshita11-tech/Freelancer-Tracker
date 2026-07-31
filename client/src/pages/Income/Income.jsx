import { useMemo } from 'react'
import { FiUsers } from 'react-icons/fi'
import Card from '../../components/common/Card'
import IncomeChart from '../../components/charts/IncomeChart'
import YearlyIncomeChart from '../../components/charts/YearlyIncomeChart'
import IncomeCard from '../../components/cards/IncomeCard'
import RatingStars from '../../components/common/RatingStars'
import Loader from '../../components/common/Loader'
import { useData } from '../../context/DataContext'
import { monthlyIncomeSeries, yearlyIncomeSeries, topClients, recentPayments } from '../../data/dummyData'
import { formatCurrency, initials } from '../../utils/formatters'

export default function Income() {
  const { loading } = useData()
  const monthly = useMemo(() => monthlyIncomeSeries(), [])
  const yearly = useMemo(() => yearlyIncomeSeries(), [])
  const clients = useMemo(() => topClients(), [])
  const payments = useMemo(() => recentPayments(), [])

  const growth = useMemo(() => {
    const last = yearly[yearly.length - 1]?.income || 0
    const prev = yearly[yearly.length - 2]?.income || 1
    return (((last - prev) / prev) * 100).toFixed(1)
  }, [yearly])

  if (loading) return <Loader full label="Loading income data…" />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Income</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Monthly and yearly earnings, top clients and recent payments.</p>
      </div>

      <Card hover={false}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="section-title">Monthly Income</h3>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${growth >= 0 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 'bg-red-50 text-red-600 dark:bg-red-500/10'}`}>
            Revenue growth: {growth >= 0 ? '+' : ''}{growth}%
          </span>
        </div>
        <IncomeChart data={monthly} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card hover={false}>
          <h3 className="section-title mb-4">Yearly Income</h3>
          <YearlyIncomeChart data={yearly} />
        </Card>

        <Card hover={false}>
          <div className="mb-4 flex items-center gap-2">
            <FiUsers className="text-primary-600" size={18} />
            <h3 className="section-title">Top Clients</h3>
          </div>
          <div className="space-y-4">
            {clients.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="w-5 text-sm font-bold text-slate-300 dark:text-slate-600">{i + 1}</span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${c.avatarColor}`}>{initials(c.name)}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.name}</p>
                  <RatingStars rating={c.rating} size={11} />
                </div>
                <p className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200">{formatCurrency(c.totalPaid)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h3 className="section-title mb-4">Recent Payments</h3>
        <div className="space-y-3">
          {payments.map((p) => <IncomeCard key={p.id} payment={p} />)}
        </div>
      </div>
    </div>
  )
}
