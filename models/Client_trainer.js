const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')

const Client_trainer = sequelize.define('clients_trainers', {
    client_user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'user_id',
        },
    },
    trainer_user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'user_id',
        },
    },
});

module.exports = {
    Client_trainer
};
