const express = require("express");
const router = express.Router();

const blog = require("../controllers/blogController");

router.get("/all", blog.blog_get);
router.get("/:id/view", blog.user_blogs_get);
router.post("/new", blog.new_post);
module.exports = router;
