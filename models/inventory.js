const { sequelize } = require('../database/database.js');
const { DataTypes } = require('sequelize');
const { gym } = require('./gym.js');

const inventory = sequelize.define('inventory', {
    item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    item_name: {
        type: DataTypes.STRING(100)
    }
})

module.exports = {
    inventory
}
