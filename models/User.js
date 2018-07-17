const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create User Schema
const UserSchema = new Schema({
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
  avatar: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  address2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  pwdresettoken:{
    type:String
  },
  pwdresetexp:{
    type:Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
