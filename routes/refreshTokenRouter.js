const express = require("express");
const { validateRefreshToken } = require("../JWT");
const router = express.Router();

router.post("/token", validateRefreshToken);

module.exports = router;
