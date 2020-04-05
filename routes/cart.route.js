const express = require("express");
const router = express.Router();

const cart_controller = require("../controller/cart.controller");

router.post("/parts/inventory/requestquote", cart_controller.request_quote);

module.exports = router;
