const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let InventorySchema = new Schema(
  {
    serialNo: { type: String, required: true },
    modelNo: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    specification: { type: Object, required: true },
  },
  { collection: "inventory" }
);

module.exports = mongoose.model("Inventory", InventorySchema);
