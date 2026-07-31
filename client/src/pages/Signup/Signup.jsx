import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Alert from '../../components/common/Alert'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const { signup } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    setServerError('')
    try {
      await signup(data)
      showToast('Account created! Welcome to Freelancer Tracker.', 'success')
      navigate('/dashboard')
    } catch (err) {
      setServerError(err.message || 'Signup failed. Please try again.')
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Start tracking projects, clients and income today">
      {serverError && <Alert type="error" className="mb-4">{serverError}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          icon={FiUser}
          placeholder="Jordan Lee"
          error={errors.fullName?.message}
          {...register('fullName', { required: 'Full name is required', minLength: { value: 2, message: 'Name is too short' } })}
        />
        <Input
          label="Email address"
          type="email"
          icon={FiMail}
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            icon={FiLock}
            placeholder="Min. 6 characters"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
          />
          <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-[38px] text-slate-400 hover:text-slate-600">
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>
        <Input
          label="Confirm password"
          type={showPassword ? 'text' : 'password'}
          icon={FiLock}
          placeholder="Re-enter password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', { required: 'Please confirm your password', validate: (v) => v === password || 'Passwords do not match' })}
        />

        <label className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
          I agree to the Terms of Service and Privacy Policy
        </label>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create Account'}
        </Button>

      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account? <Link to="/login" className="font-semibold text-primary-600 hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  )
}
