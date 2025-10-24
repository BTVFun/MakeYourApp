import { cn } from '@/lib/utils'

type FieldBaseProps = {
  label: string
  helper?: string
  error?: string
  className?: string
}

type InputProps = FieldBaseProps & React.InputHTMLAttributes<HTMLInputElement>

export function Input({ label, helper, error, className, id, name, ...props }: InputProps) {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={fieldId} className="text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={fieldId}
        name={name}
        className="rounded-xl border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition focus-visible:focus-outline"
        aria-invalid={Boolean(error)}
        {...props}
      />
      {helper && <p className="text-xs text-white/50">{helper}</p>}
      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
