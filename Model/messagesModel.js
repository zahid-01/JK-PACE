const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Provide message text'],
  },
  levels: {
    type: String,
    enum: [
      'super-user',
      'departmental-officer',
      'divisional-kashmir',
      'divisional-jammu',
      'district',
      'block-tehsil',
    ],
  },
  startDate: Date,
  endDate: Date,
  department: {
    type: String,
    required: [true, 'Provide department'],
  },
});

const Messages = new mongoose.model('messages', messageSchema);

module.exports = Messages;
