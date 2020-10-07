const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");

router.post("/signup", user.signup_post);
router.put("/:id/update", user.user_update_post);
router.get("/:id/view", user.user_get);
router.get('/me', user.profile_get)
module.exports = router;
