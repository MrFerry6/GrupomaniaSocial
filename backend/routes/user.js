const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');

router.post('/signup', userCtrl.singup);
router.post('/login', userCtrl.login);
router.post('/auth', userCtrl.auth);
router.get('/findUser', auth, userCtrl.getUser);
router.put('/modifyUnread', auth, userCtrl.modifyUnread);
router.put('/modifyRead', auth, userCtrl.modifyRead);
router.delete('/delete',auth, userCtrl.deleteUser);
router.put('/addComent',auth, userCtrl.addComent);

module.exports = router;