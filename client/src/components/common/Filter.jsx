import Dropdown from './Dropdown'

export default function Filter({ filters, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((f) => (
        <div key={f.key} className="w-40">
          <Dropdown
            placeholder={f.label}
            options={f.options}
            value={f.value}
            onChange={(e) => onChange(f.key, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}
