const express = require("express");
const router = express.Router();

// Song Controller
const songController = require("../controllers/songController");

router.get("/getAll", songController.getAll);
router.post("/save", songController.save);
router.get("/getOne/:id", songController.getOne);
router.put("/update/:id", songController.update);
router.delete("/delete/:id", songController.delete);
router.get("/getFavouriteSong/:id", songController.getFavouriteSong);

module.exports = router;  