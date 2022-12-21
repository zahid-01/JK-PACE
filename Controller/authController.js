const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { catchError } = require("../utils/asyncCatch");
const createError = require("../utils/createError");

const createSendToken = (id, res, statusCode) => {
  const token = jwt.sign(id, process.env.JWT_PAYLOAD);

  res.cookie("jwt", token);
  res.status(statusCode).json({
    data: {
      token: token,
      status: "Success",
    },
  });
};

exports.signUp = catchError(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  createSendToken(user.id, res, 200);
});

exports.logIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new createError("Provide Credentials", 501));
  const user = await User.findOne({ email });
  const check = await user?.verifyPassword(password, user.password);
  if (!user || !check) return next(new createError("Invalid credentials", 400));
  createSendToken(user.id, res, 200);
});

exports.updateMe = catchError(async (req, res, next) => {
  console.log("HIT");
  const me = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "Success",
    data: {
      data: me,
    },
  });
});

exports.protect = catchError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new createError("Not Logged in"));
  }

  const verify = await jwt.verify(token, process.env.JWT_PAYLOAD);
  const user = await User.findById(verify);
  if (!user) return next(new createError("Login again", 400));

  req.user = user;
  next();
});

exports.verify = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new createError("You are not authorized", 400));
    }
    next();
  };
};
