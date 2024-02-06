const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')

const User_routine = sequelize.define('user_routines')

User_routine.removeAttribute('id')

module.exports = {
     User_routine
}
