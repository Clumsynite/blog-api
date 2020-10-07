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
