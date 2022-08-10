// Mongoose
const mongoose = require('mongoose');

// Modèle post
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },   // _id de l'user
  date: { type: Number, required: true },     // utiliser la fonction Date.now() puis formater
  text: { type: String },
  imageUrl: { type: String },
  likes: { type: Number },
  usersLiked: { type: [String] },    // array de strings, avec la liste des userId des users qui ont likes
  //_id: il sera géneré par le back et attribué au post lors de sa création, unique
});

// Exporte en tant que 'Post' dans les autres fichiers
module.exports = mongoose.model('Post', postSchema);