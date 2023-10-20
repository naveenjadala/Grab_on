"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "token", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },
};