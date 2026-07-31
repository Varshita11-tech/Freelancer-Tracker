import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { classNames } from '../../utils/formatters'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-1.5 pt-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="btn-ghost h-9 w-9 !p-0 disabled:opacity-30"
      >
        <FiChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={classNames(
            'h-9 w-9 rounded-lg text-sm font-semibold transition-colors',
            p === page ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-card' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="btn-ghost h-9 w-9 !p-0 disabled:opacity-30"
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  )
}
