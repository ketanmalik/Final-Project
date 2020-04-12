const express = require("express");
const router = express.Router();

const user_controller = require("../controller/user.controller");

router.post("/register", user_controller.user_register);
router.get("/login", user_controller.user_login);
router.put("/dashboard/update", user_controller.user_update);

module.exports = router;
