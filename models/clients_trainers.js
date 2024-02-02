const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')

sequelize.define('clients_trainers', {
    client_user_id: {
        type: Datatypes.INTEGER,
        primaryKey: true
    },
    trainer_user_id: {
        type: Datatypes.INTEGER,
        primaryKey: true
    }
})

