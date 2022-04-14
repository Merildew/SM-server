const TokenService = require("../service/tokenService");
const UserService = require("../service/userService");

class AuthController {
  async logIn(req, res) {
    const { login, pass } = req.body;

    const loginResponse = await UserService.login(login, pass);
    if (!loginResponse.isLogged) {
      return res
        .status(loginResponse.error.status)
        .json(loginResponse.error.message);
    } else return res.send(loginResponse);
  }

  async signUp(req, res) {
    const user = { ...req.body };
    const signUpResponse = await UserService.signUp(user);

    if (signUpResponse.signUp) return res.send(true);
    else
      return res
        .status(signUpResponse.errors.status)
        .json({ errors: { message: signUpResponse.errors.message } });
  }

  async refreshToken(req, res) {
    const token = req.body.refreshToken;
    const refreshTokenValidate = await TokenService.validateRefreshToken(token);
    if (!refreshTokenValidate.validateRefresh)
      return res
        .status(refreshTokenValidate.error.status)
        .send(refreshTokenValidate.error.message);
    else {
      const accessToken = TokenService.generateAccessToken(
        refreshTokenValidate.user
      );
      return res.send(accessToken);
    }
  }
}

module.exports = new AuthController();
