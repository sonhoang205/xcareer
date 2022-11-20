const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/seeusers', authController.seeUsers);
router.get('/userInfor', authController.getUserInfor);

module.exports = router;
