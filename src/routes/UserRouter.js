const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  logout,
  getUserById,
  getAllUserData,
} = require("../controllers/UserContorller");
const { verifyToken } = require("../utils/AuthenticationCheck");
const { userSchema } = require("../validators/userValidator");
const { validateAuthInput } = require("../middlewares/authMiddleware");

router.post("/register", validateAuthInput(userSchema), createUser);
router.get("/getUserById/:userId", getUserById);
router.get("/getUsers", verifyToken, getAllUserData);
router.post("/login", loginUser);
router.post("/logout", logout);

module.exports = router;
