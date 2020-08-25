const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    require: false
  },
  city: {
    type: String,
    require:false
  },
  address: {
    type: String,
    require:false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', User);