const User = require("../Model/userModel");

exports.createUser = async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
};
