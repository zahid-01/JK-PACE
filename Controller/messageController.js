const Messages = require('../Model/messagesModel');
const handlerFactory = require('./handlerFactory');

exports.createMessage = handlerFactory.createOne(Messages);
exports.readMessages = handlerFactory.findAll(Messages);
