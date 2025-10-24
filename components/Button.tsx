import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonProps =
  | ({ href: string; variant?: 'primary' | 'secondary'; className?: string; children: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined; variant?: 'primary' | 'secondary'; className?: string; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>)

const baseClasses =
  'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:focus-outline'

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className, children, ...rest } = props
  const classes = cn(
    baseClasses,
    variant === 'primary'
      ? 'bg-primary text-white shadow-soft hover:bg-primary/90'
      : 'border border-white/20 bg-white/5 text-white hover:bg-white/10',
    className,
  )

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    if (href.startsWith('#')) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    )
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
