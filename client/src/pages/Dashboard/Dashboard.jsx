import { useMemo } from 'react'
import {
  FiFolder, FiCheckCircle, FiLoader, FiClock, FiDollarSign, FiAlertCircle,
  FiTrendingUp, FiCalendar, FiActivity,
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import StatCard from '../../components/cards/StatCard'
import ProgressCard from '../../components/cards/ProgressCard'
import Card from '../../components/common/Card'
import Loader from '../../components/common/Loader'
import IncomeChart from '../../components/charts/IncomeChart'
import ProjectStatusPie from '../../components/charts/ProjectStatusPie'
import MonthlyEarningsGraph from '../../components/charts/MonthlyEarningsGraph'
import { formatDate } from '../../utils/formatters'
export default function Dashboard() {
  const { user } = useAuth()
  const { projects, loading } = useData()

  const stats = useMemo(() => {
    const totalProjects = projects.length
    const completed = projects.filter(p => p.status === 'Completed').length
    const active = projects.filter(p => p.status === 'Active').length
    const pending = projects.filter(p => p.status === 'Pending').length
    const paid = projects.filter(p => p.budget > 0 && (Number(p.receivedAmount) || 0) >= (Number(p.budget) || 0)).length
    const unpaid = totalProjects - paid
    const totalIncome = projects.reduce((sum, p) => sum + (Number(p.receivedAmount) || 0), 0)
    const pendingIncome = projects.reduce((sum, p) => sum + Math.max(0, (Number(p.budget) || 0) - (Number(p.receivedAmount) || 0)), 0)

    return { totalProjects, completed, active, pending, paid, unpaid, totalIncome, pendingIncome }
  }, [projects])

  const deadlines = useMemo(() => {
    return [...projects]
      .filter(p => p.status !== 'Completed' && p.deadline)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 5)
  }, [projects])

  const activity = useMemo(() => {
    return projects
      .flatMap(p => (p.activity || []).map(a => ({ ...a, projectId: p._id || p.id, projectName: p.name })))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10)
  }, [projects])

  const statusDist = useMemo(() => {
    return [
      { name: 'Active', value: stats.active, color: '#3b82f6' },
      { name: 'Completed', value: stats.completed, color: '#10b981' },
      { name: 'Pending', value: stats.pending, color: '#f59e0b' }
    ]
  }, [stats])

  const incomeSeries = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = months.map(month => ({ month, income: 0, expenses: 0 }))
    
    projects.forEach(p => {
      if (p.paymentTimeline) {
        p.paymentTimeline.forEach(payment => {
          const date = new Date(payment.date)
          if (date.getFullYear() === new Date().getFullYear()) {
            data[date.getMonth()].income += Number(payment.amount) || 0
          }
        })
      }
    })
    return data
  }, [projects])

  if (loading) return <Loader full label="Preparing your dashboard…" />

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Welcome, {user?.name?.toLowerCase().includes('varshita') ? 'Varshita' : user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Here's what's happening across your projects today.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        <StatCard label="Total Projects" value={stats.totalProjects} icon={FiFolder} tone="primary" />
        <StatCard label="Completed" value={stats.completed} icon={FiCheckCircle} tone="accent" />
        <StatCard label="Active" value={stats.active} icon={FiLoader} tone="secondary" />
        <StatCard label="Pending" value={stats.pending} icon={FiClock} tone="warning" />
        <StatCard label="Paid Projects" value={stats.paid} icon={FiCheckCircle} tone="accent" />
        <StatCard label="Unpaid Projects" value={stats.unpaid} icon={FiAlertCircle} tone="danger" />
        <StatCard label="Total Income" value={stats.totalIncome} prefix="₹" icon={FiDollarSign} tone="primary" />
        <StatCard label="Pending Income" value={stats.pendingIncome} prefix="₹" icon={FiTrendingUp} tone="warning" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="section-title">Income Overview</h3>
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600 dark:bg-primary-500/10">This year</span>
          </div>
          <IncomeChart data={incomeSeries} />
        </Card>
        <Card>
          <h3 className="section-title mb-4">Project Status</h3>
          <ProjectStatusPie data={statusDist} />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h3 className="section-title mb-4">Monthly Earnings</h3>
          <MonthlyEarningsGraph data={incomeSeries} />
        </Card>

        <Card hover={false}>
          <div className="mb-4 flex items-center gap-2">
            <FiCalendar className="text-primary-600" size={18} />
            <h3 className="section-title">Upcoming Deadlines</h3>
          </div>
          <div className="space-y-3">
            {deadlines.map((p) => <ProgressCard key={p.id} project={p} />)}
          </div>
        </Card>
      </div>

      <Card hover={false}>
        <div className="mb-4 flex items-center gap-2">
          <FiActivity className="text-secondary-600" size={18} />
          <h3 className="section-title">Recent Activity</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {activity.map((a) => (
            <div key={`${a.projectId}-${a.id}`} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-200">{a.text}</p>
                <p className="text-xs text-slate-400">{a.projectName}</p>
              </div>
              <span className="text-xs text-slate-400">{formatDate(a.date)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
