import { z } from 'zod'

export const subjectValues = ['Site vitrine', 'SaaS simple', 'E-commerce', 'Autre'] as const
export const timelineValues = ['< 2 semaines', '2-4 semaines', '> 1 mois', 'Flexible'] as const

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
    description: z.string().min(20, 'Décrivez votre projet en quelques lignes (min. 20 caractères).'),
    consent: z.literal(true, { errorMap: () => ({ message: 'Le consentement est requis.' }) }),
    company: z.string().max(0).optional().or(z.literal('')),
  })
  .transform((data) => ({
    ...data,
    phone: data.phone?.trim() ? data.phone.trim() : undefined,
  }))

export type ContactFormInput = z.infer<typeof ContactFormSchema>
