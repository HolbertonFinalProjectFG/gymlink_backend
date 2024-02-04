// const { sequelize } = require('../database/database.js')
// const { DataTypes } = require('sequelize')
// const { gym } = require('./gym.js')
// const { user_role } = require('./user_role.js')

// const users = sequelize.define('users', {
//     user_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: DataTypes.STRING(50),
//         required: true
//     },
//     surname: {
//         type: DataTypes.STRING(50),
//         required: true
//     },
//     email: {
//         type: DataTypes.STRING(30),
//         required: true,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING(30),
//         required: true,
//         allowNull: true
//     },
//     _phone_number: {
//       type: DataTypes.STRING(50),
//       required: true
//     },
//     emergency_number: {
//         type: DataTypes.STRING(50),
//         required: true
//     }
// });



// users.hasMany(user_role, {
//     foreignKey: 'user_id',
//     sourceKey: 'user_id'
// })

// users.hasMany(user_routines, {
//     foreignKey: 'user_id',
//     sourceKey: 'user_id'
// })

// users.hasMany(clients_trainers, {
//     foreignKey: 'client_user_id',
//     sourceKey: 'user_id',
// });
  
// users.hasMany(clients_trainers, {
//     foreignKey: 'trainer_user_id',
//     sourceKey: 'user_id',
// });


// module.exports = {
//     users
// }
