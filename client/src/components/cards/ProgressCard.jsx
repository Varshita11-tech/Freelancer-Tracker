import Card from '../common/Card'
import ProgressBar from '../common/ProgressBar'
import Badge from '../common/Badge'
import { formatDate, daysUntil } from '../../utils/formatters'
import { Link } from 'react-router-dom'

export default function ProgressCard({ project }) {
  const days = daysUntil(project.deadline)
  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="flex flex-col gap-2.5" hover>
        <div className="flex items-center justify-between">
          <p className="line-clamp-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{project.name}</p>
          <Badge>{project.priority}</Badge>
        </div>
        <p className="text-xs text-slate-400">Due {formatDate(project.deadline)} · {days >= 0 ? `${days}d left` : `${Math.abs(days)}d overdue`}</p>
        <ProgressBar value={project.progress} showLabel={false} />
      </Card>
    </Link>
  )
}
