import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEdit2, FiLock, FiMail, FiMapPin, FiPhone, FiSave, FiX } from 'react-icons/fi'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Modal from '../../components/modals/Modal'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { initials } from '../../utils/formatters'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const { showToast } = useToast()
  const [editing, setEditing] = useState(false)
  const [pwOpen, setPwOpen] = useState(false)

  const { register, handleSubmit, reset } = useForm({ defaultValues: user })
  const pwForm = useForm()

  const onSave = (data) => {
    updateProfile({ ...data, skills: typeof data.skills === 'string' ? data.skills.split(',').map((s) => s.trim()).filter(Boolean) : data.skills })
    setEditing(false)
    showToast('Profile updated successfully!', 'success')
  }

  const onChangePassword = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      pwForm.setError('confirmPassword', { message: 'Passwords do not match' })
      return
    }
    showToast('Password changed successfully! (demo only)', 'success')
    setPwOpen(false)
    pwForm.reset()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your personal information and account security.</p>
      </div>

      <Card hover={false} className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 text-2xl font-bold text-white shadow-card">
            {initials(user?.name || 'FT')}
          </div>

        </div>
        <div className="flex-1">
          <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">{user?.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{user?.bio || 'No bio added yet.'}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {(user?.skills || []).map((s) => (
              <span key={s} className="rounded-md bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">{s}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={FiEdit2} onClick={() => { reset(user); setEditing(true) }}>Edit Profile</Button>
          <Button variant="secondary" icon={FiLock} onClick={() => setPwOpen(true)}>Change Password</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card hover={false}>
          <h3 className="section-title mb-4">Contact Information</h3>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400"><FiMail size={14} /> {user?.email}</p>
            <p className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400"><FiPhone size={14} /> {user?.phone || 'Not added'}</p>
            <p className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400"><FiMapPin size={14} /> {user?.location || 'Not added'}</p>
          </div>
        </Card>
        <Card hover={false}>
          <h3 className="section-title mb-4">Experience</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{user?.experience || 'Not specified'}</p>
        </Card>
      </div>

      <Modal open={editing} onClose={() => setEditing(false)} title="Edit Profile" maxWidth="max-w-lg">
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <Input label="Full Name" {...register('name')} />
          <Input label="Email" type="email" {...register('email')} />
          <Input label="Phone" {...register('phone')} />
          <Input label="Location" {...register('location')} />
          <Input label="Experience" {...register('experience')} placeholder="e.g. 5+ years" />
          <Input label="Skills (comma separated)" defaultValue={(user?.skills || []).join(', ')} {...register('skills')} />
          <div>
            <label className="label-field">Bio</label>
            <textarea rows={3} className="input-field resize-none" {...register('bio')} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" icon={FiX} onClick={() => setEditing(false)}>Cancel</Button>
            <Button type="submit" icon={FiSave}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      <Modal open={pwOpen} onClose={() => setPwOpen(false)} title="Change Password" maxWidth="max-w-sm">
        <form onSubmit={pwForm.handleSubmit(onChangePassword)} className="space-y-4">
          <Input label="Current Password" type="password" error={pwForm.formState.errors.currentPassword?.message} {...pwForm.register('currentPassword', { required: 'Required' })} />
          <Input label="New Password" type="password" error={pwForm.formState.errors.newPassword?.message} {...pwForm.register('newPassword', { required: 'Required', minLength: { value: 6, message: 'Min. 6 characters' } })} />
          <Input label="Confirm New Password" type="password" error={pwForm.formState.errors.confirmPassword?.message} {...pwForm.register('confirmPassword', { required: 'Required' })} />
          <Button type="submit" className="w-full">Update Password</Button>
        </form>
      </Modal>
    </div>
  )
}
