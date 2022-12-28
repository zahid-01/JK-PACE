const Block = require('../Model/blockModel');
const handlerFactory = require('../Controller/handlerFactory');

exports.addBlock = handlerFactory.createOne(Block);
exports.getBlock = handlerFactory.readOne(Block);
exports.updateBlock = handlerFactory.updateOne(Block);
exports.deleteBlock = handlerFactory.deleteOne(Block);
exports.getAllBlocks = handlerFactory.findAll(Block);
