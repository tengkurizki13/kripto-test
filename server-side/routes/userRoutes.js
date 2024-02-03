const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();


// route call contoller
router.post("/api/register", UserController.register);
router.post("/api/login", UserController.login);

module.exports = router;
