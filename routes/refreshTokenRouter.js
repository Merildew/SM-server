const express = require("express");
const AuthController = require("../contoller/authController");
const router = express.Router();

router.post("/token", AuthController.refreshToken);

module.exports = router;
