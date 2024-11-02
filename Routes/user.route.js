var express = require("express");
var {
  CreateUser,
  GetUsers,
  loginUser,
} = require("../Controllers/user.controller");
var UserRouter = express.Router();
var { authorizeRoles } = require("../Middlewares/auth.middleware.js");
UserRouter.post("/create", CreateUser);
UserRouter.get("/getUsers", GetUsers);
UserRouter.post("/login", loginUser);
// UserRouter.delete("/delete", DeleteUser);

module.exports = UserRouter;
