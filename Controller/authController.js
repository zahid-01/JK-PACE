const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createSendToken = async (id, res, statusCode) => {
  const token = jwt.sign(id, process.env.JWT_PAYLOAD);

  res.cookie("jwt", token);
  res.status(statusCode).json({
    data: {
      token: token,
      status: "Success",
    },
  });
};

exports.signUp = async (req, res, next) => {
  const user = await User.create(req.body);
  createSendToken(user.id, res, 200);
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(200).json({
      message: "Please provide credentials",
    });
  }
  const user = await User.findOne({ email });
  const check = await user.verifyPassword(password, user.password);
  createSendToken(user.id, res, 200);
};
