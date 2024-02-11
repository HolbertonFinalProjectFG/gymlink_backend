const express = require('express');
const Inventory = express.Router();
const { JwtMiddleware } = require('../controllers/Auth')
const { postObjInventory, getObjInventory, putInventoryData, getObjById, deleteObjInventory } = require('../controllers/Inventory.js');

Inventory.get('/', JwtMiddleware, getObjInventory);

Inventory.get('/:item_id', JwtMiddleware, getObjById);

Inventory.post('/', JwtMiddleware, postObjInventory);

Inventory.patch('/:item_id', JwtMiddleware, putInventoryData);

Inventory.delete('/:item_id', JwtMiddleware, deleteObjInventory);

module.exports = {
    Inventory,
};
