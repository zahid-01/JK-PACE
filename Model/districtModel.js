const mongoose = require('mongoose');

const districtSchema = mongoose.Schema(
  {
    districtName: {
      type: String,
      required: [true, 'Provide a district name'],
      unique: [true, 'District exists'],
    },
    districtCode: {
      type: String,
      required: [true, 'Provide a district code'],
      unique: [true, 'District Code exists'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const District = new mongoose.model('districts', districtSchema);
module.exports = District;
