/* global describe beforeEach it */

const {expect, assert} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const codysFName = 'cody'
    const codysLName = 'banks'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        firstName: codysFName,
        lastName: codysLName
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
    it('GET /api/users returns array of objects containing id, email, firsName, lastName', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)
      expect(res.body[0].firstName).to.be.equal(codysFName)
      expect(res.body[0].lastName).to.be.equal(codysLName)
      assert.isTrue(res.body[0].id >= 1, 'id is an integer >= 1')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
