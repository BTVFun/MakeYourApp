# Mode d’emploi — Utiliser le prompt Codex pour générer le site vitrine

## ⚡ TL;DR
Oui, tu peux coller le **prompt Codex** du canvas et le laisser dérouler. **Mais** pour éviter les blocages (packages manquants, questions d’auth, variables d’env), je te recommande le **mode supervisé léger** : tu lances le prompt, tu le laisses créer les fichiers, puis tu lui demandes **de lancer le build/dev et de corriger jusqu’au vert**. Tout est ci‑dessous (prompts prêts à coller).

---
## ✅ Pré‑requis côté machine / repo
- **Node 18+** et **pnpm** installés (`corepack enable`, puis `pnpm -v`).
- Un dossier vide **ou** un repo GitHub prêt (ramifié sur `main`).
- (Optionnel) **Vercel** connecté au repo si tu veux le déployer ensuite.
- (Optionnel) Un provider e‑mail :
  - **Resend** (clé `RESEND_API_KEY` + mail de réception `CONTACT_TO`),
  - **ou** un endpoint **Formspree** (`FORMSPREE_ENDPOINT`).

> Tu peux tester sans clé : l’API loguera les leads dans la console, et Formspree peut servir de fallback rapide.

---
## 🧰 Où est le prompt principal ?
Le **prompt Codex complet** se trouve dans le canvas : *“Prompt Codex — MakeYourApp site vitrine (Next.js/Tailwind)”*. C’est le document à coller dans Codex.

---
## 🛠️ Option A — Prompt unique « autonome » (one‑shot)
**Action :** colle le prompt principal dans Codex, puis enchaîne avec :

**Message 1 (contrôle d’exécution)**
> Exécute les étapes dans l’ordre, **sans demander de confirmation**, en créant tous les fichiers listés. Une fois les fichiers écrits, exécute :  
> `pnpm i`  
> `pnpm build`  
> `pnpm dev`  
> Corrige toute erreur jusqu’à ce que le build passe. À la fin, affiche :
> - la **liste des fichiers créés/modifiés**,  
> - le **résumé des checks** (build, lint, typecheck),  
> - les **prochaines actions manuelles** (variables d’environnement, déploiement Vercel).

**Message 2 (si e‑mail à tester sans clé)**
> Si `RESEND_API_KEY` et `CONTACT_TO` ne sont pas définis, utilise **Formspree** si `FORMSPREE_ENDPOINT` est présent. Sinon, logue l’objet `{ status, traceId, email, sujet }` côté serveur et renvoie `{ ok: true }`. N’interromps pas le build pour absence de clé.

---
## 🔁 Option B — Mode séquencé (supervision légère)
Utilise ces prompts **à la suite**, c’est très robuste pour éviter les oublis de fichiers.

**B1 — Initialisation projet**
> Crée un projet **Next.js 14 + TypeScript + Tailwind** nommé `makeyourapp-site`. Ajoute ESLint, Prettier, EditorConfig, scripts pnpm (`dev`, `build`, `start`, `lint`, `typecheck`). N’ajoute aucune UI lib externe. Prépare `tailwind.config.ts`, `postcss.config.js`, `styles/globals.css`.

**B2 — Arbo & fichiers config**
> Crée exactement l’arborescence et les fichiers indiqués dans le prompt (app/, components/, lib/, public/, styles/, etc.). Renseigne les contenus fournis **à la lettre**.

**B3 — Composants UI**
> Implémente `Container`, `Section`, `Button`, `Input`/`Select`/`Textarea`/`Checkbox`, `Header`, `Footer`, `Card`/`Badge` si prévus. Respecte le thème dark (bg `#0B0C10`, texte `#E6E6E6`, accent `#7C3AED`) et les focus states.

**B4 — Pages**
> Implémente `app/layout.tsx`, `app/page.tsx` (Hero, bande confiance, #process, #contact), `app/privacy/page.tsx`, `app/legal/page.tsx`, `app/robots.ts`, `app/sitemap.ts`.

**B5 — Schémas & utilitaires**
> Implémente `lib/schema.ts` (Zod), `lib/utils.ts` (cn, getClientIp, traceId), `lib/ratelimit.ts` (Map mémoire, 5 req/h), `lib/mail.ts` (Resend + template HTML + fallback Formspree).

**B6 — API contact**
> Implémente `app/api/contact/route.ts` avec : honeypot, rate limit, validation Zod, envoi Resend ou fallback Formspree, logs serveur, réponses `{ ok: true }` / `{ ok: false, error }`.

**B7 — Installation & vérifs**
> Exécute `pnpm i`, puis `pnpm build`. Corrige jusqu’au **build OK**. Ensuite `pnpm dev` et vérifie que `/` s’affiche.

**B8 — Tests fonctionnels**
> - Teste le formulaire : valide client + serveur, aria‑live, honeypot (forcer un remplissage → 400), rate limit (6ème requête → 429).
> - Affiche dans la console le résultat de l’appel `/api/contact`.

**B9 — Livrables**
> Génère `.env.example` avec `RESEND_API_KEY=`, `CONTACT_TO=`, `FORMSPREE_ENDPOINT=`. Écris un `README.md` succinct (install, dev, env, déploiement Vercel). Fais un commit `feat: site vitrine MakeYourApp (Next.js/Tailwind + contact)`.

---
## 🔐 Variables d’environnement (pour tests rapides)
Crée `./.env.local` :
```
# Option A — Resend
RESEND_API_KEY= # (optionnel pour dev)
CONTACT_TO= # ton email de réception

# Option B — Formspree (fallback simple)
FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxx
```
> En dev, tu peux laisser tout vide : la route API renverra `{ ok: true }` et loguera.

---
## 🧪 Check‑list de validation
- `pnpm build` passe sans erreur ; `pnpm dev` affiche la home.
- Header sticky, Hero, confiance, process, contact, footer visibles.
- Formulaire :
  - Zod client/serveur : erreurs lisibles, aria‑live, focus sur champs invalides.
  - Honeypot remplit → 400.
  - 6ème requête depuis la même IP dans l’heure → 429.
  - Réponse succès `{ ok: true }`.
- SEO : metadata, `robots.ts`, `sitemap.ts`, favicon/OG présents.

---
## 🚀 Déploiement Vercel (rapide)
1) Push sur GitHub, **Import** sur Vercel.  
2) Project Settings → **Environment Variables** : colle les clés utiles.  
3) Deploy.  
4) Teste `/api/contact` en prod (réelles réponses e‑mail si clés fournies).

---
## ❓FAQ express
**Puis‑je vraiment “le laisser travailler” ?**  
Oui pour la génération de fichiers et les corrections de build. **Surveille quand même** les étapes clés (install deps, build, `pnpm dev`) et fournis les variables d’env si tu veux tester l’envoi e‑mail réel.

**Et sur iOS ?**  
Ça marche, mais c’est plus confortable sur desktop pour voir les arborescences, lancer `pnpm dev` et pousser sur GitHub.

**Pas de clé Resend ?**  
Utilise **Formspree** en 2 minutes, ou reste en mode log serveur pour dev.

