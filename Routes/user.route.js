var express = require("express");
var {
  CreateUser,
  GetUsers,
  loginUser,
  DeleteUser,
} = require("../Controllers/user.controller");
var UserRouter = express.Router();
var {
  authorizeRoles,
  isLoggedIn,
} = require("../Middlewares/auth.middleware.js");
UserRouter.post("/create", CreateUser);
UserRouter.get("/getUsers", GetUsers);
UserRouter.post("/login", loginUser);
UserRouter.delete(
  "/delete/:id",
  isLoggedIn,
  authorizeRoles("ADMIN", "SUPER ADMIN"),
  DeleteUser
);

module.exports = UserRouter;
