const multer = require('multer');

const MIME_TYPES = {
  'video/gif': 'jpg',
  'video/avi': 'avi',
  'image/mov': 'mov'
};

const videoStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './videos');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null,  Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: videoStorage}).single('video');