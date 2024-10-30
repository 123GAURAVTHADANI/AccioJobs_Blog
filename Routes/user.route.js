var express = require("express");
const CreateUser = require("../Controllers/user.controller");

var UserRouter = express.Router();

UserRouter.post("/create", CreateUser);
// UserRouter.delete("/delete", DeleteUser);

module.exports = UserRouter;
