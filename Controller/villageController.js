const Village = require('../Model/villageModel');
const handlerFactory = require('../Controller/handlerFactory');

exports.addVillage = handlerFactory.createOne(Village);
exports.getVillage = handlerFactory.readOne(Village);
exports.updateVillage = handlerFactory.updateOne(Village);
exports.deleteVillage = handlerFactory.deleteOne(Village);
exports.getAllVillages = handlerFactory.findAll(Village);
