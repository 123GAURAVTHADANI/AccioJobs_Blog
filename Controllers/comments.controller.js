const asyncHandler = require("../Configurations/asyncHandler");
const { populate } = require("../Models/article.schema");
const Comment = require("../Models/comments.schema");

const CreateComment = asyncHandler(async (req, res, next) => {
  Comment.create(req.body)
    .then((response) => {
      try {
        res.json({ Message: "Comment is created Successfully!" });
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

module.exports = { CreateComment, GetComments };
