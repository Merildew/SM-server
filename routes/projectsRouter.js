const express = require("express");
const router = express.Router();
const ProjectController = require("../contoller/projectController");

router.get("/projects", ProjectController.getProjects);

module.exports = router;
