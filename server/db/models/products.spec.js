const {expect} = require('chai')
const db = require('../index')
const Products = db.model('products')

describe('Products Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields name, description, price, quantity & imageUrl', async () => {
    const product = await Products.create({
      name: 'Jupiter Jumpstart',
      description: '5.2 AU',
      price: 12.99,
      quantity: 4,
      imageUrl: '/images/jupiter.png'
    })
    expect(product.name).to.equal('Jupiter Jumpstart')
    expect(product.description).to.equal('5.2 AU')
    expect(product.price).to.equal(12.99)
    expect(product.quantity).to.equal(4)
    expect(product.imageUrl).to.equal('/images/jupiter.png')
  })
})
