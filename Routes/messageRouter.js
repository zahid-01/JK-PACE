const messageRouter = require('express').Router();
const messageController = require('../Controller/messageController');
const authController = require('../Controller/authController');

messageRouter.use(authController.protect);
messageRouter
  .route('/createMessage')
  .post(messageController.createMessage)
  .get(messageController.readMessages);

module.exports = messageRouter;
