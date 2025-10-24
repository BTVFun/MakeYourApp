import { cn } from '@/lib/utils'

type SelectProps = {
  label: string
  helper?: string
  error?: string
  options: { label: string; value: string }[]
  placeholder?: string
  className?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

export function Select({
  label,
  helper,
  error,
  options,
  placeholder,
  className,
  id,
  name,
  ...props
}: SelectProps) {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={fieldId} className="text-sm font-medium text-white">
        {label}
      </label>
      <select
        id={fieldId}
        name={name}
        className="rounded-xl border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm text-white transition focus-visible:focus-outline"
        aria-invalid={Boolean(error)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-900">
            {option.label}
          </option>
        ))}
      </select>
      {helper && <p className="text-xs text-white/50">{helper}</p>}
      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
