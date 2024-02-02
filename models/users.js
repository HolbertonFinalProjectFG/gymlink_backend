const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')
const { gym } = require('./gym.js')
const { user_role } = require('/user_role.js')

const users = sequelize.define('users', {
    user_id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50)
    },
    surname: {
        type: DataTypes.STRING(50)
    },
    email: {
        type: DataTypes.STRING(30)
    },
    password: {
        type: DataTypes.STRING(30)
    },
    _phone_number: {
      type: DataTypes.STRING(50)
    },
    emergency_number: {
        type: DataTypes.STRING(50)
    }
});

users.belongsTo(gym, {
    foreignKey: 'gym_id',
    targetId: 'gym_id'
})

users.hasMany(user_role, {
    foreignKey: 'user_id',
    sourceKey: 'user_id'
})

users.hasMany(user_routines, {
    foreignKey: 'user_id',
    sourceKey: 'user_id'
})

users.hasMany()

module.exports = {
    users
}