const express = require("express");
const ItemController = require("../controllers/ItemController");
const router = express.Router();

router.get("/items", ItemController.items);

module.exports = router;
