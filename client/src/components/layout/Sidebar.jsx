import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiGrid, FiFolder, FiPlusCircle, FiDollarSign, FiCreditCard,
  FiBarChart2, FiSettings, FiUser, FiLogOut, FiX, FiBriefcase,
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { classNames, initials } from '../../utils/formatters'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/projects', label: 'Projects', icon: FiFolder },
  { to: '/payments', label: 'Payments', icon: FiCreditCard },
]

export default function Sidebar({ open, onClose }) {


  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className={classNames(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200/70 bg-white/90 backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/90 lg:relative',
          open ? 'translate-x-0 lg:w-64 lg:min-w-[16rem]' : '-translate-x-full lg:w-0 lg:min-w-0 lg:-translate-x-full lg:border-r-0 lg:overflow-hidden'
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-card">
              <FiBriefcase size={17} />
            </div>
            <span className="font-display text-lg font-bold text-slate-800 dark:text-white">Freelancer<span className="text-primary-600">Tracker</span></span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 lg:hidden"><FiX size={20} /></button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              onClick={() => { if (window.innerWidth < 1024) onClose() }}
              className={({ isActive }) =>
                classNames(
                  'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-card'
                    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/70'
                )
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>


      </motion.aside>
    </>
  )
}
