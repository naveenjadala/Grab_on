const jwt = require("jsonwebtoken");
const secretKey = "password";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ error: "Token not provided" });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = await jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Failed to authenticate token' });
  }
};

module.exports = { verifyToken };
