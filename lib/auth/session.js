const jwt = require("jsonwebtoken");
const config = require("@/lib/config");

const SESSION_COOKIE = "admin_session";

const createSessionToken = (user) =>
  jwt.sign(
    { id: user.id, role: user.role || "user" },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn },
  );

const verifySessionToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch {
    return null;
  }
};

module.exports = { SESSION_COOKIE, createSessionToken, verifySessionToken };
