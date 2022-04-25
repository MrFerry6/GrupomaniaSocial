const multer =require('multer');

const MIME_TYPES = {  
  'image/gif': 'gif',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const imageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null,  Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: imageStorage}).single('image');