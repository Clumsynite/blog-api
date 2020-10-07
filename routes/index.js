const express = require("express");
const router = express.Router();

const blog = require("../controllers/blogController");
const user = require("../controllers/userController");
const comment = require("../controllers/commentController");

// Blog
router.get("/blogs", blog.blog_get);

// User
router.post("/signup", user.signup_post);
router.post("/login", user.login_post);

// Comment

module.exports = router;
