const router = require('express').Router()

const {User, Order, Products} = require('../db/models')
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
      console.log('HELLLLOOOOOOOOO', isMade)
      await order.addProduct(product, {
        through: {quantity: req.body.quantity, price: product.price}
      })

      //await order.addProducts(product)
      //const newOrder = await order.addProduct(product)
      //console.log(newOrder, 'BODY')
      const customer = await User.findByPk(req.params.userId)
      const updatedCustomer = await customer.addOrder(order)
      res.send(await order.getProducts())
    } else {
      //await order.addProducts(product)
      await order.addProduct(product, {
        through: {quantity: req.body.quantity, price: product.price}
      })
      res.send(await order.getProducts())
    }
  } catch (err) {
    next(err)
  }
})
