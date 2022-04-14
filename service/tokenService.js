const { sign, verify, decode } = require("jsonwebtoken");
require("dotenv").config();
const Users = require("../models/Users");

class TokenService {
  generateAccessToken(payload) {
    return sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
  }

  generateRefreshToken(payload) {
    return sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "7d",
    });
  }

  validateToken(token) {
    if (!token || token === "null") {
      return {
        validate: false,
        error: { message: "User not Authenticated!", status: 403 },
      };
    }
    try {
      const validToken = verify(token, process.env.JWT_KEY);
      if (validToken) {
        return { validate: true };
      }
    } catch (error) {
      return {
        validate: false,
        error: { message: error.message, status: 401 },
      };
    }
  }

  async validateRefreshToken(token) {
    if (!token)
      return {
        validateRefresh: false,
        error: { message: "Refresh token is empty", status: 403 },
      };
    const decoded = decode(token);
    const query = await Users.findOne({
      where: { login: decoded.login },
    });
    const user = query.dataValues;
    try {
      const validToken = verify(token, process.env.JWT_REFRESH_KEY);
      if (validToken) {
        return { validateRefresh: true, user: user };
      }
    } catch (error) {
      return {
        validateRefresh: false,
        error: { message: error.message, status: 401 },
      };
    }
  }
}

module.exports = new TokenService();
