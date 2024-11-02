const asyncHandler = (fnc) => (req, res, next) => {
  fnc(req, res, next).catch((err) => next(err));
};

module.exports = asyncHandler;
