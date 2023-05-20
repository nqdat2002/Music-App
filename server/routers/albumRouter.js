const express = require("express");
const router = express.Router();

// Album Controller
const albumController = require("../controllers/albumController");

router.get("/getAll", albumController.getAll);
router.post("/save", albumController.save);
router.get("/getOne/:id", albumController.getOne);
router.put("/update/:id", albumController.update);

router.delete("/delete/:id", albumController.delete);

module.exports = router;