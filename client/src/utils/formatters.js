export const formatCurrency = (value, currency = 'INR') => {
  const symbols = { USD: '$', INR: '₹', EUR: '€', GBP: '£' }
  const symbol = symbols[currency] || '₹'
  const num = Number(value) || 0
  return `${symbol}${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export const formatDate = (dateStr, options = {}) => {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', ...options })
}

export const daysUntil = (dateStr) => {
  if (!dateStr) return null
  const today = new Date()
  const target = new Date(dateStr)
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
  return diff
}

export const truncate = (str = '', len = 80) => (str.length > len ? `${str.slice(0, len)}…` : str)

export const initials = (name = '') =>
  name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()

export const classNames = (...args) => args.filter(Boolean).join(' ')
