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

####Fonction
 
 La connexion permet à un utilisateur inscrit de pouvoir accéder à 
 l'application.
  
####Technique
 
 La fonction de connexion permet une identification de l'utilisateur par 
 un mot de passe hashé en sha1. Tous les mots mots de passe sont conservés
 hashés.
 
 Une fois l'utilisateur connecté, un token est généré et chaque nouvelle 
 requête transmettra ce token pour vérifier l'identité de l'utilisateur. 
 C'est donc à chaque nouvelle connection que ce token est généré puis
 sauvegarder en base de données. Si le token n'est pas reconnu, la requête HTPP est rejetée.
 
###Le profil

####Fonction

La gestion du profil permet de saisir toutes les informations propres 
à l'utlilisateur et à ses attentes en matière de rencontre.

L'utlisateur doit donc répondre à une série de question le concernant
puis répond à un questionnaire de personnalité.

####Technique
 
 Des routes correspondantes à des mises à jours de la base de données sont
 mises en places pour enregistrer les données saisies grace à l'interface graphique.
 
 Le questionnaires de personnalité est construit dynamiquement grace aux données
 stockées en base. c'est le point d'entrée /question qui permet d'aller les chercher.
 
 On peut retrouver :
 
    * /personne : finit de mettre à jours les informations de l'utilisateur.
    
    * /interet : Insère les centres d'intéret de l'utilisateur
    
    * /reponse : Permet de renvoyer les réponses du questionnaire de personnalité qui serviront au calcul de match notemment.
 
###Le match

####Fonction

Le match se base sur les informations utilisateurs et le score de leur personnalite et de leur facette
generé grace au questionnaire de personnalité.

####Technique

A chaque ouverture de la page de match dans l'interface graphique, une requête http
est généré pour obtenir le match courrant afin de pouvoir échangé avec la personne qui nous
a été attribué par l'api. Si aucun match n'était en cours, un nouveau nous est proposé. Dans le cas
ou aucun match n'est généré par manque de possibilité, l'utilisateur est mis en attente.
 
###le tchat

####fonction

####technique
 
###Le zap

####fonction

####technique
