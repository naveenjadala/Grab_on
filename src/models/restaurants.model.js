const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../db");
const Menu = require("./Menu");

const Restaurant = sequelize.define(
  "Restaurant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// Restaurant.sync()
//   .then(() => console.log("Restaurant table created successfully"))
//   .catch((err) => console.log("Error creating Restaurant table", err));

// Restaurant.associate = (models) => {
//   Restaurant.belongsTo(models.menus, {
//     foreignKey: "restaurantId",
//   });
// };
// Restaurant.hasMany(Menu, { foreignKey: 'restaurantId' });





module.exports = Restaurant;
