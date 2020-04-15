const express = require("express");
const router = express.Router();

const user_controller = require("../controller/user.controller");

router.post("/register", user_controller.user_register);
router.get("/login", user_controller.user_login);
router.put("/dashboard/update", user_controller.user_update);
router.put("/checkout/cartinfo", user_controller.user_update_cart);
router.put("/checkout/orderinfo", user_controller.user_update_order);
router.put("/sellpart", user_controller.user_sell_part);

module.exports = router;
