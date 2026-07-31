import { useMemo, useState } from 'react'
import { FiDollarSign, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi'
import { useData } from '../../context/DataContext'
import PaymentCard from '../../components/cards/PaymentCard'
import PaymentsTable from '../../components/tables/PaymentsTable'
import SearchBar from '../../components/common/SearchBar'
import Loader from '../../components/common/Loader'

export default function Payments() {
  const { projects, loading } = useData()
  const [search, setSearch] = useState('')

  const stats = useMemo(() => {
    const totalIncome = projects.reduce((s, p) => s + p.receivedAmount, 0)
    const pending = projects.reduce((s, p) => s + p.remainingAmount, 0)
    const avg = projects.length ? Math.round(projects.reduce((s, p) => s + p.budget, 0) / projects.length) : 0
    return { totalIncome, paid: totalIncome, pending, avg }
  }, [projects])

  const filtered = useMemo(() => {
    if (!search) return projects
    const q = search.toLowerCase()
    return projects.filter((p) => p.name.toLowerCase().includes(q) || p.clientName.toLowerCase().includes(q))
  }, [projects, search])

  if (loading) return <Loader full label="Loading payments…" />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Payments</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Track budgets, received amounts and outstanding balances.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PaymentCard label="Total Income" value={stats.totalIncome} icon={FiDollarSign} tone="primary" />
        <PaymentCard label="Paid Amount" value={stats.paid} icon={FiCheckCircle} tone="accent" />
        <PaymentCard label="Pending Amount" value={stats.pending} icon={FiClock} tone="warning" />
        <PaymentCard label="Avg. Project Value" value={stats.avg} icon={FiTrendingUp} tone="danger" />
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search by project or client…" className="max-w-sm" />

      <PaymentsTable projects={filtered} />
    </div>
  )
}
