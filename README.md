## PROJET 7 : Créer une application de réseau social d’entreprise 

_________________________________

### OBJECTIF DU PROJET  

Créer une application de réseau social d'entreprise avec React, Node, Express et MongoDB.

Côté front :
- batir le frontend à l'aide des composants React et sa synthaxe JSX
- gérer les évenements utilisateur
- implémenter les requêtes pour communiquer avec l'API (backend)
- créer une application responsive

Côté back :
- mettre en place le serveur et implémenter l'API avec Express
- créer une base de données qui sauvegarde les données de l'API avec MongoDB
- gérer les rôles pour la lecture, l'écriture, la modification et la suppression des données (CRUD)
- sécuriser l'API

_________________________________

### INSTALLATION DE L'APPLICATION

Pour lancer cette application web, il faut installer NodeJS et son gestionnaire de paquets npm (livré avec NodeJS par défaut).  
Lien de téléchargement : https://nodejs.org/en/ (version LTS)

### EXECUTION

- Cloner le dépot avec la commande `git clone https://github.com/BouiMust/OpenclassP7.git`
- Mettre les 2 fichiers ``.env`` (fournis par le propriétaire du github) dans le dépôt, l'un à la racine du dossier front et l'autre à la racine du dossier back
- Dans le dossier back, taper la commande ``npm install``pour installer les dépendances dont a besoin le backend, puis la commande ``node server`` pour executer le backend/serveur (il doit s'executer sur le port 3000, à l'adresse http://localhost:3000, c'est important)
- Dans le dossier front, ouvrir un terminal et lancer la commande `npm install`<!--pour installer les dépendances dont a besoin le frontend-->, puis `npm start` pour executer le frontend/React (le port 3000 étant déjà pris par le serveur, il se lancera sur le port 3001 si celui-ci est disponible, l'application sera visible à l'adresse http://localhost:3001)

Pour arrêter le serveur : ``CTRL+C``

_____________________________

### VARIABLE D'ENVIRONNEMENT

L'application utilise des variables d'environnement pour le stockage des données sensibles.  
Ces données ne sont pas présentes dans le code de l'application mais sont stockées dans 2 fichiers ``.env``.  
Pour des raisons de sécurité, ces fichiers ne sont pas joints au dépôt github.  
  
Le paquet npm ``dotenv`` permet à l'application d'exploiter ces fichiers dans l'environnement Node.  

_____________________________

### DEPENDANCES LIÉES A L'APPLICATION


##### EXPRESS.js 
Ce paquet permet de faciliter la création et la gestion de serveur Node et d'API.
<!-- Installation : 'npm install express --save' -->

##### MONGOOSE 
Il facilite la gestion et la communication avec la base de données MongoDB.
<!-- Installation : 'npm install mongoose' -->

##### BCRYPT  
Ce paquet permet de hasher (ou chiffrer) les mots de passe.
<!-- installation : 'npm install bcrypt' -->

##### Mongoose-unique-validator  
Il vérifie qu'une donnée est unique pour chaque ressource d'une collection dans la base de donnée.
<!-- installation : 'npm install mongoose-unique-validator' -->

##### JSONWEBTOKEN  
Il permet de créer et vérifier des tokens (chaines de caractères encodées).
<!-- installation : 'npm install jsonwebtoken' -->

##### MULTER  
Le paquet Multer gère les fichiers entrants.
<!-- installation : 'npm install multer' -->

##### HELMET
Il augmente la sécurité de l'API en traitant les en-têtes de requêtes http.
<!-- installation : 'npm install helmet --save' -->

##### DOTENV
Il permet à l'application de travailler avec des variables d'environnement.
<!-- installation : 'npm install env-cmd --save-dev' (ça installe comme dépendance de developpement)-->

##### AXIOS
Il permet de créer des requêtes HTTP plus facilement, basées sur les promesses

_________________________________

### BASE DE DONNEES

L'application utilise MongoDB Atlas, une plateforme/service en ligne, pour la sauvegarde des données.  
MongoDB est un système de base de données pour les serveurs Node.

2 collections sont stockées dans la base de données : Users et Posts.  
Users contient la liste de tous les utilisateurs. Chaque utilisateur possède un nom, un prénom, un email, etc...  
Posts contient la liste de tous les posts. Chaque post possède un texte et/ou une image, une date de création, son auteur, etc...

_________________________________

### REQUETES HTTP

Les requêtes sont les demandes que le client (l'utilisateur) fait au serveur.  
On utilise le protocole HTTP pour pouvoir communiquer entre les deux.  
Le client envoie une ``'request'`` au serveur, celui-ci intercepte la ``'request'`` et lui retourne une ``'response'`` avec un code HTTP (et des données, selon le verbe HTTP utilisé)  
A travers ces requêtes, l'utilisateur peut récupérer, créer, modifier ou supprimer une ressource.  
Voici les verbes (ou actions) HTTP implémentés dans l'application : GET, POST, PUT, DELETE  

_________________________________

### CODES HTTP

Voici les codes d'état retournés par l'application suite aux requêtes HTTP :
- 200 : OK, la ressource est disponible
- 201 : OK, création ou modification d'une ressource
- 401 : Non authentifié, l'authentification est requise pour exploiter la ressource
- 403 : Accès refusé, l'utilisateur n'a pas les droits d'exploiter la ressource
- 500 : Erreur interne, erreur provenant de l'application

_________________________________

### ENDPOINTS DES ROUTES

#### Voici le nom de domaine du serveur : http://localhost:3000

#### Voici les URI/endpoints pour chaque route :

Inscription de l'utilisateur :  
``/api/auth/signup``

Athentification de l'utilisateur :  
/api/auth/login

Afficher la collection des posts :  
/api/posts

Créer un post :  
/api/posts

Modifier un post :  
/api/posts/:id

Supprimer un post :  
/api/posts/:id

Ajouter ou retirer un like :  
/api/posts/:id/like


Exemple : pour modifier un post, l'URL complet est : http://localhost:3000/api/posts/:id  
:id = paramètre URL qui correspond à l'identifiant unique du post.