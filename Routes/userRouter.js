const express = require('express');

const userRouter = express.Router();
const userController = require('../Controller/userController');
const authController = require('../Controller/authController');
const { protect } = require('../Controller/authController');

userRouter.post('/signup', authController.signUp);
userRouter.post('/logIn', authController.logIn);
userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

userRouter.use(protect);
userRouter.get('/getMe', authController.getMe);
userRouter.patch('/me', authController.updateMe);
userRouter.use(authController.verify('super-admin'));
userRouter.route('/createUser').post(userController.createUser);
userRouter.get('/allUsers', userController.getAllUsers);
userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
