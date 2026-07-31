import { forwardRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { classNames } from '../../utils/formatters'

const Dropdown = forwardRef(({ label, error, options = [], placeholder = 'Select…', className, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="label-field">{label}</label>}
    <div className="relative">
      <select
        ref={ref}
        className={classNames('input-field appearance-none pr-10 cursor-pointer', error && 'border-danger', className)}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
    </div>
    {error && <p className="mt-1 text-xs font-medium text-danger">{error}</p>}
  </div>
))
Dropdown.displayName = 'Dropdown'
export default Dropdown
