const express = require('express');
const router = express.Router()

const user = require('../controllers/userController');

router.post('/login', user.login_post)

router.post('/logout', user.logout_post)

module.exports = router