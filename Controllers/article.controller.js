const Article = require("../Models/article.schema");
const User = require("../Models/user.schema");
function CreateBlog(req, res) {
  try {
    Article.create(req.body)
      .then((response) => {
        res
          .json({ Message: "Article is created Successfully", data: response })
          .status(201);
        User.findByIdAndUpdate(
          response.user,
          { $push: { blog: response._id } },
          { new: true }
        );
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

module.exports = { CreateBlog, GetDetails };
