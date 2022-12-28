const mongoose = require("mongoose");

const villageSchema = mongoose.model({
  villageName: {
    type: String,
    required: [true, "Provide a village name"],
  },
  district: {
    type: mongoose.Schema.ObjectId,
    ref: "districts",
    required: [true, "Provide a district"],
  },
  block: {
    type: mongoose.Schema.ObjectId,
    ref: "blocks",
    required: [true, "Provide a block"],
  },
});

const blockSchema = new mongoose.model("villages", villageSchema);
module.exports = blockSchema;
