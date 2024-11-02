const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Article",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
