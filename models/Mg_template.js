const { sequelize } = require('../database/database.js')
const { DataTypes} = require('sequelize');

const Mg_template = sequelize.define('mg_templates', {
  gm_template_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
  },
  content: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
});

module.exports = {
  Mg_template
}
