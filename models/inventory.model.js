const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let InventorySchema = new Schema(
  {
    serialNo: { type: String, required: true, max: 20 },
    modelNo: { type: String, required: true, max: 20 },
    description: { type: String, required: true, max: 50 },
    category: { type: String, required: true, max: 10 },
  },
  { collection: "inventory" }
);

module.exports = mongoose.model("Inventory", InventorySchema);
