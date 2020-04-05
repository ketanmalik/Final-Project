const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 20 },
  date: { type: String, default: Date.now() },
});

module.exports = mongoose.model("Users", UserSchema);
