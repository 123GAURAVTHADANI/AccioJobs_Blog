var express = require("express");
const {
  isLoggedIn,
  authorizeRoles,
} = require("../Middlewares/auth.middleware");
const {
  CreateComment,
  GetComments,
  GetCommentById,
  DeleteComment,
} = require("../Controllers/comments.controller");

var CommentRouter = express.Router();

CommentRouter.post("/createComment", isLoggedIn, CreateComment);
CommentRouter.get(
  "/getComments",
  isLoggedIn,
  authorizeRoles("ADMIN", "USER", "SUPER ADMIN"),
  GetComments
);
CommentRouter.get("/getComment/:id", isLoggedIn, GetCommentById);
CommentRouter.delete("/delete/:id", isLoggedIn, DeleteComment);

module.exports = CommentRouter;
