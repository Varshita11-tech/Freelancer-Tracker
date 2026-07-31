import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { FiGrid, FiList, FiPlus } from 'react-icons/fi'
import { useData } from '../../context/DataContext'
import { useToast } from '../../context/ToastContext'
import SearchBar from '../../components/common/SearchBar'
import Filter from '../../components/common/Filter'
import Button from '../../components/common/Button'
import Pagination from '../../components/common/Pagination'
import ProjectCard from '../../components/cards/ProjectCard'
import ProjectsTable from '../../components/tables/ProjectsTable'
import ConfirmModal from '../../components/modals/ConfirmModal'
import Loader from '../../components/common/Loader'
import { CONSTANTS } from '../../data/dummyData'
import { classNames } from '../../utils/formatters'

const PAGE_SIZE = 8

export default function ProjectsList() {
  const { projects, loading, removeProject } = useData()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [view, setView] = useState('card')
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  
  useEffect(() => {
    const q = searchParams.get('search')
    if (q !== null) {
      setSearch(q)
    }
  }, [searchParams])
  const [sortBy, setSortBy] = useState('deadline')
  const [filters, setFilters] = useState({ status: '', paymentStatus: '', priority: '' })
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = useMemo(() => {
    let list = [...projects]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.clientName.toLowerCase().includes(q) || p.company.toLowerCase().includes(q))
    }
    if (filters.status) list = list.filter((p) => p.status === filters.status)
    if (filters.paymentStatus) list = list.filter((p) => p.paymentStatus === filters.paymentStatus)
    if (filters.priority) list = list.filter((p) => p.priority === filters.priority)

    list.sort((a, b) => {
      if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline)
      if (sortBy === 'budget') return b.budget - a.budget
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'progress') return b.progress - a.progress
      return 0
    })
    return list
  }, [projects, search, filters, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const confirmDelete = async () => {
    await removeProject(deleteTarget.id)
    showToast(`"${deleteTarget.name}" was deleted.`, 'success')
    setDeleteTarget(null)
  }

  if (loading) return <Loader full label="Loading projects…" />

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Projects</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{filtered.length} project{filtered.length !== 1 && 's'} found</p>
        </div>
        <Link to="/projects/new"><Button icon={FiPlus}>Add Project</Button></Link>
      </div>

      <div className="card-base flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="Search by project, client or company…" className="lg:w-96" />
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-slate-200 p-1 dark:border-slate-700">
              <button onClick={() => setView('card')} className={classNames('rounded-lg p-2', view === 'card' ? 'bg-primary-600 text-white' : 'text-slate-400')}>
                <FiGrid size={15} />
              </button>
              <button onClick={() => setView('table')} className={classNames('rounded-lg p-2', view === 'table' ? 'bg-primary-600 text-white' : 'text-slate-400')}>
                <FiList size={15} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Filter
            filters={[
              { key: 'status', label: 'All Statuses', value: filters.status, options: CONSTANTS.PROJECT_STATUSES },
              { key: 'paymentStatus', label: 'All Payments', value: filters.paymentStatus, options: CONSTANTS.PAYMENT_STATUSES },
              { key: 'priority', label: 'All Priorities', value: filters.priority, options: CONSTANTS.PRIORITIES },
            ]}
            onChange={handleFilterChange}
          />
          <div className="w-44">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field cursor-pointer">
              <option value="deadline">Sort by Deadline</option>
              <option value="budget">Sort by Budget</option>
              <option value="name">Sort by Name</option>
              <option value="progress">Sort by Progress</option>
            </select>
          </div>
        </div>
      </div>

      {paginated.length === 0 ? (
        <div className="card-base p-12 text-center text-slate-400">No projects match your filters. Try adjusting your search.</div>
      ) : view === 'card' ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {paginated.map((p) => (
            <ProjectCard key={p.id} project={p} onEdit={(proj) => navigate(`/projects/${proj.id}?edit=1`)} onDelete={setDeleteTarget} />
          ))}
        </div>
      ) : (
        <ProjectsTable projects={paginated} onEdit={(proj) => navigate(`/projects/${proj.id}?edit=1`)} onDelete={setDeleteTarget} />
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        message={`This will permanently remove "${deleteTarget?.name}" from your projects.`}
      />
    </div>
  )
}
