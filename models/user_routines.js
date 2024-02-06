const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')

const user_routines = sequelize.define('user_routines')

user_routines.removeAttribute('id')

module.exports = {
     user_routines
}
