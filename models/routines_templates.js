const { sequelize } = require('../database/database.js')
const { DataTypes} = require('sequelize');


export const routines_templates = sequelize.define('routines_templates', {
    routine_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.JSON,
    },
    gym_id: {
        type: DataTypes.INTEGER,
    }
})

routines_templates.hasMany(routines, {
    foreignKey: 'routine_id',
    socrceKey: 'routine_id',
});

routines_templates.belongsTo(gym, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id'
});

