const express = require('express');
const Inventory = express.Router();

const { postObjInventory, getObjInventory } = require('../controllers/inventory_controllers.js');

Inventory.get('/', getObjInventory);

Inventory.post('/', postObjInventory);

module.exports = {
    Inventory,
};