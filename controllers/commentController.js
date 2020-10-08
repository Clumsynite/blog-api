const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

exports.comment_get = async(req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    res.json(comment)
  } catch (error) {
    res.status(404).json({ error: error })
  }
}