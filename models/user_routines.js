const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')
const user_routines = sequelize.define('user_routines', {
    user_id: {
        type: DataTypes.INTEGER
    },
    trainer_user_id: {
        type: DataTypes.INTEGER
    }
})

user_routines.removeAttribute('id')

module.exports = {
     user_routines
}
