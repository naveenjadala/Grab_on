const express = require("express");
const router = express.Router();

const {
  getAllRestaurants,
  saveResturant,
  getRestaurantById,
} = require("../controllers/restaurants.controller");

router.get("/", getAllRestaurants);
router.post("/restaurants", saveResturant);
router.get("/restaurantById/:id", getRestaurantById);


module.exports = router;
