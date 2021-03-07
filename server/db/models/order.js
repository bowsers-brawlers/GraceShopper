const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isComplete: {
    type: Sequelize.ENUM('true', 'false'),
    defaultValue: 'false'
  }
})

module.exports = Order
