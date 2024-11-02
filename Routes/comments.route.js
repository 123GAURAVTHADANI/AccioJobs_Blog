var express = require("express");
const { isLoggedIn } = require("../Middlewares/auth.middleware");
const {
  CreateComment,
  GetComments,
} = require("../Controllers/comments.controller");

var CommentRouter = express.Router();

CommentRouter.post("/createComment", CreateComment);
CommentRouter.get("/getComments", GetComments);
// UserRouter.delete("/delete", DeleteUser);

module.exports = CommentRouter;
