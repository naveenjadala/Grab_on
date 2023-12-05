const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const conneciton = require("./src/models/index");
const swaggerSetup = require("./swagger");
const cors = require('cors');

require("dotenv").config();

const app = express();

swaggerSetup(app);

const { sequelize } = require("./db");
const restaurantsRoute = require("./src/routes/restaurants.router");
const menuRouter = require("./src/routes/menu.router");
const userRouter = require("./src/routes/UserRouter");
const { verifyToken } = require("./src/utils/AuthenticationCheck");

// const email = require('./src/services/mailService')

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const PORT = process.env.PORT || 8001;
// app.use(conneciton);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("combined"));

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

app.use("/api/restaurants", restaurantsRoute);
app.use("/api/menu", menuRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: "Sorry, the requested resource was not found." });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

Object.keys(sequelize.models).forEach((modelName) => {
  const model = sequelize.models[modelName];
  if (model.associations) {
    console.log(`Associations for ${modelName}:`);
    Object.keys(model.associations).forEach((associationName) => {
      const association = model.associations[associationName];
      console.log(
        `    ${association.associationType} with ${association.target.name}`
      );
    });
  } else {
    console.log(`No associations found for ${modelName}`);
  }
});
