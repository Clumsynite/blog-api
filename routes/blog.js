const express = require("express");
const router = express.Router();

const blog = require("../controllers/blogController");

router.get("/all", blog.blog_get);
router.get("/:id/view", blog.user_blogs_get);
router.post("/new", blog.new_post);
router.get("/:id/drafts", blog.user_drafts_get);

module.exports = router;
