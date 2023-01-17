const User = require('../Model/userModel');
const { catchError } = require('../utils/asyncCatch');
const createError = require('../utils/createError');

exports.createUser = catchError(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    status: 'Success',
    data: {
      user,
    },
  });
});

exports.getAllUsers = catchError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'Success',
    data: {
      users,
    },
  });
});

exports.deleteUser = catchError(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({});
});

exports.updateUser = catchError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select('-password');

  res.status(200).json({
    status: 'Success',
    data: {
      data: user,
    },
  });
});

exports.getUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    data: {
      data: user,
    },
  });
});

exports.filterUsers = catchError(async (req, res) => {
  console.log(req.params);
  const admin = await User.find({ role: req.params.filter1 })
    .select('username')
    .select('designation')
    .select('department')
    .select('role')
    .select('-_id');
  const superAdmin = await User.find({ role: req.params.filter2 })
    .select('username')
    .select('designation')
    .select('department')
    .select('role')
    .select('-_id');

  res.status(200).json({
    adminCount: admin.length,
    superAdminCount: superAdmin.length,
    users: {
      admin,
      superAdmin,
    },
  });
});
