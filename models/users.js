 const { sequelize } = require('../database/database.js')
 const { DataTypes } = require('sequelize')
 const { gym } = require('./gym.js')
 const { user_role } = require('./user_roles.js')

 const users = sequelize.define('users', {
     user_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
     },
     name: {
         type: DataTypes.STRING(50),
         required: true
     },
     surname: {
         type: DataTypes.STRING(50),
         required: true
     },
     email: {
         type: DataTypes.STRING(30),
         required: true,
         unique: true
     },
     password: {
         type: DataTypes.STRING(30),
         required: true,
         allowNull: true
     },
     _phone_number: {
       type: DataTypes.STRING(50),
       required: true
     },
     emergency_number: {
         type: DataTypes.STRING(50),
         required: true
     }
 });
 
 module.exports = {
     users
 }
