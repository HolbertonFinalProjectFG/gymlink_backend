const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')

sequelize.define('roles', {
    role_id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING(50)
    }
})

roles.hasMany(user_role, {
    foreignKey: 'role_id',
    sourceKey: 'role_id'
})

user_role.belongsTo(roles, {
    foreignKey: 'role_id',
    targetId: 'role_id'
})