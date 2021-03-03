const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Products = db.model('products')

describe('Products Express routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET_ALL_PRODUCTS /api/products/', () => {
    beforeEach(() => {
      Products.bulkCreate([
        {
          name: 'Wine that is red',
          description: '123',
          price: 12.99,
          quantity: 4,
          imageUrl: 'imageUrl'
        },
        {
          name: 'Wine that is white',
          description: 'White Wine',
          price: 10.99,
          quantity: 40,
          imageUrl: 'imageUrl'
        },
        {
          name: 'Wine that is purple',
          description: 'Good purple wine',
          price: 2.99,
          quantity: 43,
          imageUrl: 'imageUrl'
        }
      ])
    })

    it('GET 200', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)
      expect(res.body).to.be.an('array')
    })
    it('Should return 3 products', async () => {
      const res = await request(app).get('/api/products')
      expect(res.body)
        .to.be.an('array')
        .with.lengthOf(3)
    })
  })

  describe('GET_SINGLE_PRODUCT /api/products/:productsId', () => {
    beforeEach(() => {
      Products.bulkCreate([
        {
          name: 'Wine that is red',
          description: '123',
          price: 12.99,
          quantity: 4,
          imageUrl: 'imageUrl'
        },
        {
          name: 'Wine that is white',
          description: 'White Wine',
          price: 10.99,
          quantity: 40,
          imageUrl: 'imageUrl'
        },
        {
          name: 'Wine that is purple',
          description: 'Good purple wine',
          price: 2.99,
          quantity: 43,
          imageUrl: 'imageUrl'
        }
      ])
    })
    it('GET 200', async () => {
      const res = await request(app)
        .get('/api/products/3')
        .expect(200)
      expect(res.body).to.be.an('Object')
    })

    it('GET single product #3', async () => {
      const res = await request(app)
        .get('/api/products/3')
        .expect(200)
      expect(res.body).to.be.an('Object')
      expect(res.body.name).to.equal('Wine that is purple')
      expect(res.body.id).to.equal(3)
      expect(res.body.price).to.equal(2.99)
      expect(res.body.quantity).to.equal(43)
    })
  })
})
