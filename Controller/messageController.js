const Messages = require('../Model/messagesModel');
const handlerFactory = require('./handlerFactory');
const { catchError } = require('../utils/asyncCatch');

exports.createMessage = handlerFactory.createOne(Messages);
exports.readMessages = handlerFactory.findAll(Messages);

exports.readDepartmentMessage = catchError(async (req, res) => {
  const dept = req.params.dept;
  const message = await Messages.find({ department: dept });

  res.status(200).json({
    status: 'Success',
    message,
  });
});
