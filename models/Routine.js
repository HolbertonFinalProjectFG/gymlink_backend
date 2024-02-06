 const { sequelize } = require('../database/database.js')
 const { DataTypes } = require('sequelize');

 const Routine = sequelize.define('routines', {
     routine_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
     },
     personalized_content: {
         type: DataTypes.JSON,
     }
 });

 module.exports = {
     Routine
 }
