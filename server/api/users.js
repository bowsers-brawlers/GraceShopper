const router = require('express').Router()

const {User, Order, Products, orderDetails} = require('../db/models')
module.exports = router

// base path: /api/users

router.get('/', async (req, res, next) => {
  try {
    // const {requestorId} = req.params
    // console.log(requestorId)
    // const requestor = await User.findByPk(requestorId)
    // console.log(requestor)
    // if (requestor.isAdmin === 'true') {
    //   const users = await User.findAll({
    //     // explicitly select only the id and email fields - even though
    //     // users' passwords are encrypted, it won't help if we just
    //     // send everything to anyone who asks!
    //     attributes: ['id', 'email'],
    //   })
    //   res.status(200).json(users)
    // } else {
    //   res.sendStatus(405)
    // }

    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName']
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'email', 'firstName', 'lastName']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// POST add item to cart ------------------------------------------------------
// order.getProducts() gets the products from the Product model (quantity does not represent quantity the user adds to cart)
router.post('/:userId/orders', async (req, res, next) => {
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

      //await order.addProducts(product)
      //const newOrder = await order.addProduct(product)
      //console.log(newOrder, 'BODY')
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
router.get('/:userId/orders', async (req, res, next) => {
  try {
    const {userId} = req.params
    const order = await Order.findOne({
      where: {
        userId: userId,
        isComplete: 'false'
      }
    })
    const productsInOrder = await orderDetails.findAll({
      where: {
        orderId: order.id
      }
    })
    res.status(200).send(productsInOrder)
  } catch (error) {
    next(error)
  }
})
