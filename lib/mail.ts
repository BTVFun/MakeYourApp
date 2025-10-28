type SendMailOptions = {
  to: string
  subject: string
  html: string
}

export async function sendMailViaResend({ to, subject, html }: SendMailOptions) {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY manquant')

  const from = process.env.RESEND_FROM ?? 'MakeYourApp <onboarding@resend.dev>'

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Resend error ${response.status}: ${detail}`)
  }

  return response.json()
}

export async function sendViaFormspree(endpoint: string, payload: Record<string, unknown>) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Formspree error ${response.status}: ${detail}`)
  }

  return response.json().catch(() => ({}))
}

export function renderLeadHtml(payload: Record<string, unknown>) {
  const labels: Record<string, string> = {
    budget: 'Budget',
    budget_custom: 'Budget (précision)',
  }
  const formatKey = (key: string) =>
    labels[key] ?? key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')

  const rows = Object.entries(payload)
    .filter(([, value]) => {
      if (value === null || value === undefined) return false
      if (typeof value === 'string') {
        return value.trim().length > 0
      }
      return true
    })
    .map(([key, value]) => {
      const label = formatKey(key)
      return `<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);font-weight:600;text-transform:capitalize;">${escapeHtml(
        label,
      )}</td><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);">${escapeHtml(value)}</td></tr>`
    })
    .join('')

  return `<!doctype html>
<html>
  <body style="margin:0;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:#0B0C10;color:#E6E6E6;padding:32px;">
    <h1 style="font-size:24px;margin-bottom:16px;">Nouveau lead MakeYourApp</h1>
    <p style="margin-bottom:24px;color:#cfcfcf;">Un formulaire vient d’être rempli depuis le site vitrine.</p>
    <table style="width:100%;border-collapse:collapse;background:#11121a;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">${rows}</table>
  </body>
</html>`
}

function escapeHtml(value: unknown) {
  const str = typeof value === 'string' ? value : String(value ?? '')
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
