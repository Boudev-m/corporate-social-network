// Modèle mongoose
// const Post = require('../models/post');

// Affiche tous le posts de la BDD
exports.getAllPost = (req, res, next) => {
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
};


// Enregistre un post dans la BDD
exports.createPost = (req, res, next) => {
    console.log(req.body);
    res.status(201).json('post crée');
    // const postObject = JSON.parse(req.body.post);
    // delete postObject._id;
    // delete postObject.userId;
    // const post = new Post({
    //     ...postObject,
    //     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    //     userId: req.auth.userId,
    //     likes: 0,
    //     dislikes: 0,
    //     usersLiked: [],
    //     usersDisliked: []
    //     //_id: géneré par mongoose
    // });
    // post.save()
    //     .then(() => res.status(201).json({ message: 'Post créee' }))
    //     .catch(error => res.status(500).json({ error }));
};


// // Modifie une post de la BDD
// exports.updatePost = (req, res, next) => {
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
// };


// // Like/Dislike une post
// exports.likePost = (req, res, next) => {
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
// }


// // file systeme, pour avoir accès au système de fichiers
// const fs = require('fs');

// // Supprime une post de la BDD
// exports.deletePost = (req, res, next) => {
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
// }