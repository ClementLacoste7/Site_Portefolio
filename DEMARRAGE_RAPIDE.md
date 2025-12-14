# 🚀 Démarrage Rapide - Portfolio

## ✅ Votre site est prêt !

Tous les fichiers ont été créés avec succès. Voici comment démarrer :

## 🎬 Option 1 : Lancement Immédiat (Recommandé)

### Windows
Double-cliquez sur : **`start-server.bat`**

### Mac/Linux
```bash
./start-server.sh
```

Puis ouvrez votre navigateur à : **http://localhost:8000**

## 🎬 Option 2 : Ouverture Simple

Double-cliquez sur **`index.html`**
(Note : certaines fonctionnalités peuvent être limitées sans serveur)

## 📝 Première Personnalisation (5 minutes)

### 1. Informations de Base

Ouvrez [index.html](index.html) et cherchez :

```html
<!-- Ligne 53 -->
<span class="name">Jean Dupont</span>

<!-- Changez en : -->
<span class="name">Clément [Votre Nom]</span>
```

```html
<!-- Ligne 54 -->
<p class="hero-subtitle">Développeur Web Full Stack</p>

<!-- Changez en : -->
<p class="hero-subtitle">Étudiant en Informatique YNOV</p>
```

### 2. Contact (lignes 360-372)

```html
<p>contact@exemple.com</p>        → Votre email
<p>+33 6 12 34 56 78</p>          → Votre téléphone
<p>Paris, France</p>              → Votre ville
```

### 3. Réseaux Sociaux (lignes 376-380)

```html
<a href="https://linkedin.com/in/votre-profil" target="_blank">LinkedIn</a>
<a href="https://github.com/votre-username" target="_blank">GitHub</a>
```

**C'est tout ! Votre site est personnalisé à 80%** 🎉

## 📚 Pour Aller Plus Loin

Consultez le [GUIDE_PERSONNALISATION.md](GUIDE_PERSONNALISATION.md) pour :
- ✏️ Modifier vos compétences et niveaux
- 🎓 Ajouter votre parcours éducatif
- 🚀 Personnaliser vos projets
- 🎨 Changer les couleurs du site

## 📂 Structure du Projet

```
Site_Portefolio/
├── 📄 index.html                    ← Page principale
├── 📁 css/
│   └── style.css                    ← Tous les styles
├── 📁 js/
│   ├── main.js                      ← Animations et interactions
│   └── three-background.js          ← Animation 3D
├── 📁 Asset/
│   ├── Photo_Clement.png            ← Votre photo (déjà là ✅)
│   └── CV 2025 YNOV.pdf            ← Votre CV (déjà là ✅)
├── 📖 README.md                     ← Documentation complète
├── 📖 GUIDE_PERSONNALISATION.md     ← Guide détaillé
└── 🚀 start-server.bat/sh           ← Scripts de lancement
```

## 🎯 Fonctionnalités Incluses

✅ Design Glassmorphism moderne
✅ Animation 3D avec Three.js
✅ 1000 particules animées en arrière-plan
✅ Formes géométriques 3D interactives
✅ Animations au scroll (fade-in, slide-in)
✅ Barres de compétences animées
✅ Timeline de formation
✅ 6 sections complètes
✅ Formulaire de contact avec validation
✅ Navigation sticky avec scroll spy
✅ Effet parallax
✅ Curseur personnalisé
✅ 100% Responsive (mobile, tablette, desktop)
✅ Optimisé pour les performances

## 🎨 Personnalisation Rapide des Couleurs

Dans [css/style.css](css/style.css), lignes 5-10, modifiez :

```css
:root {
    --primary-color: #6366f1;    /* Couleur principale */
    --accent-color: #ec4899;     /* Couleur d'accent */
}
```

**Palettes suggérées** :

🔵 **Tech Blue** : `#06b6d4` et `#0ea5e9`
🟢 **Modern Green** : `#10b981` et `#34d399`
🟡 **Gold** : `#f59e0b` et `#fbbf24`
🟣 **Purple** (actuel) : `#6366f1` et `#ec4899`

## 📱 Test Responsive

Testez votre site sur différentes tailles :

1. **Desktop** : Navigateur normal
2. **Tablette** : F12 → Outils de développement → Mode responsive (768px)
3. **Mobile** : F12 → Mode responsive (375px)

Ou directement sur votre téléphone : `http://[votre-ip-local]:8000`

## 🌐 Publier sur Internet

### GitHub Pages (Gratuit)

```bash
git init
git add .
git commit -m "Initial commit - Portfolio"
git branch -M main
git remote add origin https://github.com/votre-username/portfolio.git
git push -u origin main
```

Puis dans GitHub : Settings → Pages → Source : main branch

Votre site sera à : `https://votre-username.github.io/portfolio`

### Netlify (Le plus simple)

1. Allez sur [netlify.com](https://www.netlify.com)
2. Glissez-déposez le dossier `Site_Portefolio`
3. C'est en ligne ! 🚀

## 🆘 Besoin d'Aide ?

**Le background 3D ne s'affiche pas ?**
→ Vérifiez la console (F12) et assurez-vous que Three.js est chargé

**Les animations sont lentes ?**
→ Réduisez les particules dans `js/three-background.js` ligne 25 (1000 → 300)

**Erreur 404 sur les fichiers ?**
→ Utilisez un serveur local (start-server.bat), pas le fichier direct

## 🎓 Technologies Utilisées

- HTML5 (Structure sémantique)
- CSS3 (Glassmorphism, Flexbox, Grid, Animations)
- JavaScript Vanilla (Interactions, Intersection Observer)
- Three.js (Animation 3D, particules, formes géométriques)
- Google Fonts (Poppins)

## 📞 Support

- 📖 Documentation complète : [README.md](README.md)
- 🎨 Guide de personnalisation : [GUIDE_PERSONNALISATION.md](GUIDE_PERSONNALISATION.md)

---

## 🎉 Félicitations !

Votre portfolio est prêt à impressionner les recruteurs !

**Prochaines étapes** :
1. ✅ Lancez le site (`start-server.bat`)
2. ✏️ Personnalisez vos informations
3. 📸 Ajoutez vos projets avec captures d'écran
4. 🌐 Publiez en ligne
5. 📤 Partagez votre lien !

**Bon succès ! 🚀**
