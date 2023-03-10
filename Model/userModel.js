const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ['true', 'Name is required'],
    minlength: 5,
  },
  email: {
    type: String,
    required: [true, 'Enter an email'],
    validate: [validator.isEmail, 'Provide a valid email'],
    unique: [true, 'Email Exists'],
  },
  phone: {
    type: Number,
    required: [true, 'Provide a number'],
    unique: [true, 'Phone already exists'],
  },
  password: {
    type: String,
    required: [true],
    minlength: 5,
    select: false,
  },
  role: {
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
  designation: {
    type: String,
  },
  department: { type: String },
  username: String,
  passwordResetToken: String,
  passwordReseTokenExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  this.username = this.email.split('@')[0];
  next();
});

userSchema.methods.verifyPassword = async function (password, enteredPassword) {
  return await bcrypt.compare(password, enteredPassword);
};

userSchema.methods.genResetToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.passwordReseTokenExpires = Date.now() + 10 * 60 * 1000;
  return token;
};

const User = mongoose.model('users', userSchema);

module.exports = User;
