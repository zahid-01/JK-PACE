const Village = require('../Model/villageModel');
const handlerFactory = require('../Controller/handlerFactory');
const { catchError } = require('../utils/asyncCatch');
const createError = require('../utils/createError');
const mongoose = require('mongoose');

exports.addVillage = handlerFactory.createOne(Village);
exports.getVillage = handlerFactory.readOne(Village);
exports.updateVillage = handlerFactory.updateOne(Village);
exports.deleteVillage = handlerFactory.deleteOne(Village);
exports.getAllVillages = handlerFactory.findAll(Village);

exports.getVilagesInBlock = catchError(async (req, res) => {
  const villages = await Village.aggregate([
    {
      $match: { block: new mongoose.Types.ObjectId(req.query.block) },
    },
  ]);

  res.status(200).json({
    status: 'Success',
    villages: villages,
  });
});
