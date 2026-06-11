const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Invoice = require('./Invoice');
const Service = require('./Service');

const InvoiceDetail = sequelize.define('InvoiceDetail', {
  tableName: 'InvoiceDetails',
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
  price: { // Historical price at the time of purchase
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = InvoiceDetail;
