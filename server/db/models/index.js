const User = require('./user')
const Products = require('./products')
const Order = require('./order')
const orderDetails = require('./orderDetails')
const Category = require('./category')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Order, {as: 'order'})
Order.belongsTo(User, {as: 'customer'})

Order.belongsToMany(Products, {through: 'orderDetails'})
Products.belongsToMany(Order, {through: 'orderDetails'})

orderDetails.belongsTo(Products)
Products.hasMany(orderDetails)

Category.hasMany(Products, {as: 'category'})
Products.belongsTo(Category, {as: 'category'})

// [ ORDER
//   '_customGetters',    '_customSetters',
//   'validators',        '_hasCustomGetters',
//   '_hasCustomSetters', 'rawAttributes',
//   '_isAttribute',      'getCustomer',
//   'setCustomer',       'createCustomer',
//   'getProducts',       'countProducts',
//   'hasProduct',        'hasProducts',
//   'setProducts',       'addProduct',
//   'addProducts',       'removeProduct',
//   'removeProducts',    'createProduct'
// ]

// [ PRODUCTS
//   '_customGetters',    '_customSetters',
//   'validators',        '_hasCustomGetters',
//   '_hasCustomSetters', 'rawAttributes',
//   '_isAttribute',      'getOrders',
//   'countOrders',       'hasOrder',
//   'hasOrders',         'setOrders',
//   'addOrder',          'addOrders',
//   'removeOrder',       'removeOrders',
//   'createOrder'
// ]

// [USER
//   '_customGetters',    '_customSetters',
//   'validators',        '_hasCustomGetters',
//   '_hasCustomSetters', 'rawAttributes',
//   '_isAttribute',      'correctPassword',
//   'getOrder',          'countOrder',
//   'hasOrder',          'setOrder',
//   'addOrder',          'removeOrder',
//   'createOrder'
// ]

/** Category
 * [
 '_customGetters',    '_customSetters',
 'validators',        '_hasCustomGetters',
 '_hasCustomSetters', 'rawAttributes',
 '_isAttribute',      'getProducts',
 'countProducts',     'hasProduct',
 'hasProducts',       'setProducts',
 'addProduct',        'addProducts',
 'removeProduct',     'removeProducts',
 'createProduct'
 ]

 */

// console.log("Magic Methods: ", Object.keys(Products.prototype))
// console.log("Magic Methods: ", Object.keys(Category.prototype))

module.exports = {
  User,
  Products,
  Order,
  orderDetails,
  Category
}
/*
'SELECT
"orderDetails"."price",
"orderDetails"."quantity",
"orderDetails"."createdAt",
"orderDetails"."updatedAt",
"orderDetails"."orderId",
"orderDetails"."productId",

"product"."id" AS "product.id",
"product"."name" AS "product.name",
"product"."description" AS "product.description",
"product"."price" AS "product.price",
"product"."quantity" AS "product.quantity",
"product"."imageUrl" AS "product.imageUrl",
"product"."createdAt" AS "product.createdAt",
"product"."updatedAt" AS "product.updatedAt"

FROM "orderDetails" AS "orderDetails"

INNER JOIN "products" AS "product"
ON "orderDetails"."productId" = "product"."id"
AND "orderDetails"."productId"

WHERE "orderDetails"."orderId" = 1;'

*/
