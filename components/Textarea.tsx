import { cn } from '@/lib/utils'

type TextareaProps = {
  label: string
  helper?: string
  error?: string
  className?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea({ label, helper, error, className, id, name, rows = 5, ...props }: TextareaProps) {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={fieldId} className="text-sm font-medium text-white">
        {label}
      </label>
      <textarea
        id={fieldId}
        name={name}
        rows={rows}
        className="rounded-xl border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm text-white transition focus-visible:focus-outline"
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
