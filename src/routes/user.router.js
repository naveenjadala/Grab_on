const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUser,
  loginUser,
  logout,
} = require("../controllers/User.contorller");
const { verifyToken } = require("../utils/AuthenticationCheck");
const { userSchema } = require("../validators/userValidator");
const { validateAuthInput } = require("../middlewares/authMiddleware");

router.post("/register", validateAuthInput(userSchema), createUser);
router.get("/getUsers", verifyToken, getAllUser);
router.post("/login", loginUser);
router.post("/logout", logout);

module.exports = router;
