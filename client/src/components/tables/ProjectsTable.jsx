import { Link } from 'react-router-dom'
import { FiEye, FiTrash2 } from 'react-icons/fi'
import Badge from '../common/Badge'
import ProgressBar from '../common/ProgressBar'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function ProjectsTable({ projects, onEdit, onDelete }) {
  return (
    <div className="card-base overflow-x-auto p-0">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400 dark:border-slate-800">
            <th className="px-5 py-3.5">Project</th>
            <th className="px-5 py-3.5">Client</th>
            <th className="px-5 py-3.5">Deadline</th>
            <th className="px-5 py-3.5">Budget</th>
            <th className="px-5 py-3.5">Progress</th>
            <th className="px-5 py-3.5">Status</th>
            <th className="px-5 py-3.5">Payment</th>
            <th className="px-5 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {projects.map((p) => (
            <tr key={p.id} className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
              <td className="px-5 py-4">
                <p className="font-semibold text-slate-700 dark:text-slate-200">{p.name}</p>
                <p className="text-xs text-slate-400">{p.category}</p>
              </td>
              <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{p.clientName}</td>
              <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{formatDate(p.deadline)}</td>
              <td className="px-5 py-4 font-mono font-semibold text-slate-700 dark:text-slate-200">{formatCurrency(p.budget)}</td>
              <td className="px-5 py-4 w-36"><ProgressBar value={p.progress} showLabel={false} /></td>
              <td className="px-5 py-4"><Badge>{p.status}</Badge></td>
              <td className="px-5 py-4"><Badge>{p.paymentStatus}</Badge></td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-1.5">
                  <Link to={`/projects/${p.id}`} className="btn-ghost h-8 w-8 !p-0"><FiEye size={14} /></Link>
                  <button onClick={() => onDelete(p)} className="btn-ghost h-8 w-8 !p-0 text-danger"><FiTrash2 size={14} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
