const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth')
const multerImages = require('../middleware/multer-images');
const multerVideos = require('../middleware/multer-videos');

router.post('/postImage',auth,multerImages, postCtrl.post);
router.post('/postVideo',auth,multerVideos, postCtrl.post);
router.get('/getPosts',auth, postCtrl.getPosts);



module.exports = router;