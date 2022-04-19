const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth')


router.post('/post', postCtrl.post);
router.get('/getPost', postCtrl.getPost);



module.exports = router;