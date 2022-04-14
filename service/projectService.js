const PROJECTS = require("../models/Projects");

class ProjectService {
  async getProjects(value) {
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
}

module.exports = new ProjectService();
