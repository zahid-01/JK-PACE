const messageRouter = require('express').Router();
const messageController = require('../Controller/messageController');

messageRouter
  .route('/createMessage')
  .post(messageController.createMessage)
  .get(messageController.readMessages);

module.exports = messageRouter;
