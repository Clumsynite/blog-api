const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  added: { type: Date, default: Date.now },
});

BlogSchema.virtual('timestamp').get(function() {
  return moment(this.added).format('LLLL')
})


module.exports = mongoose.model("Blog", BlogSchema);
