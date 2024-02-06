const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')

const Role = sequelize.define('roles', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING(50),
    }
})

module.exports = {
    Role
}
