const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  blog: { type: Schema.Types.ObjectId, ref: "Blog" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  added: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);
