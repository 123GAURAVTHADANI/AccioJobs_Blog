const asyncHandler = require("../Configurations/asyncHandler");
const jwt = require("jsonwebtoken");

const authorizeRoles = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.json({ Message: "You are not eligible" });
    } else {
      next();
    }
  });

const isLoggedIn = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.json({ Message: "Unauthorized to do it!" });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    res.json({ Message: "Unauthorized !" });
  }

  req.user = decoded;

  next();
});

module.exports = { authorizeRoles, isLoggedIn };
