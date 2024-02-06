 const { sequelize } = require('../database/database.js')
 const { DataTypes } = require('sequelize');
 const { user_routines } = require('./user_routines.js')
 const { routines_templates } = require('./routines_templates.js')
 const routines = sequelize.define('routines', {
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
     routines
 }
