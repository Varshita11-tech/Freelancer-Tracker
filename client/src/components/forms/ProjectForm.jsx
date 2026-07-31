import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiRotateCcw, FiSave } from 'react-icons/fi'
import Input from '../common/Input'
import Dropdown from '../common/Dropdown'
import Button from '../common/Button'
import { CONSTANTS } from '../../data/dummyData'

export default function ProjectForm({ initialValues, onSubmit, submitLabel = 'Save Project' }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialValues || {
      name: '', company: '', clientName: '', clientEmail: '', clientPhone: '',
      budget: '', receivedPayment: '', deadline: '', startDate: '',
      priority: 'Medium', status: 'Pending', paymentStatus: 'Unpaid',
      description: '', notes: '', technologies: '',
    },
  })

  const submit = (data) => {
    const payload = {
      ...data,
      technologies: typeof data.technologies === 'string'
        ? data.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : data.technologies,
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8">
      <section>
        <h3 className="section-title mb-4">Project Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Project Name" placeholder="E-commerce Storefront Revamp" error={errors.name?.message} {...register('name', { required: 'Project name is required' })} />
          <Input label="Company Name" placeholder="Nimbus Digital" error={errors.company?.message} {...register('company', { required: 'Company name is required' })} />
          <Dropdown label="Category" options={CONSTANTS.CATEGORIES} {...register('category')} />
          <Input label="Technologies" placeholder="React, Node.js, MongoDB (comma separated)" {...register('technologies')} />
        </div>
        <div className="mt-4">
          <label className="label-field">Description</label>
          <textarea rows={3} className="input-field resize-none" placeholder="Briefly describe the scope of work…" {...register('description')} />
        </div>
      </section>

      <section>
        <h3 className="section-title mb-4">Client Details</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Client Name" placeholder="Jordan Lee" error={errors.clientName?.message} {...register('clientName', { required: 'Client name is required' })} />
          <Input label="Client Email" type="email" placeholder="client@company.com" error={errors.clientEmail?.message} {...register('clientEmail', { pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} />
          <Input label="Client Phone" placeholder="+1 (555) 019-2837" {...register('clientPhone')} />
        </div>
      </section>

      <section>
        <h3 className="section-title mb-4">Budget & Timeline</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input label="Budget (₹)" type="number" min="0" placeholder="5000" error={errors.budget?.message} {...register('budget', { required: 'Budget is required', min: { value: 0, message: 'Must be positive' } })} />
          <Input label="Received Payment (₹)" type="number" min="0" placeholder="0" {...register('receivedPayment')} />
          <Dropdown label="Priority" options={CONSTANTS.PRIORITIES} {...register('priority')} />
          <Input label="Start Date" type="date" {...register('startDate', { required: 'Start date is required' })} error={errors.startDate?.message} />
          <Input label="Deadline" type="date" {...register('deadline', { required: 'Deadline is required' })} error={errors.deadline?.message} />
        </div>
      </section>

      <section>
        <h3 className="section-title mb-4">Status</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Dropdown label="Project Status" options={CONSTANTS.PROJECT_STATUSES} {...register('status')} />
          <Dropdown label="Payment Status" options={CONSTANTS.PAYMENT_STATUSES} {...register('paymentStatus')} />
        </div>
        <div className="mt-4">
          <label className="label-field">Notes</label>
          <textarea rows={2} className="input-field resize-none" placeholder="Internal notes about this client or project…" {...register('notes')} />
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 dark:border-slate-800 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" icon={FiRotateCcw} onClick={() => reset()}>Reset</Button>
        <Button type="submit" icon={FiSave} disabled={isSubmitting}>{isSubmitting ? 'Saving…' : submitLabel}</Button>
      </div>
    </form>
  )
}
