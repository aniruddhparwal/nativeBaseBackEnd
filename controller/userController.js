const User = require("../models/user");
const bigPromise = require("../middleware/bigPromise");
const customError = require("../utils/customeError");
const cookieToken = require("../utils/cookieToken");

exports.signup = bigPromise(async (req, res, next) => {
  const { name, email, mobileNo, password } = req.body;
  console.log(req.body);
  if (!email || !name || !password) {
    return next(new customError("name, email, password are required", 400));
  }
  const user = await User.create({
    name,
    email,
    password,
    mobileNo,
  });
  cookieToken(user, res);
});

exports.login = bigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new customError("Please Provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new customError("Please Provide valid email", 400));
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) {
    return next(new customError("Email or password may be incorrect", 400));
  }

  cookieToken(user, res);
});

exports.logout = bigPromise(async (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logout Success",
    });
});

exports.emailVerify = bigPromise(async (req, res, next) => {
  const token = req.params.token;

  const user = await User.findOne({ email_token: token });
  if (!user) {
    return next(new customError("Invalid Token", 400));
  }
  user.email_verified = true;
  user.email_token = null;
  await user.save();
});
