// Modèle mongoose
const User = require('../models/user');

// Hash password
const bcrypt = require('bcrypt');

// Token
const jwt = require('jsonwebtoken');

// Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    console.log('------ POST SIGNUP -------');
    console.log('Contenu de la req :');
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                email: req.body.email,
                password: hash,
                isAdmin: false
                //_id: géneré par mongoose
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur enregistré' }))
                .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
};


// Authentification de l'utilisateur
exports.login = (req, res, next) => {
    console.log('------ POST LOGIN -------');
    console.log('Contenu de la req :');
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log('user existant ?');
            if (!user) {
                console.log('Non.');
                return res.status(401).json({ message: 'Utilisateur introuvable' });
            }
            console.log('Oui.');
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    console.log('Mdp correct ?');
                    if (!valid) {
                        console.log('Non.');
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }
                    console.log('Oui. Vous êtes maintenant connecté.');
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'process.env.PRIVATE_KEY',
                            { expiresIn: '5h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
