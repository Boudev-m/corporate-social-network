// Modèle mongoose
const Post = require('../models/post');
const User = require('../models/user');

// Affiche tous les posts de la BDD
exports.getAllPost = (req, res, next) => {
    console.log('-------------- GET ALL POSTS --------------');
    Post.find()
        .then(posts => {
            for (let i in posts) {
                if (req.auth.userId === posts[i].userId) {
                    posts[i].isAuthor = true;
                }
                if (posts[i].usersLiked.includes(req.auth.userId)) {
                    posts[i].hasLiked = true;
                }
            }
            User.findOne({ _id: req.auth.userId })
                .then(user => {
                    res.status(200).json({ posts, isAdmin: user.isAdmin })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Enregistre un post dans la BDD
exports.createPost = (req, res, next) => {
    console.log('-------------- CREATE A POST --------------');
    console.log('Contenu du post');
    console.log(req.body);
    console.log(req.file);
    console.log(req.auth);
    const postObject = req.body;
    delete postObject._id;
    delete postObject.userId;
    delete postObject.author;
    let fullDate = new Date;
    let date = fullDate.toLocaleDateString();
    let time = fullDate.toLocaleTimeString().split(':');
    time.pop();
    time = time.join(':')
    const post = new Post({
        ...postObject,                          // contient le text et l'image
        userId: req.auth.userId,                // userId extrait du token
        author: [],
        isAuthor: false,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '',
        date: [date, time],
        likes: 0,
        usersLiked: [],
        hasLiked: false
        //_id: géneré par mongoose
    });
    User.findOne({ _id: post.userId })
        .then((user) => {
            post.author.push(user.lastName)
            post.author.push(user.firstName);
            return post;
        })
        .then((post) => {
            post.save()
                .then((post) => {
                    console.log('post crée');
                    console.log(post);
                    res.status(201).json({ message: 'Post crée', post })
                })
                .catch(error => res.status(500).json({ error }));
        }).catch(error => res.status(500).json({ error }));

};


// Modifie un post de la BDD
exports.updatePost = (req, res, next) => {
    console.log('-------------- UPDATE A POST --------------');
    console.log('id du post dans les params url : ' + req.params.id);
    console.log('Contenu du post :');
    console.log(req.body.text, req.file);
    const postObject = {
        text: req.body.text,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ''
    }
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            User.findOne({ _id: req.auth.userId })
                .then(user => {
                    if (post.userId === req.auth.userId || user.isAdmin) {
                        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Post modifiée' }))
                            .catch(error => res.status(500).json({ error }));
                    } else {
                        return res.status(403).json({ message: 'Non autorisé' });
                    }
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


// Like un post
exports.likePost = (req, res, next) => {
    console.log('-------------- LIKE A POST --------------');
    console.log('id du post dans les params url : ' + req.params.id);
    console.log('userId token : ' + req.auth.userId);
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            console.log(post);
            let updateLike = -1;
            const likeObject = {
                likes: post.likes,
                usersLiked: post.usersLiked,
            }
            if (likeObject.usersLiked.includes(req.auth.userId)) {
                likeObject.likes -= 1;
                likeObject.usersLiked.splice(likeObject.usersLiked.indexOf(req.auth.userId), 1);
            } else {
                likeObject.likes += 1;
                likeObject.usersLiked.push(req.auth.userId);
                updateLike = 1;
            }
            Post.updateOne({ _id: req.params.id }, { ...likeObject, _id: req.params.id })
                .then(() => res.status(201).json(updateLike))
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }))
}


// file systeme, pour avoir accès au système de fichiers
const fs = require('fs');

// Supprime un post de la BDD
exports.deletePost = (req, res, next) => {
    console.log('-------------- DELETE A POST --------------');
    console.log('id du post dans les params url : ' + req.params.id);
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            User.findOne({ _id: req.auth.userId })
                .then(user => {
                    console.log(user);
                    if (post.userId === req.auth.userId || user.isAdmin) {
                        const filename = post.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            Post.deleteOne({ _id: req.params.id })
                                .then(() => res.status(200).json({ message: 'Post supprimée' }))
                                .catch(error => res.status(500).json({ error }));
                        });
                    } else {
                        return res.status(403).json({ message: 'Accès interdit' });
                    }
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}