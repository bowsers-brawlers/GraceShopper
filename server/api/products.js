const router = require('express').Router()
const {Products} = require('../db/models')
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

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Products.create(req.body))
  } catch (e) {
    next(e)
  }
})

router.put('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const product = await Products.findByPk(req.body.productId)
    res.send(await product.update(req.body))
  } catch (e) {
    next(e)
  }
})
