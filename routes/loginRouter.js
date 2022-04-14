const express = require("express");
const router = express.Router();
const AuthController = require("../contoller/authController");

router.post("/login", AuthController.logIn);

module.exports = router;
