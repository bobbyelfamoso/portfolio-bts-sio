# [C17] - Déploiement d’un service

## Compétences mises en œuvre
*   **C17.1.1** : Préparer l'environnement de production.
*   **C17.1.2** : Déployer l'application sur un hébergeur cloud.
*   **C17.1.3** : Vérifier la disponibilité et le bon fonctionnement après mise en ligne.

## Contexte
Pour garantir une haute disponibilité et une scalabilité facile, nous avons choisi de déployer **FlashMind** sur **Firebase**, une plateforme Cloud sécurisée gérée par Google.

## Démarche suivie
1.  **Préparation de l'environnement** : Création du projet sur la console Firebase.
2.  **Configuration locale** : Initialisation du projet via le CLI Firebase.
    *   Fichier `firebase.json` configuré pour pointer vers le dossier `dist` (React build).
3.  **Build de l'application** : `npm run build` pour générer les fichiers optimisés.
4.  **Déploiement** : Utilisation de la commande `firebase deploy`.
5.  **Audit post-déploiement** : Vérification de l'URL publique et test des fonctions de génération de flashcards en production.

## ✅ Résumé des points d’attention
> [!WARNING]
> Il est impératif de ne jamais uploader les clés API Gemini dans le dépôt GitHub. Elles doivent être gérées via des variables d'environnement ou stockées de manière sécurisée dans la configuration Firebase.
