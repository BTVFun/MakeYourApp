Tu es un **lead dev Next.js/Tailwind**. Ta mission : **générer un site vitrine minimal, sombre et élégant** pour l’agence *MakeYourApp* (création d’apps web via IA + dev humain). Objectif prioritaire : **rassurer → convertir** et **faciliter le contact**.

---
## Règles d’or (à respecter strictement)
- **Stack** : Next.js 14 (App Router), TypeScript, TailwindCSS, ESLint + Prettier. Aucune UI lib externe.
- **Style** : thème **dark** moderne, bcp d’espace, typographie nette, **micro-animations** douces (hover/focus), gradients subtils.
- **Accessibilité** : labels explicites, focus states visibles, **`aria-live`** pour états d’envoi, contrastes AA.
- **SEO** : `<meta>` via `export const metadata`, OpenGraph/Twitter, **`robots.ts`** et **`sitemap.ts`**, favicon + OG image.
- **Perf** : images optimisées, **polices système** (Inter si dispo), pas de script inutile.
- **Qualité** : Typescript strict, composants découplés, validation **Zod** côté client et serveur.
- **Comportement formulaire** : `POST /api/contact` ; envoi via **Resend** si `RESEND_API_KEY` + `CONTACT_TO` présents, sinon **fallback Formspree** via `FORMSPREE_ENDPOINT`. Anti-bot **honeypot** + **rate limit 5 req/h par IP**.
- **Journalisation** : toujours `console.log` côté serveur `{ status, traceId, email, sujet }`.

> **IMPORTANT** — Tu dois **créer/mettre à jour tous les fichiers** listés ci‑dessous **dans cet ordre**, puis **vérifier** la compilation (`pnpm dev`) et que la page `/` rend bien, que le formulaire poste et que les réponses JSON sont correctes.

---
## Identité visuelle
- **Palette** :
  - Fond : `#0B0C10`
  - Texte : `#E6E6E6`
  - Accent primaire (violet) : `#7C3AED`
- **Dégradés** : violet → transparent pour les fonds de sections (léger, discret).
- **Typo** : `system-ui, -apple-system, Segoe UI, Roboto, Inter, ...`

---
## Pages & sections obligatoires
1) **`/` (home)**
   - **Header sticky** : logo texte “MakeYourApp” (à gauche), CTA **Contact** (ancre `#contact`) à droite.
   - **Hero** centré :
     - Titre : **“Créez votre app web, simplement.”**
     - Sous-titre : *“Brief → App → Déploiement. On s’occupe de tout avec l’IA + dev humain.”*
     - Deux boutons : **Commencer** (→ `#contact`) et **Voir notre approche** (→ `#process`).
   - **Bande confiance** (3–4 puces + icônes SVG simples) : “Livraison rapide”, “Code propre”, “Déploiement Vercel”, “Support e‑mail”.
   - **Section `#process`** : 3 cartes step — **Brief → Génération & Ajustements → Déploiement** (texte court).
   - **Section `#contact`** : formulaire (voir schéma plus bas).
   - **Footer** : liens *Mentions légales* / *Confidentialité* (pages dédiées), e-mail cliquable, icônes socials placeholders.
2) **`/privacy`** et **`/legal`** : pages simples (1–2 paragraphes, placeholders propres, style cohérent).

---
## Formulaire de contact (section `#contact`)
**Champs** (tous avec label + helper aria si utile) :
- `name` (obligatoire)
- `email` (obligatoire, format email)
- `phone` (optionnel)
- `subject` (`"Site vitrine" | "SaaS simple" | "E-commerce" | "Autre"`)
- `budget` (`"< 1 000 €" | "1 000-3 000 €" | "3 000-8 000 €" | "> 8 000 €" | "À définir"`)
- `timeline` (`"< 2 semaines" | "2-4 semaines" | "> 1 mois" | "Flexible"`)
- `description` (textarea, **min 20 caractères**)
- `consent` (checkbox : “J’accepte d’être contacté(e) et la politique de confidentialité.”)
- **Honeypot caché** : champ `name="company"` (style visuellement masqué, aria-hidden) — si rempli ⇒ **refus**.

**Validation** : Zod **client** + **serveur** (mêmes schémas partagés).
**UX envoi** : état “Envoi…”, puis **succès** (“Merci, on revient vers vous sous 24h”) ou **erreur** générique. Annonce via **`aria-live`**.

---
## Arborescence attendue
```
app/
  layout.tsx
  page.tsx
  privacy/page.tsx
  legal/page.tsx
  api/contact/route.ts
  robots.ts
  sitemap.ts
components/
  Header.tsx Footer.tsx Container.tsx
  Section.tsx
  ContactForm.tsx
  Input.tsx Select.tsx Textarea.tsx Checkbox.tsx
  Button.tsx Badge.tsx Card.tsx
lib/
  schema.ts mail.ts ratelimit.ts utils.ts
public/
  favicon.ico og-image.png
styles/
  globals.css
.eslintrc.json .prettierrc .editorconfig
package.json tsconfig.json next.config.ts postcss.config.js tailwind.config.ts
.env.example README.md
```

---
## Étapes d’exécution (fais l’une après l’autre)

### Étape 0 — Préparation projet
- Si le repo n’existe pas : initialiser Next.js 14 + TS + Tailwind.
- Assurer **ESLint + Prettier** et scripts `pnpm` : `dev`, `build`, `start`, `lint`, `typecheck`.
- Ajouter `.editorconfig`.

### Étape 1 — Config Tailwind & styles globaux
- `tailwind.config.ts` : content -> `./app/**/*.{ts,tsx}`, `./components/**/*.{ts,tsx}` ; thème couleurs (fond, texte, accent), containers, animations légères.
- `styles/globals.css` : directives Tailwind + CSS vars (couleurs) + utilities (visually-hidden pour honeypot, gradients).

### Étape 2 — Layout & SEO
- `app/layout.tsx` : `lang="fr"`, `export const metadata` (title/description/OG/Twitter), `<body className=...>` dark bg, font system.
- `app/robots.ts` et `app/sitemap.ts`.

### Étape 3 — Composants de base UI
- `Container`, `Section`, `Button`, `Badge`, `Card`, `Input`, `Select`, `Textarea`, `Checkbox`.
- Styles *focus-visible*, transitions, ombres douces, état disabled.

### Étape 4 — Header & Footer
- Header sticky avec gradient fin bottom, logo texte, CTA “Contact” → `#contact`.
- Footer avec liens `/privacy` et `/legal`, mailto, socials placeholders.

### Étape 5 — Home (`app/page.tsx`)
- Hero + Bande confiance (icônes SVG inline) + Section `#process` (3 cartes) + `#contact` (intègre `ContactForm`).

### Étape 6 — Pages légales
- `/privacy` et `/legal` avec contenu placeholder cohérent, titres H1, texte lisible, lien retour.

### Étape 7 — Schémas, utilitaires & rate limit
- `lib/schema.ts` (Zod) : schéma **ContactFormSchema** (client & serveur) ; helpers `emailRegex` si besoin.
- `lib/ratelimit.ts` : Map en mémoire (clé `ip:slotHeure`) → 5 req/h.
- `lib/utils.ts` : `cn(...)` (merge classnames), `getClientIp(req)`.

### Étape 8 — Envoi e‑mail & fallback
- `lib/mail.ts` : wrapper **Resend** (`RESEND_API_KEY`, `CONTACT_TO`). Template HTML simple compatible dark.
- Fallback **Formspree** si `FORMSPREE_ENDPOINT`.

### Étape 9 — API route
- `app/api/contact/route.ts` :
  - Refus si honeypot rempli.
  - Rate limit (429 JSON clair).
  - Validation Zod ; si ok :
    - tente Resend → sinon Formspree → sinon 500.
  - `console.log({ status, traceId, email, sujet })`.
  - Réponses `{ ok: true }` ou `{ ok: false, error }`.

### Étape 10 — Formulaire client
- `components/ContactForm.tsx` (Client Component) :
  - State → pending/success/error ; `aria-live`.
  - Validation Zod **avant** POST.
  - UI : messages inline + toast minimal non intrusif (div role=alert).

### Étape 11 — README, .env.example & nettoyage
- `README.md` : instructions install, env, dev, build, déploiement Vercel.
- `.env.example` : `RESEND_API_KEY=`, `CONTACT_TO=`, `FORMSPREE_ENDPOINT=`.
- Lint/typecheck OK ; pas de warnings critiques à la compilation.

---
## Fichiers à créer (exemples de contenu attendus)
> **Note** : fournis **le code complet** pour chaque fichier listé. Ci‑dessous, gabarits **requis** (tu peux optimiser tant que tu respectes la spec).

### `package.json` (extrait)
```json
{
  "name": "makeyourapp-site",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "^14",
    "postcss": "^8",
    "prettier": "^3",
    "tailwindcss": "^3",
    "typescript": "^5"
  }
}
```

### `tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0C10',
        text: '#E6E6E6',
        primary: '#7C3AED',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.35)'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0, transform: 'translateY(4px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        fadeIn: 'fadeIn .4s ease both'
      }
    }
  },
  plugins: [],
} satisfies Config
```

### `styles/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0B0C10;
  --text: #E6E6E6;
  --primary: #7C3AED;
}

html, body { height: 100%; }
body { background: var(--bg); color: var(--text); }

/* Gradient helpers */
.section-grad {
  background: linear-gradient(180deg, rgba(124,58,237,0.08), rgba(124,58,237,0) 60%);
}

/* Visually hidden for honeypot */
.vh { position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden; }
```

### `app/layout.tsx`
```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MakeYourApp — Agence web (IA + dev humain)',
  description: 'Créez votre app web, simplement. Brief → App → Déploiement. On s’occupe de tout.',
  openGraph: {
    title: 'MakeYourApp',
    description: 'Brief → App → Déploiement. On s’occupe de tout.',
    images: ['/og-image.png']
  },
  twitter: { card: 'summary_large_image', title: 'MakeYourApp', description: 'Agence web (IA + dev humain)', images: ['/og-image.png'] }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  )
}
```

### `components/Container.tsx`
```tsx
import { cn } from '@/lib/utils'
export default function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}
```

### `components/Section.tsx`
```tsx
import Container from './Container'
import { cn } from '@/lib/utils'
export default function Section({ id, title, subtitle, children, className }: { id?: string; title?: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('py-16 sm:py-24 section-grad', className)}>
      <Container>
        {title && <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">{title}</h2>}
        {subtitle && <p className="text-base/7 text-white/70 mb-8 max-w-2xl">{subtitle}</p>}
        {children}
      </Container>
    </section>
  )
}
```

### `components/Button.tsx`
```tsx
import { cn } from '@/lib/utils'
export default function Button({ as: As = 'button', href, children, className, ...props }: any) {
  const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-50 disabled:pointer-events-none shadow-soft';
  const styles = 'bg-primary/90 hover:bg-primary active:translate-y-px';
  const Comp: any = href ? 'a' : As
  return <Comp href={href} className={cn(base, styles, className)} {...props}>{children}</Comp>
}
```

### `components/Input.tsx` (similaire pour Select/Textarea/Checkbox)
```tsx
import { cn } from '@/lib/utils'
export function Input({ label, error, ...props }: any) {
  return (
    <label className="block space-y-1">
      <span className="text-sm text-white/80">{label}</span>
      <input {...props} className={cn('w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60', props.className)} />
      {error && <span className="text-xs text-red-400" role="alert">{error}</span>}
    </label>
  )
}
```

### `components/Header.tsx`
```tsx
import Container from './Container'
import Button from './Button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <Container className="flex h-14 items-center justify-between">
        <a href="#" className="font-semibold tracking-tight">MakeYourApp</a>
        <nav className="flex items-center gap-3">
          <a href="#process" className="text-sm opacity-80 hover:opacity-100">Approche</a>
          <Button href="#contact" className="h-9">Contact</Button>
        </nav>
      </Container>
    </header>
  )
}
```

### `components/Footer.tsx`
```tsx
import Container from './Container'
export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/10">
      <Container className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm opacity-70">© {new Date().getFullYear()} MakeYourApp</p>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/legal" className="opacity-80 hover:opacity-100">Mentions légales</a>
          <a href="/privacy" className="opacity-80 hover:opacity-100">Confidentialité</a>
          <a href="mailto:hello@makeyour.app" className="opacity-80 hover:opacity-100">hello@makeyour.app</a>
        </nav>
      </Container>
    </footer>
  )
}
```

### `lib/schema.ts`
```ts
import { z } from 'zod'

export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.enum(['Site vitrine','SaaS simple','E-commerce','Autre']),
  budget: z.enum(['< 1 000 €','1 000-3 000 €','3 000-8 000 €','> 8 000 €','À définir']),
  timeline: z.enum(['< 2 semaines','2-4 semaines','> 1 mois','Flexible']),
  description: z.string().min(20, 'Merci de décrire votre besoin (≥ 20 caractères)'),
  consent: z.boolean().refine(Boolean, 'Requis'),
  company: z.string().optional(), // honeypot
})

export type ContactFormInput = z.infer<typeof ContactFormSchema>
```

### `lib/ratelimit.ts`
```ts
const store = new Map<string, number>()
const WINDOW_MS = 60 * 60 * 1000
const LIMIT = 5

export function rateLimitKey(ip: string) {
  const slot = Math.floor(Date.now() / WINDOW_MS)
  return `${ip}:${slot}`
}

export function hit(ip: string) {
  const key = rateLimitKey(ip)
  const count = (store.get(key) ?? 0) + 1
  store.set(key, count)
  return { count, remaining: Math.max(0, LIMIT - count), limit: LIMIT }
}

export function isLimited(ip: string) {
  const key = rateLimitKey(ip)
  const count = store.get(key) ?? 0
  return count >= LIMIT
}
```

### `lib/utils.ts`
```ts
export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

export function getClientIp(headers: Headers) {
  const xf = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return xf || 'unknown'
}

export function traceId() {
  return Math.random().toString(36).slice(2, 10)
}
```

### `lib/mail.ts`
```ts
export async function sendMailViaResend({ to, subject, html }: { to: string; subject: string; html: string }) {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY manquant')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ from: 'MakeYourApp <no-reply@makeyour.app>', to, subject, html })
  })
  if (!res.ok) throw new Error(`Resend error ${res.status}`)
  return res.json()
}

export function renderLeadHtml(payload: Record<string, any>) {
  const rows = Object.entries(payload).map(([k,v]) => `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee"><b>${k}</b></td><td style="padding:6px 10px;border-bottom:1px solid #eee">${String(v ?? '')}</td></tr>`).join('')
  return `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Roboto;line-height:1.5;background:#0B0C10;color:#E6E6E6;padding:24px">
    <h2>Nouveau lead MakeYourApp</h2>
    <table style="width:100%;background:#111;border-radius:12px;border:1px solid #222">${rows}</table>
  </body></html>`
}
```

### `app/api/contact/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server'
import { ContactFormSchema } from '@/lib/schema'
import { getClientIp, traceId } from '@/lib/utils'
import { hit, isLimited } from '@/lib/ratelimit'
import { sendMailViaResend, renderLeadHtml } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    if (isLimited(ip)) {
      return NextResponse.json({ ok: false, error: 'Trop de requêtes, réessayez plus tard.' }, { status: 429 })
    }
    hit(ip)

    const data = await req.json()
    // Honeypot
    if (data?.company) {
      return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 })
    }

    const parsed = ContactFormSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Validation échouée', issues: parsed.error.flatten() }, { status: 400 })
    }

    const payload = parsed.data
    const tId = traceId()
    const body = {
      ...payload,
      ip,
      userAgent: req.headers.get('user-agent') || 'n/a',
      timestamp: new Date().toISOString()
    }

    const to = process.env.CONTACT_TO
    let sent = false
    if (process.env.RESEND_API_KEY && to) {
      await sendMailViaResend({ to, subject: `[Nouveau lead] ${payload.name} – ${payload.subject}` , html: renderLeadHtml(body) })
      sent = true
    } else if (process.env.FORMSPREE_ENDPOINT) {
      const res = await fetch(process.env.FORMSPREE_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error(`Formspree error ${res.status}`)
      sent = true
    } else {
      // Aucun provider configuré → on log seulement
      sent = true
    }

    console.log({ status: 'lead:ok', traceId: tId, email: payload.email, sujet: payload.subject })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('contact:error', e)
    return NextResponse.json({ ok: false, error: 'Une erreur est survenue.' }, { status: 500 })
  }
}
```

### `components/ContactForm.tsx`
```tsx
'use client'
import { useState } from 'react'
import { z } from 'zod'
import { ContactFormSchema } from '@/lib/schema'
import Button from './Button'
import { Input } from './Input'

const subjectOptions = ['Site vitrine','SaaS simple','E-commerce','Autre'] as const
const budgetOptions = ['< 1 000 €','1 000-3 000 €','3 000-8 000 €','> 8 000 €','À définir'] as const
const timelineOptions = ['< 2 semaines','2-4 semaines','> 1 mois','Flexible'] as const

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    setMessage(null)
    setErrors({})

    const form = ev.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    data.consent = formData.get('consent') === 'on'
    try {
      const parsed = ContactFormSchema.parse(data)
      setPending(true)
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) })
      const json = await res.json()
      if (json.ok) {
        setMessage('Merci, on revient vers vous sous 24h.')
        form.reset()
      } else {
        setMessage(json.error || 'Une erreur est survenue.')
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const flat = err.flatten()
        const errs: Record<string, string> = {}
        Object.entries(flat.fieldErrors).forEach(([k,v]) => { if (v && v[0]) errs[k] = v[0] })
        setErrors(errs)
      } else {
        setMessage('Une erreur est survenue.')
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 max-w-2xl" aria-live="polite">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input name="name" label="Nom *" placeholder="Votre nom" required error={errors.name} />
        <Input name="email" type="email" label="Email *" placeholder="vous@exemple.com" required error={errors.email} />
      </div>
      <Input name="phone" label="Téléphone" placeholder="Optionnel" />

      <label className="block space-y-1">
        <span className="text-sm text-white/80">Sujet</span>
        <select name="subject" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60">
          {subjectOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1">
          <span className="text-sm text-white/80">Budget</span>
          <select name="budget" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60">
            {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-white/80">Délai souhaité</span>
          <select name="timeline" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60">
            {timelineOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      </div>

      <label className="block space-y-1">
        <span className="text-sm text-white/80">Description du projet *</span>
        <textarea name="description" minLength={20} required placeholder="Parlez-nous de votre projet..." className="min-h-32 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60" />
        {errors.description && <span className="text-xs text-red-400" role="alert">{errors.description}</span>}
      </label>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" className="mt-1" />
        <span>J’accepte d’être contacté(e) et la politique de confidentialité.</span>
      </label>

      {/* Honeypot */}
      <div className="vh" aria-hidden="true">
        <label>Company<input name="company" autoComplete="off" tabIndex={-1} /></label>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>{pending ? 'Envoi…' : 'Envoyer'}</Button>
        {message && <span role="status" className="text-sm opacity-80">{message}</span>}
      </div>
    </form>
  )
}
```

### `app/page.tsx`
```tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Section from '@/components/Section'
import Button from '@/components/Button'
import dynamic from 'next/dynamic'
const ContactForm = dynamic(() => import('@/components/ContactForm'), { ssr: false })

function Trust() {
  const items = [
    { title: 'Livraison rapide', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12h13m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5"/></svg>) },
    { title: 'Code propre', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 16l-4-4 4-4m8 8l4-4-4-4" stroke="currentColor" strokeWidth="1.5"/></svg>) },
    { title: 'Déploiement Vercel', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 4l8 16H4l8-16z" fill="currentColor"/></svg>) },
    { title: 'Support e‑mail', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5"/><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5"/></svg>) },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
      {items.map((it) => (
        <div key={it.title} className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
          <span className="opacity-80">{it.icon}</span>
          <span className="text-sm opacity-90">{it.title}</span>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <Container className="text-center max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight animate-fadeIn">Créez votre app web, simplement.</h1>
            <p className="mt-4 text-white/70">Brief → App → Déploiement. On s’occupe de tout avec l’IA + dev humain.</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button href="#contact">Commencer</Button>
              <a href="#process" className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition">Voir notre approche</a>
            </div>
            <Trust />
          </Container>
        </section>

        <Section id="process" title="Notre approche" subtitle="Simple, pragmatique, orientée résultat.">
          <div className="grid sm:grid-cols-3 gap-4">
            {[{
              t:'Brief', d:'On clarifie votre besoin, le scope et les priorités.'
            },{
              t:'Génération & Ajustements', d:'On itère avec l’IA + dev pour coller à vos attentes.'
            },{
              t:'Déploiement', d:'Mise en ligne (Vercel) + support e‑mail.'
            }].map((c) => (
              <div key={c.t} className="rounded-2xl p-5 bg-white/5 border border-white/10">
                <h3 className="font-medium text-lg">{c.t}</h3>
                <p className="text-sm text-white/70 mt-2">{c.d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact" subtitle="Parlez-nous de votre projet — réponse sous 24h.">
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </>
  )
}
```

### `app/privacy/page.tsx` & `app/legal/page.tsx`
```tsx
import Container from '@/components/Container'
export default function Page() {
  return (
    <main className="py-16">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight mb-4">Confidentialité</h1>
        <p className="text-white/80 max-w-3xl">Ce texte est un exemple. Décrivez votre politique de confidentialité ici. Nous ne revendons pas vos données, etc.</p>
      </Container>
    </main>
  )
}
```

### `app/robots.ts`
```ts
import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: 'https://example.com/sitemap.xml' }
}
```

### `app/sitemap.ts`
```ts
import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://example.com/', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://example.com/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://example.com/legal', changeFrequency: 'yearly', priority: 0.3 },
  ]
}
```

### `.env.example`
```ini
# Envoi email (option 1)
RESEND_API_KEY=
CONTACT_TO=

# Fallback (option 2)
FORMSPREE_ENDPOINT=
```

### `.eslintrc.json`
```json
{ "extends": ["next", "next/core-web-vitals"], "rules": { "@next/next/no-img-element": "off" } }
```

### `.prettierrc`
```json
{ "singleQuote": true, "semi": false }
```

### `.editorconfig`
```
root = true
[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

### `README.md` (extrait)
```md
# MakeYourApp — Site vitrine (Next.js 14)

## Démarrer
pnpm i
cp .env.example .env.local
pnpm dev

## Variables d’environnement
- RESEND_API_KEY, CONTACT_TO : envoi via Resend
- FORMSPREE_ENDPOINT : fallback

## Déploiement
- Vercel recommandé. Renseigner les variables dans Project Settings → Environment Variables.
```

---
## Définition de Fini (DoD)
- `pnpm dev` compile **sans erreur** ; `pnpm build` passe.
- Lint & typecheck **OK**.
- Page `/` : header sticky, hero, bande confiance, process, contact, footer.
- Formulaire : validations Zod client/serveur ; honeypot opérationnel ; rate limit 5 req/h ; réponses JSON `{ ok: true }` / erreur claire ; aria-live fonctionne.
- SEO : metadata, `robots.ts`, `sitemap.ts`, favicon/OG image présents.
- Style : thème dark, spacing généreux, focus visibles, micro-animations.

---
## Livrables
- **Tous les fichiers** listés ci-dessus, **code complet**.
- Un **commit unique** intitulé `feat: site vitrine MakeYourApp (Next.js/Tailwind + contact)`.
- Aucune dépendance UI externe ajoutée.

> Quand tu as terminé, exécute les checks de base (build/lint/typecheck) et indique brièvement ce que tu as vérifié.

