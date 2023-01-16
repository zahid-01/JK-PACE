const departmentRouter = require('express').Router();
const deptController = require('../Controller/departmentController');
const { protect, verify } = require('../Controller/authController');

departmentRouter.use(protect);
departmentRouter
  .route('/:id')
  .get(deptController.getDepartment)
  .patch(deptController.updateDepartmnet)
  .delete(deptController.deleteDepartmnets);
departmentRouter
  .route('/')
  .post(deptController.createDepartment)
  .get(deptController.getAllDepartments);

module.exports = departmentRouter;
