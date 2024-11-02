const asyncHandler = require("../Configurations/asyncHandler");
const User = require("../Models/user.schema");
const cookieOptions = {
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
};

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
function GetUsers(req, res) {
  try {
    User.find({})
      .then((response) => {
        res.json({ Message: "User Details Fetched!!", data: response });
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
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ Message: "Email & Password is required", status: 500 });
  }
  const user = await User.findOne({ email }).select("+password");

  if (!(user && (await user.comparePassword(password)))) {
    res.json({ Message: "Email or Password do not match" });
  }
  const token = await user.generateJWTToken();

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    message: "user logged in successfully!",
  });
});

module.exports = { CreateUser, GetUsers, loginUser };
