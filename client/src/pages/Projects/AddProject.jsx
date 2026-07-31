import { useNavigate } from 'react-router-dom'
import { FiPlusCircle } from 'react-icons/fi'
import Card from '../../components/common/Card'
import ProjectForm from '../../components/forms/ProjectForm'
import { useData } from '../../context/DataContext'
import { useToast } from '../../context/ToastContext'

export default function AddProject() {
  const { addProject } = useData()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (payload) => {
    const created = await addProject(payload)
    showToast('Project created successfully!', 'success')
    navigate(`/projects/${created.id}`)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-card">
          <FiPlusCircle size={18} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Add New Project</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Fill in the details to add a new project to your tracker.</p>
        </div>
      </div>

      <Card hover={false}>
        <ProjectForm onSubmit={handleSubmit} submitLabel="Create Project" />
      </Card>
    </div>
  )
}
