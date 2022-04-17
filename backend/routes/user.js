const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.singup);
router.post('/login', userCtrl.login);
router.post('/auth', userCtrl.auth);
router.delete('/delete', userCtrl.deleteUser);

module.exports = router;