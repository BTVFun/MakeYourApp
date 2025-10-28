import Badge from '@/components/Badge'
import Container from '@/components/Container'

export const metadata = {
  title: 'Politique de confidentialité',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PrivacyPage() {
  return (
    <main>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-primary/25 via-primary/10 to-transparent blur-3xl" />
        <Container className="relative mx-auto max-w-4xl text-center">
          <Badge>Protection des données</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Politique de confidentialité</h1>
          <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">
            MakeYourApp traite vos informations personnelles avec la plus grande attention et dans le respect des exigences du RGPD.
            <br />
            Ce document vous présente les traitements mis en œuvre, vos droits et la manière dont nous sécurisons vos données.
            <br />
            Il s&apos;applique à l&apos;ensemble des services et formulaires proposés sur ce site.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="mx-auto max-w-5xl space-y-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-white">Préambule</h2>
            <p className="mt-4 leading-relaxed text-white/70">
              MakeYourApp agit en tant que responsable de traitement pour les données collectées via ce site. Notre priorité est de vous
              offrir une expérience fluide tout en protégeant la confidentialité des informations que vous nous confiez.
              <br />
              Nous nous engageons à limiter la collecte au strict nécessaire et à mettre à jour régulièrement cette politique afin de
              refléter nos pratiques.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-white">Données collectées</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-white">Formulaire de contact</h3>
                <p className="mt-3 leading-relaxed text-white/70">
                  Informations demandées : nom, prénom, adresse e-mail, société, description de votre projet et toute précision utile pour
                  nous aider à répondre efficacement.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Cookies de navigation</h3>
                <p className="mt-3 leading-relaxed text-white/70">
                  Cookies essentiels pour garantir le bon fonctionnement du site.
                  <br />
                  Cookies analytiques déclenchés uniquement après votre consentement afin de mesurer l&apos;audience de manière agrégée.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Finalités du traitement</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-white/70">
                <li>Répondre à vos demandes et assurer le suivi commercial personnalisé.</li>
                <li>Préparer des recommandations et devis adaptés à votre projet.</li>
                <li>Améliorer la qualité du site grâce à des statistiques anonymisées.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Bases légales</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Les traitements liés aux formulaires reposent sur l&apos;intérêt légitime de MakeYourApp à gérer sa relation client et à
                développer ses services.
                <br />
                Les cookies non essentiels et les opérations de mesure d&apos;audience sont fondés sur votre consentement explicite, que vous
                pouvez retirer à tout moment.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-white">Durées de conservation</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-white/70">
              <li>Données issues des formulaires : 24 mois après le dernier échange constaté.</li>
              <li>Cookies de mesure d&apos;audience : durée de vie maximale de 13 mois.</li>
              <li>Logs techniques et de sécurité : 12 mois afin d&apos;assurer l&apos;intégrité du service.</li>
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Droits des personnes</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Vous pouvez exercer à tout moment vos droits d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition
                et de portabilité des données.
                <br />
                Vous avez également la possibilité de définir des directives relatives à la conservation, l&apos;effacement et la
                communication de vos données après votre décès.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Contact DPO</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Pour toute demande liée à la protection des données personnelles, adressez un message dédié à notre Délégué à la protection
                des données.
                <br />
                <a href="mailto:dpo@makeyourapp.fr" className="mt-3 inline-flex text-primary hover:text-primary/80">
                  dpo@makeyourapp.fr
                </a>
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Hébergeur</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Vercel Inc.
                <br />
                340 S Lemon Ave #4133
                <br />
                Walnut, CA 91789, États-Unis
                <br />
                L&apos;hébergeur met en œuvre des protections physiques, logiques et organisationnelles conformes aux standards
                internationaux.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Cookies &amp; analytics</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Vous pouvez ajuster vos préférences de consentement via le bandeau dédié ou en reparamétrant votre navigateur.
                <br />
                Les statistiques collectées sont agrégées et ne permettent pas d&apos;identifier directement les visiteurs du site.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Sécurité</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Des mesures techniques (chiffrement des transferts, audit des dépendances) et organisationnelles (contrôle d&apos;accès
                restreint, sensibilisation des équipes) sont mises en place pour protéger vos données contre tout accès non autorisé.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Modifications</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Nous actualisons cette politique à mesure que nos pratiques évoluent ou que la réglementation change.
                <br />
                Dernière mise à jour : 1 octobre 2024.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
