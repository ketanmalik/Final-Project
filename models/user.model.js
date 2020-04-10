const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  fName: { type: String, required: true, max: 20 },
  lName: { type: String, required: true, max: 20 },
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 20 },
  add1: { type: String, required: true, max: 20 },
  add2: { type: String, required: false, max: 20 },
  city: { type: String, required: true, max: 20 },
  state: { type: String, required: true, max: 20 },
  zip: { type: Number, required: true },
  country: { type: String, required: true, max: 30 },
  date: { type: String, default: Date.now() },
  socialId: { type: String, default: "newUser" },
});

module.exports = mongoose.model("Users", UserSchema);
