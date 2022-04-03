const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("./models/Users");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "15s" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });
};

const validateToken = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.split(" ")[1];

  if (!token || token === "null") {
    return res
      .status(403)
      .json({ error: { message: "User not Authenticated!" } });
  }
  try {
    const validToken = jwt.verify(token, process.env.JWT_KEY);
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const validateRefreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return res
      .status(403)
      .json({ error: { message: "Refresh token is empty" } });
  const decoded = jwt.decode(refreshToken);
  const query = await Users.findOne({
    where: { login: decoded.login },
  });
  const user = query.dataValues;
  try {
    const validToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    if (validToken) {
      const accessToken = generateAccessToken(user);
      res.json(accessToken);
    }
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  validateToken,
  validateRefreshToken,
};
