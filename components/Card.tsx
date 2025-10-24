import { cn } from '@/lib/utils'

type CardProps = {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
}

export default function Card({ title, description, icon, className }: CardProps) {
  return (
    <div className={cn('rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition-transform duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.09]', className)}>
      {icon && <div className="mb-4 text-primary">{icon}</div>}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{description}</p>
    </div>
  )
}
