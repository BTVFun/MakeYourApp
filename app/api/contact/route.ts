import { NextRequest, NextResponse } from 'next/server'
import { ContactFormSchema } from '@/lib/schema'
import { getClientIp, traceId } from '@/lib/utils'
import { hit, isLimited } from '@/lib/ratelimit'
import { renderLeadHtml, sendMailViaResend, sendViaFormspree } from '@/lib/mail'

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers)
  try {
    if (isLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Trop de requêtes, réessayez plus tard.' },
        { status: 429 },
      )
    }

    hit(ip)

    const data = await request.json().catch(() => null)
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 })
    }

    if (typeof data.company === 'string' && data.company.trim().length > 0) {
      return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 })
    }

    const parsed = ContactFormSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Validation échouée.', issues: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const { company: _company, ...payload } = parsed.data
    const tId = traceId()
    const meta = {
      ...payload,
      traceId: tId,
      ip,
      userAgent: request.headers.get('user-agent') ?? 'n/a',
      timestamp: new Date().toISOString(),
    }

    const to = process.env.CONTACT_TO
    const resendKey = process.env.RESEND_API_KEY
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT

    if (resendKey && to) {
      const emailResponse = await sendMailViaResend({
        to,
        subject: `[Nouveau lead] ${payload.name} - ${payload.subject}`,
        html: renderLeadHtml(meta),
      })
      console.log({ status: 'resend:sent', id: emailResponse.id ?? 'n/a', to })
    } else if (formspreeEndpoint) {
      await sendViaFormspree(formspreeEndpoint, meta)
    } else {
      console.error(
        'contact:missing-mail-config',
        JSON.stringify({
          hasResendKey: Boolean(resendKey),
          hasContactTo: Boolean(to),
          hasFormspree: Boolean(formspreeEndpoint),
        }),
      )
      return NextResponse.json(
        { ok: false, error: 'Service email non configuré, merci de réessayer plus tard.' },
        { status: 500 },
      )
    }

    console.log({
      status: 'lead:ok',
      traceId: tId,
      email: payload.email,
      sujet: payload.subject,
      budget: payload.budget,
      ...(payload.budget_custom ? { budget_custom: payload.budget_custom } : {}),
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('contact:error', error)
    return NextResponse.json({ ok: false, error: 'Une erreur est survenue.' }, { status: 500 })
  }
}
