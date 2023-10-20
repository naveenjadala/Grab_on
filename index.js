const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const conneciton = require('./src/models/index');

require("dotenv").config();

const app = express();

const { sequelize } = require("./db");
const restaurantsRoute = require("./src/routes/restaurants.router");
const menuRouter = require("./src/routes/menu.router");
const userRouter = require("./src/routes/UserRouter");
const { verifyToken } = require("./src/utils/AuthenticationCheck");

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
app.use(bodyParser.json());
app.use(logger("combined"));

app.use("/api/restaurants", restaurantsRoute);
app.use("/api/menu", menuRouter);
app.use("/api/user", userRouter);

app.get("/getUser/:id", (req, res) => {
  res.json({ message: `success${req.params.id}` });
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
