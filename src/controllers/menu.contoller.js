const Restaurant = require("../models/restaurants.model");
const MenuModel = require("../models/Menu");
const { sequelize } = require("../../db");
const { Op } = require('sequelize');

const createSingleMenuItem = async (req, res) => {
  try {
    const { restaurantId, name, price } = req.body;
    const menuItem = await MenuModel.create({ restaurantId, name, price });
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: "could and create the menu" });
  }
};

const getAllMenu = async (req, res) => {
  try {
    const items = await MenuModel.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "could and create the menu" });
  }
};

const getItemsByRestaurants = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const data = await Restaurant.findAll({
      attributes: ["id", ["name", "rs_Name"], "location"],
      include: [
        {
          model: MenuModel,
          attributes: ["id", "price", ["name", "itemName"]],
          where: { restaurantId },
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "could and create the menu", erroMessage: error });
  }
};

const RestaurantByItem = async (req, res) => {
  try {
    const searchItemName = req.params.item;
    const data = await Restaurant.findAll({
      include: {
        model: MenuModel,
        where: {
          name: { [Op.like]: `%${searchItemName}%` },
        },
        attributes: ["id", "name", "price"],
      },
    });
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "could and create the menu==>", erroMessage: error });
  }
};

module.exports = {
  createSingleMenuItem,
  getAllMenu,
  getItemsByRestaurants,
  RestaurantByItem,
};
