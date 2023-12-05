const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ error: "Authentication failed" });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = await jwt.verify(token, process.env.secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { verifyToken };
