# 📋 Guide de Personnalisation Rapide

## 🎯 Étapes Essentielles

### 1️⃣ Informations Personnelles (PRIORITAIRE)

Ouvrez [index.html](index.html) et modifiez :

**Ligne 53** - Votre nom :
```html
<span class="name">Jean Dupont</span>
<!-- Remplacez par votre nom -->
<span class="name">Clément Votre_Nom</span>
```

**Ligne 54** - Votre titre/poste :
```html
<p class="hero-subtitle">Développeur Web Full Stack</p>
<!-- Exemple : -->
<p class="hero-subtitle">Étudiant en Informatique</p>
```

**Lignes 55-59** - Votre description :
```html
<p class="hero-description">
    Passionné par la création d'expériences web modernes...
</p>
<!-- Remplacez par votre propre description -->
```

**Ligne 360** - Votre email :
```html
<p>contact@exemple.com</p>
```

**Ligne 366** - Votre téléphone :
```html
<p>+33 6 12 34 56 78</p>
```

**Ligne 372** - Votre localisation :
```html
<p>Paris, France</p>
```

### 2️⃣ Section À Propos

**Lignes 69-91** - Remplacez le texte Lorem Ipsum par votre vraie présentation :

```html
<p>
    Présentez-vous ici : votre parcours, vos passions, vos objectifs...
</p>
```

**Centres d'intérêt (lignes 85-90)** :
```html
<li>💻 Développement web moderne</li>
<li>🎨 Design UI/UX</li>
<!-- Modifiez selon vos intérêts -->
```

**Statistiques (lignes 94-109)** :
```html
<div class="stat-number">3+</div>
<div class="stat-label">Années d'expérience</div>
<!-- Ajustez selon votre profil -->
```

### 3️⃣ Compétences

**Section Frontend (lignes 106-137)** :
```html
<div class="skill-item">
    <div class="skill-info">
        <span>HTML5 / CSS3</span>
        <span>90%</span> <!-- MODIFIER LE POURCENTAGE -->
    </div>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="90"></div> <!-- MODIFIER ICI AUSSI -->
    </div>
</div>
```

⚠️ **IMPORTANT** : Modifiez les deux endroits (affichage ET data-progress)

Pour ajouter une compétence, copiez un bloc `<div class="skill-item">...</div>` complet.

### 4️⃣ Formation

**Lignes 194-235** - Modifiez vos diplômes :

```html
<div class="timeline-date">2023 - 2025</div>
<h3>Master en Informatique</h3>
<h4>YNOV Campus</h4>
<p>Description de votre formation...</p>
```

Pour ajouter une formation :
1. Copiez un bloc `<div class="timeline-item">...</div>` complet
2. Modifiez les dates, titre, établissement et description

### 5️⃣ Projets

**Lignes 243-358** - Personnalisez vos projets :

```html
<div class="project-card glass-effect scale-in">
    <div class="project-image">
        <img src="https://via.placeholder.com/600x400" alt="Projet 1">
        <!-- Remplacez par le chemin de votre capture d'écran -->
        <img src="Asset/projet1.jpg" alt="Mon Projet">
    </div>
    <div class="project-content">
        <h3>Nom du Projet</h3>
        <p>Description du projet...</p>
        <div class="project-tags">
            <span>React</span>
            <span>Node.js</span>
            <!-- Modifiez les technologies utilisées -->
        </div>
    </div>
</div>
```

**Astuce** : Ajoutez des captures d'écran de vos projets dans `Asset/` :
- `Asset/projet1.jpg`
- `Asset/projet2.jpg`
- etc.

### 6️⃣ Liens Sociaux

**Lignes 376-380** - Ajoutez vos vrais liens :

```html
<a href="#" class="social-link glass-effect">LinkedIn</a>
<!-- Remplacez par : -->
<a href="https://linkedin.com/in/votre-profil" target="_blank" class="social-link glass-effect">LinkedIn</a>

<a href="https://github.com/votre-username" target="_blank" class="social-link glass-effect">GitHub</a>

<a href="https://twitter.com/votre-handle" target="_blank" class="social-link glass-effect">Twitter</a>
```

## 🎨 Personnalisation des Couleurs

Ouvrez [css/style.css](css/style.css) et modifiez les variables (lignes 5-15) :

```css
:root {
    /* Changez ces couleurs selon vos préférences */
    --primary-color: #6366f1;      /* Bleu-violet */
    --secondary-color: #8b5cf6;    /* Violet */
    --accent-color: #ec4899;       /* Rose */
}
```

**Suggestions de palettes** :

**Palette Tech (Bleu/Cyan)** :
```css
--primary-color: #06b6d4;
--secondary-color: #3b82f6;
--accent-color: #0ea5e9;
```

**Palette Moderne (Vert/Émeraude)** :
```css
--primary-color: #10b981;
--secondary-color: #059669;
--accent-color: #34d399;
```

**Palette Élégante (Or/Ambre)** :
```css
--primary-color: #f59e0b;
--secondary-color: #d97706;
--accent-color: #fbbf24;
```

## 📸 Optimiser vos Images

### Photo de Profil
- **Format recommandé** : PNG ou JPG
- **Dimensions** : 800x800px (carré)
- **Poids** : < 500 Ko
- **Nom** : Déjà configuré avec `Photo_Clement.png`

### Captures d'écran de Projets
- **Format** : JPG (pour photos) ou PNG (pour interfaces)
- **Dimensions** : 1200x800px (ratio 3:2)
- **Poids** : < 300 Ko chacune
- **Compresser avec** : [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/)

## 🚀 Tester le Site

### En local (méthode simple)
1. Double-cliquez sur `index.html`
2. Le site s'ouvre dans votre navigateur

### Avec un serveur local (recommandé)

**Option 1 - Python** :
```bash
python -m http.server 8000
# Puis ouvrez : http://localhost:8000
```

**Option 2 - VS Code** :
1. Installez l'extension "Live Server"
2. Clic droit sur `index.html`
3. "Open with Live Server"

**Option 3 - Node.js** :
```bash
npx http-server
```

## ✅ Checklist Avant Publication

- [ ] ✏️ Nom et titre modifiés
- [ ] 📧 Email et téléphone mis à jour
- [ ] 👤 Photo de profil ajoutée (Photo_Clement.png)
- [ ] 📝 Section "À propos" personnalisée
- [ ] 💪 Compétences ajustées à votre niveau réel
- [ ] 🎓 Formation mise à jour
- [ ] 🚀 Au moins 3 vrais projets ajoutés avec captures d'écran
- [ ] 🔗 Liens sociaux LinkedIn, GitHub configurés
- [ ] 🎨 Couleurs personnalisées (optionnel)
- [ ] 📱 Testé sur mobile
- [ ] 🌐 Testé sur Chrome, Firefox, Safari

## 🆘 Problèmes Courants

**Q : Les animations ne fonctionnent pas**
R : Ouvrez la console (F12) et vérifiez les erreurs. Assurez-vous que tous les fichiers JS sont chargés.

**Q : Le background 3D est lent sur mon ordinateur**
R : Réduisez le nombre de particules dans `js/three-background.js` ligne 25 (passez de 1000 à 300).

**Q : Ma photo ne s'affiche pas**
R : Vérifiez que le fichier est bien dans `Asset/Photo_Clement.png` et que le chemin est correct.

**Q : Le formulaire ne fonctionne pas**
R : Le formulaire est actuellement simulé (pas d'envoi réel). Pour un vrai formulaire, intégrez un service comme Formspree ou EmailJS.

## 📞 Support

Pour toute question, consultez le [README.md](README.md) ou ouvrez une issue sur GitHub.

---

**Bon courage pour la personnalisation ! 🎉**
