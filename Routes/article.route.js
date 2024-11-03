var express = require("express");
const {
  CreateBlog,
  GetDetails,
  GetBlogById,
} = require("../Controllers/article.controller");
const {
  isLoggedIn,
  authorizeRoles,
} = require("../Middlewares/auth.middleware");

var BlogRouter = express.Router();

BlogRouter.post("/createBlog", CreateBlog);
BlogRouter.get("/getDetails", isLoggedIn, GetDetails);
BlogRouter.get(
  "/getById/:id",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  GetBlogById
);
// UserRouter.delete("/delete", DeleteUser);

module.exports = BlogRouter;
