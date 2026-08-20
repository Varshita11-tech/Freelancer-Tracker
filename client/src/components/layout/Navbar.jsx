import { useState } from 'react'
import { FiMenu, FiSun, FiMoon, FiBell, FiSearch, FiChevronDown } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { initials } from '../../utils/formatters'
import { useToast } from '../../context/ToastContext'

export default function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    showToast('Logged out successfully', 'success')
    navigate('/login')
  }
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200/70 bg-white/80 px-4 py-3.5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="btn-ghost h-9 w-9 !p-0">
          <FiMenu size={19} />
        </button>
        <form onSubmit={(e) => {
          e.preventDefault();
          const q = e.target.search.value;
          if (q) navigate(`/projects?search=${encodeURIComponent(q)}`);
        }} className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 dark:border-slate-700 dark:bg-slate-800/60 sm:flex">
          <FiSearch size={15} className="text-slate-400" />
          <input name="search" placeholder="Quick search…" className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400" />
        </form>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button onClick={toggleTheme} className="btn-ghost h-9 w-9 !p-0 border border-slate-200 dark:border-slate-700">
          {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>


        <div className="relative">
          <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2 rounded-xl border border-slate-200 py-1.5 pl-1.5 pr-2.5 dark:border-slate-700">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-[11px] font-bold text-white">
              {initials(user?.name || 'FT')}
            </div>

            <FiChevronDown size={14} className="text-slate-400" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card dark:border-slate-700 dark:bg-slate-800" onMouseLeave={() => setMenuOpen(false)}>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">My Profile</Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">Settings</Link>
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="block w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-red-50 dark:hover:bg-red-500/10">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
