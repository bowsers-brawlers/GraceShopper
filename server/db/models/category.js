const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING
  },
  slug: {
    type: Sequelize.STRING
  }
})

module.exports = Category
