import Container from '@/components/Container'

const socials = [
  { name: 'LinkedIn', href: '#', label: 'LinkedIn' },
  { name: 'X', href: '#', label: 'X (Twitter)' },
  { name: 'GitHub', href: '#', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <Container className="flex flex-col gap-8 py-12 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold text-white">MakeYourApp</p>
          <p>Agence web · produits sur mesure</p>
          <a href="mailto:makeyourappp@gmail.com" className="mt-2 inline-flex text-primary hover:underline">
            makeyourappp@gmail.com
          </a>
        </div>
        <nav aria-label="Liens légaux" className="flex flex-col gap-2 text-white/70 sm:flex-row sm:items-center sm:gap-6">
          <a href="/legal" className="transition hover:text-white">
            Mentions légales
          </a>
          <a href="/privacy" className="transition hover:text-white">
            Confidentialité
          </a>
        </nav>
        <div className="flex items-center gap-3" aria-label="Réseaux sociaux">
          {socials.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-label={item.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-primary/40 hover:bg-primary/10 hover:text-white"
            >
              {item.name.charAt(0)}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  )
}
