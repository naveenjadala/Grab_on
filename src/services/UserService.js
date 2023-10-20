const User = require("../models/User");
const bcrypt = require("bcrypt");

const UserService = {
  createUser: async (userData) => {
    const { username, email, password } = userData;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashPassword });
    return user;
  },
  getUserById: async (userId) => {
    return await User.findByPk(userId);
  },
};

module.exports = UserService;
