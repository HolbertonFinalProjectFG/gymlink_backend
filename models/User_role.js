const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')

const User_role = sequelize.define('user_roles');

User_role.removeAttribute('id');

module.exports = {
    User_role
}
