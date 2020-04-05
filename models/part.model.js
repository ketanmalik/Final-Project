const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PartSchema = new Schema({
  serialNo: { type: String, required: true, max: 20 },
  modelNo: { type: String, required: true, max: 20 },
  description: { type: String, required: true, max: 50 },
  category: { type: String, required: true, max: 10 },
  date: { type: String, default: Date.now() },
});

module.exports = mongoose.model("Parts", PartSchema);
