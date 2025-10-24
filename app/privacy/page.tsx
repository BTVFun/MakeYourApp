import Container from '@/components/Container'

export default function PrivacyPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container className="max-w-3xl space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Confidentialité</h1>
        <p className="text-white/80">
          Nous collectons uniquement les informations nécessaires pour répondre à votre demande et conduire notre collaboration. Les
          données sont conservées de manière sécurisée, ne sont jamais revendues et peuvent être supprimées sur simple demande à{' '}
          <a href="mailto:makeyourapppgmail.com" className="text-primary hover:underline">
            makeyourapppgmail.com
          </a>
          .
        </p>
        <p className="text-white/70">
          Pour toute question concernant vos données ou l&apos;exercice de vos droits (accès, rectification, suppression), contactez notre
          équipe. Une réponse vous sera apportée sous 72h.
        </p>
        <a href="/" className="inline-flex text-sm text-primary hover:underline">
          ← Retour à l&apos;accueil
        </a>
      </Container>
    </main>
  )
}
