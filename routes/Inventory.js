const express = require('express');
const Inventory = express.Router();
const { postObjInventory, getObjInventory, putInventoryData, getObjById, deleteObjInventory } = require('../controllers/Inventory.js');
const { JwtMiddleware } = require('../middlewares/JwtMiddleware.js');
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware');

const roles = [1, 2]

Inventory.use(JwtMiddleware, PermissionsMiddleware(roles));


Inventory.get('/', getObjInventory);

Inventory.get('/:item_id', getObjById);

Inventory.post('/', postObjInventory);

Inventory.patch('/:item_id', putInventoryData);

Inventory.delete('/:item_id', deleteObjInventory);

module.exports = {
    Inventory,
};
