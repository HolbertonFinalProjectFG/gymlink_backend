//const { sequelize } = require('../database/database.js')
//const { DataTypes } = require('sequelize')
//const { users } = require('./users.js')
//
//
//const clients_trainers = sequelize.define('clients_trainers', {
//    client_user_id: {
//        type: DataTypes.INTEGER,
//        primaryKey: true,
//        references: {
//            model: 'users',
//            key: 'user_id',
//        },
//    },
//    trainer_user_id: {
//        type: DataTypes.INTEGER,
//        primaryKey: true,
//        references: {
//            model: 'users',
//            key: 'user_id',
//        },
//    }
//})
//
//clients_trainers.belongsTo(users, {
//    foreignKey: 'client_user_id',
//    targetKey: 'user_id',
//  });
//  
//clients_trainers.belongsTo(users, {
//    foreignKey: 'trainer_user_id',
//    targetKey: 'user_id',
//});
//
//module.exports = {
//    clients_trainers
//}
//
//