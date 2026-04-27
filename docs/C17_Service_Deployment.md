# [C17] - Déploiement d’un service

## Compétences mises en œuvre
*   **C17.1.1** : Préparer l'environnement de production.
*   **C17.1.2** : Déployer l'application sur un hébergeur cloud.
*   **C17.1.3** : Vérifier la disponibilité et le bon fonctionnement après mise en ligne.

## Contexte
Le déploiement a été réalisé sur deux infrastructures distinctes selon les besoins techniques des projets :
1.  **FlashMind** (Application principale) : Déployée sur **Firebase** pour bénéficier de l'intégration avec les services Google (Functions, Auth).
2.  **Portfolio / Landing Page** (Hub des services) : Migré de **Netlify vers Vercel** pour optimiser les performances de rendu et simplifier le pipeline CI/CD.

---

## Réalisation 1 : Déploiement de FlashMind sur Firebase

### 1. Préparation de l'environnement local
Installation du CLI Firebase et authentification :
```bash
npm install -g firebase-tools
firebase login
```

### 2. Initialisation du projet
Configuration via `firebase init` avec les options :
*   **Hosting** : Configuration pour le déploiement web.
*   **Projet cible** : Sélection du projet existant sur la console Firebase.
*   **Dossier public** : `dist` (contenant le build React).
*   **SPA** : Configuration "Single-Page App" (redirection vers `index.html`).

### 3. Mise en production
Génération du build et déploiement final :
```bash
npm run build
firebase deploy
```

---

## Réalisation 2 : Migration du Portfolio (Netlify vers Vercel)

### 1. Pourquoi la migration ?
Le passage de Netlify à Vercel a été motivé par une meilleure gestion des déploiements atomiques et une intégration plus fluide avec les outils modernes de développement web, offrant des temps de chargement plus rapides pour la page d'accueil.

### 2. Processus de migration
1.  **Liaison du dépôt** : Connexion du dépôt GitHub à la plateforme Vercel.
2.  **Configuration du Build** :
    *   **Framework Preset** : Détection automatique (Vite/Vanilla).
    *   **Build Command** : `npm run build` (si applicable).
    *   **Output Directory** : Dossier racine ou dossier de build.
3.  **Variables d'environnement** : Migration des clés secrètes depuis l'interface Netlify vers Vercel.
4.  **Transfert du Domaine** : Mise à jour des enregistrements DNS ou configuration du sous-domaine `.vercel.app` comme nouvelle référence.

### 3. Vérification
Vérification de la propagation SSL et tests de performance via Lighthouse pour confirmer le gain de rapidité après migration.

---

## ✅ Résumé des points d’attention
> [!WARNING]
> Pour Firebase comme pour Vercel, il est crucial de configurer les **variables d'environnement** directement dans les consoles d'administration respectives pour éviter d'exposer des clés API sensibles dans le code source.
