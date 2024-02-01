const express = require("express");
const ItemController = require("../controllers/ItemController");
const router = express.Router();

router.get("/items", ItemController.items);
router.get("/items/:id", ItemController.itemDetail);

module.exports = router;
