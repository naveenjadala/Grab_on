const Sequelize = require("sequelize");

const sequelize = new Sequelize( "root", "root", {
  host: "127.0.0.1",
  dialect: "mysql",
});

// "database",

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
