## PROJET 7 : Créer une application de réseau social d’entreprise 

_________________________________

### OBJECTIF DU PROJET  

Créer une application de réseau social interne pour l'entreprise Groupomania.  
Cette application a pour but de faciliter la communication entre les employés de l'entreprise.

Technologies utilisées : React, Node, Express et MongoDB.

Travaux effectués côté front :
- construire les pages de l'application à l'aide des composants React et sa synthaxe JSX
- gérer les évenements utilisateur
- implémenter les requêtes pour communiquer avec l'API (backend)
- créer une application responsive

Travaux effectués côté back :
- mettre en place le serveur et implémenter l'API
- créer une base de données qui sauvegarde les données de l'API
- gérer les rôles pour la lecture, l'écriture, la modification et la suppression des données (CRUD)
- sécuriser l'API

_________________________________

### INSTALLATION ET EXECUTION DE L'APPLICATION

Pour lancer cette application web, il faut installer NodeJS et son gestionnaire de paquets npm (livré avec NodeJS par défaut).  
Lien de téléchargement : https://nodejs.org/en/ (version LTS)
  
  
- Cloner le dépot avec la commande `git clone https://github.com/BouiMust/OpenclassP7.git`
- Mettre les 2 fichiers ``.env`` (fournis par le propriétaire du github) dans le dépôt, l'un à la racine du dossier front et l'autre à la racine du dossier back
- Dans le dossier back, taper la commande ``npm install``pour installer les dépendances dont a besoin le backend, puis la commande ``node server`` pour executer le backend/serveur (il doit s'executer sur le port 3000, à l'adresse http://localhost:3000, c'est important).  
Le message ``'Listening on port 3000, Connexion à MongoDB réussie'`` devrait apparaitre.
- Dans le dossier front, ouvrir un terminal et lancer la commande `npm install`<!--pour installer les dépendances dont a besoin le frontend-->, puis `npm start` pour executer le frontend/React (le port 3000 étant déjà pris par le serveur, il se lancera sur le port 3001 si celui-ci est disponible, l'application sera visible à l'adresse http://localhost:3001)
  
Pour arrêter le serveur : ``CTRL+C``

_____________________________

### VARIABLE D'ENVIRONNEMENT

L'application utilise des variables d'environnement pour le stockage des données sensibles.  
Ces données ne sont pas présentes dans le code de l'application mais sont stockées dans 2 fichiers ``.env``.  
Pour des raisons de sécurité, ces fichiers ne sont pas joints au dépôt github.  
  
Le paquet npm ``dotenv`` permet à l'application d'exploiter ces fichiers dans l'environnement Node.  
  
Notes :  
  
Il est possible d'utiliser cette application sans les variables d'environnement.  
Il suffit de remplacer ces variables par leur valeur respective directement dans le code.  
Ces variables sont écrites sous cette forme : ``process.env.nomdelavariable``  
  
Voici les noms de variable utilisés :  
``PORT`` : représente le numéro du port sur lequel tourne le serveur.  
``MONGODB_URL`` : c'est l'adresse d'accès à la base de données MongoDB (vous pouvez en créer une sur https://www.mongodb.com/fr-fr/atlas/database)  
``PRIVATE_KEY`` : c'est la clé secrète (généralement une longue chaine de caract.) qui sert à créer le token d'authentification et à le décrypter.  
``REACT_APP_API_URL`` : correspond à l'adresse du serveur.  
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
<!-- installation : 'npm install axios' -->
  
_________________________________

### BASE DE DONNEES

L'application utilise MongoDB Atlas, une plateforme/service en ligne, pour la sauvegarde des données.  
MongoDB est un système de base de données pour les serveurs Node.

2 collections sont stockées dans la base de données : Users et Posts.  
Users contient la liste de tous les utilisateurs.
Posts contient la liste de tous les posts.

Chaque utilisateur est crée à partir d'un modèle nommé 'User' qui comprend l'id unique, le nom, le prénom, l'adresse mail, le mdp et le booléen isAdmin qui permet de vérifier si l'utilisateur est administrateur.

Chaque post est crée à partir d'un modèle nommé 'Post' qui comprend l'id unique, l'userId(=id de l'utilisateur), l'auteur(=nom et prénom de l'utilisateur), le text, l'image, la date de création, le nombre de likes, le tableau des userId qui ont liké, le booléen hasLiked qui permet de vérifier si l'utilisateur a like le post, et le booléen isAuthor pour vérifier si l'utilisateur est l'auteur du post.
_________________________________

### CREER UN COMPTE ADMINISTRATEUR

2 solutions ont été trouvés :

- soit créer un compte utilisateur (en l'inscrivant dans l'application) puis aller sur mongoDB Atlas et le modifier (choisir l'utilisateur en question dans la collections 'Users' et mettre la propriété 'isAdmin' sur 'true')

- soit modifier la fonction signup (création d'un utilisateur) côté back, il faut ajouter une condition pour faire en sorte que si l'email saisi à l'inscription correspond par exemple à 'admin103948@gmail.com', alors l'utilisateur est crée en passant la valeur 'true' à 'isAdmin', sinon false par défaut. Avec la validation de compte par email unique, il ne peut pas y avoir d'utilisateur avec la même adresse email.

La 2ème solution semble plus approprié, ça évite d'effectuer la modification manuellement dans la BDD.

_________________________________

### LES RÔLES

Le rôle est l'ensemble des droits ou permissions accordés à un utilisateur pour effectuer certaines tâches.

Dans cette application, 2 rôles sont mis en place : utilisateur et administrateur.

Le rôle utilisateur inclut les tâches suivantes :
- afficher tous les posts
- créer un post
- supprimer son propre post
- modifier son propre post
- ajouter un like sur un post ou le retirer

Le rôle administrateur inclut les mêmes tâches accordées à l'utilisateur 'lambda', mais il inclut en plus de ça :
- supprimer le post des autres utilisateurs
- modifier le post des autres utilisateurs

On peut dire que l'administrateur a un rôle plus important car il a plus de droits/privilèges.

_________________________________

### REQUETES HTTP

Les requêtes sont les demandes que le client (l'utilisateur) fait au serveur.  
On utilise le protocole HTTP pour pouvoir communiquer entre les deux.  
Le client envoie une ``'request'`` au serveur, celui-ci intercepte la ``'request'`` et lui retourne une ``'response'`` avec un code HTTP (et des données, selon le verbe HTTP utilisé).  
  
A travers ces requêtes, l'utilisateur peut récupérer, créer, modifier ou supprimer une ressource.  
Voici les verbes (ou actions) HTTP implémentés dans l'application : GET, POST, PUT, DELETE  

_________________________________

### CODES HTTP

Voici les codes d'état retournés par le serveur suite aux requêtes de l'utilisateur :
- ``200`` : OK, la ressource est disponible
- ``201`` : OK, création ou modification d'une ressource
- ``401`` : Non authentifié, l'authentification est requise pour exploiter la ressource
- ``403`` : Accès refusé, l'utilisateur n'a pas les droits d'exploiter la ressource
- ``404`` : La ressource est introuvable ou n'existe pas
- ``500`` : Erreur interne, erreur provenant du serveur

_________________________________

### ENDPOINTS DES ROUTES DE l'API

#### Voici le nom de domaine du serveur : http://localhost:3000

#### Voici les URI/endpoints pour chaque route :

Inscription de l'utilisateur :  
``/api/auth/signup``

Athentification de l'utilisateur :  
``/api/auth/login``

Afficher la collection des posts :  
``/api/posts``

Créer un post :  
``/api/posts``

Modifier un post :  
``/api/posts/:id``

Supprimer un post :  
``/api/posts/:id``

Ajouter ou retirer un like :  
``/api/posts/:id/like``


Exemple : pour modifier un post, l'URL complet de la route est : http://localhost:3000/api/posts/:id  
:id = paramètre URL qui correspond à l'identifiant unique du post.

_________________________________

### SÉCURITÉ

L'application a été sécurisée afin de protéger les données sensibles contre de mauvaises manipulations ou d'éventuelles attaques d'utilisateurs malveillants.
  
Voici les moyens mis en place dans cette application :
  
- Chaque utilisateur à une adresse email unique. 2 utilisateurs ne peuvent avoir une adresse email identique.
  
- Les mots de passe des utilisateurs sont cryptés avant d'être stockés dans la BDD.
  
- Le token d'authentification : il permet d'authentifier l'utilisateur connecté à l'application puisqu'il contient son userId crypté. Ce token a une durée de validité de 24h et il est systématiquement vérifié avant chaque action de l'utilisateur.
  
- Les formulaires login et signup sont vérifiés et validés coté front, avec les regex et les attributs HTML. Il est important que les données saisies soient conformes avant l'envoi au backend ("never trust user input").
  
- Lors de la création d'un post ou d'un utilisateur, l'identifiant unique qui lui est associé est généré automatiquement par la BDD. Ne jamais récupérer un id envoyé par le front ("never trust user input").
  
- CORS : il s'agit de paramétrer les en-têtes HTTP afin de bloquer les requêtes d'origine externe à l'application, ça empeche les requêtes malveillantes d'acceder à des ressources non autorisés. Cette méthode de sécurisation a été implémenté avec helmet mais a besoin d'être retravaillée dans cette application.

_________________________________

### AXES D'AMELIORATION

Même si cette application répond aux éxigences, elle a besoin d'être améliorer et optimiser :

- Concernant la fonction 'éditer un post' : actuellement cette fonction invite l'utilisateur à saisir un nouveau texte qui remplacera celui d'origine. Cette fonctionnalité répond aux attentes. Le problème est que l'utilisateur doit tout réécrire, même s'il souhaite par exemple modifier un mot ou ajouter un point qu'il a oublié. Si son texte est trop long, ça serait frustrant pour lui de devoir tout réécrire. C'est pourquoi l'utilisateur doit pouvoir récupérer le texte d'origine de son post et le modifier.

- Toujours concernant la fonction 'éditer un post' : lorsque l'utilisateur modifie son post (qu'il charge une nouvelle image ou pas), l'image d'origine n'est pas supprimée du dossier images du backend, ce qui fait que ces fichiers qui deviennent inutilisés occupent voir encombrent l'espace côté serveur. Il faudrait donc optimiser cette fonction pour supprimer l'ancienne image du disque et alléger le backend.

- Ajouter un système de commentaire : le but serait de commenter un post existant.
Pour chaque post, on pourrait imaginer un bouton commentaire (à côté du bouton like par exemple) et le nombre de commentaires du post, le bouton afficherait la liste des commentaires du post et la possibilité de créer un nouveau commentaire (une sorte de 'sous-post').

- Le côté responsiv a besoin d'être optimiser, on pourrait par exemple ajouter un toggle de navigation pour la version mobile

- Le code de l'application est commenté en français et devrait être commenté en anglais, afin de faciliter la compréhension pour les developpeurs non francophones qui souhaitent reprendre le projet.