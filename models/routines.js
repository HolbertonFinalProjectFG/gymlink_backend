// const { sequelize } = require('../database/database.js')
// const { DataTypes } = require('sequelize');
// const { user_routines } = require('./user_routines.js')
// const { routines_templates } = require('./routines_templates.js')

// const routines = sequelize.define('routines', {
//     routine_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//     },
//     personalized_content: {
//         type: DataTypes.JSON,
//     }
// });

// routines.hasMany(user_routines, {
//     foreignKey: 'routine_id',
//     sourceKey: 'routine_id'
// })

// routines.belongsTo(routines_templates, {
//     foreignKey: 'routine_id',
//     sourceKey: 'routine_id'
// })

// module.exports = {
//     routines
// }
