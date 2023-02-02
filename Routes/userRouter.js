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
userRouter.post('/updatePassword', authController.updatePassword);
userRouter.get('/getMe', authController.getMe);
userRouter.patch('/me', authController.updateMe);
userRouter.use(authController.verify('super-user'));
userRouter.route('/createUser').post(userController.createUser);
userRouter.get('/allUsers', userController.getAllUsers);
userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
userRouter.get('/filterUser/:filter1/:filter2', userController.filterUsers);
userRouter.get('/department/:dept', userController.getDepartmentUser);
module.exports = userRouter;
