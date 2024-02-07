const express = require('express');
const Inventory = express.Router();

const { postObjInventory, getObjInventory, putInventoryData, getObjById, deleteObjInventory } = require('../controllers/Inventory.js');

Inventory.get('/', getObjInventory);

Inventory.get('/:item_id', getObjById);

Inventory.post('/', postObjInventory);

Inventory.patch('/:item_id', putInventoryData);

Inventory.delete('/:item_id', deleteObjInventory);

module.exports = {
    Inventory,
};