const Block = require('../Model/blockModel');
const handlerFactory = require('../Controller/handlerFactory');
const { catchError } = require('../utils/asyncCatch');
const mongoose = require('mongoose');

exports.addBlock = handlerFactory.createOne(Block);
exports.getBlock = handlerFactory.readOne(Block);
exports.updateBlock = handlerFactory.updateOne(Block);
exports.deleteBlock = handlerFactory.deleteOne(Block);
exports.getAllBlocks = handlerFactory.findAll(Block);

exports.blocksInDistrict = catchError(async (req, res) => {
  blk = await Block.aggregate([
    {
      $match: { district: new mongoose.Types.ObjectId(req.query.district) },
    },
  ]);

  res.status(200).json({
    status: 'Success',
    No_ofBlocks: blk.length,
    blocks: {
      blk,
    },
  });
});
