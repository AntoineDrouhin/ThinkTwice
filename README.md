# ThinkTwice

## Set Up

A la racine du projet :
```bash
cd api
npm install
node server.js
```

```bash
cd socket.io
npm install
node index.js
```
copier le repertoire `web` dans le dossier de votre serveur (apache ou autre)
```bash
cd web
bower install
```

Déplacez vous dans le répertoire mysql, lancez mysql puis :
```bash
source ProjetWeb.sql
```

##Les fonctionnalités.

###La connexion

 * Fonction
 La connexion permet à un utilisateur inscrit de pouvoir accéder à 
 l'application.
  
 * Technique
 La fonction de connexion permet une identification de l'utilisateur par 
 un mot de passe hashé en sha1. Tous les mots mots de passe sont conservés
 hashés.
 
 Une fois l'utilisateur connecté, un token est généré et chaque nouvelle 
 requête transmettra ce token pour vérifier l'identité de l'utilisateur.
 
###Le profil
 * fonction
 * technique
###Le match
 * fonction
 * technique
###le tchat
 * fonction
 * technique
###Le zap
 * fonction
 * technique
