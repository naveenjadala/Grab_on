const Restaurant = require("../models/restaurants.model");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.send(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Could not create restaurant" });
  }
};

const saveResturant = async (req, res) => {
  try {
    const { name, location } = req.body;
    const restaurant = await Restaurant.create({ name, location });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Could not create restaurant" });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findByPk(restaurantId);
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Could not create restaurant" });
  }
};

module.exports = { getAllRestaurants, saveResturant, getRestaurantById };
