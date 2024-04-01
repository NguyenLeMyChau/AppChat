

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  Avatar: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
