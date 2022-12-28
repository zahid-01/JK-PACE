const villageRouter = require('express').Router();
const { protect, verify } = require('../Controller/authController');
const villageController = require('../Controller/villageController');

villageRouter.use(protect, verify('super-admin'));

villageRouter
  .route('/:id')
  .patch(villageController.updateBlock)
  .delete(villageController.deleteBlock)
  .get(villageController.getBlock);
villageRouter
  .route('/')
  .post(villageController.addBlock)
  .get(villageController.getAllBlocks);

module.exports = villageRouter;
