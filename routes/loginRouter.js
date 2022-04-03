const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const { generateAccessToken, generateRefreshToken } = require("../JWT");

router.post("/login", async (req, res) => {
  const { login, pass } = req.body;

  const query = await Users.findOne({ where: { login: login } });
  if (!query) {
    return res.status(400).json({ error: "User doesn't exist" });
  }
  const user = query.dataValues;

  const dbPassword = user.pass;
  bcrypt.compare(pass, dbPassword).then((match) => {
    if (!match) {
      return res
        .status(400)
        .json({ error: "Wrong username and password combination" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const response = {
      isLogged: true,
      accessToken,
      refreshToken,
    };

    res.send(response);
  });
});

module.exports = router;
