const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')
const { users } = require('./users.js')
const { roles } = require('./roles.js')


const user_roles = sequelize.define('user_roles');

user_roles.removeAttribute('id');

module.exports = {
    user_roles
}
