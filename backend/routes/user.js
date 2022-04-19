const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');

router.post('/signup', userCtrl.singup);
router.post('/login', userCtrl.login);
router.post('/auth', userCtrl.auth);
router.get('/findUser', auth, userCtrl.getUser)
router.delete('/delete', userCtrl.deleteUser);

module.exports = router;