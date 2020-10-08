const Blog = require("../models/blog");
const Comment = require("../models/comment");

exports.blog_get = (req, res, next) => {
  Blog.find({ draft: false }, (err, data) => {
    if (err) {
      return res.sendStatus(404);
    }
    res.send(data);
  });
};

exports.blog_view_get = async(req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    const comment = await Comment.find({blog: req.params.id})
    res.json({blog, comment})
  } catch (error) {
    res.status(404).json({ error: error })
  }
}

exports.new_post = async (req, res) => {
  try {
    const blog = await new Blog({
      author: req.user._id,
      content: req.body.content,
      title: req.body.title,
      draft: req.body.draft || false,
    }).save();
    res.json(blog);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

exports.update_put = async (req, res) => {
  try {
    const blog = {
      author: req.user._id,
      content: req.body.content,
      title: req.body.title,
      draft: req.body.draft || false,
      _id: req.params.id,
    };
    await Blog.findByIdAndUpdate(req.params.id, blog, {});
    res.json(blog);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

exports.blog_delete = async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

exports.comment_new_post = async (req, res) => {
  try {
    const comment = await new Comment({
      author: req.user._id,
      blog: req.params.id,
      title: req.body.title,
      content: req.body.content
    }).save()
    res.json(comment)
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
