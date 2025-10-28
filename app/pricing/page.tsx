import type { Metadata } from 'next'

import Badge from '@/components/Badge'
import Container from '@/components/Container'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

type Plan = {
  name: string
  price: string
  description: string
  features: string[]
  slug: string
  popular?: boolean
}

const plans: Plan[] = [
  {
    name: 'Essentiel',
    price: '29,99 €/mois',
    description: 'Le socle pour garder votre application à jour et disponible.',
    features: [
      'Mises à jour de sécurité & dépendances (mensuel)',
      'Sauvegardes automatiques hebdo',
      'Monitoring uptime 24/7',
      'Support par email (48h ouvrées)',
    ],
    slug: 'essentiel',
  },
  {
    name: 'Pro Actif',
    price: '79,99 €/mois',
    description: 'Idéal pour faire évoluer votre produit sans mobiliser votre équipe.',
    features: [
      'Tout Essentiel',
      '2h/mois de petites évolutions (contenu, styles)',
      'Optimisations perfs de base (Core Web Vitals)',
      'Rapport mensuel (performances, SEO basique)',
    ],
    slug: 'pro-actif',
    popular: true,
  },
  {
    name: 'Growth+',
    price: '149,99 €/mois',
    description: 'Un accompagnement poussé pour accélérer vos conversions.',
    features: [
      'Tout Pro Actif',
      '6h/mois d’évolutions',
      'A/B tests légers & roadmap trimestrielle',
      'Revue SEO on-page (mensuel)',
    ],
    slug: 'growth-plus',
  },
  {
    name: 'Entreprise',
    price: 'Sur devis',
    description: 'Partenaire dédié pour vos exigences de sécurité et d’intégration.',
    features: [
      'SLA personnalisé, priorisation, sécurité avancée, intégrations spécifiques.',
    ],
    slug: 'entreprise',
  },
]

export const metadata: Metadata = {
  title: 'Forfaits de maintenance et suivi',
  description:
    'Découvrez nos forfaits Essentiel, Pro Actif, Growth+ et Entreprise pour maintenir votre application web sécurisée, performante et évolutive.',
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-16 sm:py-24">
          <Container className="space-y-16">
            <header className="text-center">
              <Badge className="mx-auto bg-white/10 text-white/70">Maintenance & suivi</Badge>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Nos forfaits de maintenance
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
                Faites évoluer votre application sans surprise. Chaque forfait inclut la supervision, les mises à jour et un support
                réactif pour garder vos utilisateurs satisfaits.
              </p>
            </header>

            <div aria-labelledby="pricing-plans">
              <div className="flex flex-col gap-3 text-center sm:gap-4">
                <h2 id="pricing-plans" className="text-2xl font-semibold text-white sm:text-3xl">
                  Choisissez le plan qui correspond à votre rythme
                </h2>
                <p className="mx-auto max-w-3xl text-sm text-white/65 sm:text-base">
                  Tous nos forfaits sont sans engagement, ajustables à tout moment et facturés mensuellement.
                </p>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {plans.map((plan) => (
                  <article
                    key={plan.slug}
                    aria-labelledby={`plan-${plan.slug}`}
                    className="flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.1]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 id={`plan-${plan.slug}`} className="text-xl font-semibold text-white">
                          {plan.name}
                        </h3>
                        {plan.popular ? (
                          <Badge className="bg-primary/15 text-primary/90">Populaire</Badge>
                        ) : null}
                      </div>
                      <p className="mt-4 text-3xl font-semibold text-white">{plan.price}</p>
                      <p className="mt-2 text-sm text-white/65">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 text-sm text-white/75">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-primary" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
