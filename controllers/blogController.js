const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

exports.blog_get = (req, res, next) => {
  Blog.find({draft: false}, (err, data) => {
    if (err) {
      return res.sendStatus(404);
    }
    res.send(data);
  });
};

exports.user_blogs_get = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.id, draft: false });
    const comments = await Comment.find({ author: req.params.id });
    res.json({ blogs, comments });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

exports.new_post = async (req, res) => {
  try {
    const blog = await new Blog({
      author: req.user._id,
      content: req.body.content,
      title: req.body.title,
      draft: req.body.draft || false
    }).save()
    res.json(blog)
  } catch (error) {
    res.status(404).json({ error: error })
    
  }
}