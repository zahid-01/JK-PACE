const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["true", "Name is required"],
    minlength: 5,
  },
  email: {
    type: String,
    required: [true, "Enter an email"],
    validate: [validator.isEmail, "Provide a valid email"],
  },
  password: {
    type: String,
    required: [true],
    minlength: 5,
    select: false,
  },
  role: {
    type: String,
    enum: ["super-admin", "admin", "employee"],
  },
  designation: {
    type: String,
  },
  username: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  this.username = this.email.split("@")[0];
  next();
});

userSchema.methods.verifyPassword = async function (password, enteredPassword) {
  return await bcrypt.compare(password, enteredPassword);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
