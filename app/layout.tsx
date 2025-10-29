import type { Metadata } from 'next'
import '@/styles/globals.css'

const siteUrl = 'https://makeyourapp.eu'
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
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-bg text-text antialiased font-sans">{children}</body>
    </html>
  )
}
