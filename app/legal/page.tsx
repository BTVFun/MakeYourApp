import Badge from '@/components/Badge'
import Container from '@/components/Container'

export const metadata = {
  title: 'Mentions légales',
  robots: {
    index: true,
    follow: true,
  },
}

export default function LegalPage() {
  return (
    <main>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-primary/25 via-primary/10 to-transparent blur-3xl" />
        <Container className="relative mx-auto max-w-4xl text-center">
          <Badge>Cadre juridique</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Mentions légales</h1>
          <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">
            Informations légales et obligations de transparence pour le site MakeYourApp.
            <br />
            Nous détaillons ci-dessous l&apos;identité de l&apos;éditeur, les moyens de contact et les règles d&apos;utilisation du contenu.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="mx-auto max-w-5xl space-y-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-white">Éditeur du site</h2>
            <p className="mt-4 leading-relaxed text-white/70">
              MakeYourApp
              <br />
              Siège social : A renseigner
              <br />
              Immatriculée au RCS de Paris sous le numéro 000&nbsp;000&nbsp;000
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Directeur de publication</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Thomas Delobel, Vincent Duranteau
                <br />
                Présidents de MakeYourApp
                <br />
                Responsable de la rédaction et de la validité des contenus mis en ligne.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Contact</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Téléphone : +33 (0)1 23 45 67 89
                <br />
                Adresse électronique :{' '}
                <a href="mailto:makeyourappp@gmail.com" className="inline-flex text-primary hover:text-primary/80" aria-label="Envoyer un e-mail à MakeYourApp">
                  makeyourappp@gmail.com
                </a>
                <br />
                Support disponible du lundi au vendredi, de 9h à 18h (UTC+1).
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-white">Hébergeur</h2>
            <p className="mt-4 leading-relaxed text-white/70">
              Vercel Inc.
              <br />
              340 S Lemon Ave #4133
              <br />
              Walnut, CA 91789, États-Unis
              <br />
              <a href="https://vercel.com" className="inline-flex text-primary hover:text-primary/80" rel="noreferrer">
                vercel.com
              </a>
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-white">Propriété intellectuelle</h2>
            <p className="mt-4 leading-relaxed text-white/70">
              L&apos;ensemble des contenus présents sur ce site (textes, visuels, logos, vidéos, icônes, maquettes) est protégé par le Code
              de la propriété intellectuelle et demeure la propriété exclusive de MakeYourApp ou de ses partenaires.
              <br />
              Toute reproduction, représentation, adaptation ou exploitation, partielle ou totale, des éléments du site nécessite une
              autorisation écrite préalable.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-white">Limitation de responsabilité</h2>
            <p className="mt-4 leading-relaxed text-white/70">
              MakeYourApp veille à la qualité et à l&apos;actualisation des informations diffusées. Malgré tout le soin apporté, des erreurs
              ou omissions peuvent subsister.
              <br />
              L&apos;utilisateur exploite les informations sous sa responsabilité et s&apos;engage à vérifier leur pertinence avant toute
              décision. MakeYourApp décline toute responsabilité quant aux contenus publiés sur les sites tiers accessibles via un lien
              hypertexte.
            </p>
          </div>
        </Container>
      </section>
    </main>
  )
}
