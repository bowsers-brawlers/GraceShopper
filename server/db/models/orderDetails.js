const Sequelize = require('sequelize')
const db = require('../db')

const orderDetails = db.define('orderDetails', {
  price: {
    type: Sequelize.INTEGER
    //allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER
    //allowNull: false,
  }
})

module.exports = orderDetails
