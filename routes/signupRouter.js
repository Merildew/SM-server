const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validation");
const AuthController = require("../contoller/authController");

router.post("/signup", validation, AuthController.signUp);

module.exports = router;
