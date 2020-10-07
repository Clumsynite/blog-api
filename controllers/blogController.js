const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

exports.blog_get = (req, res, next) => {
  Blog.find({}, (err, data) => {
    if (err) {
      return res.sendStatus(404);
    }
    res.send(data);
  });
};

exports.user_blogs_get = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.id });
    const comments = await Comment.find({ author: req.params.id });
    res.json({ blogs, comments });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
