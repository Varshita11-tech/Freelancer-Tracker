import { Link } from 'react-router-dom'
import { FiCalendar, FiDollarSign, FiEye, FiTrash2 } from 'react-icons/fi'
import Card from '../common/Card'
import Badge from '../common/Badge'
import ProgressBar from '../common/ProgressBar'
import { formatCurrency, formatDate, initials } from '../../utils/formatters'

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-bold text-white">
            {initials(project.company)}
          </div>
          <div>
            <h4 className="line-clamp-1 font-display font-semibold text-slate-800 dark:text-white">{project.name}</h4>
            <p className="text-xs text-slate-400">{project.clientName} · {project.company}</p>
          </div>
        </div>
        <Badge>{project.priority}</Badge>
      </div>

      <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((t) => (
          <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-700/60 dark:text-slate-300">{t}</span>
        ))}
      </div>

      <ProgressBar value={project.progress} />

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1"><FiCalendar size={13} /> {formatDate(project.deadline)}</span>
        <span className="flex items-center gap-1 font-mono font-semibold text-slate-600 dark:text-slate-300"><FiDollarSign size={13} /> {formatCurrency(project.budget)}</span>
      </div>

      <div className="flex items-center gap-2">
        <Badge>{project.status}</Badge>
        <Badge>{project.paymentStatus}</Badge>
      </div>

      <div className="flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-700/60">
        <Link to={`/projects/${project.id}`} className="btn-ghost flex-1 !justify-center gap-1.5 border border-slate-200 dark:border-slate-700">
          <FiEye size={14} /> View
        </Link>

        <button onClick={() => onDelete(project)} className="btn-ghost h-9 w-9 !p-0 border border-slate-200 text-danger dark:border-slate-700">
          <FiTrash2 size={14} />
        </button>
      </div>
    </Card>
  )
}
