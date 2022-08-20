// Mongoose
const mongoose = require('mongoose');

// Modèle post
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },   // _id de l'user du post
  date: { type: [String], required: true },
  text: { type: String },
  imageUrl: { type: String },
  likes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },    // array de strings, avec la liste des userId des users qui ont likes
  //_id: il sera géneré par le back et attribué au post lors de sa création, unique
});

// Exporte en tant que 'Post' dans les autres fichiers
module.exports = mongoose.model('Post', postSchema);