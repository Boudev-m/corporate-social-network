// Multer
const multer = require('multer');

// Résoud l'extension de fichier
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration : nom de fichier et chemin de stockage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Exporte multer configuré (avec la constante storage), gère seulement les fichiers 'image'
module.exports = multer({ storage: storage }).single('imageFile');    // 'imageFile' doit correspondre au nom utilisé dans le formData côté front