import Container from '@/components/Container'
import { cn } from '@/lib/utils'

type SectionProps = {
  id?: string
  title?: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}

export default function Section({ id, title, subtitle, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('section-grad py-16 sm:py-24', className)}>
      <Container>
        {title && <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">{title}</h2>}
        {subtitle && <p className="text-base text-white/70 mb-10 max-w-2xl">{subtitle}</p>}
        {children}
      </Container>
    </section>
  )
}
