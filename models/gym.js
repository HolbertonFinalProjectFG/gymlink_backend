const { sequelize } = require('../database/database.js');
const { DataTypes } = require('sequelize');

const Gym = sequelize.define('gym', {
    gym_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    gym_name: {
        type: DataTypes.STRING(50)
    }
});

module.exports = {
    Gym
}
