'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { Textarea } from '@/components/Textarea'
import { Checkbox } from '@/components/Checkbox'
import { ContactFormSchema, budgetValues } from '@/lib/schema'

type FieldErrors = Record<string, string>

const subjectOptions = [
  { label: 'Site vitrine', value: 'Site vitrine' },
  { label: 'SaaS simple', value: 'SaaS simple' },
  { label: 'E-commerce', value: 'E-commerce' },
  { label: 'Utilisation Personnelle', value: 'Utilisation Personnelle' },
  { label: 'Autre', value: 'Autre' },
]

const timelineOptions = [
  { label: '< 2 semaines', value: '< 2 semaines' },
  { label: '2-4 semaines', value: '2-4 semaines' },
  { label: '> 1 mois', value: '> 1 mois' },
  { label: 'Flexible', value: 'Flexible' },
]

const budgetOptions = budgetValues.map((value) => ({
  label: value,
  value,
}))

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<{ variant: 'success' | 'error'; text: string } | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [budgetChoice, setBudgetChoice] = useState('')

  const customBudgetValue = budgetValues[budgetValues.length - 1]
  const showCustomBudget = budgetChoice === customBudgetValue

  useEffect(() => {
    const select = document.querySelector<HTMLSelectElement>('select[name="budget"]')
    if (select && select.value) {
      setBudgetChoice(select.value)
    }
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setErrors({})

    const form = event.currentTarget
    const formData = new FormData(form)
    const raw: Record<string, string> = {}
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        raw[key] = value
      }
    })

    const submission = {
      ...raw,
      consent: formData.get('consent') === 'on',
    }

    if (typeof raw.budget === 'string') {
      setBudgetChoice(raw.budget)
    }

    try {
      const parsed = ContactFormSchema.parse(submission)
      setPending(true)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      })
      const payload = await response.json()
      if (payload.ok) {
        setMessage({ variant: 'success', text: 'Merci, on revient vers vous sous 24h.' })
        form.reset()
        setBudgetChoice('')
      } else {
        setMessage({ variant: 'error', text: payload.error ?? 'Une erreur est survenue.' })
        if (payload.issues?.fieldErrors) {
          const fieldErrors = payload.issues.fieldErrors as Record<string, string[]>
          const nextErrors: FieldErrors = {}
          Object.entries(fieldErrors).forEach(([key, value]) => {
            if (value && value[0]) {
              nextErrors[key] = value[0]
            }
          })
          setErrors(nextErrors)
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const flat = error.flatten()
        const fieldErrors: FieldErrors = {}
        Object.entries(flat.fieldErrors).forEach(([key, value]) => {
          if (value && value[0]) {
            fieldErrors[key] = value[0]
          }
        })
        setErrors(fieldErrors)
        setMessage({ variant: 'error', text: 'Merci de vérifier le formulaire.' })
      } else {
        setMessage({ variant: 'error', text: 'Une erreur est survenue.' })
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="vh" aria-hidden="true">
        <label htmlFor="company">Votre société</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input label="Nom complet" name="name" placeholder="Alex Martin" required autoComplete="name" error={errors.name} />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="vous@exemple.com"
          required
          autoComplete="email"
          error={errors.email}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Téléphone"
          name="phone"
          type="tel"
          placeholder="+33 6 12 34 56 78"
          autoComplete="tel"
          error={errors.phone}
        />
        <Select
          label="Sujet"
          name="subject"
          required
          defaultValue=""
          placeholder="Sélectionnez un sujet"
          options={subjectOptions}
          error={errors.subject}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="Délai"
          name="timeline"
          required
          defaultValue=""
          placeholder="Quand démarrer ?"
          options={timelineOptions}
          error={errors.timeline}
        />
        <Select
          label="Budget"
          name="budget"
          required
          defaultValue=""
          placeholder="Sélectionnez une fourchette"
          onChange={(event) => setBudgetChoice(event.target.value)}
          options={budgetOptions}
          helper="Estimation pour cadrer la proposition."
          error={errors.budget}
        />
        {showCustomBudget && (
          <Input
            className="md:col-span-2"
            label="Budget (précisez)"
            name="budget_custom"
            placeholder="Ex : budget mensuel, TJM, autres détails..."
            maxLength={60}
            required
            error={errors.budget_custom}
          />
        )}
        <Textarea
          className="md:col-span-2"
          label="Description"
          name="description"
          minLength={20}
          required
          placeholder="Expliquez votre projet, vos objectifs, les fonctionnalités clés..."
          helper="Minimum 20 caractères pour bien comprendre votre projet."
          error={errors.description}
          rows={6}
        />
      </div>

      <Checkbox label="J’accepte d’être contacté(e) et la politique de confidentialité." name="consent" required error={errors.consent} />

      <div className="space-y-4">
        <Button variant="primary" className="w-full sm:w-auto" disabled={pending} type="submit">
          {pending ? 'Envoi...' : 'Envoyer mon brief'}
        </Button>
        <div aria-live="polite" role="status" className="min-h-[1.5rem] text-sm">
          {message && (
            <div className={message.variant === 'success' ? 'text-emerald-400' : 'text-red-400'} role="alert">
              {message.text}
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
