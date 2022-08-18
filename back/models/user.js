// Mongoose
const mongoose = require('mongoose');

// Mongoose unique validator, pour vérifier l'unicité d'une donnée
const uniqueValidator = require('mongoose-unique-validator');

// Validator, pour vérifier le format d'une donnée string
const { isEmail } = require('validator');

// Modèle user
const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, validate: [isEmail], unique: true },  // doit être insensible à la casse
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    //_id: il sera géneré par le back et attribué au user à l'inscription (signup), deviendra ensuite l'userId à l'authentification (login)
});

// Applique l'email unique
userSchema.plugin(uniqueValidator);

// Exporte en tant que 'User' dans les autres fichiers
module.exports = mongoose.model('User', userSchema);