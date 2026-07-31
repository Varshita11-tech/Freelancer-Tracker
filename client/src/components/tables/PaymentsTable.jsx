import { FiFileText } from 'react-icons/fi'
import Badge from '../common/Badge'
import { formatCurrency } from '../../utils/formatters'
import { useToast } from '../../context/ToastContext'

export default function PaymentsTable({ projects }) {
  const { showToast } = useToast()
  return (
    <div className="card-base overflow-x-auto p-0">
      <table className="w-full min-w-[860px] text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400 dark:border-slate-800">
            <th className="px-5 py-3.5">Project</th>
            <th className="px-5 py-3.5">Client</th>
            <th className="px-5 py-3.5">Budget</th>
            <th className="px-5 py-3.5">Received</th>
            <th className="px-5 py-3.5">Remaining</th>
            <th className="px-5 py-3.5">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {projects.map((p) => (
            <tr key={p.id} className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
              <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-200">{p.name}</td>
              <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{p.clientName}</td>
              <td className="px-5 py-4 font-mono text-slate-600 dark:text-slate-300">{formatCurrency(p.budget)}</td>
              <td className="px-5 py-4 font-mono font-semibold text-emerald-600">{formatCurrency(p.receivedAmount)}</td>
              <td className="px-5 py-4 font-mono font-semibold text-orange-500">{formatCurrency(p.remainingAmount)}</td>
              <td className="px-5 py-4"><Badge>{p.paymentStatus}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
