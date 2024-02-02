const express = require("express");
const RequestController = require("../controllers/RequestController");
const router = express.Router();

router.post("/api/order", RequestController.order);
module.exports = router;
