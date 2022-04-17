const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');


router.post('/post', postCtrl.post);



module.exports = router;