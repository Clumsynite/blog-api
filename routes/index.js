const express = require('express');
const router = express.Router()

const blog = require('../controllers/blogController');
const user = require('../controllers/userController');
const comment = require('../controllers/commentController');


module.exports = router