/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'cody',
          lastName: 'Myers',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        // console.log(cody, 'THIS IS THE CONSOLE LOG FOR CODY!!!!!!!!!!!!!!!!!!')
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    })

    describe('default value for isAdmin', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'cody',
          lastName: 'Myers',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })
      it('default value should be `false`', () => {
        expect(cody.isAdmin).to.be.equal('false')
      })
    })

    // end describe('correctPassword')
  })
  // end describe('instanceMethods')
})
// end describe('User model')
