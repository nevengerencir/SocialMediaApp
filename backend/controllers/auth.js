const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middelware/asyncHandler");

//@desc register a new user
//@route POST /api/users
//@access PUBLIC
const getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    sucess: true,
    data: req.user,
    name: req.user.name,
  });
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;
  if (!password) {
    return next(new ErrorResponse("Please include all fields", 400));
  }
  const user = await User.create(req.body);
  sendTokenResponse(user, 200, res);
});

//@desc register a new user
//@route POST /api/users
//@access PUBLIC
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ErrorResponse(`Please provide an email and password`, 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }
  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    //manually calculating the cookie expiration because it doesn't accept day value as JWT token's
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options).json({
    sucess: true,
    token,
    user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
