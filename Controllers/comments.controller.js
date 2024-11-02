const asyncHandler = require("../Configurations/asyncHandler");
const Article = require("../Models/article.schema");
const { populate } = require("../Models/article.schema");
const Comment = require("../Models/comments.schema");

const CreateComment = asyncHandler(async (req, res, next) => {
  Comment.create(req.body)
    .then((response) => {
      try {
        res.json({
          Message: "Comment is created Successfully!",
          data: response,
        });
        Article.findByIdAndUpdate(
          response.blog,
          { $push: { comment: response._id } },
          { new: true }
        );
      } catch (error) {
        res
          .json({ Message: "Something went wrong!!", error: error })
          .status(500);
      }
    })
    .catch((err) => {
      res.json({ Message: "Something went wrong!!", error: err }).status(500);
    });
});
const GetComments = asyncHandler(async (req, res, next) => {
  Comment.find({})
    .populate("blog")
    .populate("user")
    .then((response) => {
      res.json({
        Message: "All Comments Fetched Successfully!!!",
        data: response,
      });
    })
    .catch((err) => {
      res.json({ Message: "Something Went Wrong !!", error: err }).status(500);
    });
});

const GetCommentById = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
  Comment.findById(id)
    .populate("blog")
    .populate("user")
    .then((response) => {
      res.json({
        Message: "Comment is fetched!!!",
        data: response,
      });
    })
    .catch((err) => {
      res.json({ Message: "Something went wrong!!", error: err }).status(501);
    });
});

const DeleteComment = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
  Comment.findByIdAndDelete(id)
    .then((response) => {
      res.json({
        Message: "Comment is Deleted!!!",
        data: response,
      });
    })
    .catch((err) => {
      res.json({ Message: "Something went wrong!!", error: err }).status(501);
    });
});

module.exports = { CreateComment, GetComments, GetCommentById, DeleteComment };
