const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signup_post = async (req, res) => {
  try {
    const exists = User.find({ username: req.body.username });
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
    res.json(update);
  } catch (err) {
    res.json({ error: err });
  }
};

exports.user_get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.json({ error: error });
  }
};
