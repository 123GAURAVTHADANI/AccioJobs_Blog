const asyncHandler = require("../Configurations/asyncHandler");
const Article = require("../Models/article.schema");
const User = require("../Models/user.schema");
const { GetCommentById } = require("./comments.controller");
function CreateBlog(req, res) {
  try {
    Article.create(req.body)
      .then((response) => {
        res
          .json({ Message: "Article is created Successfully", data: response })
          .status(201);
        User.findByIdAndUpdate(
          { _id: response.user },
          { $push: { blog: response._id } },
          {
            new: true,
          }
        ).then((response) => {
          console.log(response);
        });
      })
      .catch((error) => {
        res
          .json({ Message: "Something Went Wrong !!", error: error })
          .status(500);
      });
  } catch (err) {
    res.json({ Message: "Something Went Wrong !!", error: err }).status(500);
  }
}
function GetDetails(_, res) {
  try {
    Article.find({})
      .populate("user")
      .populate("comment")
      .then((response) => {
        res.json({ Message: "Article Details Fetched!!", data: response });
      })
      .catch((err) => {
        res
          .json({ Message: "Something Went Wrong !!", error: error })
          .status(500);
      });
  } catch (err) {
    res.json({ Message: "Something Went Wrong !!", error: err }).status(500);
  }
}
const GetBlogById = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
  Article.findById(id)
    .populate("comment")
    .populate("user")
    .then((response) => {
      res.json({
        Message: "Blog By Id is fetched!!!",
        data: response,
      });
    })
    .catch((err) => {
      res.json({ Message: "Something went wrong!!", error: err }).status(501);
    });
});

module.exports = { CreateBlog, GetDetails, GetBlogById };
