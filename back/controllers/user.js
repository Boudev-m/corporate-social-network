// Modèle mongoose
const User = require('../models/user');

// Hash password
const bcrypt = require('bcrypt');

// Token
const jwt = require('jsonwebtoken');

// Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                email: req.body.email.toLowerCase(),
                password: hash,
                isAdmin: false
                //_id: géneré par mongoose
            });
            user.save()
                .then((user) => {
                    res.status(201).json({ message: 'Inscription réussie', user })
                })
                .catch(error => {
                    res.status(500).json({ message: 'Inscription échouée', error });
                });
        })
        .catch(error => res.status(500).json(error));
};


// Authentification de l'utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email.toLowerCase() })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur introuvable' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }
                    const token = jwt.sign(
                        { userId: user._id },
                        process.env.PRIVATE_KEY,
                        { expiresIn: '24h' });
                    res.status(200).json({
                        userId: user._id, jwt: token
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};