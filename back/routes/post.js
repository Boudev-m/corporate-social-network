// Express
const express = require('express');

// Routeur Express
const router = express.Router();

// Importe les controllers et middlewares pour les appliquer aux routes
const postCtrl = require('../controllers/post');
// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

// Routes
router.get('/', /*auth,*/ postCtrl.getAllPost);
// router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', /*auth, multer,*/ postCtrl.createPost);
// router.post('/:id/like', auth, postCtrl.likePost);
// router.put('/:id', auth, multer, postCtrl.updatePost);
// router.delete('/:id', auth, postCtrl.deletePost);

// Exporte les routes pour l'app
module.exports = router;
