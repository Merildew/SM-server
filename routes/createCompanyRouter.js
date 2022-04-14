const express = require("express");
const router = express.Router();

let companies = [];
let id = 1;

router.get("/companies", (req, res) => {
  res.json(companies);
});

router.post("/companies", (req, res) => {
  const company = { ...req.body, id: id };
  companies = [...companies, company];
  id++;
  res.send(companies);
});

router.put("/companies", (req, res) => {
  const company = req.body;
  companies[company.id - 1] = company;
  res.send(companies);
});

module.exports = router;
