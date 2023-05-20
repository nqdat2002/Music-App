const express = require("express");
const router = express.Router();

// Artist Controller
const artistController = require("../controllers/artistController");

router.get("/getAll", artistController.getAll);
router.post("/save", artistController.save);
router.get("/getOne/:id", artistController.getOne);
router.put("/update/:id", artistController.update);
router.delete("/delete/:id", artistController.delete);

module.exports = router;  