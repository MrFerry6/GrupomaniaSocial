const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth')
const multerImages = require('../middleware/multer-images');

router.post('/post',auth, multerImages, postCtrl.post);
router.get('/getPosts',auth, postCtrl.getPosts);



module.exports = router;