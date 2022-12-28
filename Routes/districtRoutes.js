const distRouter = require('express').Router();
const authController = require('../Controller/authController');
const { protect, verify } = require('../Controller/authController');
const distController = require('../Controller/districtController');

distRouter.use(protect, verify('super-admin'));

distRouter
  .route('/:id')
  .patch(distController.updateDistrict)
  .get(distController.getDistrict)
  .delete(distController.deleteDist);
distRouter
  .route('/')
  .post(distController.addDistrict)
  .get(distController.getAllDistricts);

module.exports = distRouter;
