const router = require('express').Router()
const {Products} = require('../db/models')
const {Category} = require('../db/models')
module.exports = router

router.get('/:categorySlug', async (req, res, next) => {
  try {
    const slug = await Category.findOne({
      where: {
        slug: req.params.categorySlug
      }
    })

    const category = await Products.findAll({
      where: {
        categoryId: slug.id
      }
    })
    res.json(category)
  } catch (e) {
    next(e)
  }
})
