# 🎨 Portfolio Personnel - Site Web Moderne

Portfolio professionnel avec design glassmorphism, animations fluides et background 3D interactif.

## ✨ Fonctionnalités

### Design & UX
- **Effet Glassmorphism** - Design moderne inspiré iOS avec arrière-plans floutés
- **Animations fluides** - Transitions et animations au scroll
- **Background 3D** - Particules et formes géométriques animées avec Three.js
- **Responsive Design** - Optimisé pour mobile, tablette et desktop
- **Dark Theme** - Thème sombre élégant

### Sections
1. **Hero/Accueil** - Photo portrait avec introduction personnelle
2. **À propos** - Présentation et centres d'intérêt
3. **Compétences** - Barres de progression animées
4. **Formation** - Timeline éducative
5. **Projets** - Portfolio avec cartes interactives
6. **Contact** - Formulaire avec validation

### Interactions
- Navigation sticky avec scroll spy
- Animations déclenchées au scroll (Intersection Observer)
- Effets parallax
- Curseur personnalisé
- Hover effects sur tous les éléments interactifs
- Formulaire de contact avec validation en temps réel

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone [votre-repo]
cd Site_Portefolio
```

### 2. Ajouter vos assets
Placez vos fichiers dans le dossier `Asset/` :
- **Photo portrait** : `Asset/photo-portrait.jpg` (format recommandé : 800x800px, carré)
- **CV PDF** : `Asset/CV 2025 YNOV.pdf` (déjà présent)

### 3. Lancer le site
Ouvrez simplement `index.html` dans votre navigateur préféré.

Pour un serveur local (recommandé) :
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec Live Server (VS Code extension)
# Clic droit sur index.html > Open with Live Server
```

Accédez ensuite à `http://localhost:8000`

## 📝 Personnalisation

### Modifier le contenu

#### 1. Informations personnelles
Éditez [index.html](index.html) et remplacez :
- **Nom** : ligne 52 - `<span class="name">Jean Dupont</span>`
- **Titre** : ligne 54 - `<p class="hero-subtitle">Développeur Web Full Stack</p>`
- **Description** : lignes 55-58
- **Email** : ligne 360
- **Téléphone** : ligne 366
- **Localisation** : ligne 372

#### 2. Section À propos
Lignes 69-91 - Remplacez les paragraphes Lorem Ipsum par votre présentation.

#### 3. Compétences
Lignes 100-186 - Modifiez les compétences et pourcentages :
```html
<div class="skill-item">
    <div class="skill-info">
        <span>HTML5 / CSS3</span>
        <span>90%</span> <!-- Modifier ici -->
    </div>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="90"></div> <!-- Et ici -->
    </div>
</div>
```

#### 4. Formation
Lignes 194-235 - Ajoutez/modifiez vos diplômes.

#### 5. Projets
Lignes 243-358 - Personnalisez vos projets :
- Remplacez les images placeholder par vos captures d'écran
- Modifiez les descriptions
- Ajustez les tags technologiques

### Modifier les couleurs

Éditez [css/style.css](css/style.css), lignes 5-15 :
```css
:root {
    --primary-color: #6366f1;      /* Couleur principale */
    --secondary-color: #8b5cf6;    /* Couleur secondaire */
    --accent-color: #ec4899;       /* Couleur d'accent */
    --bg-dark: #0f0f1e;            /* Fond sombre */
    --bg-darker: #08081a;          /* Fond plus sombre */
}
```

### Personnaliser l'animation 3D

Éditez [js/three-background.js](js/three-background.js) :
- **Nombre de particules** : ligne 25 - `particlesCount = 1000`
- **Couleurs** : lignes 37, 52, 61, 70, 79
- **Vitesse de rotation** : lignes 184-196

## 🎯 Tech Stack

- **HTML5** - Structure sémantique
- **CSS3** - Glassmorphism, animations, responsive
- **JavaScript (Vanilla)** - Interactions et animations
- **Three.js** - Background 3D et effets visuels
- **Google Fonts** - Typographie Poppins

## 📱 Responsive Breakpoints

- **Desktop** : > 1024px
- **Tablet** : 768px - 1024px
- **Mobile** : < 768px
- **Small Mobile** : < 480px

## ⚡ Performance

### Optimisations incluses
- Throttling des événements scroll
- Lazy loading des animations (Intersection Observer)
- Pixel ratio limité pour mobile
- Réduction du nombre de particules 3D sur mobile
- Animations CSS hardware-accelerated

### Recommandations
- Compressez vos images (recommandé : WebP format)
- Utilisez un CDN pour Three.js en production
- Minifiez CSS et JS avant déploiement

## 🔧 Fichiers principaux

```
Site_Portefolio/
├── index.html              # Page principale
├── css/
│   └── style.css           # Styles et animations
├── js/
│   ├── main.js            # JavaScript principal
│   └── three-background.js # Animation 3D
├── Asset/
│   ├── photo-portrait.jpg  # Votre photo (à ajouter)
│   └── CV 2025 YNOV.pdf   # Votre CV
└── README.md              # Ce fichier
```

## 🌐 Déploiement

### GitHub Pages
1. Poussez le code sur GitHub
2. Allez dans Settings > Pages
3. Sélectionnez la branche `main`
4. Le site sera disponible à `https://[username].github.io/Site_Portefolio`

### Netlify
1. Déposez le dossier sur [netlify.com](https://www.netlify.com)
2. Ou connectez votre repo GitHub
3. Déploiement automatique

### Vercel
```bash
npm i -g vercel
vercel
```

## 🐛 Dépannage

### Le background 3D ne s'affiche pas
- Vérifiez que Three.js est bien chargé (console du navigateur)
- Essayez un autre navigateur (Chrome recommandé)
- Vérifiez que WebGL est activé

### Les animations ne fonctionnent pas
- Vérifiez la console pour les erreurs JavaScript
- Assurez-vous que tous les scripts sont chargés
- Testez sur un serveur local plutôt que file://

### Problèmes de performance
- Réduisez le nombre de particules dans `three-background.js`
- Désactivez le curseur custom sur mobile
- Utilisez un profiler de navigateur pour identifier les goulots

## 📄 Licence

Ce projet est libre d'utilisation pour votre portfolio personnel.

## 🤝 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur le repository.

---

**Créé avec ❤️, HTML, CSS, JavaScript et Three.js**
