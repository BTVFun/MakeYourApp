export type ClassNameValue =
  | string
  | false
  | null
  | undefined
  | Record<string, boolean>

export function cn(...values: ClassNameValue[]): string {
  const classes: string[] = []
  values.forEach((value) => {
    if (!value) return
    if (typeof value === 'string') {
      classes.push(value)
      return
    }
    Object.entries(value).forEach(([key, enabled]) => {
      if (enabled) classes.push(key)
    })
  })
  return classes.join(' ').replace(/\s+/g, ' ').trim()
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const ip = forwarded.split(',')[0]?.trim()
    if (ip) return ip
  }
  const realIp = headers.get('x-real-ip')
  if (realIp) return realIp
  return '0.0.0.0'
}

export function traceId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 12)
  }
  return Math.random().toString(36).slice(2, 14)
}
