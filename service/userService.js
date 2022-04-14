const TokenService = require("./tokenService");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

class UserService {
  async login(login, pass) {
    const query = await Users.findOne({ where: { login: login } });
    if (!query) {
      return {
        isLogged: false,
        error: { message: "User doesn't exist", status: 401 },
      };
    }
    const user = query.dataValues;
    const dbPassword = user.pass;
    const match = await bcrypt.compare(pass, dbPassword);
    if (!match) {
      return {
        isLogged: false,
        error: {
          message: "Wrong username and password combination",
          status: 400,
        },
      };
    }
    const accessToken = TokenService.generateAccessToken(user);
    const refreshToken = TokenService.generateRefreshToken(user);
    return {
      isLogged: true,
      accessToken,
      refreshToken,
    };
  }

  async signUp(user) {
    try {
      const hash = await bcrypt.hash(user.pass, 10);
      Users.create({
        login: user.login,
        firstname: user.firstName,
        lastname: user.lastName,
        age: user.age,
        pass: hash,
      });
      return { signUp: true };
    } catch (error) {
      return { signUp: false, errors: { message: error.message, status: 400 } };
    }
  }
}

module.exports = new UserService();
