const express = require("express");
const TokenService = require("../jwtService");
const router = express.Router();

router.post("/token", TokenService.validateRefreshToken);

module.exports = router;
