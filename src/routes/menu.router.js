const express = require("express");
const router = express.Router();

const {
  createSingleMenuItem,
  getAllMenu,
  getItemsByRestaurants,
  RestaurantByItem,
} = require("../controllers/menu.contoller");

router.post("/saveItem", createSingleMenuItem);
router.get("/getAllItems", getAllMenu);
router.get("/getItemsByRestaurant/:id", getItemsByRestaurants);
router.get("/getRestaurantByItem/:item", RestaurantByItem);

module.exports = router;
