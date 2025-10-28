import { z } from 'zod'

export const subjectValues = ['Site vitrine', 'SaaS simple', 'E-commerce', 'Autre'] as const
export const timelineValues = ['< 2 semaines', '2-4 semaines', '> 1 mois', 'Flexible'] as const
export const budgetValues = [
  '< 500 €',
  '< 1 000 €',
  '1 000 - 3 000 €',
  '3 000 - 7 000 €',
  '7 000 - 15 000 €',
  '> 15 000 €',
  'Autre (préciser)',
] as const

const budgetOtherValue = budgetValues[budgetValues.length - 1]

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const ContactFormSchema = z
  .object({
    name: z.string().min(2, "Merci d'indiquer votre nom complet."),
    email: z.string().regex(emailRegex, 'Email invalide.'),
    phone: z
      .string()
      .max(40, 'Téléphone trop long.')
      .optional()
      .or(z.literal('')),
    subject: z.enum(subjectValues, { errorMap: () => ({ message: 'Choisissez un sujet.' }) }),
    timeline: z.enum(timelineValues, { errorMap: () => ({ message: 'Sélectionnez un délai.' }) }),
    budget: z.enum(budgetValues, { errorMap: () => ({ message: 'Sélectionnez un budget.' }) }),
    budget_custom: z
      .string()
      .max(60, 'Budget personnalisé : 60 caractères maximum.')
      .optional()
      .or(z.literal('')),
    description: z.string().min(20, 'Décrivez votre projet en quelques lignes (min. 20 caractères).'),
    consent: z.literal(true, { errorMap: () => ({ message: 'Le consentement est requis.' }) }),
    company: z.string().max(0).optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (data.budget === budgetOtherValue) {
      const value = data.budget_custom?.trim() ?? ''
      if (!value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['budget_custom'],
          message: 'Précisez votre budget.',
        })
      }
    }
  })
  .transform(({ budget_custom, ...data }) => {
    const phone = data.phone?.trim() ? data.phone.trim() : undefined
    const customBudget =
      data.budget === budgetOtherValue && budget_custom?.trim()
        ? budget_custom.trim()
        : undefined

    return {
      ...data,
      phone,
      ...(customBudget ? { budget_custom: customBudget } : {}),
    }
  })

export type ContactFormInput = z.infer<typeof ContactFormSchema>
