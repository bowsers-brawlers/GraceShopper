const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Products = db.model('products')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return Products.create({
        name: 'Wine that is red',
        description: '123',
        price: 12.99,
        quantity: 4,
        imageUrl:
          'https://media.istockphoto.com/vectors/mockup-wine-bottle-vector-design-vector-id521084070?k=6&m=521084070&s=170667a&w=0&h=7rr67EPk11FEU_G3XLBCJbmfok48nOSnl7FRNsraqxg='
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)
      expect(res.body).to.be.an('array')
    })

    it('GET /api/products/:productsId', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('Object')
    })
  })
})
