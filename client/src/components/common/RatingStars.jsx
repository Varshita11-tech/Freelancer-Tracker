import { FiStar } from 'react-icons/fi'

export default function RatingStars({ rating = 0, size = 14, showValue = true }) {
  const rounded = Math.round(Number(rating) || 0)
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={size}
          className={i < rounded ? 'fill-warning text-warning' : 'text-slate-300 dark:text-slate-600'}
        />
      ))}
      {showValue && rating ? <span className="ml-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{rating}</span> : null}
    </div>
  )
}
