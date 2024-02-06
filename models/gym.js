const { sequelize } = require('../database/database.js');
const { DataTypes } = require('sequelize');
const { users } = require('./users.js');
const { routines_templates } = require('./routines_templates.js');

const gym = sequelize.define('gym', {
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
    gym
}
