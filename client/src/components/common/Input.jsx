import { forwardRef } from 'react'
import { classNames } from '../../utils/formatters'

const Input = forwardRef(({ label, error, icon: Icon, className, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="label-field">{label}</label>}
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />}
      <input
        ref={ref}
        className={classNames('input-field', Icon && 'pl-10', error && 'border-danger focus:border-danger focus:ring-danger/20', className)}
        {...props}
      />
    </div>
    {error && <p className="mt-1 text-xs font-medium text-danger">{error}</p>}
  </div>
))
Input.displayName = 'Input'
export default Input
