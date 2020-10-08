const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");

router.post("/signup", user.signup_post);
router.put("/:id/update", user.user_update_put);
router.get("/:id/view", user.user_get);
router.get("/me", user.profile_get);
router.get("/:id/blogs", user.blog_get);
router.get("/drafts", user.drafts);
router.get("/:id/comments", user.comment_get)
module.exports = router;
