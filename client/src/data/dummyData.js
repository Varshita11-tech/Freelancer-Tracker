// Deterministic dummy data generator for Freelancer Tracker (frontend-only)

const FIRST_NAMES = ['Aarav', 'Sara', 'Liam', 'Diya', 'Noah', 'Zara', 'Ethan', 'Meera', 'Kabir', 'Elena', 'Ryan', 'Anya', 'Leo', 'Priya', 'Omar']
const LAST_NAMES = ['Shah', 'Mehta', 'Johnson', 'Kapoor', 'Smith', 'Khan', 'Brown', 'Nair', 'Verma', 'Garcia', 'Singh', 'Patel', 'Cohen', 'Rao', 'Ali']
const COMPANIES = [
  'Nimbus Digital', 'Bluepeak Studio', 'Vertex Labs', 'Northwind Media', 'Solace Tech',
  'Crestline Ventures', 'Amberly Co.', 'Fable & Ford', 'Orbit Commerce', 'Cascade Interactive',
  'Halcyon Group', 'Pinecrest Apps', 'Lumen Works', 'Ridgeline Studio', 'Everstack Inc.',
]
const CATEGORIES = ['Web Development', 'Mobile App', 'UI/UX Design', 'Branding', 'E-commerce', 'SEO & Marketing', 'API Integration', 'DevOps']
const TECHS = ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Next.js', 'Figma', 'Express', 'TypeScript', 'Firebase', 'GraphQL', 'Vue.js', 'AWS']
const PROJECT_STATUSES = ['Pending', 'In Progress', 'Completed', 'Cancelled']
const PAYMENT_STATUSES = ['Paid', 'Partially Paid', 'Unpaid']
const PRIORITIES = ['Low', 'Medium', 'High']
const PROJECT_NAME_PARTS = ['Portal', 'Revamp', 'Platform', 'Dashboard', 'Storefront', 'App', 'Site Redesign', 'CRM', 'Booking System', 'Landing Page']

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const rand = seededRandom(42)
const pick = (arr) => arr[Math.floor(rand() * arr.length)]
const pickMultiple = (arr, n) => {
  const shuffled = [...arr].sort(() => rand() - 0.5)
  return shuffled.slice(0, n)
}
const randomInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min
const randomDate = (startDaysAgo, endDaysFromNow) => {
  const days = randomInt(-startDaysAgo, endDaysFromNow)
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export const clients = Array.from({ length: 15 }).map((_, i) => {
  const name = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`
  return {
    id: `client-${i + 1}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@${COMPANIES[i % COMPANIES.length].toLowerCase().replace(/[^a-z]/g, '')}.com`,
    phone: `+1 (${randomInt(200, 999)}) ${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
    company: COMPANIES[i % COMPANIES.length],
    avatarColor: pick(['bg-primary-500', 'bg-secondary-500', 'bg-accent-500', 'bg-orange-400', 'bg-pink-500', 'bg-cyan-500']),
    totalProjects: 0,
    rating: (randomInt(35, 50) / 10).toFixed(1),
  }
})

export const projects = Array.from({ length: 25 }).map((_, i) => {
  const client = pick(clients)
  client.totalProjects += 1
  const status = pick(PROJECT_STATUSES)
  const paymentStatus = status === 'Cancelled' ? 'Unpaid' : pick(PAYMENT_STATUSES)
  const budget = randomInt(800, 18000)
  let received = 0
  if (paymentStatus === 'Paid') received = budget
  else if (paymentStatus === 'Partially Paid') received = Math.round(budget * (randomInt(20, 80) / 100))
  const startDate = randomDate(180, -5)
  const deadline = randomDate(-30, 120)
  const progress = status === 'Completed' ? 100 : status === 'Cancelled' ? randomInt(0, 40) : status === 'Pending' ? 0 : randomInt(10, 90)

  return {
    id: `PRJ-${1000 + i}`,
    name: `${client.company} ${pick(PROJECT_NAME_PARTS)}`,
    clientId: client.id,
    clientName: client.name,
    clientEmail: client.email,
    clientPhone: client.phone,
    company: client.company,
    category: pick(CATEGORIES),
    description: `A ${pick(CATEGORIES).toLowerCase()} engagement focused on delivering a polished, scalable solution for ${client.company}, covering discovery, design, build and QA phases.`,
    startDate,
    deadline,
    budget,
    receivedAmount: received,
    remainingAmount: Math.max(budget - received, 0),
    status,
    paymentStatus,
    priority: pick(PRIORITIES),
    progress,
    rating: status === 'Completed' ? (randomInt(35, 50) / 10).toFixed(1) : null,
    notes: 'Client prefers weekly async updates over Slack. Keep invoices net-15.',
    technologies: pickMultiple(TECHS, randomInt(2, 5)),
    logo: null,
    createdAt: startDate,
    activity: [
      { id: 1, text: 'Project created', date: startDate },
      { id: 2, text: `Status set to ${status}`, date: randomDate(60, 0) },
      { id: 3, text: `Payment marked as ${paymentStatus}`, date: randomDate(30, 0) },
    ],
    paymentTimeline: [
      { id: 1, label: 'Advance received', amount: Math.round(budget * 0.3), date: startDate, status: received > 0 ? 'done' : 'pending' },
      { id: 2, label: 'Milestone payment', amount: Math.round(budget * 0.4), date: randomDate(45, 10), status: received > budget * 0.5 ? 'done' : 'pending' },
      { id: 3, label: 'Final payment', amount: budget - Math.round(budget * 0.3) - Math.round(budget * 0.4), date: deadline, status: paymentStatus === 'Paid' ? 'done' : 'pending' },
    ],
    attachments: [
      { id: 1, name: 'proposal.pdf', size: '212 KB' },
      { id: 2, name: 'wireframes.fig', size: '1.4 MB' },
    ],
  }
})

export const dashboardStats = () => {
  const totalProjects = projects.length
  const completed = projects.filter((p) => p.status === 'Completed').length
  const active = projects.filter((p) => p.status === 'In Progress').length
  const pending = projects.filter((p) => p.status === 'Pending').length
  const paid = projects.filter((p) => p.paymentStatus === 'Paid').length
  const unpaid = projects.filter((p) => p.paymentStatus === 'Unpaid').length
  const totalIncome = projects.reduce((sum, p) => sum + p.receivedAmount, 0)
  const pendingIncome = projects.reduce((sum, p) => sum + p.remainingAmount, 0)
  const now = new Date()
  const monthlyIncome = projects
    .filter((p) => {
      const d = new Date(p.startDate)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    .reduce((sum, p) => sum + p.receivedAmount, 0)

  return { totalProjects, completed, active, pending, paid, unpaid, totalIncome, pendingIncome, monthlyIncome }
}

export const upcomingDeadlines = () =>
  projects
    .filter((p) => p.status !== 'Completed' && p.status !== 'Cancelled')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5)

export const recentActivity = () =>
  projects
    .flatMap((p) => p.activity.map((a) => ({ ...a, projectName: p.name, projectId: p.id })))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8)

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const monthlyIncomeSeries = () => {
  const seed = seededRandom(7)
  return MONTHS.map((m) => ({
    month: m,
    income: Math.round(1200 + seed() * 6500),
    expenses: Math.round(400 + seed() * 1800),
  }))
}

export const yearlyIncomeSeries = () => {
  const seed = seededRandom(13)
  return [2021, 2022, 2023, 2024, 2025, 2026].map((y) => ({
    year: String(y),
    income: Math.round(18000 + seed() * 60000),
  }))
}

export const projectStatusDistribution = () =>
  PROJECT_STATUSES.map((status) => ({
    name: status,
    value: projects.filter((p) => p.status === status).length,
  }))

export const paymentStatusDistribution = () =>
  PAYMENT_STATUSES.map((status) => ({
    name: status,
    value: projects.filter((p) => p.paymentStatus === status).length,
  }))

export const topClients = () =>
  [...clients]
    .map((c) => ({
      ...c,
      totalPaid: projects.filter((p) => p.clientId === c.id).reduce((s, p) => s + p.receivedAmount, 0),
    }))
    .sort((a, b) => b.totalPaid - a.totalPaid)
    .slice(0, 5)

export const recentPayments = () =>
  [...projects]
    .filter((p) => p.receivedAmount > 0)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .slice(0, 6)

export const CONSTANTS = { PROJECT_STATUSES, PAYMENT_STATUSES, PRIORITIES, CATEGORIES, TECHS }
