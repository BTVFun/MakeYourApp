import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-white/70', className)}>
      {children}
    </span>
  )
}
