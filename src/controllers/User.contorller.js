const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const secretKey = "password";

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
    const token = jwt.sign({ email, id: user.id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: "user logged in successfully", token });
  } catch (error) {}
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error });
  }
};

module.exports = { createUser, getAllUser, loginUser };
