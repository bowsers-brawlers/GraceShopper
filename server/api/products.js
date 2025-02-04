const router = require('express').Router()
const {Products} = require('../db/models')
const {protectedRoute, protectedId} = require('./protect.js')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Products.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Products.findByPk(req.params.productId)
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

router.post('/', protectedRoute, async (req, res, next) => {
  try {
    res.status(201).send(await Products.create(req.body))
  } catch (e) {
    next(e)
  }
})

router.put('/', protectedRoute, async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.body.id)
    res.send(await product.update(req.body))
  } catch (e) {
    next(e)
  }
})

router.delete('/:productId', protectedRoute, async (req, res, next) => {
  try {
    const id = req.params.productId
    await Products.destroy({where: {id}})
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})
