import { useState } from 'react'
import { FiSun, FiMoon, FiGlobe, FiDollarSign, FiUser, FiShield } from 'react-icons/fi'
import Card from '../../components/common/Card'
import Dropdown from '../../components/common/Dropdown'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../context/ToastContext'
import { classNames } from '../../utils/formatters'

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const { showToast } = useToast()
  const [language, setLanguage] = useState('English')
  const [currency, setCurrency] = useState('USD')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Customize your Freelancer Tracker experience.</p>
      </div>

      <Card hover={false}>
        <div className="mb-4 flex items-center gap-2">
          {theme === 'dark' ? <FiMoon className="text-secondary-600" size={18} /> : <FiSun className="text-orange-500" size={18} />}
          <h3 className="section-title">Appearance</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:max-w-sm">
          <button
            onClick={() => setTheme('light')}
            className={classNames('flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors', theme === 'light' ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10' : 'border-slate-200 dark:border-slate-700')}
          >
            <FiSun size={20} className="text-orange-500" />
            <span className="text-sm font-semibold">Light Mode</span>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={classNames('flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors', theme === 'dark' ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10' : 'border-slate-200 dark:border-slate-700')}
          >
            <FiMoon size={20} className="text-secondary-600" />
            <span className="text-sm font-semibold">Dark Mode</span>
          </button>
        </div>
      </Card>



      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card hover={false}>
          <div className="mb-4 flex items-center gap-2">
            <FiGlobe className="text-secondary-600" size={18} />
            <h3 className="section-title">Language</h3>
          </div>
          <Dropdown value={language} onChange={(e) => setLanguage(e.target.value)} options={['English', 'Hindi', 'Spanish', 'French', 'German']} />
        </Card>
        <Card hover={false}>
          <div className="mb-4 flex items-center gap-2">
            <FiDollarSign className="text-accent-600" size={18} />
            <h3 className="section-title">Currency</h3>
          </div>
          <Dropdown value={currency} onChange={(e) => setCurrency(e.target.value)} options={['USD', 'INR', 'EUR', 'GBP']} />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card hover={false} className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10"><FiUser size={19} /></div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Profile Settings</p>
            <p className="text-xs text-slate-400">Update your personal details</p>
          </div>
          <a href="/profile" className="btn-ghost border border-slate-200 dark:border-slate-700">Manage</a>
        </Card>
        <Card hover={false} className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-danger dark:bg-red-500/10"><FiShield size={19} /></div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Security</p>
            <p className="text-xs text-slate-400">Password and account protection</p>
          </div>
          <a href="/profile" className="btn-ghost border border-slate-200 dark:border-slate-700">Manage</a>
        </Card>
      </div>
    </div>
  )
}
