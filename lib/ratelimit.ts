const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS = 5

type Bucket = {
  count: number
  expiresAt: number
}

const buckets = new Map<string, Bucket>()

function getBucketKey(ip: string) {
  const safeIp = ip || '0.0.0.0'
  const slot = Math.floor(Date.now() / WINDOW_MS)
  return `${safeIp}:${slot}`
}

export function hit(ip: string) {
  const key = getBucketKey(ip)
  const now = Date.now()
  const bucket = buckets.get(key)
  if (bucket && bucket.expiresAt > now) {
    bucket.count += 1
    buckets.set(key, bucket)
    return bucket.count
  }
  buckets.set(key, { count: 1, expiresAt: now + WINDOW_MS })
  return 1
}

export function isLimited(ip: string) {
  const key = getBucketKey(ip)
  const entry = buckets.get(key)
  if (!entry) return false
  if (entry.expiresAt < Date.now()) {
    buckets.delete(key)
    return false
  }
  return entry.count >= MAX_REQUESTS
}
