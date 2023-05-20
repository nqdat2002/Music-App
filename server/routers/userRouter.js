const express = require("express");
const router = express.Router();

// User Controller
const userController = require("../controllers/userController");

router.get("/login", userController.login);
router.get("/getUsers", userController.getUsers);
router.put("/updateRole/:id", userController.updateRole);
router.get("/getUser/:id", userController.getUser);
router.delete("/delete/:id", userController.delete);

module.exports = router;