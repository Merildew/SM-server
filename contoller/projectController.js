const TokenService = require("../service/tokenService");
const ProjectService = require("../service/projectService");

class ProjectController {
  async getProjects(req, res) {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];
    const validateToken = TokenService.validateToken(token);
    if (!validateToken.validate) {
      return res
        .status(validateToken.error.status)
        .send(validateToken.error.message);
    }

    const value = req.query.value;
    const projectResponse = await ProjectService.getProjects(value);
    return res.send(projectResponse);
  }
}

module.exports = new ProjectController();
