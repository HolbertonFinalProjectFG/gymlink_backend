const { sequelize } = require('../database/database.js');
const { DataTypes } = require('sequelize');

const Inventory = sequelize.define('inventory', {
    item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    item_name: {
        type: DataTypes.STRING(100),
    },

    quantity: {
        type: DataTypes.INTEGER,
    }
})

module.exports = {
    Inventory,
}
