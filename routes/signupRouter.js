const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const validation = require("../middlewares/validation");

router.post("/signup", validation, async (req, res) => {
  const { login, firstName, lastName, age, pass } = req.body;

  const hash = await bcrypt.hash(pass, 10);
  Users.create({
    login: login,
    firstname: firstName,
    lastname: lastName,
    age: age,
    pass: hash,
  })
    .then(() => {
      res.send(true);
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
    });
});

module.exports = router;
