import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { FiMail, FiArrowLeft } from 'react-icons/fi'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Alert from '../../components/common/Alert'
import { forgotPasswordRequest } from '../../services/authService'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    setServerError('')
    try {
      await forgotPasswordRequest(data)
      setSent(true)
    } catch (err) {
      setServerError(err.message || 'Something went wrong.')
    }
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We'll email you a secure link to reset it">
      {serverError && <Alert type="error" className="mb-4">{serverError}</Alert>}
      {sent ? (
        <Alert type="success">
          If an account exists for <strong>{getValues('email')}</strong>, a password reset link has been sent.
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            icon={FiMail}
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending link…' : 'Send Reset Link'}
          </Button>
        </form>
      )}
      <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary-600 hover:underline">
        <FiArrowLeft size={14} /> Back to login
      </Link>
    </AuthLayout>
  )
}
