const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')
const { user_role } = require('./user_roles.js')

const roles = sequelize.define('roles', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING(50)
    }
})

module.exports = {
    roles
}
