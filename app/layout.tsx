import type { Metadata } from 'next'
import '@/styles/globals.css'

const siteUrl = 'https://makeyour.app'
const description =
  "Créez votre app web, simplement. Brief → App → Déploiement. On s'occupe de tout avec une équipe produit dédiée."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MakeYourApp · Agence web produit',
    template: '%s · MakeYourApp',
  },
  description,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    title: 'MakeYourApp',
    description,
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MakeYourApp',
    description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-bg text-text antialiased font-sans">{children}</body>
    </html>
  )
}
