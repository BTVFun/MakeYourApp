import Container from '@/components/Container'

export default function LegalPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container className="max-w-3xl space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Mentions légales</h1>
        <p className="text-white/80">
          MakeYourApp est une agence spécialisée dans la conception d&apos;applications web sur mesure. Directeur de publication : Alex Martin — makeyourapppgmail.com.
        </p>
        <p className="text-white/70">
          Hébergeur : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Les contenus présents sur ce site sont fournis à titre informatif. Toute reproduction sans autorisation est interdite.
        </p>
        <a href="/" className="inline-flex text-sm text-primary hover:underline">
          ← Retour à l&apos;accueil
        </a>
      </Container>
    </main>
  )
}
