const express = require("express");
const router = express.Router();

const inventory_controller = require("../controller/inventory.controller");

router.get("/getinventory", inventory_controller.get_inventory);
router.post("/saveinventory", inventory_controller.save_inventory);
router.post("/createpart", inventory_controller.create_part);
router.put("/updatepart", inventory_controller.update_part);
router.delete("/deletepart", inventory_controller.delete_part);

module.exports = router;
