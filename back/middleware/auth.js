// Gestionnaire de Token
const jwt = require('jsonwebtoken');

// Vérifie l'authentification utilisateur, pour lui donner l'accès d'afficher, créer, modifier ou supprimer des sauces
module.exports = (req, res, next) => {
    console.log('-------------- AUTH --------------');
    console.log('Vérification du token...');
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'process.env.PRIVATE_KEY');      // à placer dans une var env
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        console.log('Token valide.');
        console.log('userId du token:');
        console.log(req.auth.userId);
        next();
    } catch (error) {
        console.log('Token non valide.');
        res.status(401).json(error);
    }
};