const Sequelize = require("sequelize");
const { sequelize } = require("../../db");
const Restaurant = require("./restaurants.model");
const Menu = require("./Menu");
const User = require("./User");

Restaurant.sync()
  .then(() => console.log("Restaurant table created successfully 1"))
  .catch((err) => console.log("Error creating Restaurant table", err));

Menu.sync()
  .then(() => console.log("Menu table created successfully 1"))
  .catch((err) => console.log("Error creating Menu table", err));

User.sync()
  .then(() => console.log("User table created successfully"))
  .catch((err) => console.log("Error creating User table", err));

Restaurant.hasMany(Menu, { foreignKey: "restaurantId" });
Menu.belongsTo(Restaurant, { as: "Restaurant", foreignKey: "restaurantId" });

// sequelize.sync();
