//const { sequelize } = require('../database/database.js')
//const { DataTypes} = require('sequelize');
//const { routines } = require('./routines.js')
//const { gym } = require('./gym.js')
//const routines_templates = sequelize.define('routines_templates', {
//    routine_id: {
//        type: DataTypes.INTEGER,
//        autoIncrement: true,
//        primaryKey: true,
//    },
//    content: {
//        type: DataTypes.JSON,
//    },
//    gym_id: {
//        type: DataTypes.INTEGER,
//    }
//});
//routines_templates.hasMany(routines, {
//    foreignKey: 'routine_id',
//    sourceKey: 'routine_id',
//});
//routines_templates.belongsTo(gym, {
//    foreignKey: 'gym_id',
//    sourceKey: 'gym_id'
//});
//module.exports = {
//    routines_templates
//}