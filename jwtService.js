const { sign, verify, decode } = require("jsonwebtoken");
require("dotenv").config();
const Users = require("./models/Users");

class TokenService {
  generateAccessToken(payload) {
    return sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
  }

  generateRefreshToken(payload) {
    return sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "7d",
    });
  }

  validateToken(req, res, next) {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    if (!token || token === "null") {
      return res
        .status(403)
        .json({ error: { message: "User not Authenticated!" } });
    }
    try {
      const validToken = verify(token, process.env.JWT_KEY);
      if (validToken) {
        return next();
      }
    } catch (err) {
      return res.status(401).json({ error: err });
    }
  }

  async validateRefreshToken(req, res) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken)
      return res
        .status(403)
        .json({ error: { message: "Refresh token is empty" } });
    const decoded = decode(refreshToken);
    const query = await Users.findOne({
      where: { login: decoded.login },
    });
    const user = query.dataValues;
    try {
      const validToken = verify(refreshToken, process.env.JWT_REFRESH_KEY);
      if (validToken) {
        const accessToken = TokenService.generateAccessToken(user);
        res.json(accessToken);
      }
    } catch (err) {
      return res.status(401).json({ error: err });
    }
  }
}

module.exports = new TokenService();
