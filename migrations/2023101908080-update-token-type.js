"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "token", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};