var express = require("express");
const { CreateBlog, GetDetails } = require("../Controllers/article.controller");
const { isLoggedIn } = require("../Middlewares/auth.middleware");

var BlogRouter = express.Router();

BlogRouter.post("/createBlog", CreateBlog);
BlogRouter.get("/getDetails", isLoggedIn, GetDetails);
// UserRouter.delete("/delete", DeleteUser);

module.exports = BlogRouter;
