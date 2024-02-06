const { sequelize } = require('../database/database.js')
const { DataTypes} = require('sequelize');

const Routine_template = sequelize.define('routines_templates', {
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
    Routine_template
}
