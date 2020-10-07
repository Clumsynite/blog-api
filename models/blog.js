const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment');

const BlogSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  added: { type: Date, default: Date.now },
  draft: {type: Boolean, default: false}
});

BlogSchema.virtual('timestamp').get(function() {
  return moment(this.added).format('LLLL')
})


module.exports = mongoose.model("Blog", BlogSchema);
