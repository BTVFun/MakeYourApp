# tasks.md — V1 Page d’accueil MakeYourApp (HTML/CSS/JS + GSAP)

## T1 — Cadrage & contenus des 3 sections

**But**  
Verrouiller les textes et le message de chaque section de la home avant d’intégrer.

**Entrées**  
- Maquette Excalidraw de la home  
- Palette de couleurs validée  
- Logo final  

**Étapes**  
1. Lister les 3 sections de la page d’accueil :
   - S1 : "Qui on est" (présentation MakeYourApp / proposition de valeur)
   - S2 : "Notre approche" (méthode, étapes, manière de travailler)
   - S3 : "Contact" (formulaire pour prise de contact / demande de devis)
2. Rédiger une première version des textes pour chaque section :
   - Titre principal (H1 pour S1, H2 pour S2 et S3)
   - Sous-titres éventuels
   - Paragraphes courts (2–4 lignes max chacun)
   - Éléments de liste si besoin (bullet points pour l’approche)
3. Définir le texte des boutons / CTA (ex. "Discuter de votre projet", "Nous contacter").
4. Valider en interne : ton, clarté, longueur, cohérence avec l’image de marque.

**Critères de validation**  
- Chaque section a un titre, un texte clair et au moins un CTA là où c’est pertinent.
- Le H1 explique en 1 phrase pour qui vous travaillez et ce que vous faites.
- Les textes tiennent sur la maquette prévue sans surcharger visuellement.

---

## T2 — Préparation des assets & identité (logo, palette, favicons)

**But**  
Centraliser tout ce qui touche à l’identité visuelle pour qu’il soit prêt à être utilisé dans le projet.

**Entrées**  
- Fichiers du logo (SVG/PNG)  
- Palette de couleurs  
- Maquette Excalidraw  

**Étapes**  
1. Créer un dossier `/design/` pour stocker :
   - Maquette Excalidraw (export PNG + fichier source)
   - Référentiel palette (ex. `palette-couleurs.txt` ou capture)
2. Exporter le logo dans les formats nécessaires :
   - `logo.svg` (prioritaire)
   - `logo-horizontal.svg` si variante
   - `logo-192.png`, `logo-512.png` si besoin pour favicon / PWA
3. Noter les couleurs principales sous forme de variables (nom provisoire) :
   - `--color-primary`, `--color-bg`, `--color-text`, etc.
4. Créer un favicon simple à partir du logo (ou initiales) et l’enregistrer dans `/assets/img/`.

**Critères de validation**  
- Tous les fichiers graphiques sont rangés dans `/assets/img/` ou `/design/`.
- La palette est documentée et prête à être traduite en variables CSS.

---

## T3 — Initialisation du projet & structure de base

**But**  
Mettre en place le squelette du projet (dossiers, fichiers de base, Git).

**Entrées**  
- Rien, projet vierge  

**Étapes**  
1. Créer un nouveau dépôt Git (local + remote).
2. Créer l’arborescence minimale (voir section “Structure de fichiers”).
3. Créer les fichiers vides :
   - `index.html`
   - `assets/css/base.css`, `layout.css`, `components.css`, `pages/home.css`
   - `assets/js/main.js`, `gsap-animations.js`, `contact-form.js`
4. Ajouter un `README.md` avec :
   - Objectif du projet
   - Stack (HTML/CSS/JS + GSAP)
   - Instructions d’ouverture en local (Live Server, etc.)
5. Faire un premier commit `chore: init projet home MakeYourApp`.

**Critères de validation**  
- Le projet ouvre sans erreur en local.
- L’arborescence correspond à ce qui est défini dans la structure de fichiers.

---

## T4 — Structure HTML de la page d’accueil (sans styles)

**But**  
Poser la structure sémantique de la home avec les 3 sections, sans se préoccuper du design.

**Entrées**  
- Textes validés (T1)  
- Maquette Excalidraw  

**Étapes**  
1. Dans `index.html`, créer la structure globale :
   - `<!DOCTYPE html>`, `<html lang="fr">`, `<head>`, `<body>`
   - `<header>` (logo + navigation minimale si nécessaire)
   - `<main>`
     - `<section id="hero" class="section section-hero">` (Qui on est)
     - `<section id="approche" class="section section-approche">`
     - `<section id="contact" class="section section-contact">`
   - `<footer>`
2. Ajouter les titres et contenus textuels dans chaque section (sans mise en forme).
3. Créer la structure de formulaire de contact :
   - `<form id="contact-form">`
   - Champs : nom, email, sujet (optionnel), message, consentement RGPD (case à cocher)
   - Bouton “Envoyer”
4. Relier les fichiers CSS/JS dans le `<head>` / avant `</body>`.

**Critères de validation**  
- La page est lisible en texte brut, les sections sont bien identifiables.
- Le HTML passe un check de base (pas de balises non fermées, `lang="fr"` ok).

---

## T5 — Styles globaux (reset, variables, typographie, layout)

**But**  
Mettre en place un socle CSS propre et cohérent.

**Entrées**  
- Palette de couleurs  
- Choix des polices  

**Étapes**  
1. Dans `base.css` :
   - Ajouter un petit reset (margin: 0, padding: 0, box-sizing: border-box…)
   - Définir les variables CSS dans `:root` (couleurs, fonts, tailles).
   - Définir le style global du `body` (font-family, background, color, line-height).
2. Dans `layout.css` :
   - Créer des classes utilitaires : `.container`, `.section`, `.section--light`, `.section--dark`.
   - Définir la largeur maximale, marges (ex. max-width: 1200px, margin: 0 auto).
3. Dans `components.css` :
   - Créer les styles de base pour :
     - Boutons (`.btn`, `.btn-primary`, `.btn-secondary`)
     - Inputs / textarea (`.form-control`, labels, messages d’erreur)
     - Titres (`h1`, `h2`, `h3`) si besoin de styles communs.
4. Tester sur la page : la typographie et les espacements de base doivent être déjà agréables.

**Critères de validation**  
- La page a déjà un rendu propre, même sans styles spécifiques par section.
- Les couleurs sont uniquement gérées via les variables CSS (pas de hex “bruts” ailleurs).

---
A FAIRE 
## T6 — Styles spécifiques de la page d’accueil (sections hero, approche, contact)

**But**  
Aligner le rendu visuel de la home avec la maquette Excalidraw.

**Entrées**  
- Maquette Excalidraw  
- Socle CSS (T5)  

**Étapes**  
1. Dans `pages/home.css`, styliser la section hero :
   - Mise en page (grid ou flex)
   - Positionnement du logo si visible dans le hero
   - Styles du H1, sous-titre, CTA principal
2. Styliser la section “Notre approche” :
   - Disposition en colonnes ou cartes (ex. étapes 1 → 2 → 3)
   - Mise en avant des éléments clés (icônes, chiffres, etc. si prévus)
3. Styliser la section “Contact” :
   - Mise en forme du formulaire (largeur max, alignement, espacement)
   - Accent visuel sur le bouton d’envoi
4. Gérer le responsive pour ces 3 sections :
   - Mobile-first, puis breakpoints pour tablette et desktop.
5. Ajuster les espacements verticaux pour que le scroll soit fluide.

**Critères de validation**  
- Le rendu visuel est très proche de la maquette Excalidraw.
- La page est lisible et agréable sur mobile et desktop.

---

## T7 — Logique du formulaire de contact (JS)

**But**  
Rendre le formulaire de contact fonctionnel côté front (validation, UX) et prêt à être connecté à un backend ou service externe.

**Entrées**  
- Formulaire HTML (T4)  

**Étapes**  
1. Dans `contact-form.js` :
   - Sélectionner le formulaire et les champs (nom, email, message…)
   - Ajouter une validation front (champs requis, format email, longueur message mini).
2. Afficher les messages d’erreur / succès près des champs ou sous le formulaire.
3. Gérer la soumission :
   - Empêcher l’envoi si validation échoue.
   - Pour l’instant : soit
     - utiliser un simple `console.log` des données, soit
     - prévoir un appel `fetch` vers une future API ou service (TODO commenté).
4. Ajouter un petit feedback utilisateur (changement de texte du bouton “Envoi…”).

**Critères de validation**  
- Impossible d’envoyer un formulaire vide ou avec email invalide.
- L’utilisateur comprend clairement ce qui manque ou ce qui a réussi.

---

## T8 — Animations GSAP (entrée de page & scroll)

**But**  
Ajouter une couche d’animations fluides et légères pour renforcer la perception de qualité.

**Entrées**  
- Page d’accueil entièrement intégrée (T4–T6)  
- GSAP installé (CDN ou autre)  

**Étapes**  
1. Dans `gsap-animations.js` :
   - Créer `initHeroAnimation()` pour animer le contenu du hero à l’arrivée :
     - Fade + légère translation du titre, sous-titre et CTA.
   - Créer `initScrollAnimations()` pour les sections :
     - Révélations au scroll de la section “Notre approche”
     - Révélation douce du bloc contact.
2. Dans `main.js` :
   - Importer/charger GSAP
   - Appeler les fonctions `initHeroAnimation()` et `initScrollAnimations()` au `DOMContentLoaded`.
3. Respecter `prefers-reduced-motion` :
   - Si l’utilisateur préfère moins d’animations, désactiver ou réduire les effets.
4. Tester les performances (pas de animations saccadées).

**Critères de validation**  
- Les animations sont fluides et non intrusives.
- Le contenu reste lisible même si GSAP ne se charge pas.

---

## T9 — Tests, accessibilité, responsive & petits correctifs

**But**  
S’assurer que la page fonctionne bien sur plusieurs devices et reste accessible.

**Entrées**  
- Page d’accueil animée fonctionnelle  

**Étapes**  
1. Tester sur plusieurs tailles d’écran (mobile, tablette, desktop).
2. Vérifier la navigation clavier :
   - Tab order logique
   - Focus visible sur les liens / boutons / champs
3. Vérifier les contrastes (couleurs texte/fond).
4. Passer un check rapide Lighthouse (Accessibilité + Best Practices).
5. Corriger les petits bugs visuels (sauts de mise en page, débordements).

**Critères de validation**  
- La page est utilisable sans souris.
- Les scores Lighthouse sont corrects (au moins > 85 en accessibilité).

---

## T10 — Préparation au déploiement (sans toucher encore à l’ancien site)

**But**  
Avoir une version de la home prête à être déployée en préproduction.

**Entrées**  
- Home stable & testée (T9)  

**Étapes**  
1. Nettoyer le code :
   - Supprimer les console.log inutiles
   - Enlever les sections/commentaires temporaires
2. Vérifier les chemins des assets (CSS, JS, images).
3. Mettre à jour le `README.md` avec :
   - “Status : Home V1 prête pour préproduction”
4. Commit final de la V1 : `feat: home v1 complete`.

**Critères de validation**  
- Le projet est prêt à être déployé sur un environnement de test.
- Aucune erreur dans la console à l’ouverture de la page.
