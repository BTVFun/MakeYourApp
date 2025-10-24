import { cn } from '@/lib/utils'

type CheckboxProps = {
  label: string
  helper?: string
  error?: string
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function Checkbox({ label, helper, error, className, id, name, ...props }: CheckboxProps) {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={fieldId} className="flex items-start gap-3 text-sm text-white">
        <span className="mt-0.5 inline-flex items-center justify-center">
          <input
            id={fieldId}
            name={name}
            type="checkbox"
            className="h-4 w-4 rounded border-white/30 bg-white/10 text-primary focus-visible:focus-outline"
            aria-invalid={Boolean(error)}
            {...props}
          />
        </span>
        <span className="leading-5">{label}</span>
      </label>
      {helper && <p className="text-xs text-white/50">{helper}</p>}
      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
