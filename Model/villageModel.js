const mongoose = require('mongoose');

const villageSchema = mongoose.Schema({
  villageName: {
    type: String,
    required: [true, 'Provide a village name'],
  },
  district: {
    type: mongoose.Schema.ObjectId,
    ref: 'districts',
    required: [true, 'Provide a district'],
  },
  block: {
    type: mongoose.Schema.ObjectId,
    ref: 'blocks',
    required: [true, 'Provide a block'],
  },
});

villageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'district',
    select: '-_id',
  }).populate({
    path: 'block',
    select: '-_id',
  });
  next();
});

const Village = new mongoose.model('villages', villageSchema);
module.exports = Village;
