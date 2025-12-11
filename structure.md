make-your-app-site/
├─ index.html                 # Page d’accueil (3 sections : Qui on est / Approche / Contact)
├─ README.md
├─ tasks.md
├─ design/
│  ├─ home-wireframe.excalidraw  # Fichier Excalidraw source
│  ├─ home-wireframe.png         # Export visuel
│  └─ palette-couleurs.txt       # (optionnel) notes sur la palette
└─ assets/
   ├─ css/
   │  ├─ base.css             # Reset, variables CSS, body, typographie globale
   │  ├─ layout.css           # Layout générique (.container, .section, grilles, etc.)
   │  ├─ components.css       # Boutons, formulaires, blocs réutilisables
   │  └─ pages/
   │     └─ home.css          # Styles spécifiques de la page d’accueil
   ├─ js/
   │  ├─ main.js              # Initialisation globale, listeners, import des autres scripts
   │  ├─ gsap-animations.js   # Timelines GSAP et animations au scroll
   │  └─ contact-form.js      # Logique du formulaire de contact (validation, submit)
   └─ img/
      ├─ logo/
      │  ├─ logo.svg
      │  ├─ logo-192.png
      │  └─ logo-512.png
      ├─ ui/
      │  └─ ...               # Illustrations, backgrounds, icônes
      └─ home/
         └─ ...               # Images spécifiques à la home si besoin
