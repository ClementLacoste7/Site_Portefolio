# Configuration du Formulaire de Contact avec EmailJS

## 📧 Pourquoi EmailJS ?

EmailJS est un service gratuit qui permet d'envoyer des emails directement depuis votre site web sans avoir besoin d'un serveur backend. C'est parfait pour un portfolio hébergé sur GitHub Pages !

## 🚀 Configuration en 5 étapes

### Étape 1 : Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquez sur "Sign Up" (S'inscrire)
3. Créez un compte gratuit avec votre email

### Étape 2 : Ajouter un service email

1. Une fois connecté, allez dans **Email Services**
2. Cliquez sur **Add New Service**
3. Choisissez **Gmail** (puisque vous utilisez clement.lacoste64@gmail.com)
4. Connectez votre compte Gmail
5. Notez le **Service ID** (quelque chose comme "service_xxxxxxx")

### Étape 3 : Créer un template d'email

1. Allez dans **Email Templates**
2. Cliquez sur **Create New Template**
3. Configurez le template comme suit :

**Subject (Sujet) :**
```
Nouveau message portfolio - {{subject}}
```

**Content (Contenu) :**
```
Vous avez reçu un nouveau message depuis votre portfolio !

Nom : {{from_name}}
Email : {{from_email}}
Sujet : {{subject}}

Message :
{{message}}

---
Ce message a été envoyé depuis votre formulaire de contact.
```

4. Dans les paramètres :
   - **To Email** : clement.lacoste64@gmail.com
   - **From Name** : Portfolio Contact Form
   - **Reply To** : {{from_email}}

5. Cliquez sur **Save**
6. Notez le **Template ID** (quelque chose comme "template_xxxxxxx")

### Étape 4 : Récupérer votre clé publique

1. Allez dans **Account** > **General**
2. Trouvez votre **Public Key** (quelque chose comme "xxxxxxxxxxxxxx")

### Étape 5 : Mettre à jour le code

Ouvrez le fichier `js/main.js` et remplacez les 3 valeurs suivantes :

**Ligne 177** - Remplacez `YOUR_PUBLIC_KEY` :
```javascript
emailjs.init("VOTRE_PUBLIC_KEY_ICI");
```

**Ligne 209** - Remplacez `YOUR_SERVICE_ID` et `YOUR_TEMPLATE_ID` :
```javascript
emailjs.sendForm('VOTRE_SERVICE_ID_ICI', 'VOTRE_TEMPLATE_ID_ICI', contactForm)
```

## ✅ Tester le formulaire

1. Ouvrez votre site
2. Remplissez le formulaire de contact
3. Cliquez sur "Envoyer le message"
4. Vérifiez votre boîte email clement.lacoste64@gmail.com

## 🎁 Plan gratuit

Le plan gratuit d'EmailJS vous offre :
- ✅ 200 emails par mois
- ✅ Parfait pour un portfolio personnel
- ✅ Pas de carte de crédit requise

## 🔧 Dépannage

**Problème : Je ne reçois pas d'email**
- Vérifiez vos spams
- Assurez-vous d'avoir bien connecté votre Gmail
- Vérifiez que les IDs sont corrects dans le code

**Problème : Erreur "emailjs is not defined"**
- Vérifiez que la bibliothèque EmailJS est bien chargée dans index.html (ligne 25)
- Videz le cache de votre navigateur

**Problème : Les emails vont dans les spams**
- Normal au début, marquez-les comme "Non spam"
- Après quelques messages, Gmail apprendra que c'est légitime

## 📝 Alternative simple (sans configuration)

Si vous ne voulez pas configurer EmailJS tout de suite, vous pouvez aussi mettre votre email directement dans la section contact avec un simple lien `mailto:` :

```html
<a href="mailto:clement.lacoste64@gmail.com" class="btn btn-primary">M'envoyer un email</a>
```

Mais EmailJS offre une bien meilleure expérience utilisateur ! 🎯
