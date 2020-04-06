const express = require("express");
const router = express.Router();

const inventory_controller = require("../controller/inventory.controller");

router.get("/getinventory", inventory_controller.get_inventory);
router.post("/saveinventory", inventory_controller.save_inventory);

module.exports = router;
