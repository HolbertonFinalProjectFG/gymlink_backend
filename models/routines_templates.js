const { sequelize } = require('../database/database.js')
const { DataTypes} = require('sequelize');
const { routines } = require('./routines.js')
const { gym } = require('./gym.js')

const routines_templates = sequelize.define('routines_templates', {
    routine_template_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.JSON,
    },
});

module.exports = {
    routines_templates
}
