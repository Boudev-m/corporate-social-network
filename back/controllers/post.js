// Modèle mongoose
const Post = require('../models/post');
const User = require('../models/user');

// Token
const jwt = require('jsonwebtoken');

// Affiche tous les posts de la BDD
// Authentification requise
// On vérifie que l'user est connecté via son token dans la requête
exports.getAllPost = (req, res, next) => {
    console.log('-------------- GET ALL POSTS --------------');
    console.log('Token dans la request ?');
    if (req.headers.authorization) {
        console.log('Oui');
        // console.log('Token : ' + req.headers.cookie.split('jwt=')[1]);
        console.log('Token : ' + req.headers.authorization.split('Bearer ')[1]);
        const decodedToken = jwt.verify(req.headers.authorization.split('Bearer ')[1], 'process.env.PRIVATE_KEY');
        console.log('userId du Token : ' + decodedToken.userId);
        User.findOne({ _id: decodedToken.userId })
            .then(user => {
                console.log('Token valide ?');
                if (!user) {
                    console.log('Non. Accès refusé');
                    return res.status(401).json({ message: 'Utilisateur introuvable, token invalide' });
                }
                console.log('Oui. Accès autorisé');
                const posts = [
                    {
                        firstName: 'Must',
                        lastName: 'Boui',
                        message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ut suscipit excepturi nobis nulla provident ipsa consectetur esse, assumenda eligendi.',
                        like: 5,
                        date: 282022 // utiliser Date.now() puis formater
                    },
                    {
                        firstName: 'Jean',
                        lastName: 'Dupont',
                        message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
                        like: 1,
                        date: 382022
                    }
                ]
                res.status(200).json(posts);
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        console.log('Non. Accès refusé');
        res.status(401).json({ message: 'Utilisateur non connecté' });
    }



};


// Enregistre un post dans la BDD
exports.createPost = (req, res, next) => {
    console.log('-------------- CREATE A POST --------------');
    console.log('Contenu du post');
    console.log(req.body);
    console.log(req.file);
    // if (!req.body.text) {
    //     console.log('Pas de texte');
    // } else { console.log('Texte présent'); }
    // if (!req.body.imageUrl) {
    //     console.log('Pas d\'image');
    // } else { console.log('Image présente'); }
    const postObject = req.body;
    delete postObject._id;
    delete postObject.userId;
    const post = new Post({
        ...postObject,                        // contient le text et l'image
        userId: 'req.auth.userId',            // userId du token
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        date: Date.now(),
        likes: 0,
        usersLiked: [],
        //_id: géneré par mongoose
    });
    post.save()
        .then((post) => {
            console.log('post crée');
            console.log(post);
            res.status(201).json({ message: 'Post crée', post })
        })
        .catch(error => res.status(500).json({ error }));
};


// Modifie un post de la BDD
exports.updatePost = (req, res, next) => {
    console.log('-------------- UPDATE A POST --------------');
    console.log('id du post dans les params url : ' + req.params.id);
    console.log('Contenu du post :');
    console.log({ text: req.body.text, imageUrl: req.body.imageUrl });
    res.status(201).json('post modifié');
    //     const postObject = req.file ? {
    //         ...JSON.parse(req.body.post),
    //         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //     } : { ...req.body };
    //     delete postObject._userId;
    //     Post.findOne({ _id: req.params.id })
    //         .then((post) => {
    //             if (post.userId === req.auth.userId) {
    //                 Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    //                     .then(() => res.status(200).json({ message: 'Post modifiée' }))
    //                     .catch(error => res.status(500).json({ error }));
    //             } else {
    //                 return res.status(403).json({ message: 'Non autorisé' });
    //             }
    //         })
    //         .catch(error => res.status(500).json({ error }));
};


// Like un post
exports.likePost = (req, res, next) => {
    console.log('-------------- LIKE A POST --------------');
    console.log('id du post dans les params url : ' + req.params.id);
    res.status(201).json({ message: 'post liké' });
    //     if (req.auth.userId !== req.body.userId) {
    //         return res.status(403).json({ message: 'Non autorisé' });
    //     }
    //     Post.findOne({ _id: req.params.id })
    //         .then((post) => {
    //             const likeObject = {
    //                 likes: post.likes,
    //                 dislikes: post.dislikes,
    //                 usersLiked: post.usersLiked,
    //                 usersDisliked: post.usersDisliked
    //             }
    //             if (likeObject.usersLiked.includes(req.auth.userId)) {
    //                 likeObject.likes -= 1;
    //                 likeObject.usersLiked.splice(likeObject.usersLiked.indexOf(req.auth.userId), 1);
    //             }
    //             if (likeObject.usersDisliked.includes(req.auth.userId)) {
    //                 likeObject.dislikes -= 1;
    //                 likeObject.usersDisliked.splice(likeObject.usersLiked.indexOf(req.auth.userId), 1);
    //             }
    //             switch (req.body.like) {
    //                 case 1:
    //                     likeObject.likes += 1;
    //                     likeObject.usersLiked.push(req.auth.userId);
    //                     break;
    //                 case -1:
    //                     likeObject.dislikes += 1;
    //                     likeObject.usersDisliked.push(req.auth.userId);
    //                     break;
    //                 case 0:
    //                     break;
    //             }
    //             Post.updateOne({ _id: req.params.id }, { ...likeObject, _id: req.params.id })
    //                 .then(() => res.status(201).json({ message: 'Like modifié' }))
    //                 .catch((error) => res.status(500).json({ error }));
    //         })
    //         .catch((error) => res.status(500).json({ error }))
}


// file systeme, pour avoir accès au système de fichiers
const fs = require('fs');

// Supprime une post de la BDD
exports.deletePost = (req, res, next) => {
    console.log('-------------- DELETE A POST --------------');
    console.log('id du post dans les params url : ' + req.params.id);
    res.status(200).json({ message: 'post supprimé' });
    //     Post.findOne({ _id: req.params.id })
    //         .then((post) => {
    //             if (post.userId === req.auth.userId) {
    //                 const filename = post.imageUrl.split('/images/')[1];
    //                 fs.unlink(`images/${filename}`, () => {
    //                     Post.deleteOne({ _id: req.params.id })
    //                         .then(() => res.status(200).json({ message: 'Post supprimée' }))
    //                         .catch(error => res.status(500).json({ error }));
    //                 });
    //             } else {
    //                 return res.status(403).json({ message: 'Non autorisé' });
    //             }
    //         })
    //         .catch(error => res.status(500).json({ error }));
}