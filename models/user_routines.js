const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')

sequelize.define('user_routines', {
    user_id: {
        type: Datatypes.INTEGER
    },
    trainer_user_id: {
        type: Datatypes.INTEGER
    }
})
