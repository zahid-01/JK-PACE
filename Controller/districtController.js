const District = require('../Model/districtModel');
const mongoose = require('mongoose');
const { catchError } = require('../utils/asyncCatch');
const createError = require('../utils/createError');
const handlerFactory = require('../Controller/handlerFactory');

exports.addDistrict = handlerFactory.createOne(District);
exports.getDistrict = handlerFactory.readOne(District);
exports.updateDistrict = handlerFactory.updateOne(District);
exports.deleteDist = handlerFactory.deleteOne(District);
exports.getAllDistricts = handlerFactory.findAll(District);
