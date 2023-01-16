const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  departmentName: {
    type: String,
    required: [true, 'Provide a department name'],
  },
});

const Department = new mongoose.model('departments', departmentSchema);
module.exports = Department;
