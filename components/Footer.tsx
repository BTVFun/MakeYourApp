import Link from 'next/link'

import Container from '@/components/Container'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <Container className="flex flex-col gap-6 py-8 text-sm text-white/70 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-base font-semibold text-white">MakeYourApp</p>
          <p>Agence web - produits sur mesure</p>
          <a href="mailto:makeyourappp@gmail.com" className="mt-2 inline-flex text-primary hover:underline">
            makeyourappp@gmail.com
          </a>
        </div>
        <nav aria-label="Liens légaux" className="flex flex-col gap-2">
          <Link href="/legal" className="transition hover:text-white">
            Mentions légales
          </Link>
          <Link href="/privacy" className="transition hover:text-white">
            Politique de confidentialité
          </Link>
          <Link href="/#contact" className="transition hover:text-white">
            Contact
          </Link>
        </nav>
        <p className="text-xs text-white/60">
          &copy; {new Date().getFullYear()} MakeYourApp &mdash; Tous droits réservés.
        </p>
      </Container>
    </footer>
  )
}
