const express = require("express");
const router = express.Router();

const cart_controller = require("../controller/cart.controller");

router.post("/checkout", cart_controller.checkout);

module.exports = router;
