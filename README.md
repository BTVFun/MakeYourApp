# MakeYourApp - Site vitrine (Next.js 14)

## Prerequis
- Node.js >= 18
- pnpm >= 8

## Installation
```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Scripts utiles
- `pnpm dev` : serveur de developpement avec rechargement a chaud
- `pnpm lint` : verifie les regles ESLint
- `pnpm typecheck` : verification TypeScript sans emission
- `pnpm build` : build de production
- `pnpm start` : demarre le serveur de production
- `pnpm format` : verifie le formatage Prettier

## Variables d'environnement
- `RESEND_API_KEY` & `CONTACT_TO` : envoi d'e-mails via Resend
- `FORMSPREE_ENDPOINT` : fallback Formspree si Resend non configure

Sans ces valeurs, l'API logue les leads cote serveur et renvoie toujours `ok: true`.

## Deploiement
- Deploiement recommande : [Vercel](https://vercel.com/)
- Pensez a renseigner les variables d'environnement dans *Project Settings -> Environment Variables*

## Architecture
- `app/` : pages Next.js (App Router)
- `components/` : composants UI reutilisables
- `lib/` : schemas, utilitaires, logique d'envoi
- `styles/` : styles globaux Tailwind
- `public/` : assets statiques (favicon, og-image)

## Qualite
- TailwindCSS + theme sombre personnalise
- Formulaire avec validation Zod (client & serveur)
- Rate limit 5 requetes / heure / IP + honeypot anti-bot
- SEO : metadata, sitemap, robots, favicon & image Open Graph
