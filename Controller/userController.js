const User = require("../Model/userModel");
const { catchError } = require("../utils/asyncCatch");
const createError = require("../utils/createError");

exports.createUser = catchError(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

exports.getAllUsers = catchError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });
});
