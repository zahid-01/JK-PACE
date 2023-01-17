const User = require('../Model/userModel');
const { catchError } = require('../utils/asyncCatch');
const handlerFactory = require('./handlerFactory');

exports.createUser = handlerFactory.createOne(User);
exports.getUser = handlerFactory.readOne(User);
exports.getAllUsers = handlerFactory.findAll(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.updateUser = handlerFactory.updateOne(User);

exports.filterUsers = catchError(async (req, res) => {
  console.log(req.params);
  const admin = await User.find({ role: req.params.filter1 })
    .select('username')
    .select('designation')
    .select('department')
    .select('role');
  const superAdmin = await User.find({ role: req.params.filter2 })
    .select('username')
    .select('designation')
    .select('department')
    .select('role');

  res.status(200).json({
    adminCount: admin.length,
    superAdminCount: superAdmin.length,
    users: {
      admin,
      superAdmin,
    },
  });
});

exports.getDepartmentUser = catchError(async (req, res) => {
  const department = req.params.dept.toUpperCase();
  const users = await User.find({ department });

  res.status(200).json({
    status: 'Success',
    users,
  });
});
