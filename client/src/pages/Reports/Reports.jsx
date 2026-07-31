import { useMemo } from 'react'
import { FiDownload, FiFileText } from 'react-icons/fi'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import ProjectStatusPie from '../../components/charts/ProjectStatusPie'
import MonthlyEarningsGraph from '../../components/charts/MonthlyEarningsGraph'
import Loader from '../../components/common/Loader'
import { useData } from '../../context/DataContext'
import { useToast } from '../../context/ToastContext'
import { projectStatusDistribution, paymentStatusDistribution, monthlyIncomeSeries, dashboardStats } from '../../data/dummyData'

export default function Reports() {
  const { loading } = useData()
  const { showToast } = useToast()
  const statusDist = useMemo(() => projectStatusDistribution(), [])
  const paymentDist = useMemo(() => paymentStatusDistribution(), [])
  const income = useMemo(() => monthlyIncomeSeries(), [])
  const stats = useMemo(() => dashboardStats(), [])

  if (loading) return <Loader full label="Building your reports…" />

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Reports</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Project and income distribution at a glance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={FiDownload} onClick={() => showToast('Exporting PDF is UI-only in this demo.', 'info')}>Export PDF</Button>
          <Button variant="secondary" icon={FiFileText} onClick={() => showToast('Exporting Excel is UI-only in this demo.', 'info')}>Export Excel</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Completed', value: stats.completed, color: 'text-emerald-500' },
          { label: 'Pending', value: stats.pending, color: 'text-orange-500' },
          { label: 'Active', value: stats.active, color: 'text-primary-600' },
          { label: 'Total Income', value: `₹${stats.totalIncome.toLocaleString('en-IN')}`, color: 'text-secondary-600' },
        ].map((s) => (
          <Card key={s.label} hover={false} className="text-center">
            <p className={`font-mono text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card hover={false}>
          <h3 className="section-title mb-4">Project Distribution</h3>
          <ProjectStatusPie data={statusDist} />
        </Card>
        <Card hover={false}>
          <h3 className="section-title mb-4">Income Distribution</h3>
          <ProjectStatusPie data={paymentDist} />
        </Card>
      </div>

      <Card hover={false}>
        <h3 className="section-title mb-4">Completed vs Pending Earnings</h3>
        <MonthlyEarningsGraph data={income} />
      </Card>
    </div>
  )
}
