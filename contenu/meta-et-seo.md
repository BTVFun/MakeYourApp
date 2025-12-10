# Métadonnées, manifestes et SEO technique

## Contenu extrait

- **Metadata layout**
  - Site URL : `https://makeyourapp.eu`
  - Description : « Créez votre app web, simplement. Brief → App → Déploiement. On s'occupe de tout avec une équipe produit dédiée. »
  - Titre par défaut : « MakeYourApp · Agence web produit »
  - OpenGraph : locale `fr_FR`, images `/og-image.png`
  - Twitter card : `summary_large_image`
  - Icônes : favicon, svg, manifest 192/512, apple-touch 180.
  - Manifest : `/site.webmanifest`
- **Manifest public**
  - Nom : « MakeYourApp – Agence web produit »
  - Description : « Créez votre app web sur mesure. Brief → App → Déploiement... »
  - Langue : `fr-FR`
  - Shortcuts :
    - « Démarrer votre projet » → `/#contact`
    - « Voir notre approche » → `/#process`
  - Catégories : business, productivity.
- **robots.txt** : autorise tout, sitemap `https://makeyourapp.eu/sitemap.xml`
- **sitemap** : racine (priority 1), `/privacy`, `/legal` priority 0.3 changfreq yearly.

## Version optimisée

### Meta tags suggérés
- Titre principal : « MakeYourApp · Agence de création de sites web en Île-de-France pour l’Europe »
- Description : « Agence web parisienne spécialisée en sites vitrines, SaaS et e-commerce multilingues. Conception, développement, maintenance et SEO pour les entreprises européennes. »
- Ajouter `keywords` (optionnel) : « création site web Île-de-France, agence web Paris, site multilingue Europe, refonte accessibilité, Next.js, SEO technique ».
- Ajouter `alternate` hreflang si site multilingue prévu (fr/en).

### OpenGraph
- OG title : « MakeYourApp — Sites web sur-mesure pour l’Europe »
- OG description alignée.
- Ajouter `og:locale:alternate` pour `en_GB`, `de_DE`, `es_ES` si traductions.

### Manifest
- Passer `lang` à `fr-FR` + `en-GB` via `dir`.
- Ajouter screenshot vertical + tagline multilingue.
- Décrire `description` : « Agence francilienne de conception web — projets livrés en Europe. »

### robots & sitemap
- Étendre sitemap vers `/about`, `/pricing`, `/#process` (ancré), futures pages blog/études de cas.
- Ajouter règle `Clean-param` si besoin, bloquer `/api/`.

### Données structurées
- Préconiser JSON-LD `Organization` et `Service` incluant localisation Île-de-France et zone desservie Europe.
- Ajouter `BreadcrumbList` pour les pages statiques.
