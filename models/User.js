 const { sequelize } = require('../database/database.js')
 const { DataTypes } = require('sequelize')

 const User = sequelize.define('users', {
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
     CI: {
        type: DataTypes.STRING(50),
        required: true,
        unique: true
     },
     email: {
         type: DataTypes.STRING(30),
         required: true,
         unique: true
     },
     birth_date: {
        type: DataTypes.DATE,
        required: true
     },
     password: {
         type: DataTypes.STRING(30),
         required: true,
         allowNull: true
     },
     phone_number: {
       type: DataTypes.STRING(50),
       required: true
     },
     emergency_number: {
         type: DataTypes.STRING(50),
         required: true
     },
     insurance: {
        type: DataTypes.STRING(50),
        required: true
     }
 });
 
 module.exports = {
     User
 }
