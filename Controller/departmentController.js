const Department = require('../Model/departmentModel');
const { catchError } = require('../utils/asyncCatch');
const handlerFactory = require('./handlerFactory');

exports.createDepartment = handlerFactory.createOne(Department);
exports.updateDepartmnet = handlerFactory.updateOne(Department);
exports.getDepartment = handlerFactory.readOne(Department);
exports.getAllDepartments = handlerFactory.findAll(Department);
exports.deleteDepartmnets = handlerFactory.deleteOne(Department);
