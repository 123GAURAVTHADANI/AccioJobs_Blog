const { Schema, default: mongoose } = require("mongoose");
const User = require("./user.schema");

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
