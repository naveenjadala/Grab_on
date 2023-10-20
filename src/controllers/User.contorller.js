const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userupDate = async (token, userId) => {
  try {
    const updatedData = await User.update(
      { token: token },
      { where: { id: userId } }
    );
    if (updatedData) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json("Authentication Failed");
    }
    const token = jwt.sign({ email, id: user.id }, process.env.secretKey, {
      expiresIn: "10h",
    });
    const updateUser = await userupDate(token, user.id);
    if (updateUser) {
      return res
        .status(200)
        .json({ message: "user logged in successfully", token });
    }
    res.status(400).json({ message: "failed to login" });
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error });
  }
};

const logout = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      const tokenPayload = { email: user.email, id: userId };
      const expiredToken = jwt.sign(tokenPayload, process.env.secretKey, {
        expiresIn: 0,
      });
      user.token = null;
      await user.save();
      res
        .status(200)
        .json({ message: "Logout successful", token: expiredToken });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "logout failed", error });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error });
  }
};

module.exports = { createUser, getAllUser, loginUser, logout };
