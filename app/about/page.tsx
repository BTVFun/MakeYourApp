import type { Metadata } from 'next'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: '\u00c0 propos de nous',
}

const values = [
  'Clarifie chaque jalon et chaque livrable',
  'It\u00e8re rapidement avec des retours continus',
  'Garantit une exp\u00e9rience inclusive et accessible',
  'S\u00e9curise les donn\u00e9es et les workflows critiques',
]

const methodSteps = [
  {
    title: 'D\u00e9couverte',
    description: 'Nous explorons vos objectifs, votre cible et les contraintes de votre march\u00e9.',
  },
  {
    title: 'Prototype',
    description: 'Nous maquettons et testons les parcours cl\u00e9s pour valider l\u2019usage avant d\u2019\u00e9crire une ligne de code.',
  },
  {
    title: 'Dev & QA',
    description: 'Nous livrons un produit fiable avec des revues de code et des tests adapt\u00e9s \u00e0 chaque fonctionnalit\u00e9.',
  },
  {
    title: 'Lancement & Suivi',
    description: 'Nous d\u00e9ployons, formons vos \u00e9quipes et suivons les indicateurs pour pr\u00e9parer les \u00e9volutions futures.',
  },
]

const teamMembers = [
  { name: 'Thomas Delobel', role: 'D\u00e9veloppeur Full Stack' },
  { name: 'Vincent Duranteau', role: 'Expert en cybers\u00e9curit\u00e9' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-16 sm:py-24">
          <Container className="mx-auto max-w-4xl space-y-16">
            <header className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">{'\u00c0 propos'}</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{'Notre mission et notre m\u00e9thode'}</h1>
              <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                {'Nous concevons des applications web sur mesure pour aider les \u00e9quipes produit \u00e0 livrer vite sans sacrifier la qualit\u00e9. Nous privil\u00e9gions des cycles courts, une transparence totale et un pilotage par les donn\u00e9es. Chaque engagement est document\u00e9 pour que vous gardiez le contr\u00f4le du premier atelier au suivi post-lancement.'}
              </p>
            </header>

            <section aria-labelledby="mission">
              <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.06] p-8">
                <h2 id="mission" className="text-2xl font-semibold text-white">
                  Mission
                </h2>
                <p className="text-base leading-relaxed text-white/70">
                  {'Nous accompagnons les startups et PME pour transformer leurs id\u00e9es en exp\u00e9riences web robustes. Notre \u00e9quipe mise sur la transparence, la qualit\u00e9 du code et une communication r\u00e9guli\u00e8re. Nous visons des produits qui \u00e9voluent aussi vite que vos enjeux business.'}
                </p>
              </div>
            </section>

            <section aria-labelledby="valeurs">
              <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.06] p-8">
                <h2 id="valeurs" className="text-2xl font-semibold text-white">
                  Valeurs
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {values.map((value) => (
                    <li key={value} className="flex items-start gap-3 text-sm text-white/75">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="methode">
              <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.06] p-8">
                <h2 id="methode" className="text-2xl font-semibold text-white">
                  {'Notre m\u00e9thode'}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {methodSteps.map((step) => (
                    <div key={step.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section aria-labelledby="team">
              <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.06] p-8">
                <h2 id="team" className="text-2xl font-semibold text-white">
                  {'\u00c9quipe'}
                </h2>
                <p className="text-sm text-white/65">
                  {"Rencontrez l'\u00e9quipe qui pilote vos projets digitaux au quotidien. Suite \u00e0 l'obtention de nos dipl\u00f4mes dans le domaine de l'informatique, nous souhaitons mettre en pratique nos connaissances au service des particuliers et de petites entreprises. Force de cr\u00e9ation et d'innovation, nous sommes l\u00e0 pour r\u00e9pondre \u00e0 vos besoins et vous accompagner dans le d\u00e9veloppement de vos projets."}
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.name}
                      className="flex flex-col gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-white/75"
                    >
                      <div>
                        <span className="text-sm uppercase tracking-[0.25em] text-white/40">Nom</span>
                        <p className="text-xl font-semibold text-white">{member.name}</p>
                      </div>
                      <div>
                        <span className="text-sm uppercase tracking-[0.25em] text-white/40">{'R\u00f4le'}</span>
                        <p className="text-sm text-white/70">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section aria-labelledby="cta">
              <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-primary/30 to-primary/10 p-8 sm:flex-row sm:items-center">
                <div>
                  <h2 id="cta" className="text-2xl font-semibold text-white">
                    {'Pr\u00eats \u00e0 lancer votre prochain produit ?'}
                  </h2>
                  <p className="mt-2 text-sm text-white/75">
                    {'Nous discutons de votre id\u00e9e, du scope et du planning sous 24h.'}
                  </p>
                </div>
                <Button href="/#contact" aria-label="Acc\u00e9der au formulaire de contact sur la page d'accueil">
                  Parlons de votre projet
                </Button>
              </div>
            </section>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}

