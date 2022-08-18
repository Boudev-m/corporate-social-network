// Express
const express = require('express');

// Routeur Express
const router = express.Router();

// Importe les controllers et middlewares pour les appliquer aux routes
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes
router.get('/', auth, postCtrl.getAllPost);
router.post('/', /*auth,*/ multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.post('/:id/like', auth, postCtrl.likePost);
router.delete('/:id', auth, postCtrl.deletePost);

// Exporte les routes pour l'app
module.exports = router;
