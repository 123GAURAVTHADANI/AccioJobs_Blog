const User = require("../Models/user.schema");

function CreateUser(req, res) {
  try {
    User.create(req.body)
      .then((response) => {
        res
          .json({ Message: "User is created Successfully", data: response })
          .status(201);
      })
      .catch((error) => {
        res
          .json({ Message: "Something Went Wrong !!", error: error })
          .status(500);
      });
  } catch (error) {
    res.json({ Message: "Something Went Wrong !!", error: error }).status(500);
  }
}
module.exports = CreateUser;
