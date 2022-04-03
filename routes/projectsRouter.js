const express = require("express");
const { validateToken } = require("../JWT");
const router = express.Router();
const PROJECTS = require("../models/Projects");

router.get("/projects", validateToken, async (req, res) => {
  const result = await getProjects(req.query.value);
  res.json(result);
});

async function getProjects(value) {
  const query = await PROJECTS.findAll({
    attributes: ["src", "title", "description"],
  });
  const projectsArr = query.map((project) => {
    return project.dataValues;
  });
  if (value === undefined) return projectsArr;
  const result = projectsArr.filter((item) => {
    return (
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.description.toLowerCase().includes(value.toLowerCase())
    );
  });
  return result;
}

module.exports = router;
