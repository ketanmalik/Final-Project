const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SaveUserSchema = new Schema({
  identifier: { type: String, default: "ActiveUser" },
  userObj: { type: Object, required: true },
});

module.exports = mongoose.model("SaveUsers", SaveUserSchema);
