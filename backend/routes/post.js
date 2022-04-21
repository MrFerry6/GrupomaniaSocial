const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth')


router.post('/post',auth, postCtrl.post);
router.get('/getPosts',auth, postCtrl.getPosts);



module.exports = router;