const express = require("express");

const userRouter = express.Router();
const userController = require("../Controller/userController");
const authController = require("../Controller/authController");
const { protect } = require("../Controller/authController");

userRouter.post("/signup", authController.signUp);
userRouter.post("/logIn", authController.logIn);

userRouter.use(protect);
userRouter.route("/createUser").post(userController.createUser);
userRouter.get("/allUsers", authController.protect, userController.getAllUsers);
userRouter
  .route("/:id")
  .get(authController.verify("super-admin"), userController.getUser)
  .patch(authController.verify("super-admin"), userController.updateUser)
  .delete(authController.verify("super-admin"), userController.deleteUser);

module.exports = userRouter;
