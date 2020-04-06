const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CartSchema = new Schema({
  email: { type: String, required: true, default: "test" },
  items: { type: Object, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("CartItems", CartSchema);
