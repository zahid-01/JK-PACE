const mongoose = require("mongoose");
const schemeSchema = new mongoose.Schema({
  schemeName: {
    type: String,
    required: [true, "Scheme is requried"],
  },
  AACostRevised: {
    type: Number,
    required: [true, "Scheme is requried"],
  },
  targetYearCompletion: {
    type: Date,
    default: Date.now(),
    // required: [true, "Scheme is requried"],
  },
  yearOfCommencement: {
    type: Date,
    default: Date.now(),
    // required: [true, "Scheme is requried"],
  },
  fundsPropsedForYear: {
    type: Number,
    required: [true, "Scheme is requried"],
  },
  schemeCode: {
    type: String,
    required: [true, "Scheme is requried"],
  },
  projectApplicationYear: {
    type: Date,
    default: Date.now(),
    //required: [true, "Scheme is requried"],
  },
  divisionBlock: {
    type: String,
    required: [true, "Scheme is requried"],
  },
  subDivisionVillage: {
    type: String,
    required: [true, "Scheme is requried"],
  },
  AACostOriginal: {
    type: Number,
    required: [true, "Scheme is requried"],
  },
  fundingModes: {
    type: String,
    required: [true, "Scheme is requried"],
  },
  assets: {
    type: String,
    required: [true, "Scheme is requried"],
  },
  outlay: {
    type: Date,
    default: Date.now(),
    // required: [true, "Scheme is requried"],
  },
  expiry: {
    type: Date,
    default: Date.now(),
  },
  target: {
    type: String,
    required: true,
  },
  schemaStatus: {
    type: String,
    required: true,
    enum: ["new", "ongoing"],
  },
  requestAuthority: String,
  officer: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
});

schemeSchema.methods.inspOfficer = function (id) {
  this.officer = id;
};

schemeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "officer",
    select: "-_id",
  });
  next();
});

const Scheme = mongoose.model("scheme", schemeSchema);
module.exports = Scheme;
