const Village = require('../Model/villageModel');
const handlerFactory = require('../Controller/handlerFactory');
const { catchError } = require('../utils/asyncCatch');
const createError = require('../utils/createError');

exports.addVillage = handlerFactory.createOne(Village);
exports.getVillage = handlerFactory.readOne(Village);
exports.updateVillage = handlerFactory.updateOne(Village);
exports.deleteVillage = handlerFactory.deleteOne(Village);
exports.getAllVillages = handlerFactory.findAll(Village);

exports.getVilagesInBlock = catchError(async (req, res) => {
  console.log(req.query.block);
  // const villages = await Village.find({
  //   block: req.query.block,
  // })
  //   .select('villageName')
  //   // .select('-block')
  //   .select('-district');

  const villages = await Village.aggregate([
    {
      $match: { block: { $eq: req.query.block } },
    },
  ]);
  console.log(villages);

  res.status(200).json({
    status: 'Success',
    villages: villages,
  });
});
