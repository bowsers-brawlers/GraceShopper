const router = require('express').Router()
const Sequelize = require('sequelize')

const {protectedRoute, protectedId} = require('./protect.js')

const {Op} = Sequelize

const {User, Order, Products, orderDetails} = require('../db/models')
module.exports = router

// base path: /api/users

router.get('/', protectedRoute, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName']
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', protectedId, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'email', 'firstName', 'lastName']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})


// order history
router.get('/:userId/order-history', protectedId, async (req, res, next) => {
  try {
    const {userId} = req.params
    const userOrders = await Order.findAll({
      attributes: ['id'],
      where: {
        userId: userId,
        isComplete: 'true'
      }
    })
    const orderIdArray = userOrders.map(order => order.dataValues.id)
    const orders = await orderDetails.findAll({
      where: {
        orderId: {
          [Op.in]: orderIdArray
        }
      },
      include: {
        model: Products
      }
    })
    res.status(200).send(orders)
  } catch (error) {
    next(error)
  }
})


// POST add item to cart ------------------------------------------------------
// order.getProducts() gets the products from the Product model (quantity does not represent quantity the user adds to cart)
router.post('/:userId/orders', protectedId, async (req, res, next) => {
  try {
    const [order, isMade] = await Order.findOrCreate({
      where: {
        customerId: req.params.userId,
        isComplete: 'false'
      }
    })
    const product = await Products.findByPk(req.body.id)
    if (isMade) {
      await order.addProduct(product, {
        through: {quantity: req.body.quantity, price: product.price}
      })
      const customer = await User.findByPk(req.params.userId)
      await customer.addOrder(order)
    } else {
      //await order.addProducts(product)
      await order.addProduct(product, {
        through: {quantity: req.body.quantity, price: product.price}
      })
    }
    res.status(201).send(order)
  } catch (err) {
    next(err)
  }
})

// GET items from cart ------------------------------------------
router.get('/:userId/orders', protectedId, async (req, res, next) => {
  try {
    const {userId} = req.params
    const order = await Order.findOne({
      where: {
        userId: userId,
        isComplete: 'false'
      }
    })
    // include Product model
    if (order) {
      const productsInOrder = await orderDetails.findAll({
        where: {
          orderId: order.id
        },
        include: {
          model: Products
        }
      })
      res.status(200).send(productsInOrder)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})

// update cart
router.put(
  '/:userId/orders/:orderId/update',
  protectedId,
  async (req, res, next) => {
    try {
      const {order} = req.body
      const {orderId} = req.params
      let product
      for (let i = 0; i < order.length; i++) {
        product = await orderDetails.findOne({
          where: {
            orderId: orderId,
            productId: order[i].productId
          }
        })
        await product.update({quantity: order[i].quantity})
      }
      res.sendStatus(201)
    } catch (error) {
      next(error)
    }
  }
)

// PLACE ORDER
router.put('/:userId/orders/:orderId', protectedId, async (req, res, next) => {
  try {
    const {order} = req.body
    for (let i = 0; i < order.length; i++) {
      const product = await Products.findByPk(order[i].product.id)
      await product.update({quantity: product.quantity - order[i].quantity})
      const orderDetailsInstance = await orderDetails.findOne({
        where: {
          orderId: order[i].orderId,
          productId: order[i].product.id
        }
      })
      await orderDetailsInstance.update({quantity: order[i].quantity})
    }
    // update isComplete to 'true' ---------------------------------------
    const {orderId} = req.params
    const completeOrder = await Order.findByPk(orderId)
    await completeOrder.update({isComplete: 'true'})
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.delete(
  '/:userId/order/:orderId/products/:productId',
  protectedId,
  async (req, res, next) => {
    try {
      const {userId, orderId, productId} = req.params
      const product = await Products.findByPk(productId)
      const order = await Order.findByPk(orderId)
      await order.removeProduct(product)
      res.sendStatus(204)
    } catch (error) {
      console.log(error)
    }
  }
)
