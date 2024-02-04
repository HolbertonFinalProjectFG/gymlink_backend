const Sequelize = require('sequelize')
const { PORT , POSTGRES_USER , POSTGRES_PASSWORD , POSTGRES_DB , DB_HOST } = require('../config.js')

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

module.exports = {
  sequelize
}
