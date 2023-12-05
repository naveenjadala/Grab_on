const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");
require("dotenv").config();

//create new user
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await UserService.createUser(req.body);
    console.log(newUser.id);
    const token = jwt.sign({ email, id: newUser.id }, process.env.secretKey, {
      expiresIn: "10h",
    });
    console.log(token);
    const updatedUser = await updateUser(token, newUser.id);
    if (updatedUser) {
      return res.status(200).json({
        newUser,
        status: "success",
        message: "user logged in successfully",
        token,
        
      });
    }
    res.status(400).json({ message: "failed to signup" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//Get a user by id
const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.userId);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const updateUser = async (token, userId) => {
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
    const token = jwt.sign({ email, id: user.id }, process.env.secretKey, {
      expiresIn: "10h",
    });
    const updatedUser = await updateUser(token, user.id);
    if (updatedUser) {
      return res.status(200).json({
        status: "success",
        message: "user logged in successfully",
        token,
      });
    }
    res.status(400).json({ message: "failed to login" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
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
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getAllUserData = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { createUser, getAllUserData, loginUser, logout, getUserById };
