const mongoose = require('mongoose');

const blockSchema = mongoose.Schema({
  blockName: {
    type: String,
    required: [true, 'Provide a block name'],
  },
  district: {
    type: mongoose.Schema.ObjectId,
    ref: 'districts',
  },
});

blockSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'district',
    select: '-_id',
  });
  next();
});

const Block = new mongoose.model('blocks', blockSchema);

module.exports = Block;
