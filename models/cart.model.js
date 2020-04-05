const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CartSchema = new Schema({
  email: { type: String, required: true, default: "test" },
  items: { type: Array, required: true },
});

module.exports = mongoose.model("CartItems", CartSchema);
