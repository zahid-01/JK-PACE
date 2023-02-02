const villageRouter = require('express').Router();
const { protect, verify } = require('../Controller/authController');
const villageController = require('../Controller/villageController');

villageRouter.use(protect, verify('super-user'));

villageRouter
  .route('/villagesInBlock')
  .get(villageController.getVilagesInBlock);
villageRouter
  .route('/:id')
  .patch(villageController.updateVillage)
  .delete(villageController.deleteVillage)
  .get(villageController.getVillage);
villageRouter
  .route('/')
  .post(villageController.addVillage)
  .get(villageController.getAllVillages);

module.exports = villageRouter;
