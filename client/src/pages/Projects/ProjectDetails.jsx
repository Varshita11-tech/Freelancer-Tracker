import { useMemo, useState } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  FiArrowLeft, FiMail, FiPhone, FiCalendar, FiEdit2, FiTrash2, FiPaperclip,
  FiCheckCircle, FiClock, FiFileText,
} from 'react-icons/fi'
import { useData } from '../../context/DataContext'
import { useToast } from '../../context/ToastContext'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import ProgressBar from '../../components/common/ProgressBar'
import RatingStars from '../../components/common/RatingStars'
import Modal from '../../components/modals/Modal'
import ConfirmModal from '../../components/modals/ConfirmModal'
import ProjectForm from '../../components/forms/ProjectForm'
import Loader from '../../components/common/Loader'
import { formatCurrency, formatDate, initials } from '../../utils/formatters'

export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { projects, loading, editProject, removeProject } = useData()
  const { showToast } = useToast()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const project = useMemo(() => projects.find((p) => p.id === id), [projects, id])
  const editOpen = searchParams.get('edit') === '1'

  if (loading) return <Loader full label="Loading project…" />

  if (!project) {
    return (
      <Card className="mx-auto max-w-lg text-center">
        <p className="text-slate-500 dark:text-slate-400">Project not found.</p>
        <Link to="/projects" className="btn-primary mt-4 inline-flex">Back to Projects</Link>
      </Card>
    )
  }

  const handleUpdate = async (payload) => {
    await editProject(project.id, payload)
    showToast('Project updated successfully!', 'success')
    setSearchParams({})
  }

  const handleDelete = async () => {
    await removeProject(project.id)
    showToast('Project deleted.', 'success')
    navigate('/projects')
  }

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="btn-ghost gap-1.5 !px-0">
        <FiArrowLeft size={15} /> Back
      </button>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-lg font-bold text-white shadow-card">
            {initials(project.company)}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">{project.name}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{project.id} · {project.category}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={FiEdit2} onClick={() => setSearchParams({ edit: '1' })}>Edit</Button>
          <Button variant="danger" icon={FiTrash2} onClick={() => setDeleteOpen(true)}>Delete</Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge>{project.status}</Badge>
        <Badge>{project.paymentStatus}</Badge>
        <Badge>{project.priority} Priority</Badge>
        {project.rating && <RatingStars rating={project.rating} />}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card hover={false}>
            <h3 className="section-title mb-3">Overview</h3>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span key={t} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-700/60 dark:text-slate-300">{t}</span>
              ))}
            </div>
            <div className="mt-5">
              <ProgressBar value={project.progress} />
            </div>
          </Card>

          <Card hover={false}>
            <h3 className="section-title mb-4">Payment Timeline</h3>
            <div className="space-y-4">
              {project.paymentTimeline.map((t) => (
                <div key={t.id} className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${t.status === 'done' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15' : 'bg-slate-100 text-slate-400 dark:bg-slate-700/50'}`}>
                    {t.status === 'done' ? <FiCheckCircle size={15} /> : <FiClock size={15} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{t.label}</p>
                    <p className="text-xs text-slate-400">{formatDate(t.date)}</p>
                  </div>
                  <p className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">{formatCurrency(t.amount)}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card hover={false}>
            <h3 className="section-title mb-4">Activity</h3>
            <div className="space-y-4 border-l-2 border-slate-100 pl-4 dark:border-slate-800">
              {project.activity.map((a) => (
                <div key={a.id} className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{a.text}</p>
                  <p className="text-xs text-slate-400">{formatDate(a.date)}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card hover={false}>
            <h3 className="section-title mb-4">Notes</h3>
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">{project.notes}</p>
          </Card>
        </div>

        <div className="space-y-6">
          <Card hover={false}>
            <h3 className="section-title mb-4">Client Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-xs font-bold text-white">{initials(project.clientName)}</div>
                <span className="font-semibold">{project.clientName}</span>
              </div>
              <p className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400"><FiMail size={14} /> {project.clientEmail}</p>
              <p className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400"><FiPhone size={14} /> {project.clientPhone}</p>
              <p className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400"><FiFileText size={14} /> {project.company}</p>
            </div>
          </Card>

          <Card hover={false}>
            <h3 className="section-title mb-4">Timeline</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-center justify-between text-slate-500 dark:text-slate-400"><span className="flex items-center gap-2"><FiCalendar size={14} /> Start Date</span><span className="font-semibold text-slate-700 dark:text-slate-200">{formatDate(project.startDate)}</span></p>
              <p className="flex items-center justify-between text-slate-500 dark:text-slate-400"><span className="flex items-center gap-2"><FiCalendar size={14} /> Deadline</span><span className="font-semibold text-slate-700 dark:text-slate-200">{formatDate(project.deadline)}</span></p>
            </div>
          </Card>

          <Card hover={false}>
            <h3 className="section-title mb-4">Payment Summary</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-center justify-between"><span className="text-slate-500 dark:text-slate-400">Budget</span><span className="font-mono font-semibold text-slate-700 dark:text-slate-200">{formatCurrency(project.budget)}</span></p>
              <p className="flex items-center justify-between"><span className="text-slate-500 dark:text-slate-400">Received</span><span className="font-mono font-semibold text-emerald-600">{formatCurrency(project.receivedAmount)}</span></p>
              <p className="flex items-center justify-between"><span className="text-slate-500 dark:text-slate-400">Remaining</span><span className="font-mono font-semibold text-orange-500">{formatCurrency(project.remainingAmount)}</span></p>
            </div>
          </Card>

          <Card hover={false}>
            <h3 className="section-title mb-4">Attachments</h3>
            <div className="space-y-2">
              {project.attachments.map((f) => (
                <div key={f.id} className="flex items-center gap-2.5 rounded-lg border border-slate-100 p-2.5 text-sm dark:border-slate-800">
                  <FiPaperclip size={14} className="text-slate-400" />
                  <span className="flex-1 truncate text-slate-600 dark:text-slate-300">{f.name}</span>
                  <span className="text-xs text-slate-400">{f.size}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setSearchParams({})} title="Edit Project" maxWidth="max-w-3xl">
        <ProjectForm initialValues={project} onSubmit={handleUpdate} submitLabel="Save Changes" />
      </Modal>

      <ConfirmModal open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={handleDelete} message={`This will permanently remove "${project.name}".`} />
    </div>
  )
}
