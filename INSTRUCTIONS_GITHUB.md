# 🚀 Instructions pour publier sur GitHub

Votre portfolio est prêt à être publié ! Voici les étapes :

## Étape 1 : Créer un nouveau repository sur GitHub

1. Allez sur **https://github.com/bobbyelfamoso**
2. Cliquez sur le bouton **"New"** (ou "+" en haut à droite → "New repository")
3. Configurez le repository :
   - **Repository name** : `portfolio-bts-sio` (ou le nom de votre choix)
   - **Description** : "Portfolio BTS SIO avec thème hacking/cybersécurité"
   - **Public** ✅ (pour que ce soit visible publiquement)
   - **NE PAS** cocher "Add a README" (on en a déjà un)
4. Cliquez sur **"Create repository"**

## Étape 2 : Lier votre repository local à GitHub

GitHub vous donnera des commandes. Utilisez celles du type **"push an existing repository"** :

```bash
# Dans le terminal PowerShell, exécutez :
cd N:\project_curiculum\portfolio

# Remplacez VOTRE-NOM-DE-REPO par le nom que vous avez choisi
git remote add origin https://github.com/bobbyelfamoso/VOTRE-NOM-DE-REPO.git
git push -u origin main
```

**Exemple complet si vous nommez le repo "portfolio-bts-sio":**
```bash
git remote add origin https://github.com/bobbyelfamoso/portfolio-bts-sio.git
git push -u origin main
```

## Étape 3 : Activer GitHub Pages (pour héberger le site)

1. Sur GitHub, allez dans votre repository
2. Cliquez sur **"Settings"** (⚙️)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Sous **"Source"**, sélectionnez **"main"** branch
5. Cliquez sur **"Save"**

✅ Votre site sera accessible à : **https://bobbyelfamoso.github.io/VOTRE-NOM-DE-REPO/**

## Étape 4 : Mises à jour futures

Quand vous modifiez votre portfolio, utilisez ces commandes :

```bash
cd N:\project_curiculum\portfolio
git add .
git commit -m "Description de vos modifications"
git push
```

---

## ⚠️ Note importante

Si GitHub vous demande de vous authentifier, utilisez un **Personal Access Token** au lieu de votre mot de passe :
1. Sur GitHub : Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Sélectionnez "repo" scope
4. Utilisez ce token comme mot de passe dans le terminal

---

✨ **Votre portfolio est maintenant prêt à être partagé avec le monde !** ✨
