const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const InvoiceDetail = sequelize.define('InvoiceDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'InvoiceDetails',
  timestamps: true,
  freezeTableName: true
});

module.exports = InvoiceDetail;
