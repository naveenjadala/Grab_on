"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("restaurants", "rating", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },
};
