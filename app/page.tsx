import Badge from '@/components/Badge'
import Button from '@/components/Button'
import ContactForm from '@/components/ContactForm'
import Container from '@/components/Container'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Section from '@/components/Section'
import { Spotlight } from '@/components/ui/spotlight-new'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'

const trustItems = [
  {
    title: 'Livraison rapide',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 13h13m0-8h3.5L21 8v10a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2H9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a4 4 0 0 1 4-4h8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Code propre',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 9l-4 3 4 3m6-6l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 5l-4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Déploiement Vercel',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4l9 16H3l9-16z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Support email',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const processSteps = [
  {
    title: 'Brief',
    description: 'On clarifie votre besoin, vos utilisateurs et le périmètre fonctionnel.',
  },
  {
    title: 'Production & itérations',
    description: 'Une équipe produit dédiée pour prototyper, ajuster et valider rapidement votre application.',
  },
  {
    title: 'Déploiement',
    description: 'Mise en ligne sur Vercel, handover clair et support email pour les évolutions.',
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-0 -z-10">
            <Spotlight
              gradientFirst="radial-gradient(68% 70% at 55% 32%, rgba(124, 58, 237, 0.28) 0%, rgba(124, 58, 237, 0.08) 45%, rgba(124, 58, 237, 0))"
              gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(167, 139, 250, 0.24) 0%, rgba(124, 58, 237, 0.08) 70%, transparent 100%)"
              gradientThird="radial-gradient(50% 50% at 50% 50%, rgba(236, 233, 254, 0.6) 0%, rgba(124, 58, 237, 0.06) 70%, transparent 100%)"
              translateY={-320}
              width={620}
              smallWidth={260}
              duration={9}
              xOffset={140}
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-primary/25 to-transparent blur-3xl" />
          <Container className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
            <Badge>Agence web · expertise produit</Badge>
            <h1 className="mt-6 animate-fadeIn text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Créez votre app web, simplement.
            </h1>
            <p className="mt-6 text-base text-white/70 sm:text-lg">
           Brief → App → Déploiement.<br />
           Vous souhaitez créer votre propre application, personnelle ou professionnelle ?<br />
           Notre équipe de développeurs la conçoit sur mesure et la livre rapidement.<br />
           Contactez-nous par mail pour transformer votre idée en réalité.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="#contact">Commencer</Button>
              <Button href="#process" variant="secondary">
                Voir notre approche
              </Button>
            </div>
            <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-left text-sm text-white/80 transition hover:border-primary/30 hover:bg-white/[0.1]"
                >
                  <span className="text-primary">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <Section id="process" title="Notre approche" subtitle="Un parcours clair en trois étapes pour passer de l’idée à la mise en ligne sans friction.">
          <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/70 sm:text-base max-w-2xl">
              Besoin d&apos;un accompagnement continu ? Nos forfaits couvrent la maintenance, les sauvegardes et le suivi de vos performances.
            </p>
            <Button href="/pricing" variant="secondary" className="whitespace-nowrap" aria-label="Consulter les tarifs de maintenance">
              Tarifs de maintenance
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {processSteps.map((step) => (
              <CardContainer key={step.title} containerClassName="!py-0 w-full" className="h-full w-full">
                <CardBody className="group/card relative flex !h-full !w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-left transition-colors duration-300 group-hover/card:border-primary/30 group-hover/card:bg-white/[0.09]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                    style={{
                      background: 'radial-gradient(circle at top, rgba(124, 58, 237, 0.25), transparent 65%)',
                    }}
                  />
                  <CardItem translateZ={120} className="relative z-10 text-lg font-semibold text-white">
                    {step.title}
                  </CardItem>
                  <CardItem translateZ={80} className="relative z-10 mt-3 text-sm text-white/70 leading-relaxed">
                    {step.description}
                  </CardItem>
                </CardBody>
              </CardContainer>
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
