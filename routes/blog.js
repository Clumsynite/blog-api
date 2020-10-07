const express = require("express");
const router = express.Router();

const blog = require("../controllers/blogController");

router.get("/all", blog.blog_get);
router.post("/new", blog.new_post);
router.put("/:id/update", blog.update_put);

module.exports = router;
