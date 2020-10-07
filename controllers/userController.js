const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Blog = require('../models/blog');
const Comment = require('../models/comment');

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

exports.user_update_post = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hashedPassword,
      _id: req.params.id,
    });
    const update = await User.findByIdAndUpdate(req.params.id, user, {});
    res.json(user);
  } catch (err) {
    res.json({ error: err });
  }
};

exports.user_get = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id);
    const blogs = await Blog.find({author: id})
    const comments = await Comment.find({author: id})
    res.json({user, blogs, comments});
  } catch (error) {
    res.json({ error: error });
  }
};

exports.profile_get = async(req, res) => {
  try {
    const id = req.user._id
    const user = await User.findById(id);
    const blogs = await Blog.find({author: id})
    const comments = await Comment.find({author: id})
    res.json({user, blogs, comments})
  } catch (error) {
    res.status(404).json({error: err})
  }
}