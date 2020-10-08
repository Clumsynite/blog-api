const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

exports.signup_post = async (req, res) => {
  try {
    const exists = await User.findOne({ username: req.body.username });
    if (exists) {
      return res.json({
        error: "User already exists. Try a different username",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hashedPassword,
    }).save();
    res.json({ user, message: "Signup Successful" });
  } catch (err) {
    res.json({ error: err });
  }
};

exports.user_update_put = async (req, res) => {
  try {
    if (req.params.id == req.user._id) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
        _id: req.params.id,
      });
      await User.findByIdAndUpdate(req.params.id, user, {});
      res.json(user);
    } else {
      res.json({ error: "You can't update some other user's details" });
    }
  } catch (err) {
    res.json({ error: err });
  }
};

exports.user_get = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const blogs = await Blog.find({ author: id });
    const comments = await Comment.find({ author: id });
    res.json({ user, blogs, comments });
  } catch (error) {
    res.json({ error: error });
  }
};

exports.profile_get = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    const blogs = await Blog.find({ author: id });
    const comments = await Comment.find({ author: id });
    res.json({ user, blogs, comments });
  } catch (error) {
    res.status(404).json({ error: err });
  }
};

exports.blog_get = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.id, draft: false });
    const comments = await Comment.find({ author: req.params.id });
    res.json({ blogs, comments });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

exports.drafts = async (req, res) => {
  try {
    const drafts = await Blog.find({ author: req.user._id, draft: true });
    res.json(drafts);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

exports.comment_get = async (req, res) => {
  try {
    const comments = await Comment.find({ author: req.params.id });
    res.json(comments);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
