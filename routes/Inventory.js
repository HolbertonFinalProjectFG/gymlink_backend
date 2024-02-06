const express = require('express');
const Inventory = express.Router();

const { postObjInventory, getObjInventory } = require('../controllers/Inventory.js');

Inventory.get('/', getObjInventory);

Inventory.post('/', postObjInventory);

module.exports = {
    Inventory,
};