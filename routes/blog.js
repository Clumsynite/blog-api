const express = require("express");
const router = express.Router();

const blog = require("../controllers/blogController");

router.get("/all", blog.blog_get);

module.exports = router