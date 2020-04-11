const express = require("express");
const router = express.Router();

const save_user_controller = require("../controller/saveUser.controller.js");

router.post("/saveuser", save_user_controller.save_user_db);
router.get("/getsaveuser", save_user_controller.get_save_user);
router.put("/updatesaveuser", save_user_controller.update_save_user);

module.exports = router;
